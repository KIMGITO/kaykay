import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";

export default function DashboardHeader() {
    return (
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center sm:space-y-0">
            <div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">KayKay's Dashboard</h2>
                <p className="text-muted-foreground">
                    Today is on {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </div>
            <div className="w-full overflow-hidden md:w-1/2">
                <div className="animate-marquee whitespace-nowrap">
                    <span className="mx-8 font-medium">New order #1234 - 2 lattes, 1 cappuccino</span>
                    <span className="mx-8 font-medium">Reminder: Inventory check at 3 PM</span>
                    <span className="mx-8 font-medium">Order #1235 ready for pickup</span>
                    <span className="mx-8 font-medium">Reminder: Milk delivery expected at 4 PM</span>
                </div>
            </div>
            <div className="flex items-center justify-between gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>PDF</DropdownMenuItem>
                        <DropdownMenuItem>CSV</DropdownMenuItem>
                        <DropdownMenuItem>Excel</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                
            </div>
        </div>
    );
}