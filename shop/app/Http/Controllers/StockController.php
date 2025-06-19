<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use Illuminate\Http\Request;

class StockController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity_received' => 'required|numeric|min:0.1',
            'date' => 'required|date',
            'source' => 'nullable|string',
        ]);

        $stock = Stock::create($request->all());

        return response()->json(['message' => 'Stock added', 'stock' => $stock]);
    }
}
