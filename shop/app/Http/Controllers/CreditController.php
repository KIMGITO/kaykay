<?php

namespace App\Http\Controllers;

use App\Models\Credit;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Inertia\Inertia;

class CreditController extends Controller
{
    public function index()
    {
        $credits = Credit::with([
            'sale',
            'sale.stock.product',
            'sale.customer',

        ])->orderBy('updated_at', 'desc')->get();

        return Inertia::render('Credits/Index', ['credits' => $credits]);
    }

    public function show($id)
    {
        $credit = Credit::with([
            'sale',
            'sale.stock.product',
            'sale.customer',
            'sale.payments',
        ])->findOrFail($id);

        

        return Inertia::render('Credits/Show',['credit' => $credit]);
    }

    public function clear(Request $request, $id)
    {
    

        $validated = $request->validate([
            'payment_method' => 'required',
        ]);

       
       
        /**
         * @var mixed
         * Clear Debt
         */
        $clear_debt = Payment::create([
            'sale_id' => $request['sale_id'],
            'credit_id' => $id,
            'amount_paid' => $request['amount_paid'],
            'balance' => 0,
            'reference' => null,
            'method' => $validated['payment_method'],
            'payment_date' => Date::now(),

        ]);

        // dd($clear_debt);

        
        

        return back()->with(['success'=> 'Debt cleared.']);
    }

   
}
