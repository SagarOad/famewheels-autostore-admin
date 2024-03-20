import { Card, CardBody, Container, Table } from "reactstrap";
import InvoiceFiveHeader from "./InvoiceFiveHeader";
import { InvoiceButtons } from "../Common/InvoiceButtons";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

const SaleInvoice = (data: any) => {
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <Container className="invoice-2">
        <div ref={componentRef}>
          <Card>
            <CardBody>
              <Table
                className="table-wrapper table-responsive theme-scrollbar"
                borderless
              >
                <tbody>
                  <tr>
                    <td>
                      <InvoiceFiveHeader post={data?.data} />
                    </td>
                  </tr>
                  <tr></tr>
                  <tr></tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </div>
      </Container>
      <InvoiceButtons handlePrint={handlePrint} />
    </>
  );
};

export default SaleInvoice;
