<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Bottle;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    public function store($request){ {
            $request->validate([
                'product_id' => 'required|exists:products,id',
                'milk_quantity' => 'required|numeric|min:0',
                'milk_price' => 'required|numeric|min:0',
                'method' => 'required|string',
                'date' => 'required|date',
                'bottles' => 'nullable|array', // format: [bottle_id => quantity]
            ]);

            $total = $request->milk_quantity * $request->milk_price;
            $bottleTotal = 0;

            $sale = Sale::create([
                'product_id' => $request->product_id,
                'milk_quantity' => $request->milk_quantity,
                'milk_price' => $request->milk_price,
                'method' => $request->method,
                'date' => $request->date,
                'is_paid' => $request->method != 'credit',
                'bottle_total' => 0,
                'total' => 0,
            ]);

            if ($request->has('bottles')) {
                foreach ($request->bottles as $bottleId => $qty) {
                    $bottle = Bottle::find($bottleId);
                    $lineTotal = $bottle->price * $qty;
                    $bottleTotal += $lineTotal;

                    $sale->bottles()->attach($bottleId, ['quantity' => $qty]);
                }
            }

            $sale->update([
                'bottle_total' => $bottleTotal,
                'total' => $total + $bottleTotal,
            ]);

            return response()->json(['message' => 'Sale recorded successfully', 'sale' => $sale]);
        }
    }
}
