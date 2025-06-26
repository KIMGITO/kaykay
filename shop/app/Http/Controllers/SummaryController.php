<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Summary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Inertia\Inertia;

class SummaryController extends Controller
{
    public function index()
    {

        $date = Date::today();
        $summaries = Summary::with('stock.product')-> where('summary_date', $date)->get();
        return Inertia::render('Summary/Daily', ['summaries' => $summaries]);
    }
}
