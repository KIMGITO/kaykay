import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import dateToday from '@/helper/dateToday';
import { formatCurrency } from '@/helper/formatCurrency';
import { formatDate } from '@/helper/formatDate';
import formatNumber from '@/helper/formatNumber';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowBigLeft } from 'lucide-react';

interface Customer {
    name: string;
    phone: string;
    location: string;
}

interface Credit {
    is_paid: boolean;
}

interface Product {
    product_id: number;
    name: string;
    unit: string;
    price_per_unit: string;
}
interface Stock{
    id: number;
    product: Product
}

interface Payment {
    id: number;
    date: string;
    payment_date: string;
    method: string;
    amount_paid: string;
    balance: string;
}

interface Sale {
    created_at: string;
    id: number;
    quantity: number;
    price: number;
    date: string;
    code: string;
    credit?: Credit;
    stock?: Stock;
    customer?: Customer;
    payments?: Payment[];
}

interface SalesProp {
    sale: Sale;
}

export default function Info({ sale }: SalesProp) {
    const { date, name, item, qty, cost, amount, code, paid, paymentsData } = {
        code: sale.code,
        date: formatDate(sale.created_at),
        // payment_date: sale.payment,
        name: sale.customer?.name ?? 'Walk - In',
        item: sale.stock?.product.name,
        qty: `${formatNumber(sale.quantity)} ${sale.stock?.product.unit}`,
        cost: sale.stock?.product.price_per_unit,
        amount: sale.price,
        paid: sale.credit?.is_paid ?? true,
        paymentsData: sale.payments,
    };

    

    return (
        <AppLayout>
            <Head title="Sale Information" />
            <div className="justify-center">
                <AuthLayout description="Sale" title="Sales Transaction Info">
                    <Card className={`px-3 py-9 ${paid ? 'bg-green-100/20' : 'bg-red-100/20'} shadow-2xl shadow-emerald-950`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <CardTitle>Date:</CardTitle>
                                <CardDescription className="px-2"> {formatDate(new Date().toString())} </CardDescription>
                            </div>
                            <div className="flex items-center rounded bg-primary-foreground px-0.5">
                                <CardDescription className="text-xs">{code}</CardDescription>
                            </div>
                        </div>
                        <div className="flex items-center justify-around">
                            <div className="flex items-center">
                                <CardTitle className="ms-5">{name}</CardTitle>
                            </div>
                            <div className="flex items-center">
                                <CardTitle className={`ms-5 ${paid ? 'text-green-500' : 'text-amber-500'}`}>{formatCurrency(amount)}</CardTitle>
                            </div>
                        </div>
                        <div className="flex justify-between text-xs">
                            <div className="grid w-1/2">
                                <div className="flex gap-1 font-bold text-green-400">
                                    <span>{item}</span>
                                    <span>{qty}</span>
                                    <span> {`@ ${formatNumber(cost || '')}`}</span>
                                </div>

                                <div className="h-full">
                                    <AppLogo />
                                </div>
                            </div>

                            <div className="grid w-1/2 ps-2 items-center">
                                {
                                    amount  != null ?
                                        paymentsData?.map((payment, index) => (
                                    <div className="text-fold py-2">
                                        <div
                                            className={`${payment?.method === 'cash' ? 'bg-amber-900 text-amber-100' : 'bg-green-900 text-green-100'} rounded text-center`}
                                        >
                                            {`${formatDate(payment?.payment_date)}  ${payment?.method}`}
                                        </div>
                                        <div className="flex items-center justify-between px-1">
                                            <span className="text-sm font-bold text-primary">Paid</span>
                                            <span className="text-secondary-foreground">{formatNumber(payment?.amount_paid)}</span>
                                            <span className="text-sm text-primary-foreground">Ksh</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-3 px-1">
                                            <span className="text-sm font-bold text-primary">Bal</span>
                                            <span className="text-secondary-foreground"> {formatNumber(payment?.balance)}</span>
                                            <span className="text-sm text-primary-foreground">Ksh</span>
                                        </div>
                                    </div>
                                        )) :
                                        <div className="text-red-500 flex items-center text-center">
                                            <span>No payments made yet</span>
                                        </div>
                                 }
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
                        </div>
                    </div>
                </AuthLayout>
            </div>
        </AppLayout>
    );
}
