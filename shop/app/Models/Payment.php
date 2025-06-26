<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'sale_id',
        'credit_id',
        'amount_paid',
        'balance',
        'method',
        'reference',
        'payment_date'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'payment_date' => 'datetime',
    ];

    /**
     * Get the sale that owns the payment.
     */
    public function sale()
    {
        return $this->belongsTo(Sale::class);
    }

    public function credit()
    {
        return $this->belongsTo(Credit::class);
    }

    /**
     * Scope for cash payments.
     */
    public function scopeCash($query)
    {
        return $query->where('method', 'cash');
    }

    /**
     * Scope for M-Pesa payments.
     */
    public function scopeMpesa($query)
    {
        return $query->where('method', 'mpesa');
    }

    /**
     * Get the payment method name formatted.
     */
    public function getFormattedMethodAttribute()
    {
        return match ($this->method) {
            'cash' => 'Cash',
            'mpesa' => 'M-Pesa',
            'credit' => 'Credit',
            default => ucfirst($this->method),
        };
    }

   
    /**
     * Update is_paid after debt clears
     */

    protected static function booted()
    {
        static::created(function ($payment) {



            
            if ($payment->credit) {
                // dd($payment);
                $payment->credit->update(['is_paid' => true, 'balance' => 0, 'due_date'=>null]);
                $payment->sale->update(['payment_status' => 'paid']);
            }
        });
    }
}
