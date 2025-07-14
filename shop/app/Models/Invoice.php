<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Barryvdh\DomPDF\Facade\Pdf as PDF;

class Invoice extends Model
{
    // generate sale receipt 
    // monthly receipts,

    public function Customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function Sale()
    {
        return $this->belongsTo(Sale::class);
    }

    // In Sale.php
    public static function generateSaleInvoice( $id)
    {
        // $sale = Sale::with(['payment', 'customer', 'saleStock.stock.product'])
        //     ->where('id', $id)
        //     ->first();

        // dd($sale);

        // $pdf = PDF::loadView('PDF.sales_pdf', ['data' => $sale])
        // ->setPaper([0, 0, 226.77, 566.93])
        // ->setOptions([
        //     'defaultFont' => 'Helvetica',
        //     'isHtml5ParserEnabled' => true,
        //     'isRemoteEnabled' => true,
        // ]);

        return view('PDF.sales_pdf');

        // return $pdf->stream("Invoice-{$sale->invoice_number}.pdf");

       
    }



    // generate sale invoice

    // public function InvoicePdf()
    // {
    //     $invoices = Sale::with([
    //         'sale',
    //         'sale.stock.product',
    //         'sale.customer',
    //         'sale.payments',
    //     ])
    //         ->where('is_paid', false)
    //         ->get()
    //         ->groupBy(function (Credit $credit) {
    //             return $credit->sale->customer_id;
    //         });

    //     $customPaperSize = [0, 0, 648, 1440]; // Width: 9in (648pt), Height: 20in (1440pt)

    //     $pdf = Pdf::loadView('PDF.invoices', ['invoices' => $invoices])
    //         ->setPaper($customPaperSize, 'portrait')
    //         ->setOptions([
    //             'defaultFont' => 'sans-serif',
    //             'isHtml5ParserEnabled' => true,
    //             'isRemoteEnabled' => true,
    //             'isPhpEnabled' => true,
    //             'isFontSubsettingEnabled' => true,
    //             // 'dpi' => 300,
    //         ]);

    //     // Generate PDF content
    //     $pdfContent = $pdf->output();

    //     return response($pdfContent, 200, [
    //         'Content-Type' => 'application/pdf',
    //         'Content-Disposition' => 'inline; filename="unpaid_invoices_report.pdf"',
    //         'Content-Length' => strlen($pdfContent),
    //         'X-Frame-Options' => 'DENY',
    //         'X-Content-Type-Options' => 'nosniff',
    //         'Referrer-Policy' => 'no-referrer-when-downgrade',
    //         'Cache-Control' => 'no-store, no-cache, must-revalidate, max-age=0',
    //         'Pragma' => 'no-cache',
    //         'Content-Security-Policy' => "frame-ancestors 'none'",
    //     ]);
    // }
}
