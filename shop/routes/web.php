<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('product', ProductController::class); // CRUD
    Route::patch('/product/{product}/toggle', [ProductController::class, 'toggle'])->name('product.toggle');
    Route::patch('/product/{id}/undo', [ProductController::class, 'undo'])->name('product.undo');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
