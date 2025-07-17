<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Inertia\Inertia;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $today  = Carbon::today();
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
            'targetAchievement'=>$targetAchievement,
            'targetCustomers' => $targetCustomers,

        ]);
    }
}
