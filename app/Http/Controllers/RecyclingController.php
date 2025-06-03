<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Recycling;

class RecyclingController extends Controller
{
    public function filter(Request $request)
    {

        $from = $request->query('from', '2025-01-01');
        $to = $request->query('to', '2025-08-01');
        $machine = $request->query('machine');
        $productId = $request->query('product_id');

        $query = Recycling::with('product');
        $query->whereBetween('event_date', [$from, $to]);

        if ($machine && $machine !== 'all') {
            $query->where('machine', $machine);
        }

        if ($productId) {
            $query->where('product', $productId);
        }
        
        $events = $query->limit(500)->get();

        return response()->json($events);
    }
}
