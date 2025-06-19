<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'sale_id' => 'required|exists:sales,id',
            'amount_paid' => 'required|numeric|min:0.01',
            'method' => 'required|string',
            'date' => 'required|date',
        ]);

        $payment = Payment::create($request->only('sale_id', 'amount_paid', 'method', 'date'));

        $sale = Sale::find($request->sale_id);
        $totalPaid = $sale->payments()->sum('amount_paid');

        if ($totalPaid >= $sale->total) {
            $sale->update(['is_paid' => true]);
        }

        return response()->json(['message' => 'Payment recorded', 'payment' => $payment]);
    }
}
