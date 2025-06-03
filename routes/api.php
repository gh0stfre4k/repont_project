<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProductController;
use App\Http\Controllers\RecyclingController;
use App\Http\Controllers\MachineController;

Route::get('/leaderboard', [ProductController::class, 'leaderboard']);
Route::get('/products', [ProductController::class, 'index']);

Route::get('/events', [RecyclingController::class, 'filter']);

Route::get('/machines', [MachineController::class, 'index']);

Route::get('/ping', function () {
    return response()->json(['status' => 'ok']);
});