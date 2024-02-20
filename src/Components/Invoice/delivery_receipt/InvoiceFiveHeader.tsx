import TopBarInvoice from "../Common/topBar";

const InvoiceFiveHeader = () => {
  return (
    <>
   
   <TopBarInvoice/>

         
<h4 className="text-center my-4 fs-4 fw-bolder" style={{color:"#7d0202"}}>Delivery Receipt</h4>
         

         <div>
<p className="fs-6 lh-lg">I the undersigned..............................................................................................................................</p>

<p className="fs-6 lh-lg">S/O..............................................................................................................................</p>

<p className="fs-6 lh-lg">R/O..................................................................................................................
................................................................................................................................................  </p>

<p className="fs-6 lh-lg">Have taken the delivery of Car Regd. No.............................................</p>

<p className="fs-6 lh-lg">Bearing Chassis No.................................... Engine No................................. 
Make........................
Colour........................ From Mr......................................... NIC / Passport No............................ </p>

<p className="fs-6 lh-lg"> Address..............................................................................................................................................................................</p>

<p className="fs-6 lh-lg">Contact No....................................... C/O......................................................................................</p>

<p className="fs-6 lh-lg my-2">For my personal use complete in all respects with registration documents. I shall be 
fully legally responsible for its maintenance, accident, Road-Tax, Police Challan after 
taking the deliver and also for its miss use of any kind. I have checked up the vehicle 
thoroughly and I am fully satisfied. As per motor transport rules, I hereby promise 
that, I shall get the vehicle transferred in my name within 7 days of purchase. The 
vehicle is bought on as is where is basis. I further confirm that I have paid full & final 
payment to the owner against the purchase of above said vehicle. I shall be fully 
responsible for any kind of declaration problems in future.</p>

<p className="fs-6 lh-lg mt-2 mb-4">Buyer is responsible to ensure vehicle is clear from CPLC & other government 
departments if required. Fame Wheels is not responsible for any dispute or legal 
matter related to vehicle.</p>


<p className="fs-6 lh-lg">Place........................ Date.................. Time.................... a.m./ p.m.</p>
<div>
<p className="fs-6 lh-lg">Given delivery of above said vehicle against full & final payment.</p>
</div>

<div className="d-flex justify-content-around mt-5 gap-4">

<div className="p-2 w-50">

  <h4 className="my-2">Seller's Signature</h4>

<p className="fs-6 lh-lg">Name.............................................</p>

<p className="fs-6 lh-lg">Address..............................................................................................................................................................................................</p>

<p className="fs-6 lh-lg">Tel..........................................</p>


</div>

<div className="p-2 w-50">

  <h4 className="my-2">Buyers's Signature</h4>

<p className="fs-6 lh-lg"> Name.............................................</p>

<p className="fs-6 lh-lg"> Address..............................................................................................................................................................................................</p>

<p className="fs-6 lh-lg"> Tel..........................................</p>


</div>


</div>



         </div>


 </>

  );
};

export default InvoiceFiveHeader;
