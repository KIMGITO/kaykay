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

        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sale_id')->nullable()->constrained('sales')->cascadeOnDelete();
            $table->foreignId('credit_id')->nullable()->constrained('credits')->cascadeOnDelete();
            $table->decimal('amount_paid', 10, 2);
            $table->decimal('balance', 10, 2);
            $table->enum('method', ['cash', 'mpesa']);
            $table->string('reference')->nullable();
            $table->dateTime('payment_date')->useCurrent();
            $table->timestamps();

            $table->index('sale_id');
            $table->index('method');
            $table->index('payment_date');
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
