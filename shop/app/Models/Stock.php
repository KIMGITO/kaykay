<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Stock extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'product_id',
        'quantity_received',
        'quantity_available',
        'code',
        'date',
        'source',
    ];

    protected $casts = [
        'date' => 'date',
        'quantity_received' => 'decimal:2',
    ];

    // Relationships
    public function product()
    {
        return $this->belongsTo(Product::class);
    }


    public function sales()
    {
        return $this->hasMany(Sale::class);
            
    }

    public function scopeUpdateStock($query, $qty, $stock_id ){
        return $query->where('id', $stock_id)->decrement('quantity_available',$qty);

    }


}
