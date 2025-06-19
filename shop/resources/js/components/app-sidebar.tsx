'use client';

import { ArrowLeftRightIcon, AudioWaveform, Blocks, BookOpen, Bot, Cog, Command, DollarSignIcon, Euro, Frame, GalleryVerticalEnd, LayoutDashboardIcon, LayoutGrid, Map, Milk, PieChart, PillBottle, Settings2, SquareTerminal, Users, UsersRound, Wallet } from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
// import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';

// This is sample data.
const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    teams: [
        {
            name: 'Acme Inc',
            logo: GalleryVerticalEnd,
            plan: 'Enterprise',
        },
        {
            name: 'Acme Corp.',
            logo: AudioWaveform,
            plan: 'Startup',
        },
        {
            name: 'Evil Corp.',
            logo: Command,
            plan: 'Free',
        },
    ],
    navMain: [
        {
            title: 'Main',
            url: '#',
            icon: LayoutGrid,
            items: [
                {
                    title: 'Dashboard',
                    url: '/dashboard',
                    icon: LayoutDashboardIcon,
                },
                {
                    title: 'Sales',
                    url: '/sales',
                    icon: DollarSignIcon,
                },
                {
                    title: 'Stock Movements',
                    url: '/stock-movements',
                    icon: ArrowLeftRightIcon,
                },
                {
                    title: 'Daily Summary',
                    url: '/summaries',
                    icon: BookOpen,
                },
            ],
        },
        {
            title: 'Inventory',
            url: '#',
            icon: Milk,
            items: [
                {
                    title: 'Products',
                    url: '/product',
                    icon: Milk,
                },
                {
                    title: 'Stocks',
                    url: '/stocks',
                    icon: Blocks,
                },
                {
                    title: 'Bottles',
                    url: '/bottles',
                    icon: PillBottle,
                },
            ],
        },
        {
            title: 'People & Payments',
            url: '#',
            icon: Users,
            items: [
                {
                    title: 'Customers',
                    url: '/customers',
                    icon: UsersRound,
                },
                {
                    title: 'Payments',
                    url: '/payments',
                    icon: Euro
                },
                {
                    title: 'Expenses',
                    url: '/expenses',
                    icon: Wallet,
                },
            ],
        },
        {
            title: 'System',
            url: '#',
            icon: Settings2,
            items: [
                {
                    title: 'Settings',
                    url: '/settings',
                    icon: Cog,
                },
            ],
        },
    ],

    projects: [
        {
            name: 'Design Engineering',
            url: '#',
            icon: Frame,
        },
        {
            name: 'Sales & Marketing',
            url: '#',
            icon: PieChart,
        },
        {
            name: 'Travel',
            url: '#',
            icon: Map,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/* <NavProjects projects={data.projects} /> */}
            </SidebarContent>
            <SidebarFooter>
                {/* <NavUser user={data.user} /> */}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
