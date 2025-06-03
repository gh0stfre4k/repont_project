<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Recycling extends Model
{
    use HasFactory;
    public function product()
    {
        return $this->belongsTo(Product::class, 'product', 'id');
    }
    // public function product()
    // {
    //     return $this->belongsTo(Product::class, 'product'); 
    // }

    public function machine()
    {
        return $this->belongsTo(Machine::class, 'machine_id');
    }
}
