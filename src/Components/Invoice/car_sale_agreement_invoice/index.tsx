import { Card, CardBody, Container, Table } from "reactstrap";
import InvoiceFiveHeader from "./InvoiceFiveHeader";

import { InvoiceButtons } from "../Common/InvoiceButtons";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";


const CarSaleAgreementInvoice = () => {

  const componentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
    <div ref={componentRef}>
      <Container className="invoice-2">
        <Card>
          <CardBody>
            <Table className="table-wrapper table-responsive theme-scrollbar" borderless>
              <tbody>
                <tr>
                  <td>
                    <InvoiceFiveHeader />
                  </td>
                </tr>
                <tr>
                </tr>
                <tr>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Container>
    </div>
      <InvoiceButtons handlePrint={handlePrint} />
    </>
  );
};

export default CarSaleAgreementInvoice;
