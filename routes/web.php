<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;

use App\Http\Controllers\ProductController;
use App\Http\Controllers\RecyclingController;
use App\Http\Controllers\MachineController;

Route::get('/leaderboard', [ProductController::class, 'leaderboard']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/events', [RecyclingController::class, 'filter']);
Route::get('/machines', [MachineController::class, 'index']);

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');

Route::get('/{any}', function () {
    return File::get(public_path('dist/index.html'));
})->where('any', '^(?!api).*$');

Route::get('/ping', function () {
    return response()->json(['status' => 'ok']);
});
