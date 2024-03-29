"use client";
import CarSaleAgreementInvoice from "@/Components/Invoice/car_sale_agreement_invoice";
import DeliveryReceipt from "@/Components/Invoice/delivery_receipt";
import InvoiceFiveContainer from "@/Components/Invoice/invoice5/index";
import SaleInvoice from "@/Components/Invoice/sale_invoice";
import React from "react";

const page = () => {
  return (
    <div>
      <SaleInvoice />
      {/* <CarSaleAgreementInvoice/> */}
      {/* <DeliveryReceipt /> */}
    </div>
  );
};

export default page;
