<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id') // singular
                ->nullable()              // required for nullOnDelete
                ->constrained('products') // points to the 'products' table
                ->nullOnDelete();         // sets foreign key to NULL on delete
            $table->decimal('quantity_received', 10, 2);
            $table->date('date');
            $table->string('source')->nullable()->default('4&8 daily farm'); // e.g. "Own Farm"
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
