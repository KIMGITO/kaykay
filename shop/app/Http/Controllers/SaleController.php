<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Bottle;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Customer;
use App\Models\Payment;
use Illuminate\Support\Facades\DB;
use App\Models\Stock;

class SaleController extends Controller
{

    public function index()
    {

        $sales = Sale::with(['product', 'customer'])->latest()->get();
        return Inertia::render('Sales/Index', ['sales' => $sales]);
    }

    public function create()
    {
        $products = Product::select(['id', 'name', 'price_per_unit', 'unit'])
            ->where('is_active', true)
            ->orderBy('name')
            ->get();
        $customers = Customer::select(['id', 'name'])
            ->orderBy('name')
            ->get();
        return Inertia::render('Sales/Add', ['products' => $products, 'customers' => $customers]);
    }
    public function store(Request $request)
    {

        // dd($request['payment_status']);
        // Validate the request data
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'customer_id' => 'nullable|exists:customers,id',
            'quantity' => 'required|numeric|min:0.01',
            'price' => 'required|numeric|min:0',
            'method' => 'required|in:cash,mpesa,credit',
            'payment_status' => 'required',
            'amount_paid' => 'required',
            'date' => 'required|date',
        ]);

        // Handle walk-in customers (when customer_id is null)
        $customerId = $validated['customer_id'] ?? null;


        $product = Stock::where('product_id', $validated['product_id'])->first();



        if ($product->quantity_available < $validated['quantity']) {
            return redirect()->back()
                ->withErrors(['quantity' => 'Insufficient stock for the selected product. Available ' . $product->quantity_available])
                ->withInput();
        }

        // Create the sale
        $sale = Sale::create([
            'product_id' => $validated['product_id'],
            'customer_id' => $customerId,
            'quantity' => $validated['quantity'],
            'price' => $validated['price'],
            'method' => $validated['method'],
            'payment_status' => $validated['payment_status'],
            'date' => $validated['date'],
        ]);


        $balance = $validated['price'] - $request['amount_paid'];

       

        // Create the payment record
        if ($validated['payment_status'] !== 'unpaid') {
            $sale->recordPayment([
                'amount_paid' => $validated['price'],
                'balance' => $balance,
                'method' => $validated['method'],
                'reference' => $request->input('reference', null),
                'notes' => $request->input('notes', null),
                'payment_date' => $validated['date'],
            ]);
        } 



        // // Update stock 
        Stock::where('product_id', $validated['product_id'])
            ->decrement('quantity_available', $validated['quantity']);

        // Generate receipt if paid
        if ($validated['payment_status']  !== 'unpaid') {
            $this->generateReceipt($sale);
        }


        return redirect()->route('sale.index')
            ->with('success', 'Sale recorded successfully!');
    }

    private function generateReceipt(Sale $sale)
    {
        // Your receipt generation logic here
        // Example: PDF generation, database record, etc.
    }
}
