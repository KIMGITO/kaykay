<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Stock;
use App\Models\Summary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Inertia\Inertia;
use Illuminate\Support\Str;

class StockController extends Controller
{
    public function index()
    {
        $stock = Stock::with('product')->get();
        return Inertia::render('Stock/Index', ['stocks' => $stock]);
    }

    public function create()
    {
        $products = Product::where('is_active', true)->latest()->get();

        return Inertia::render('Stock/Add', ['products' => $products]);
    }
    public function store(Request $request)
    {


        $validated =  $request->validate([

            'product_id' => 'required|exists:products,id',
            'quantity_received' => 'required|numeric|min:0.1',
            'date' => 'required|date',
            'source' => 'nullable|string|min:3',
        ]);

        $validated['quantity_available'] = $validated['quantity_received'];



        $initials = 'KAY';
        if ($validated['source'] != '') {
            $initials = Str::upper(substr($validated['source'], 0, 3));
        }



        // logic for a receipt number
        $validated['code'] = $initials . date('Y.m.d') . Str::random(4);

        // check if product is active 
        if (Product::ActiveStatus($validated['product_id'])) {
            Stock::create($validated);
        } else {
            // dd('not ava');
            return redirect()->route('stock.create')->withErrors(['product_id' => $request['product_name'] . ' not active.']);
        }



        return redirect()->route('stock.index')->with(['success' => 'Stock Created Successfully.']);
    }

    public function edit(Stock $stock)
    {
        $products = Product::all(['id', 'name']);

        return Inertia::render('Stock/Add', [
            'initialData' => $stock,
            'products' => $products,
        ]);
    }

    public function update(Request $request, $id)
    {
        $stock = Stock::findOrFail($id);

        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity_received' => 'required|numeric|min:0',
            'date' => 'required|date',
            'source' => 'nullable|string|max:255',
        ]);

        $stock->update($data);

        return to_route('stock.index')->with('success', 'Stock updated successfully.');
    }

    public function editQty($id)
    {

        $stock = Stock::with('product')->find($id);


        if (!$stock->product->is_updaterble) {
            return back()->with('error', 'Product quantity is not updatable. Consider adding new stock.');
        }

        return Inertia::render('Stock/Update', [
            'stock' => $stock,
        ]);
    }




    public function updateQty(Request $request, Stock $stock,  $id)
    {

        $validated = $request->validate([
            'quantity' => 'required|numeric|min:0',
            
        ]);


        $stock->where('id', operator: $id)->incrementEach(['quantity_available'=> $validated['quantity'], 'quantity_received' => $validated['quantity']]);


        // update summary closing if available.
        $summaryData = [
            'stock_id' => $id,
            'new_stock' => $validated['quantity'],
            'summary_date' => Date::today(),
        ];

        Summary::changeStock($summaryData);


        return redirect()->route('stock.index')->with('success', 'Stock quantity updated successfully.');

        // update summary.
    }

    public function undo($id)
    {
        $stock = Stock::withTrashed()->findOrFail($id);
        $stock->restore();

        return redirect()->route('stock.index')->with('success', 'Stock restored Successfully.');
    }

    public function destroy($id)
    {
        $stock = Stock::findOrFail($id);
        $stock->delete();

        return redirect()->route('stock.index')->with('success', 'Stock Deleted Successfully.')->with('undo_id', $id);
    }
}
