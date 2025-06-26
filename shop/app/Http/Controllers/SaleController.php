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
use App\Models\Summary;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Str;

class SaleController extends Controller
{

    public function index()
    {
        $sales = Sale::with(['stock.product', 'customer', 'credit'])->latest()->get();

        return Inertia::render('Sales/Index', ['sales' => $sales]);
    }

    public function create()
    {

        $stocks = Stock::with('product')->where('quantity_available', '>', 0)->get();

        // dd($stocks);
        $customers = Customer::select(['id', 'name'])
            ->orderBy('name')
            ->get();
        return Inertia::render('Sales/Add', ['stocks' => $stocks, 'customers' => $customers]);
    }


    public function store(Request $request)
    {

        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'stock_code' => 'nullable|string|max:50',
            'customer_id' => 'nullable|exists:customers,id',
            'sale_quantity' => 'required|min:0.1',
            'payment_method' => 'required|string|in:credit,mpesa,cash',
            'sale_date' => 'required|date',
            'payment_status' => 'required|string|in:paid,unpaid,partial',
            'amount_paid' => 'required|numeric|min:0',
        ], [
            'product_id.required' => 'Product must be selected.',
            'sale_quantity.min' => 'Quantity should not be Zero '
        ]);



        //check for invalid payment method

        if ($validated['payment_method'] == 'credit' && $validated['amount_paid'] > 0) {
            return redirect()->back()->withErrors(['payment_method' => 'Invalid payment method']);
        } elseif ($validated['payment_method'] !== 'credit' && $validated['amount_paid'] <= 0) {
            $validated['payment_method'] = 'credit';
        }
        // set credit if amount paid 0
        if ($validated['amount_paid'] == 0) {
            $validated['payment_status'] = 'unpaid';
            $validated['payment_method'] = 'credit';
        }



        //map to attributes
        $attributes['stock_id'] = $request['stock_id'];
        $attributes['customer_id'] = $validated['customer_id'];
        $attributes['quantity'] = $validated['sale_quantity'];
        $attributes['price'] = $request['total_price'];
        $attributes['payment_status'] = $validated['payment_status'];
        $attributes['date'] = $validated['sale_date'];

        // Handle walk-in customers (when customer_id is null)
        $customerId = $validated['customer_id'] ?? null;


        if ($validated['sale_quantity'] > $request['stock_available']) {
            redirect()->back()
                ->withErrors(['sale_quantity' => 'Insufficient stock for the selected product. Available ' . $validated['stock_available']])
                ->withInput();
        }

        $init = ($attributes['payment_status'] === 'partial') ? $init = 'PAR' : substr($validated['payment_method'], 0, 3);



        $date = Date::now()->format('mdH');
        $code = 'KAY' . Str::upper($init) . $date . Str::upper(Str::random(3));

        // update unique sale code
        $attributes['code'] = $code;

        // Create the sale
        $sale = Sale::create($attributes);




        if ($sale) {
            Summary::updateSummary([

                'opening_stock' => $request["stock_available"],
                'stock_out' => $attributes["quantity"],
                'stock_id' => $request["stock_id"],
                'summary_date' => Date::today()
            ]);
        }



        /**
         * Record the payment if the sale is not unpaid or if the method is not credit.
         */
        if ($validated['payment_status'] !== 'unpaid' && $validated['payment_method'] !== 'credit') {

            $sale->recordPayment([
                'amount_paid' => $validated['amount_paid'],
                'balance' => $request['payment_balance'],
                'method' => $request['payment_method'],
                'reference' => $request->input('reference', null),
                'notes' => $request->input('notes', null),
                'payment_date' => $validated['sale_date'],
            ]);
        }


        //record credit if unpaid or partial
        if ($validated['payment_status'] === 'unpaid' || $validated['payment_status'] === 'partial') {
            $due_date = Carbon::parse($validated['sale_date'])->addDays(2);

            $sale->recodCredit([
                'amount_paid' => $validated['amount_paid'],
                'balance' => $request['payment_balance'],
                'due_date' => $due_date,
                'is_paid' => false,
            ]);
        }


        // Update stock 
        Stock::UpdateStock($validated['sale_quantity'], $request['stock_id']);

        //update summary 




        // Generate receipt if paid
        if ($validated['payment_status']  !== 'unpaid') {
            $this->generateReceipt($sale);
        }


        return redirect()->route('sale.index')
            ->with('success', 'Sale recorded successfully!');
    }

    public function show($id)
    {
        $sale = Sale::with(['stock.product', 'customer', 'payments', 'credit'])->findOrFail($id);

        return Inertia::render('Sales/Show', ['sale' => $sale]);
    }

    private function generateReceipt(Sale $sale)
    {
        // Your receipt generation logic here
        // Example: PDF generation, database record, etc.
    }
}
