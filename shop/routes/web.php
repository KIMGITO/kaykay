<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\StockController;
use App\Models\Stock;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::get('dashboard', function () {
    //     return Inertia::render('dashboard');
    // })->name('dashboard');

    Route::get('dashboard', [ProductController::class, 'index'])->name('dashboard');

    Route::resource('product', ProductController::class); // CRUD
    Route::patch('/product/{product}/toggle', [ProductController::class, 'toggle'])->name('product.toggle');
    Route::patch('/product/{id}/undo', [ProductController::class, 'undo'])->name('product.undo');

    Route::resource('stock', StockController::class);//CRUD
    Route::patch('/stock/{id}/undo', [StockController::class, 'undo'])->name('stock.undo');

    Route::resource('sale', SaleController::class); //CRUD
    Route::resource('customers', CustomerController::class);//CRUD

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
