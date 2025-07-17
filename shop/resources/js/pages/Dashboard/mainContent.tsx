import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Filter } from 'lucide-react';
import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { debtors, inventoryStatus, monthlyTrendData, popularItems, weeklySalesData } from './data';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { en } from 'zod/v4/locales';

export default function DashboardMain() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [timeRange, setTimeRange] = useState<string>('week');
    // const [activeTab, setActiveTab] = useState<string>('sales');

    // const CustomTooltip = ({ active, payload, label }: any) => {
    //     if (active && payload && payload.length) {
    //         return (
    //             <div className="rounded-lg border bg-background p-4 shadow-sm">
    //                 <p className="font-medium">{label}</p>
    //                 {payload.map((entry: any, index: number) => (
    //                     <p key={index} className="flex items-center" style={{ color: entry.color }}>
    //                         <span className="mr-2 h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
    //                         {entry.name}: <span className="ml-1 font-semibold">Ksh {entry.value.toLocaleString()}</span>
    //                     </p>
    //                 ))}
    //             </div>
    //         );
    //     }
    //     return null;
    // };

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Left Column */}
            <div className="col-span-1 space-y-4 lg:col-span-2">
                {/* Sales Trend Chart with time range selector */}
                <Card className="transition-shadow hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                        <div>
                            <CardTitle className="text-lg">Sales & Profit Trend</CardTitle>
                            <CardDescription>Monthly performance overview</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Select value={timeRange} onValueChange={setTimeRange}>
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Time Range" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="week">Weekly</SelectItem>
                                    <SelectItem value="month">Monthly</SelectItem>
                                    <SelectItem value="year">Yearly</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="sm">
                                <Filter className="mr-2 h-4 w-4" />
                                Filter
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="h-64 p-4 pt-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={weeklySalesData}>
                                <CartesianGrid strokeDasharray="2" vertical={false} stroke="#4a5565" />
                                <XAxis dataKey="day" tickLine={true} axisLine={false} tickMargin={5} tick={{ fontSize: 12 }} />
                                <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `Ksh ${v / 1000}`} tick={{ fontSize: 12 }} />
                                <Tooltip
                                    content={({ active, payload, label }) =>
                                        active && payload?.length ? (
                                            <div className="rounded-md border bg-secondary/90 p-1 text-xm shadow-2xl">
                                                <p className="text-xs ">{label}</p>
                                                {payload
                                                    .slice() // clone array to avoid mutating original
                                                    .sort((a, b) => b.value - a.value) // sort descending
                                                    .map((entry, i) => (
                                                        <p key={i} className={`${entry.name=='cakes'?'text-green-600' : entry.name == 'milk' ? 'text-red-600' : entry.name == 'mala' ? 'text-blue-600' :entry.name == 'eggs' ? 'text-pink-600' : ''}`}>
                                                            {entry.name}: <span className={`text-xs text-white`}>Ksh{entry.value}</span>
                                                        </p>
                                                    ))}
                                            </div>
                                        ) : null
                                    }
                                />
                                <Area type="monotone" dataKey="mala" stroke="#155dfc" fill="#155dfc" fillOpacity={0.18} strokeWidth={1} />
                                <Area type="monotone" dataKey="milk" stroke="#fb2c36" fill="#fb2c36" fillOpacity={0.24} strokeWidth={1} />
                                <Area type="monotone" dataKey="cakes" stroke="#05df72" fill="#05df72" fillOpacity={0.24} strokeWidth={1} />
                                <Area type="monotone" dataKey="eggs" stroke="#fb64b6" fill="#fb64b6" fillOpacity={0.24} strokeWidth={1} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>

                    <CardFooter className="flex items-center justify-between p-4 pt-0 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-400"></div>
                            <span>Cakes</span>
                            <div className="ml-4 h-2 w-2 rounded-full bg-red-500"></div>
                            <span>Milk</span>
                            <div className="ml-4 h-2 w-2 rounded-full bg-blue-500"></div>
                            <span>Mala</span>
                            <div className="ml-4 h-2 w-2 rounded-full bg-pink-500"></div>
                            <span>Eggs</span>
                        </div>
                        <span className="font-medium">+18% vs last year</span>
                    </CardFooter>
                </Card>

                {/* Combined Product Performance and Inventory Status */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Product Performance - Compact */}
                    <Card className="transition-shadow hover:shadow-md">
                        <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-lg">Top Products</CardTitle>
                            <CardDescription>By revenue this week</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="h-8 pl-4">Product</TableHead>
                                        <TableHead className="h-8 text-right">Revenue</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {popularItems.map((item) => (
                                        <TableRow key={item.id} className="h-10 hover:bg-muted/50">
                                            <TableCell className="pl-4">
                                                <div className="text-sm font-medium">{item.name}</div>
                                                <div className="text-xs text-muted-foreground">{item.sales} sold</div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="font-medium">Ksh {item.revenue.toLocaleString()}</div>
                                                <div className="text-xs text-muted-foreground">{item.profitMargin}% margin</div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Inventory Status - Compact */}
                    <Card className="transition-shadow hover:shadow-md">
                        <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-lg">Inventory Alerts</CardTitle>
                            <CardDescription>Items needing attention</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 p-4">
                            {inventoryStatus
                                .filter((i) => i.status !== 'good')
                                .map((item) => {
                                    const statusColor = {
                                        good: 'bg-green-500',
                                        warning: 'bg-yellow-500',
                                        critical: 'bg-red-500',
                                    }[item.status];

                                    return (
                                        <div key={item.id} className="space-y-1">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="font-medium">{item.item}</span>
                                                <span
                                                    className={`font-semibold ${statusColor === 'bg-red-500' ? 'text-red-600' : 'text-yellow-600'}`}
                                                >
                                                    {item.stock} {item.unit}
                                                </span>
                                            </div>
                                            <Progress value={item.stock} className="h-1" color={statusColor} />
                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                <span>Last restock: {item.lastRestock}</span>
                                                <span>{item.supplier}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Right Column */}
            <div className="space-y-1">
                {/* Compact Calendar with Events */}
                <Card className="transition-shadow hover:shadow-md">
                    <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-lg">Today's Schedule</CardTitle>
                        <CardDescription>Upcoming tasks and events</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center p-2">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                            classNames={{
                                day: ' px-1 text-xs',
                                head_cell: 'text-xs',
                                cell: 'px-1',
                                nav_button: 'h-6 w-6',
                            }}
                        />
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                        <div className="w-full space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                <div>
                                    <p className="font-medium">Milk delivery</p>
                                    <p className="text-xs text-muted-foreground">9:00 AM - Supplier: MilkCo</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <div>
                                    <p className="font-medium">Staff meeting</p>
                                    <p className="text-xs text-muted-foreground">3:00 PM - All employees</p>
                                </div>
                            </div>
                        </div>
                    </CardFooter>
                </Card>

                {/* Debtors List - More compact */}
                <Card className="mt-4 py-5 transition-shadow hover:shadow-md">
                    <CardHeader className="p-4 pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg">Top Debtors</CardTitle>
                                <CardDescription>Customers with outstanding balances</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" className="text-primary">
                                View All
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="h-8 pl-4">Customer</TableHead>
                                    <TableHead className="h-8 text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {debtors.slice(0, 3).map((debtor) => (
                                    <TableRow key={debtor.id} className="h-10 hover:bg-muted/50">
                                        <TableCell className="pl-4">
                                            <div className="flex items-center">
                                                <Avatar className="mr-2 h-6 w-6">
                                                    <AvatarFallback className="bg-primary/10 text-xs text-primary">
                                                        {debtor.name
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="text-sm font-medium">{debtor.name}</div>
                                                    <div className="text-xs text-muted-foreground">{debtor.phone}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="font-medium">Ksh {debtor.amount.toLocaleString()}</div>
                                            <div className="text-xs text-muted-foreground">{debtor.since}</div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
