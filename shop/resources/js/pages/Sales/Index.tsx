import { Head, Link, router, usePage } from '@inertiajs/react';
import { MoreHorizontal, Pencil, Plus, Receipt, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
// import { formatCurrency } from '@/helpers/formatCurrency'; // Corrected path
// import { formatDate } from '@/helpers/formatDate'; // Ensure this path is also correct
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDate } from '@/helper/formatDate';
import AppLayout from '@/layouts/app-layout';

interface Product {
    name: string;
    unit: string;
}

interface Customer {
    name: string;
}

interface Sale {
    id: number;
    product: Product;
    customer: Customer | null;
    quantity: number;
    price: number;
    method: 'cash' | 'mpesa' | 'credit';
    payment_status: string;
    date: string;
}

export default function SaleIndex({ sales }: { sales: Sale[] }) {
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

    const printReceipt = (saleId: number) => {
        window.open(route('sales.receipt', saleId), '_blank');
    };

    console.log(sales);

    // function formatCurrency(price: number): import("react").ReactNode {
    //     throw new Error('Function not implemented.');
    // }
    const formatCurrency = (price: number): React.ReactNode => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    return (
        <AppLayout>
            <Head title="Sales Records" />
            <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                    <Toaster position="top-center" richColors />
                    <h2 className="text-xl font-semibold">Sales Records</h2>
                    <Link href={route('sale.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            New Sale
                        </Button>
                    </Link>
                </div>

                <div className="overflow-auto rounded-xl border">
                    <table className="min-w-full text-sm">
                        <thead className="bg-muted text-muted-foreground">
                            <tr>
                                <th className="px-4 py-2 text-left">Date</th>
                                <th className="px-4 py-2 text-left">Product</th>
                                <th className="px-4 py-2 text-left">Customer</th>
                                <th className="px-4 py-2 text-right">Qty</th>
                                <th className="px-4 py-2 text-right">Amount</th>
                                <th className="px-4 py-2 text-left">Payment</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map((sale) => (
                                <tr key={sale.id} className="border-t transition hover:bg-accent">
                                    <td className="px-4 py-2">{formatDate(sale.date)}</td>
                                    <td className="px-4 py-2">{sale.product.name}</td>
                                    <td className="px-4 py-2">{sale.customer?.name || 'Walk-in-Customer'}</td>
                                    <td className="px-4 py-2 text-right">
                                        {sale.quantity} {sale.product.unit}
                                    </td>
                                    <td className="px-4 py-2 text-right">{formatCurrency(sale.price)}</td>
                                    <td className="px-4 py-2 capitalize">
                                        {/* {sale.method} */}
                                        <span
                                            className={`inline-flex items-center rounded-none px-2.5 py-0.5 text-xs font-medium ${sale.method == 'cash' ? 'bg-blue-600 text-white' : sale.method == 'mpesa' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                                        >
                                            {sale.method}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${sale.payment_status == 'paid' ? 'bg-green-100 text-green-800' : sale.payment_status == 'partial' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-700'}`}
                                        >
                                            {sale.payment_status == 'paid' ? 'Paid' : sale.payment_status == 'partial' ? 'Partial' : 'Unpaid'}
                                        </span>
                                    </td>

                                    <td>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-fit">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-blue-500">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="p-0 text-blue-500"
                                                        onClick={() => printReceipt(sale.id)}
                                                    >
                                                        <Receipt className="h-4 w-4 text-blue-500" />
                                                        Payment Details
                                                    </Button>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link href={route('sale.edit', sale.id)} className="">
                                                        <Button size="sm" variant="ghost" className="p-0 text-yellow-500">
                                                            <Pencil className="h-4 w-4 text-yellow-500" />
                                                            Edit Sale
                                                        </Button>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button size="sm" variant="ghost" className="p-0 text-red-500">
                                                                <Trash2 className="h-4 w-4 text-red-500" />
                                                                Delete Sale
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle className="text-red-500">Confirm Delete</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Are you sure you want to delete this sale record? This action is irreversible.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleDelete(sale.id)}
                                                                    className="bg-red-500 text-white hover:bg-red-600"
                                                                >
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </DropdownMenuItem>
                                                {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                    {/* <td className="px-4 py-2">
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="ghost" className="p-0 text-blue-500" onClick={() => printReceipt(sale.id)}>
                                                <Receipt className="h-4 w-4" />
                                            </Button>
                                            <Link href={route('sale.edit', sale.id)}>
                                                <Button size="sm" variant="ghost" className="p-0">
                                                    <Pencil className="h-4 w-4 text-yellow-500" />
                                                </Button>
                                            </Link>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button size="sm" variant="ghost" className="p-0">
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle className="text-red-500">Confirm Delete</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to delete this sale record? This action is irreversible.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDelete(sale.id)}
                                                            className="bg-red-500 text-white hover:bg-red-600"
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </td> */}
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
