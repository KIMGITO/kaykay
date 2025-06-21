<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Stock;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockController extends Controller
{
    public function index()
    {
        $stock = Stock::with('product')->get();
        return Inertia::render('Stock/Index', ['stocks' => $stock]);
    }

    public function create (){
        $products = Product::latest()->get();

        return Inertia::render('Stock/Add', ['products' => $products]);
    }
    public function store(Request $request)
    {
        
        
       $validated =  $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity_received' => 'required|numeric|min:0.1',
            'date' => 'required|date',
            'source' => 'nullable|string',
        ]);

        $validated['quantity_available'] = $validated['quantity_received'];

       

        $stock = Stock::create($validated);

        return redirect()->route('stock.index')->with(['success' => 'Stock Created Successfully.']);

    }

    public function edit($id)
    {
        $stock = Stock::findOrFail($id);
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

        return to_route('stocks.index')->with('success', 'Stock updated successfully.');
    }

    public function undo($id){
        $stock = Stock::withTrashed()->findOrFail($id);
        $stock->restore();

        return redirect()->route('stock.index')->with('success', 'Stock restored Successfully.');
    }

    public function destroy($id){
        $stock = Stock::findOrFail($id);
        $stock->delete();

        return redirect()->route('stock.index')->with('success', 'Stock Deleted Successfully.')->with('undo_id',$id);
    }
}
