<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function recycling()
    {
        return $this->hasMany(Recycling::class, 'product'); 
    }
}
