<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Date;

class Sale extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'code',
        'stock_id',
        'customer_id',
        'quantity',
        'price',
        'payment_status',
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
    public function stock(): BelongsTo
    {
        return $this->belongsTo(Stock::class);
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

    /**
     * Get the credit associated with the sale.
     */

    public function credit()
    {
        return $this->hasOne(Credit::class);
    }

    /**
     * Get the stocks associated with the sale.
     */
    public function stocks()
    {
        return $this->belongsToMany(Stock::class, 'sale_stock')
            ->withPivot('quantity')
            ->withTimestamps();
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

        // record stock sold
        // $this->stocks()->create([
        //     'quantity' => $this->quantity,
        //     'stock_id' => $data['stock_id'],
        // ]);
        
    }

    /**
     * record Credit
     */
    public function recodCredit($data){
        return $this->credit()->create([
            'balance' => $data['balance'],
            'amount_paid'=> $data['amount_paid'],
            'due_date' => $data['due_date'],
            'is_paid' => $data['is_paid'] ?? false,
            
        ]);
    }



    protected static function booted()
    {
        static::created(function ($sale) {

            // dd($sale->quantity);
        });
    }

    
    
}
