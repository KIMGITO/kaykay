<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Stock;
use App\Models\Product;
use App\Models\DailySummary;
use Illuminate\Http\Request;
use App\Models\StockMovement;

class DailySummaryController extends Controller
{
    public function generate($date)
    {
        $products = Product::all();

        foreach ($products as $product) {
            $opening = StockMovement::where('product_id', $product->id)
                ->where('date', '<', $date)
                ->orderBy('date', 'desc')
                ->value('closing_stock') ?? 0;

            $stockIn = Stock::where('product_id', $product->id)
                ->where('date', $date)
                ->sum('quantity_received');

            $stockOut = Sale::where('product_id', $product->id)
                ->where('date', $date)
                ->sum('milk_quantity');

            $closing = $opening + $stockIn - $stockOut;

            $cashSales = Sale::where('product_id', $product->id)->where('method', 'cash')->where('date', $date)->sum('total');
            $tillSales = Sale::where('product_id', $product->id)->where('method', 'till')->where('date', $date)->sum('total');
            $creditSales = Sale::where('product_id', $product->id)->where('method', 'credit')->where('date', $date)->sum('total');

            DailySummary::updateOrCreate(
                ['product_id' => $product->id, 'date' => $date],
                compact('opening', 'stockIn', 'stockOut', 'closing', 'cashSales', 'tillSales', 'creditSales')
            );
        }

        return response()->json(['message' => 'Summaries updated']);
    }
}
