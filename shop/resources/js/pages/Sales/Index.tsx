import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Euro, Receipt } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';

import { Button } from '@/components/ui/button';
// import { formatCurrency } from '@/helpers/formatCurrency'; // Corrected path
// import { formatDate } from '@/helpers/formatDate'; // Ensure this path is also correct
import CreateButton from '@/components/createButton';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatCurrency } from '@/helper/formatCurrency';
import { formatDate } from '@/helper/formatDate';
import ucfirst from '@/helper/ucfirst';
import AppLayout from '@/layouts/app-layout';
import InputError from '@/components/input-error';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/breadcrumb';

export interface Product {
    id: number;
    name: string;
    unit: string;
    price_per_unit: string;
}

export interface Stock {
    id: number;
    code: string;
    date: string;
    product_id: number;
    quantity_available: string;
    quantity_received: string;
    product: Product;
}

export interface SaleStock {
    id: number;
    sale_id: number;
    stock_id: number;
    product_id: number;
    quantity: number;
    subtotal: number;
    created_at: string;
    stock: Stock;
}
interface Customer {
    name: string;
}

interface Sale {
    uuid: number;
    invoice_number: string;
    sale_stock: SaleStock[];
    customer: Customer | null;
    quantity: number;
    total: number;
    balance: number;
    method: 'cash' | 'mpesa' | 'credit';
    payment_status: string;
    date: string;
}

interface SalesProp {
    sales: Sale[];
}

const breadcrumb = [
    {
        title: 'Sales',
        href: '/sale',
    },
];

