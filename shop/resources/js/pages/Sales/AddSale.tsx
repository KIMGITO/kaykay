import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AuthLayout from '@/layouts/auth-layout';
import { Link, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast, Toaster } from 'sonner';

interface Product {
    id: string;
    name: string;
    unit: string;
    price_per_unit: number;
}

interface Stock {
    id: string;
    receipt: string;
    quantity_received: number;
    quantity_available: number;
    product: Product;
}

interface Customer {
    name: string;
    id: string;
}

interface SaleProps {
    stocks: Stock[];
    customers: Customer[];
}

interface SaleItem {
    product_id: string;
    product_name: string;
    product_price: number;
    unit: string;
    stock_id: string;
    stock_code: string;
    sale_quantity: number;
    stock_available: number;
    total_price: number;
}

interface FormData {
    customer_id: string;
    customer_name: string;
    sale_items: SaleItem[];
    payment_method: 'mpesa' | 'cash' | 'credit';
    sale_date: string;
    payment_status: 'paid' | 'partial' | 'unpaid';
    amount_paid: number;
    payment_balance: number;
    grand_total: number;
}

export default function AddSalesForm({ stocks, customers }: SaleProps) {
    const [saleItems, setSaleItems] = useState<SaleItem[]>([
        {
            product_id: '',
            product_name: '',
            product_price: 0,
            unit: '',
            stock_id: '',
            stock_code: '',
            sale_quantity: 0,
            stock_available: 0,
            total_price: 0,
        },
    ]);

    const { data, setData, post, errors, processing } = useForm<FormData>({
        customer_id: '',
        customer_name: '',
        sale_items: saleItems,
        payment_method: 'mpesa',
        sale_date: new Date().toISOString().split('T')[0],
        payment_status: 'paid',
        amount_paid: 0,
        payment_balance: 0,
        grand_total: 0,
    });

    // Add new product row
    const addNewProduct = () => {
        if (!productNotEmpty()) {
            console.log('message');
    toast.error('Error', {
        description: 'Please fill details for previous product first.',
        duration: 3000,
    });
    return;
}
        
        setSaleItems([
            ...saleItems,
            {
                product_id: '',
                product_name: '',
                product_price: 0,
                unit: '',
                stock_id: '',
                stock_code: '',
                sale_quantity: 0,
                stock_available: 0,
                total_price: 0,
            },
        ]);
    };

    // Remove product row
    const removeProduct = (index: number) => {
        const updatedItems = [...saleItems];
        updatedItems.splice(index, 1);
        setSaleItems(updatedItems);
        updateGrandTotal(updatedItems);
    };

    // Update product field
    const updateProduct = (index: number, field: keyof SaleItem, value: any) => {

        const updatedItems = [...saleItems];
        updatedItems[index] = { ...updatedItems[index], [field]: value };

        // Recalculate total price if quantity or price changes
        if (field === 'sale_quantity' || field === 'product_price') {
            updatedItems[index].total_price = updatedItems[index].sale_quantity * updatedItems[index].product_price;
        }

        setSaleItems(updatedItems);
        updateGrandTotal(updatedItems);
    };

    const productNotEmpty = () => {
        // Check if any product in the list is incomplete
        return saleItems.every((item) => item.product_id && item.stock_id && item.sale_quantity > 0 && item.sale_quantity <= item.stock_available);
    };

    // Update grand total when items change
    const updateGrandTotal = (items: SaleItem[]) => {
        const grandTotal = items.reduce((sum, item) => sum + item.total_price, 0);
        setData({
            ...data,
            sale_items: items,
            grand_total: grandTotal,
            ...(data.payment_status === 'paid' && {
                amount_paid: grandTotal,
                payment_balance: 0,
            }),
        });
    };

   const handleStockSelection = (index: number, value: string) => {
       try {
           const selectedStock = stocks.find((stock) => stock.id === value);
           if (!selectedStock) return;

           const updatedItems = [...saleItems];
           updatedItems[index] = {
               ...updatedItems[index],
               stock_id: selectedStock.id,
               stock_code: selectedStock.receipt,
               product_id: selectedStock.product.id,
               product_name: selectedStock.product.name,
               product_price: selectedStock.product.price_per_unit,
               unit: selectedStock.product.unit,
               stock_available: selectedStock.quantity_available,
               sale_quantity: 0,
               total_price: 0,
           };

           setSaleItems(updatedItems);
           updateGrandTotal(updatedItems);
       } catch (error) {
           console.error('Error selecting stock:', error);
       }
   };
    // Handle customer change
    const handleCustomerChange = (value: string) => {
        const customer = JSON.parse(value);
        setData({
            ...data,
            customer_id: customer?.id || '',
            customer_name: customer?.name || '',
        });
    };

    // Handle payment status change
    const handlePaymentStatusChange = (status: 'paid' | 'partial' | 'unpaid') => {
        const updates: Partial<FormData> = {
            payment_status: status,
            amount_paid: status === 'paid' ? data.grand_total : 0,
            payment_balance: status === 'paid' ? 0 : data.grand_total,
        };

        if (status === 'partial' && data.amount_paid > data.grand_total) {
            updates.amount_paid = data.grand_total;
            updates.payment_balance = 0;
        }

        setData({
            ...data,
            ...updates,
        });
    };

    // Handle partial payment change
    const handlePartialPaymentChange = (value: string) => {
        const amount = parseFloat(value) || 0;
        const balance = data.grand_total - amount;

        setData({
            ...data,
            amount_paid: amount > data.grand_total ? data.grand_total : amount,
            payment_balance: balance < 0 ? 0 : balance,
            payment_status: balance <= 0 ? 'paid' : 'partial',
        });
    };

    // Form submission
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!productNotEmpty()) {
            console.log('message');
            toast.error('Error', {
                description: 'A product is empty.',
                duration: 3000,
            });
            return;
        }

        

        post(route('sale.store'), {
            data: {
                ...data,
                sale_items: saleItems,
            },
            onSuccess: () => {
                console.log('Sale recorded successfully');
            },
            onError: (errors) => {
                console.error('Error recording sale:', errors);
            },
        });
    };

    return (
        <AuthLayout title="New Sale" description="Record a new sale below.">
            <form onSubmit={submit} className="w-full max-w-4xl space-y-4">
                <Toaster position='top-center' richColors closeButton/>
                {/* Customer and Date Section */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="customer_id">Customer</Label>
                        <Select value={data.customer_id} onValueChange={handleCustomerChange} disabled={processing}>
                            <SelectTrigger>
                                <SelectValue placeholder="Customer" />
                            </SelectTrigger>
                            <SelectContent>
                                {customers.map((customer) => (
                                    <SelectItem key={customer.id} value={JSON.stringify(customer)}>
                                        {customer.name}
                                    </SelectItem>
                                ))}
                                <div className="mt-4 rounded p-2">
                                    No Customer.
                                    <Link href={route('customers.create')} className="ml-1 underline">
                                        Add a customer?
                                    </Link>
                                </div>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.customer_id} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            type="date"
                            value={data.sale_date}
                            onChange={(e) => setData('sale_date', e.target.value)}
                            disabled={processing}
                        />
                        <InputError message={errors.sale_date} />
                    </div>
                </div>

                {/* Products Section */}
                <div className="space-y-6">
                    {saleItems.map((item, index) => (
                        <div key={index} className="rounded-lg border p-4">
                            <div className="mb-2 flex items-center justify-between">
                                <h3 className="font-medium">Product  {index + 1}</h3>
                                {index > 0 && (
                                    <Button type="button" variant="ghost" size="sm" onClick={() => removeProduct(index)} disabled={processing}>
                                        Remove
                                    </Button>
                                )}
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                {/* Product Selection */}
                                <div className="space-y-2">
                                    <Label>Product</Label>
                                    <Select value={item.stock_id} onValueChange={(value) => handleStockSelection(index, value)} disabled={processing}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select">{item.product_name || 'Select product'}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {stocks.map((stock) => (
                                                <SelectItem key={stock.id} value={stock.id} disabled={stock.quantity_available <= 0}>
                                                    {stock.product.name} ({stock.product.price_per_unit}/{stock.product.unit})
                                                    {stock.quantity_available <= 0 && ' (Out of stock)'}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Quantity */}
                                <div className="space-y-2">
                                    <Label>Quantity</Label>
                                    <Input
                                        type="number"
                                        step="any"
                                        min="0"
                                        // max={item.stock_available}
                                        value={item.sale_quantity === 0 ? '' : item.sale_quantity}
                                        onChange={(e) => {
                                            if (parseFloat(e.target.value) > item.stock_available) {
                                                e.target.value = item.stock_available.toString()
                                            }
                                                updateProduct(index, 'sale_quantity', parseFloat(e.target.value) || 0);
                                        }}
                                        disabled={processing || !item.product_id}
                                    />
                                    <div className="text-sm text-muted-foreground">
                                        Available: {item.stock_available} {item.unit}
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="space-y-2">
                                    <Label>Total</Label>
                                    <Input type="number" value={item.total_price.toFixed(2)} readOnly />
                                </div>
                            </div>
                        </div>
                    ))}

                    <Button type="button" variant="outline" onClick={addNewProduct} className="w-full" disabled={processing}>
                        + Add Another Product
                    </Button>
                </div>

                {/* Payment Section */}
                <div className="space-y-4 rounded-lg border p-4">
                    <h3 className="font-medium">Payment Summary</h3>
                    <div className="flex justify-between">
                        <span>Grand Total:</span>
                        <span className="font-bold">{data.grand_total.toFixed(2)}</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {/* Payment Method */}
                        <div className="space-y-2">
                            <Label>Payment Method</Label>
                            <Select
                                value={data.payment_method}
                                onValueChange={(value: 'cash' | 'mpesa' | 'credit') => {
                                    if (value === 'credit') {
                                        setData({
                                            ...data,
                                            payment_method: 'credit',
                                            payment_status: 'unpaid',
                                            amount_paid: 0,
                                            payment_balance: data.grand_total,
                                        });
                                    } else {
                                        setData({
                                            ...data,
                                            payment_method: value,
                                            payment_status: 'paid',
                                            amount_paid: data.grand_total,
                                            payment_balance: 0,
                                        });
                                    }
                                }}
                                disabled={processing}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cash">Cash</SelectItem>
                                    <SelectItem value="mpesa">M-Pesa</SelectItem>
                                    <SelectItem value="credit">Credit</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.payment_method} />
                        </div>

                        {/* Payment Status */}
                       
                        <div className="space-y-2">
                            <Label>Payment Status</Label>
                            <RadioGroup value={data.payment_status} onValueChange={handlePaymentStatusChange} className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="paid" id="paid" disabled={processing} />
                                    <Label htmlFor="paid">Paid</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="partial" id="partial" disabled={processing} />
                                    <Label htmlFor="partial">Partial</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unpaid" id="unpaid" disabled={processing} />
                                    <Label htmlFor="unpaid">Unpaid</Label>
                                </div>
                            </RadioGroup>
                            <InputError message={errors.payment_status} />
                        </div>
                    </div>

                    {data.payment_status === 'partial' && (
                        <div className="space-y-2">
                            <Label>Amount Paid</Label>
                            <Input
                                type="number"
                                max={data.grand_total}
                                value={data.amount_paid === 0 ? '' : data.amount_paid}
                                onChange={(e) => handlePartialPaymentChange(e.target.value)}
                                disabled={processing}
                            />
                            <div className="text-sm font-medium">Balance: {data.payment_balance.toFixed(2)}</div>
                            <InputError message={errors.amount_paid} />
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <Button type="submit" disabled={processing} className="w-full">
                    {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Complete Sale
                </Button>
            </form>
        </AuthLayout>
    );
}
