<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Machine extends Model
{
    public function recycling()
    {
        return $this->hasMany(Recycling::class, 'machine_id');
    }
}
