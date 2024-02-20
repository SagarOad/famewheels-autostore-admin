import React from 'react'
import { Table } from 'reactstrap'
import InvoiceRightSide from './InvoiceRightSide'
import { ImagePath } from "@/Constant";


const TopBarInvoice = () => {
  return (
    <div>
         
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
    </div>
  )
}

export default TopBarInvoice
