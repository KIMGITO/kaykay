<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DailySummary extends Model
{
    protected $fillable = [
        'date',
        'product_id',
        'opening_stock',
        'stock_in',
        'stock_out',
        'closing_stock',
        'cash_sales',
        'till_sales',
        'credit_sales'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
