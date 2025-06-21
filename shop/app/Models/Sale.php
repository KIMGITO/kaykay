<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Sale extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'product_id',
        'customer_id',
        'quantity',
        'price',
        'method',
        'is_paid',
        'date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'quantity' => 'decimal:2',
        'price' => 'decimal:2',
        'is_paid' => 'boolean',
        'date' => 'date',
    ];

    /**
     * Payment methods.
     */
    public const METHODS = [
        'cash' => 'Cash',
        'mpesa' => 'M-Pesa',
        'credit' => 'Credit',
    ];

    /**
     * Get the product associated with the sale.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the customer associated with the sale.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Get formatted payment method.
     */
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function credits()
    {
        return $this->hasMany(Credit::class);
    }

  


    public function latestPayment()
    {
        return $this->hasOne(Payment::class)->latestOfMany();
    }

    public function getTotalPaidAttribute()
    {
        return $this->payments->sum('amount');
    }

    public function getBalanceDueAttribute()
    {
        return max($this->price - $this->total_paid, 0);
    }

    public function getPaymentStatusAttribute()
    {
        if ($this->balance_due <= 0) {
            return 'paid';
        }

        return $this->payments->isEmpty() ? 'unpaid' : 'partial';
    }

    public function recordPayment(array $data)
    {
        
        $payment = $this->payments()->create([

            'amount_paid' => $data['amount_paid'],
            'balance' => $data['balance'],
            'method' => $data['method'],
            'reference' => $data['reference'] ?? null,
            'notes' => $data['notes'] ?? null,
            'payment_date' => $data['payment_date'] ?? now(),
        ]);

        // Update sale status if fully paid
        // if ($this->fresh()->balance_due <= 0) {
        //     $this->update(['method' => true]);
        // }

        return $payment;
    }

    public function recodCredit($data){
        return $this->credits()->create([
            'amount' => $data['amount'],
            'due_date' => $data['due_date'],
            'is_paid' => $data['is_paid'] ?? false,
            'sale_id',
           
        ]);
    }

    // reduce stock
    
}
