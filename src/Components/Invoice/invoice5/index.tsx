import { Card, CardBody, Container, Table } from "reactstrap";
import InvoiceFiveHeader from "./InvoiceFiveHeader";
import InvoiceNumber from "./InvoiceNumber";
import InvoiceTable from "./InvoiceTable";
import InvoiceFiveSign from "./InvoiceFiveSign";
import { InvoiceButtons } from "../Common/InvoiceButtons";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";


const InvoiceFiveContainer = () => {

  const componentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
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
                  <InvoiceNumber />
                </tr>
                <tr>
                  <InvoiceTable />
                </tr>
                <InvoiceFiveSign />
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Container>
      <InvoiceButtons handlePrint={handlePrint} />
    </div>
  );
};

export default InvoiceFiveContainer;
