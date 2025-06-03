<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Recycling;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function leaderboard(Request $request)
    {
        $leaderboard = DB::table('recyclings')
            ->join('products', 'recyclings.product', '=', 'products.id')
            ->select(
                'recyclings.product as product_id',
                'products.product_name',
                'products.type_number',
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('recyclings.product', 'products.product_name', 'products.type_number')
            ->orderByDesc('count')
            ->limit(10)
            ->get();

        return response()->json($leaderboard);
    }
    
    public function index()
    {
        $products = Product::orderBy('product_name')->get();

        return response()->json($products);
    }

}
