import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { formatCurrency } from '@/helper/formatCurrency';
import { formatDate } from '@/helper/formatDate';
import formatNumber from '@/helper/formatNumber';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import { Head, Link } from '@inertiajs/react';
import { Printer } from 'lucide-react';
import { uuid } from 'node_modules/zod/dist/types/v4/core/regexes';

export interface Product {
    id: number;
    name: string;
    unit: string;
    price_per_unit: string;
    is_active: number;
    is_updaterble: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}
// interface User {
//     name: string;
// }
export interface Payment {
    amount_paid: number;
    method: 'mpesa | cash';
    date: string;
    // user: User;
}

export interface Stock {
    id: number;
    code: string;
    date: string;
    quantity_received: string;
    quantity_available: string;
    product_id: number;
    product: Product;
    source: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface Customer {
    id: number;
    first_name: string;
    last_name: string;
}

export interface SaleStock {
    id: number;
    sale_id: number;
    stock_id: number;
    quantity: number;
    subtotal: number;
    stock: Stock;
    created_at: string;
    updated_at: string;
}

export interface Sale {
    id: number;
    uuid: string;
    invoice_number: string;
    customer_id: number | null;
    date: string;
    created_by: number;
    created_at: string;
    updated_at: string;
    payment_status: 'paid' | 'unpaid' | 'partial';
    total: number;
    balance: number;
    customer: Customer | null;
    sale_stock: SaleStock[];
    payment: Payment[] | null;
}

interface SalesProp {
    sale: Sale;
}



export default function Info({ sale }: SalesProp) {
    console.log(sale);
    const { date, name, item, qty, cost, amount, code, paid, paymentsData } = {
        code: sale.code,
        date: formatDate(sale.created_at),
        payment_date: sale.payment,
        last_name: sale.customer?.last_name,
        first_name: sale.customer?.first_name ?? 'Walk - In',
        item: sale.stock?.product.name,
        qty: `${formatNumber(sale.quantity)} ${sale.stock?.product.unit}`,
        cost: sale.stock?.product.price_per_unit,
        amount: sale.price,
        paid: sale.credit?.is_paid ?? true,
        paymentsData: sale.payments,
    };

  
    const breadcrumb = [
    {
        title: 'Sales',
        href: '/sale',
    },
    {
        
        title: sale.invoice_number,
        href: '',
    }
    ];
    

    const handlePrint = (uuid: string) => {
         window.location.href = `/invoice/${uuid}`;
    }

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Sale Information" />
            <div className="justify-center">
                <AuthLayout description="Sale" title="Sales Transaction Info">
                    <Card className={`px-3 py-9 ${paid ? 'bg-green-100/20' : 'bg-red-100/20'} shadow-2xl shadow-emerald-950`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <CardTitle>Date:</CardTitle>
                                <CardDescription className="px-2"> {formatDate(new Date().toString())} </CardDescription>
                            </div>
                            <div className="flex items-center rounded bg-green-200 px-0.5">
                                <CardDescription className="text-xs text-green-800">{sale.invoice_number}</CardDescription>
                            </div>
                        </div>
                        <div className="flex items-center justify-around">
                            <div className="flex items-center">
                                <CardTitle className="ms-5">{sale.customer?.name.toUpperCase()}</CardTitle>
                            </div>
                            <div className="flex items-center">
                                <CardTitle
                                    className={`ms-5 ${sale.payment_status == 'paid' ? 'text-green-500' : sale.payment_status == 'partial' ? 'text-amber-500' : 'text-red-500'}`}
                                >
                                    {'Amount : '}
                                    {formatCurrency(sale.total)}
                                </CardTitle>
                            </div>
                        </div>
                        <div className="flex justify-between text-xs">
                            <div className="grid w-1/2 text-xs">
                                <span className="text-sm">Sale products</span>
                                {sale.sale_stock.map((prod, index) => (
                                    <div className="flex gap-1 font-bold text-green-400">
                                        <span>{index + 1}</span>
                                        <span>{prod.stock.product.name}</span>
                                        <span>
                                            {prod.quantity} {prod.stock.product.unit}
                                        </span>
                                        <span> {`@ ${formatNumber(prod.stock.product.price_per_unit || '')}`}</span>
                                        <span>{prod.subtotal} ksh</span>
                                    </div>
                                ))}

                                <div className="h-full">
                                    <AppLogo />
                                </div>
                            </div>

                            <div className="max-h-[50vh] w-1/2 min-w-[300px] pe-2">
                                {' '}
                                {/* Fixed container dimensions */}
                                {sale.payment ? (
                                    <ScrollArea className="h-full rounded-md">
                                        {' '}
                                        {/* Full height within container */}
                                        <div className="space-y-2 p-2">
                                            {' '}
                                            {/* Added spacing between items */}
                                            {sale.payment.map((payment, index) => (
                                                <div
                                                    key={index}
                                                    className={`${
                                                        payment.method.toString() == 'cash'
                                                            ? 'bg-amber-900 text-amber-100'
                                                            : 'bg-green-900 text-green-100'
                                                    } rounded-lg p-2 shadow-sm`}
                                                >
                                                    <div className="flex justify-between">
                                                        <span className="text-xs">{formatDate(payment?.date)}</span>
                                                        <span className="font-medium capitalize">{payment?.method}</span>
                                                    </div>

                                                    <div className="mt-1 flex items-center justify-between">
                                                        <span className="text-sm font-semibold">Paid</span>
                                                        <span className="font-mono">
                                                            {formatNumber(payment?.amount_paid)}
                                                            <span className="ml-1 text-xs">Ksh</span>
                                                        </span>
                                                    </div>

                                                    <div className="mt-1 flex items-center justify-between">
                                                        <span className="text-sm font-semibold">Balance</span>
                                                        <span className="font-mono">
                                                            {formatNumber(sale.balance)}
                                                            <span className="ml-1 text-xs">Ksh</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <ScrollBar orientation="vertical" />
                                    </ScrollArea>
                                ) : (
                                    <div className="flex h-full items-center justify-center text-muted-foreground">
                                        <span>No payments made yet</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <CardFooter></CardFooter>
                    </Card>
                    <div className="min-w-full items-center">
                        <div className="flex w-full justify-between">
                            <Link href={route('sale.index')}>
                                <Button variant={'outline'}>
                                    {/* <ArrowBigLeft className="text-red-300" /> */}
                                    <span className="md:flex">Back</span>
                                </Button>
                            </Link>
                            <Button variant={'outline'} onClick={()=>handlePrint(sale.uuid)}>
                                {/* <ArrowBigLeft className="text-red-300" /> */}
                                <span className="md:flex"><Printer/></span>
                            </Button>
                        </div>
                    </div>
                </AuthLayout>
            </div>
        </AppLayout>
    );
}
