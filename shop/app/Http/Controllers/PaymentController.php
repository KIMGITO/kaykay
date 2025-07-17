<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Inertia\Inertia;

class PaymentController extends Controller
{

   
    public function store(Request $request)
    {
        // dd($request);
        $validated = $request->validate([
            'sale_id' => 'required|exists:sales,id',
            'amount_paid' => 'required|numeric|min:0.01',
            'method' => 'required|string',
            'date' => 'nullable|date',
        ]);

        


        $validated['user_id'] = Auth::user()->id;
        $validated['date'] = Date::now();
        $validated['balance'] = $request['new_balance'];

        Payment::create(
            $validated
        );
        // update sale attributes

        $payment_status = $request['new_balance'] == 0 ? 'paid' : 'partial';
        Sale::where('id', $validated['sale_id'])->update(['balance'=> $request['new_balance'],'payment_status' => $payment_status ]);
        return redirect()->route('sale.credits');
    }
     
}
