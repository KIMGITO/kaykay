<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::latest()->get();
        return Inertia::render('Customers/Index', ['customers' => $customers]);
    }

    // Show  form for new user

    public function create()
    {
        return Inertia::render('Customers/Add');
    }

    // Store new customer
    public function store(Request $request)
    {
       
// TODO: validate customers
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20|unique:customers,phone',
            'bill_duration' => 'required|in:daily,weekly,monthly|string',
            'location' => 'nullable|string|max:255',
            'note' => 'nullable|string|max:255',
        ]);
       

        Customer::create($validated);

        return redirect()->route('customers.index')->with('success', 'Customer created successfully');
    }
    public function edit(Customer $customer)
    {
        return Inertia::render('Customers/Add', [
            'initialData' => $customer,
        ]);
    }

    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'note' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20| unique:customers,phone,'.$customer->id,
            'location' => 'nullable|string|max:255',
        ]);

        $customer->update($validated);

        return redirect()->route('customers.index')->with('success', 'Customer updated successfully');
    }

    // Delete customer
    public function destroy(Customer $customer)
    {
        // Check if the customer has any associated orders or transactions
        if ($customer->orders()->count() > 0) {
            return redirect()->route('customers.index')->with('error', 'Cannot delete customer with associated orders');
        }
        if ($customer->transactions()->count() > 0) {
            return redirect()->route('customers.index')->with('error', 'Cannot delete customer with associated transactions');
        }
        // Proceed with deletion if no associated orders or transactions
        
        $customer->delete();

        return redirect()->route('customers.index')->with('success', 'Customer deleted successfully');
    }
}
