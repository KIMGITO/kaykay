import { Head, Link, router, usePage } from '@inertiajs/react';
import { Receipt } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';

import { Button } from '@/components/ui/button';
// import { formatCurrency } from '@/helpers/formatCurrency'; // Corrected path
// import { formatDate } from '@/helpers/formatDate'; // Ensure this path is also correct
import ClearPaymnet from '@/components/clearPayment';
import CreateButton from '@/components/createButton';
import { formatCurrency } from '@/helper/formatCurrency';
import { formatDate } from '@/helper/formatDate';
import AppLayout from '@/layouts/app-layout';

interface Product {
    name: string;
    unit: string;
}

interface Stock {
    id: number;
    product: Product;
    quantity: number;
    price: number;
}

interface Credit {
    id: number;
    is_paid: boolean;
    balance: number;
}

interface Customer {
    name: string;
}


interface Sale {
    id: number;
    stock: Stock;
    credit: Credit | null;
    customer: Customer | null;
    quantity: number;
    price: number;
    method: 'cash' | 'mpesa' | 'credit';
    payment_status: string;
    date: string;
}

interface SalesProp {
    sales: Sale[];
}

export default function SaleIndex({ sales }: SalesProp) {
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
        <AppLayout>
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
                                <th className="px-4 py-2 text-left">Product</th>
                                <th className="px-4 py-2 text-left">Customer</th>
                                <th className="px-4 py-2 text-right">Qty</th>
                                <th className="px-4 py-2 text-right">Amount</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales?.map((sale) => (
                                <tr key={sale.id} className="border-t transition hover:bg-accent">
                                    <td className="px-4 py-2">{formatDate(sale.date)}</td>
                                    <td className="px-4 py-2">{sale.stock?.product?.name}</td>
                                    <td className="px-4 py-2">{sale.customer?.name || 'Walk-in-Customer'}</td>
                                    <td className="px-4 py-2 text-right">
                                        {sale.quantity} {sale.stock?.product?.unit}
                                    </td>
                                    <td className="px-4 py-2 text-right">{formatCurrency(sale.price)}</td>

                                    <td className="px-4 py-2">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${sale.payment_status == 'paid' ? 'bg-green-400 text-green-800' : sale.payment_status == 'partial' ? 'bg-yellow-300 text-yellow-800' : 'bg-red-300 text-red-700'}`}
                                        >
                                            {sale.payment_status}
                                        </span>
                                    </td>

                                    <td className="px-4 py-2">
                                        <div className="flex gap-3">
                                            {sale.credit && (
                                                <ClearPaymnet
                                                    credit={{
                                                        id: sale.credit.id,
                                                        is_paid: sale.credit.is_paid,
                                                        balance: sale.credit.balance,
                                                        sale: {
                                                            id: sale.id,
                                                            price: sale.price,
                                                        },
                                                    }}
                                                />
                                            )}

                                            <Link
                                                href={
                                                    sale.credit && !sale.credit.is_paid ? route('credits.show', sale.credit.id) : route('sale.show', sale.id)
                                                }
                                            >
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="me-1 border-2 p-0 text-blue-500 md:border-0"
                                                    
                                                >
                                                    <Receipt className="h-4 w-4 text-blue-500" />
                                                </Button>
                                            </Link>
                                        </div>
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

//  <DropdownMenu>
//      <DropdownMenuTrigger asChild>
//          <Button variant="ghost" className="h-8 w-8 p-0">
//              <span className="sr-only">Open menu</span>
//              <MoreHorizontal className="h-4 w-4" />
//          </Button>
//      </DropdownMenuTrigger>
//      <DropdownMenuContent align="end" className="w-fit">
//          <DropdownMenuLabel>Actions</DropdownMenuLabel>

//          <DropdownMenuSeparator />
//          <DropdownMenuItem className="text-blue-500"></DropdownMenuItem>
//          <DropdownMenuItem></DropdownMenuItem>
//          <DropdownMenuItem>
//              <AlertDialog>
//                  <AlertDialogTrigger asChild></AlertDialogTrigger>
//                  <AlertDialogContent>
//                      <AlertDialogHeader>
//                          <AlertDialogTitle className="text-red-500">Confirm Delete</AlertDialogTitle>
//                          <AlertDialogDescription>
//                              Are you sure you want to delete this sale record? This action is irreversible.
//                          </AlertDialogDescription>
//                      </AlertDialogHeader>
//                      <AlertDialogFooter>
//                          <AlertDialogCancel>Cancel</AlertDialogCancel>
//                          <AlertDialogAction onClick={() => handleDelete(sale.id)} className="bg-red-500 text-white hover:bg-red-600">
//                              Delete
//                          </AlertDialogAction>
//                      </AlertDialogFooter>
//                  </AlertDialogContent>
//              </AlertDialog>
//          </DropdownMenuItem>
//          {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
//      </DropdownMenuContent>
//  </DropdownMenu>;
