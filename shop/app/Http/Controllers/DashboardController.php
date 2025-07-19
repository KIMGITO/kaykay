<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Inertia\Inertia;
use App\Models\Stock;
use App\Models\Summary;
use App\Models\Customer;
use App\Models\DailySummary;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $today  = Carbon::now();


        // Get dashboard chart data from database
        $from = Carbon::now()->subDays(7)->startOfDay();  // Include full first day
        $to = Carbon::now()->endOfDay();                  // Include full current day

        // Get summarized data grouped by date
        $dailySummary = Summary::with(['stock.product'])
            ->whereBetween('summary_date', [$from, $to])
            ->orderBy('summary_date')
            ->get()
            ->groupBy(function ($item) {
                return Carbon::parse($item->summary_date)->toDateString();
            });

        $chartDays = collect();
        $currentDay = $from->copy(); // Create a copy to avoid modifying the original

        while ($currentDay <= $to) {
            $chartDays->push($currentDay->toDateString());
            $currentDay->addDay();
        }

       $weeklySalesData = [];

        $stocks = Stock::with(['product'])->get();
      
        foreach ($chartDays as $day) {
            $dayEntry['day'] = Carbon::parse($day)->format('D');
            foreach ($stocks as $stock) {
                $dayEntry[$stock->product->name] = 0;
            }

            if (isset($dailySummary[$day])) {  
                foreach ($dailySummary[$day] as $product) {
                    // $dayEntry[] = $product->stock->product->name; 

                    foreach($stocks as $stock ){
                        if($product->stock_id == $stock->id){
                            $dayEntry[$stock->product->name] = $product->stock_out;
                        }
                        
                    }
                    
                }
            }

           $weeklySalesData[] = $dayEntry; 
        }

        

        $totalCustomers = Customer::count();
        $todaySales = Sale::where('date', $today)->sum('total');
        $dailyTarget = 5000;
        $monthlyTarget = 100000;
        $monthlySales = Sale::whereMonth('date', $today->month)->sum('total');
        $newCustomers = Customer::whereDate('created_at', $today)->count();
        $pendingOrders = 3;
        $recentOrders = 4;
        $totalDebts = Sale::sum('balance');
        $debtors = 9;
        $targetAchievement = Sale::whereMonth('date', $today->month)->sum('total') / $monthlyTarget * 100;
        $targetAchievement = number_format($targetAchievement, 2);
        $targetCustomers = 1000;
        // import { dailyTarget, debtors, monthlySales, monthlyTarget, newCustomers, pendingOrders, recentOrders, targetAchievement, todaySales, totalCustomers, totalDebts } from "./data";


        return Inertia::render('Dashboard/Index', [


            'totalCustomers' => $totalCustomers,
            'todaySales' => $todaySales,
            'dailyTarget' => $dailyTarget,
            'monthlyTarget' => $monthlyTarget,
            'monthlySales' => $monthlySales,
            'newCustomers' => $newCustomers,
            'pendingOrders' => $pendingOrders,
            'recentOrders' => $recentOrders,
            'totalDebts' => $totalDebts,
            'debtors' => $debtors,
            'targetAchievement' => $targetAchievement,
            'targetCustomers' => $targetCustomers,
            'weeklySalesData' =>$weeklySalesData,
        ]);
    }
}
