import { ImagePath } from "@/Constant";
import { Table } from "reactstrap";
import InvoiceAddress from "./InvoiceAddress";
import InvoiceDetail from "./InvoiceDetail";
import InvoiceRightSide from "./InvoiceRightSide";

const InvoiceFiveHeader = () => {
  return (
    <>
   
   <Table className="table-responsive" style={{ width: "100%" }} borderless>
      <tbody>
        <tr style={{ padding: "28px 0 5px", display: "flex", justifyContent: "space-between", alignItems: "center",width:"100%" }} className="flex-column">
          <td className="w-100">
            <InvoiceRightSide />
          </td>
          <td className="w-25">
            <img className="img-fluid for-light" src={`${ImagePath}/logo/fame-wheels-logo.png`} alt="logo" />
            <img className="img-fluid for-dark" src={`${ImagePath}/logo/fame-wheels-logo.png`} alt="logo" />
          </td>
        </tr>
       
      </tbody>
    </Table>
         
<h4 className="text-center my-4 fs-4 fw-bolder" style={{color:"#7d0202"}}>SALE RECEIPT</h4>
         

         <div>
<p className="fs-6 lh-lg">Received with thanks from......................................................................... s/o................................................... CNIC#............................................. Resident of..................................................................................................................................................... A sum of Rs....................... (In words)................................................................................................................ In from of Cash / Cheque #....................................... for the sale of vehicle being its rightful owner, with details as follows.</p>
<p className="fs-6 lh-lg">Make......................................... Model................................ Registration#........................................
Registration Year........................ Engine#................................... Chassis#.................................
Model Year................................. Color................................................. Engine size........................                           
Book/Card-(original/duplicate),  File pages............................................ (original/duplicate).
I hereby confirm that I have received the full payment and there is nothing 
outstanding against the purchaser regarding the sale of  above mentioned vehicle. I 
am solely responsible for any documentation irregularities, payments, fines, traffic 
liabilities including challans, court proceedings and or any other illegal activities till 
today dated........................................ Month................................ Year.........................</p>


<p className="fs-6 my-2 lh-lg">Buyer is responsible toensure vehicle is clear from CPLC & other government departments if
required. Fame Wheels is not responsible for any dispute or legal matter related to vehicle.</p>

<h4 className="mt-3">Seller Details:</h4>



<p className="fs-6 lh-lg my-2">Signature...................................... Thumb Impression.............................</p>
<p className="fs-6 lh-lg my-2">Name..................................... Address.................................................................................................................................................................... Contact#.............................</p>




<div className="d-flex justify-content-between mt-2">

<div>
<h4 className="my-2">Witness 1:</h4>

<p className="fs-6 lh-lg my-2">Signature..............................................................</p>
<p className="fs-6 lh-lg my-2">Name..............................................................</p>
<p className="fs-6 lh-lg my-2">S/O..............................................................</p>
<p className="fs-6 lh-lg my-2">CNIC#..............................................................</p>
<p className="fs-6 lh-lg my-2">Contact#..............................................................</p>



</div>


<div>
<h4 className="my-2">Witness 2:</h4>

<p className="fs-6 lh-lg my-2">Signature..............................................................</p>
<p className="fs-6 lh-lg my-2">Name..............................................................</p>
<p className="fs-6 lh-lg my-2">S/O..............................................................</p>
<p className="fs-6 lh-lg my-2">CNIC#..............................................................</p>
<p className="fs-6 lh-lg my-2">Contact#..............................................................</p>



</div>


</div>








         </div>


 </>

  );
};

export default InvoiceFiveHeader;
