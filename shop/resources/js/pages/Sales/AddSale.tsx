import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AuthLayout from '@/layouts/auth-layout';
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { FormEventHandler } from 'react';

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

interface FormData {
    product_id: string;
    product_name: string;
    product_price: number;
    unit: string;
    stock_id: string;
    stock_code: string;
    customer_id: string;
    customer_name: string;
    sale_quantity: number;
    total_price: number;
    payment_method: 'mpesa' | 'cash' | 'credit';
    sale_date: string;
    payment_status: 'paid' | 'partial' | 'unpaid';
    amount_paid: number;
    payment_balance: number;
    stock_available: number;
    [key: string] : any
}

export default function AddSalesForm({ stocks, customers }: SaleProps) {
    console.log(stocks);
    
    const { data, setData, post, errors, processing, reset } = useForm<FormData>({
        product_id: '',
        product_name: '',
        product_price: 0,
        unit: '',
        stock_id: '',
        stock_code: '',
        customer_id: '',
        customer_name: '',
        sale_quantity: 0,
        total_price: 0,
        payment_method: 'mpesa',
        sale_date: new Date().toISOString().split('T')[0],
        payment_status: 'paid',
        amount_paid: 0,
        payment_balance: 0,
        stock_available: 0,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('sale.store'));
    };

    const handlePaymentStatusChange = (status: 'paid' | 'partial' | 'unpaid') => {
        const updates: Partial<FormData> = {
            payment_status: status,
            amount_paid: status === 'paid' ? data.total_price : 0,
            payment_balance: status === 'paid' ? 0 : data.total_price,
        };

        if (status === 'partial' && data.amount_paid > data.total_price) {
            updates.amount_paid = data.total_price;
            updates.payment_balance = 0;
        }

        setData({
            ...data,
            ...updates,
        });
        console.log(data);
    };

    const handleQuantityChange = (value: string) => {
        // If the input is empty or just a decimal point, set to empty string
        if (value === '' ) {
            setData({
                ...data,
                sale_quantity: value as any, // Temporary workaround for type
                total_price: 0,
                ...(data.payment_status === 'paid' && {
                    amount_paid: 0,
                    payment_balance: 0,
                }),
            });
            return;
        }

        const inputValue = parseFloat(value) || 0;
        const quantity = parseFloat(Math.min(Math.max(0, inputValue), data.stock_available).toFixed(1));
        const total = quantity * data.product_price;

        setData({
            ...data,
            sale_quantity: quantity,
            total_price: parseFloat(total.toFixed(2)),
            ...(data.payment_status === 'paid' && {
                amount_paid: parseFloat(total.toFixed(2)),
                payment_balance: 0,
            }),
        });
    };

    const handlePartialPaymentChange = (value: string) => {
        const amount = parseFloat(value) || 0;
        const balance = data.total_price - amount;

        setData({
            ...data,
            amount_paid: amount > data.total_price ? data.total_price : amount,
            payment_balance: balance < 0 ? 0 : balance,
            payment_status: balance <= 0 ? 'paid' : 'partial',
        });

        
    };

    return (
        <AuthLayout title="New Sale" description="Record a new sale below.">
            <form onSubmit={submit} className="w-full max-w-xl space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    {/* Product Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="product_id">Product</Label>
                        <Select
                            value={data.stock_id}
                            onValueChange={(value) => {
                                try {
                                    const selectedStock = JSON.parse(value) as {
                                        stock_id: string;
                                        stock_code: string;
                                        product_id: string;
                                        product_name: string;
                                        product_price: number;
                                        unit: string;
                                        quantity_available: number;
                                    };

                                    setData({
                                        ...data,
                                        stock_id: selectedStock.stock_id,
                                        stock_code: selectedStock.stock_code,
                                        product_id: selectedStock.product_id,
                                        product_name: selectedStock.product_name,
                                        product_price: selectedStock.product_price,
                                        unit: selectedStock.unit,
                                        stock_available: selectedStock.quantity_available,
                                        sale_quantity: 0,
                                        total_price: 0,
                                        amount_paid: 0,
                                        payment_balance: 0,
                                    });
                                } catch (error) {
                                    console.error('Invalid product selection:', error);
                                }
                            }}
                            disabled={processing}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Product">{data.product_name || 'Product'}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {stocks.map(
                                    (stock) =>
                                        stock.quantity_available > 0 && (
                                            <SelectItem
                                                key={stock.id}
                                                value={JSON.stringify({
                                                    stock_id: stock.id,
                                                    stock_code: stock.receipt,
                                                    product_id: stock.product.id,
                                                    product_name: stock.product.name,
                                                    product_price: stock.product.price_per_unit,
                                                    unit: stock.product.unit,
                                                    quantity_available: stock.quantity_available,
                                                })}
                                            >
                                                {stock.product.name} ({stock.product.price_per_unit}/{stock.product.unit})
                                            </SelectItem>
                                        ),
                                )}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.product_id} />
                    </div>

                    {/* Customer Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="customer_id">Customer</Label>
                        <Select
                            value={data.customer_id}
                            onValueChange={(value) => {
                                try {
                                    const customer = value ? (JSON.parse(value) as Customer) : null;
                                    setData({
                                        ...data,
                                        customer_id: customer?.id || '',
                                        customer_name: customer?.name || '',
                                    });
                                } catch (error) {
                                    console.error('Invalid customer selection:', error);
                                }
                            }}
                            disabled={processing}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Customer">{data.customer_name || 'Walk-in'}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {customers.map((customer) => (
                                    <SelectItem key={customer.id} value={JSON.stringify(customer)}>
                                        {customer.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.customer_id} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Quantity */}
                    <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                            id="quantity"
                            type="number"
                            step="any"
                            min=" "
                            max={data.stock_available}
                            value={data.sale_quantity == 0 ? '' : data.sale_quantity}
                            onChange={(e) => handleQuantityChange(e.target.value)}
                            disabled={processing || !data.product_id}
                        />
                        <div className="text-sm text-muted-foreground">
                            Available: {data.stock_available} {data.unit}
                        </div>
                        <InputError message={errors.sale_quantity} />
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <Label htmlFor="price">Total Price</Label>
                        <Input
                            id="price"
                            type="number"
                            min="0"
                            value={data.total_price.toFixed(2)}
                            onChange={(e) => setData('total_price', parseFloat(e.target.value) || 0)}
                            disabled={processing}
                        />
                        <InputError message={errors.total_price} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Payment Method */}
                    <div className="space-y-2">
                        <Label htmlFor="method">Payment Method</Label>
                        <Select
                            value={data.payment_method}
                            onValueChange={(value: 'cash' | 'mpesa' | 'credit') => setData('payment_method', value)}
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

                    {/* Date */}
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

                <div className="space-y-4">
                    {/* Payment Status Selection */}
                    <div className="space-y-2">
                        <Label>Payment Status</Label>
                        <RadioGroup value={data.payment_status} onValueChange={handlePaymentStatusChange} className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="paid" id="paid" disabled={processing} />
                                <Label htmlFor="paid">Fully Paid</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="unpaid" id="unpaid" disabled={processing} />
                                <Label htmlFor="unpaid">Not Paid</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="partial" id="partial" disabled={processing} />
                                <Label htmlFor="partial">Partial Payment</Label>
                            </div>
                        </RadioGroup>
                        <InputError message={errors.payment_status} />
                    </div>

                    {/* Conditional Amount Paid Input */}
                    {data.payment_status === 'partial' && (
                        <div className="space-y-2">
                            <Label htmlFor="amount_paid">Partial Amount Paid</Label>
                            <Input
                                id="amount_paid"
                                type="number"
                                max={data.total_price}
                                value={data.amount_paid == 0 ? '' : data.amount_paid}
                                onChange={(e) => handlePartialPaymentChange(e.target.value)}
                                disabled={processing}
                            />
                            <div className="text-sm font-medium">Balance: {data.payment_balance.toFixed(2)}</div>
                            <InputError message={errors.amount_paid} />
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button type="submit" disabled={processing} className="w-full">
                        {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Record Sale
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
