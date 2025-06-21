<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'customer_id',

        'order_date',

        'total_amount',
        'status',
    ];
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

//product relationship
    public function products()
    {
        return $this->belongsToMany(Product::class)->withPivot('quantity', 'price');
    }
    public function getStatusAttribute($value)
    {
        return $value ? 'Completed' : 'Pending';
    }
    public function setStatusAttribute($value)
    {
        $this->attributes['status'] = $value === 'Completed' ? 1 : 0;
    }
    

    protected $casts = [
        'order_date' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
