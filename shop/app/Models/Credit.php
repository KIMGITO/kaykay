<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Credit extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'sale_id',
        'amount',
        'due_date',
        'is_paid',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'due_date' => 'datetime',
        'is_paid' => 'boolean',
    ];

    /**
     * Get the sale that owns the credit.
     */
    public function sale()
    {
        return $this->belongsTo(Sale::class);
    }
    /**
     * Scope for unpaid credits.
     */
    public function scopeUnpaid($query)
    {
        return $query->where('is_paid', false);
    }
    /**
     * Scope for paid credits.
     */
    public function scopePaid($query)   
    {
        return $query->where('is_paid', true);
    }
    
    
}