export default function SaleIndex({ sales }: SalesProp) {
    const [formOpen, setFormOpen] = useState(false);

    const { data, setData, processing, post, errors, reset } = useForm({
        sale_id: -1,
        amount_paid: 0,
        balance: 0,
        method: 'mpesa',
        new_balance: 0,
        date: formatDate(new Date().toISOString()),
    });

    const handlePaymentChange = (value: number, balance: number) => {
        // set max value of payment.
        if (value > balance) {
            value = balance;
        }
        // set new data,
        setData('amount_paid', value);
        setData('balance', balance);
        setData('new_balance', balance - value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('payments.store'), {
            onSuccess: () => {
                setFormOpen(false);
                toast.success('Success', {
                    description: 'Payment recorded successfully.',
                    duration: 2000,
                });
                setData({
                    ...data,
                    sale_id: -1,
                    amount_paid: 0,
                    balance: 0,
                    method: 'mpesa',
                    new_balance: 0,
                    date: '',
                });
            },
        });
    };

    const handleDelete = (id: number) => {
        router.delete(route('sales.destroy', id));
    };

    const { props } = usePage<{ flash?: { success?: string } }>();
    const [message, setMessage] = useState(props.flash?.success || '');

    useEffect(() => {
        if (message && typeof message === 'string' && message.trim() !== '') {
            toast.success('Success', {
                description: message,
                duration: 3000,
            });
        }
    }, [message]);

    

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Sales Records" />
            <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                    <Toaster position="top-center" richColors />
                    <h2 className="text-xl font-semibold">Sales Records</h2>
                    <CreateButton action="New Sale" toRoute="sale.create" />
                </div>

                <div className="overflow-auto rounded-xl border">
                    <table className="min-w-full text-sm">
                        <thead className="bg-muted text-muted-foreground">
                            <tr>
                                <th className="px-4 py-2 text-left">Date</th>
                                <th className="px-4 py-2 text-left">Invoice</th>
                                <th className="px-4 py-2 text-left">Product</th>
                                <th className="px-4 py-2 text-left">Customer</th>
                                <th className="px-4 py-2 text-right">Total</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Info</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales?.map((sale) => (
                                <tr key={sale.id} className="border-t transition hover:bg-accent">
                                    <td className="px-4 py-2 text-xs">{formatDate(sale.date)}</td>
                                    <td className="px-4 py-2 text-xs">{sale.invoice_number}</td>
                                    <td className="px-4 py-2 text-left">
                                        {sale.sale_stock?.map((item) => <li className="text-xs italic">{ucfirst(item.stock.product.name)}</li>)}
                                    </td>
                                    <td className="px-4 py-2">{sale.customer?.name || 'Walk-in-Customer'}</td>

                                    <td className="px-4 py-2 text-right">{formatCurrency(sale.total)}</td>

                                    <td className="px-4 py-2">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${sale.payment_status == 'paid' ? 'bg-green-400 text-green-800' : sale.payment_status == 'partial' ? 'bg-yellow-300 text-yellow-800' : 'bg-red-300 text-red-700'}`}
                                        >
                                            {sale.payment_status}
                                        </span>
                                    </td>

                                    <td className="px-4 py-2">
                                        <div className="flex items-center gap-3">
                                            <Drawer direction="right" open={formOpen} onOpenChange={() => setFormOpen(!formOpen)}>
                                                <DrawerTrigger disabled={sale.balance <= 0}>
                                                    <Euro
                                                        onClick={() => setData('sale_id', sale.id)}
                                                        className={`${sale.balance <= 0 ? 'text-gray-400' : 'cursor-pointer text-green-500'} `}
                                                    />
                                                </DrawerTrigger>
                                                <DrawerContent className="text-2xl"> 
                                                    
                                                    <DrawerHeader>
                                                        <DrawerTitle className="text-gray-400">Record Payment: </DrawerTitle>

                                                        <DrawerDescription>
                                                            <div className="text-2xl text-primary">
                                                                <div className="my-5">
                                                                    <div className="flex justify-between py-2">
                                                                        <span className="font-bold text-green-500">Inv. No:</span>{' '}
                                                                        <span>{sale.invoice_number} </span>
                                                                    </div>
                                                                    <div className="flex justify-between py-2">
                                                                        <span className="font-bold text-green-500">Customer:</span>{' '}
                                                                        <span>{sale.customer?.name.toUpperCase()} </span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span className="font-bold text-green-500">Balance:</span>{' '}
                                                                        <span>{formatCurrency(sale.balance)}</span>
                                                                    </div>
                                                                </div>

                                                                <form onSubmit={submit}>
                                                                    <div className="rounded-2xl border p-3">
                                                                        <div className="py-3">
                                                                            <Label className="mb-2" htmlFor="amount">
                                                                                Amount
                                                                            </Label>
                                                                            <Input
                                                                                type="number"
                                                                                step="any"
                                                                                // min="0.1"
                                                                                id="amount"
                                                                                value={data.amount_paid <= 0 ? '' : data.amount_paid}
                                                                                onChange={(e) => {
                                                                                    handlePaymentChange(parseFloat(e.target.value), sale.balance);
                                                                                }}
                                                                                // disabled={processing || !item.product_id}
                                                                            />
                                                                            <InputError message={errors.amount_paid} />
                                                                        </div>
                                                                        <div className="py-3">
                                                                            <Select
                                                                                value={data.method}
                                                                                onValueChange={(e) => {
                                                                                    setData('method', e);
                                                                                    console.log(data.method);
                                                                                }}
                                                                            >
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder={'Payment method.'}></SelectValue>
                                                                                </SelectTrigger>
                                                                                <SelectContent className="cursor-pointer">
                                                                                    <SelectItem value="mpesa">{'MPESA'}</SelectItem>
                                                                                    <SelectItem value="cash">{'CASH'}</SelectItem>
                                                                                </SelectContent>
                                                                            </Select>
                                                                            <InputError message={errors.method} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="my-3 grid justify-self-stretch">
                                                                        {' '}
                                                                        <Label>New Balance:</Label>
                                                                        <Input
                                                                            className="w-6/12"
                                                                            value={isNaN(data.new_balance) ? '' : data.new_balance}
                                                                            disabled
                                                                        />
                                                                        <InputError message={errors.new_balance}/>
                                                                    </div>
                                                                    <Button type="submit" className="mt-3 w-full">
                                                                        Make Payment.
                                                                    </Button>
                                                                </form>
                                                            </div>
                                                        </DrawerDescription>
                                                    </DrawerHeader>
                                                    <DrawerFooter>
                                                        <DrawerClose>
                                                            <Button variant="outline">Cancel</Button>
                                                        </DrawerClose>
                                                    </DrawerFooter>
                                                </DrawerContent>
                                            </Drawer>

                                            <Link href={route('sale.show', sale.uuid)}>
                                                <Button size="sm" variant="ghost" className="me-1 border-2 p-0 text-blue-500 md:border-0">
                                                    <Receipt className="h-4 w-4 text-blue-500" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {sales.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="p-4 text-center text-muted-foreground">
                                        No sales records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
