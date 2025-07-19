/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import DashboardBottom from './bottomSection';
import DashboardHeader from './header';
import DashboardMain from './mainContent';
import DashboardQuickActions from './quickActions';
import DashboardStatusCards from './statusCards';

const breadcrumb = [
    {
        title: 'HOME',
        href: '/dashboard',
    },
];

export default function MilkBarDashboard() {
    const {
        totalCustomers,
        todaySales,
        dailyTarget,
        monthlyTarget,
        monthlySales,
        newCustomers,
        pendingOrders,
        recentOrders,
        totalDebts,
        debtors,
        targetAchievement,
        targetCustomers,
        weeklySalesData,
    } = usePage().props as unknown as {
        totalCustomers: number;
        todaySales: number;
        dailyTarget: number;
        monthlyTarget: number;
        monthlySales: number;
        newCustomers: number;
        pendingOrders: number;
        recentOrders: number;
        totalDebts: number;
        debtors: number;
        targetAchievement: number;
            targetCustomers: number;
            weeklySalesData: [];
    };

    const summary = {
        totalCustomers: totalCustomers,
        todaySales: todaySales,
        dailyTarget: dailyTarget,
        monthlyTarget: monthlyTarget,
        monthlySales: monthlySales,
        newCustomers: newCustomers,
        pendingOrders: pendingOrders,
        recentOrders: recentOrders,
        totalDebts: totalDebts,
        debtors: debtors,
        targetAchievement: targetAchievement,
        targetCustomers: targetCustomers,
        weeklySalesData: weeklySalesData,
    };

    console.log(summary.totalCustomers);

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <div className="flex flex-col">
                <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
                    {/* Header with improved actions */}
                    <DashboardHeader />

                    {/* Quick Actions - Improved with colors */}

                    <DashboardQuickActions />
                    {/* Stats Cards - More compact and informative */}
                    <DashboardStatusCards data={summary} />

                    {/* Main Content - More compact layout */}
                    <DashboardMain data={weeklySalesData} />

                    {/* Bottom Section - More compact tables */}
                    <DashboardBottom />
                </div>
            </div>
        </AppLayout>
    );
}
