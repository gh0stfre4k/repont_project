<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Recycling;

class MachineController extends Controller
{
    public function index()
    {
        $machines = Recycling::select('machine')
            ->distinct()
            ->orderBy('machine')
            ->pluck('machine');

        return response()->json($machines);
    }
}
