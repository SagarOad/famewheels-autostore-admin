"use client";
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Tooltip,
} from "reactstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import axios from "axios";
import { useQuery } from "react-query";
import { HtmlTableTittle, PaymentStatus, SearchTableButton } from "@/Constant";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import {
  HtmlColumnData as HtmlColumnData,
  HtmlData,
} from "@/Data/Form&Table/Table/DataTable/DataSourceData";
import { FormEvent, useMemo, useState } from "react";
import PaginationDynamic from "@/utils/Paginations";
import Loading from "@/app/loading";
import CommonModal from "@/Components/UiKits/Modal/Common/CommonModal";
import {
  CenteredModals,
  Close,
  ImagePath,
  SomethingWentWrong,
  VerticallyCentered,
} from "@/Constant";
import { Categories, Posts } from "@/Types/TableType";
import SinglePost from "@/Components/SinglePost/SinglePost";
import { toast } from "react-toastify";
import { BrandListTableData, BrandListTableDataColumn } from "@/Data/Application/Ecommerce";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const brandslist = () => {

  const [filterText, setFilterText] = useState("");
  const [status, setStatus] = useState<number | any>(1);
  const [update, setUpdate] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [total, setTotal] = useState(0);
  const [postId, setPostId] = useState<any>(null);
  const [centred, setCentered] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState();
  const [inspectionId, setInspectionId] = useState<any>();
  const [paymentToken, setPaymentToken] = useState();

  const [tooltip2, settooltip2] = useState(false);



  const columns = [
    {
      name: "Brand ID",
      selector: "brand_id",
      sortable: true,
    },
    {
      name: "Brand Name",
      selector: "brand_name",
      sortable: true,
    },
    // Add more columns as needed
  ];

  const toggle2 = () => settooltip2(!tooltip2);

  const centeredToggle = (id: number) => {
    setInspectionId(id);
    return setCentered(!centred);
  };

  const closeToggle = () => {
    centeredToggle(postId);
  };

  const handleReport = () => {
    // window.open(
    //   `https://inspection.famewheels.com/inspection-report?93759f4414de88`
    // );
  };

  const fetchBrandList = async () => {
    const res = await axios.get(`${BASE_URL}/brand-list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data[1];
  };

  const {
    data: BrandList,
    error: brandError,
    isLoading,
  } = useQuery("myBrands", fetchBrandList);

console.log(BrandList);

const filteredItems = BrandList?.filter((item: any) => item.brand_name.toLowerCase().includes(filterText.toLowerCase()));


  const token = localStorage.getItem("authToken");

  // console.log(PostsColumn, "Post Columns");

  const statusArray = [
    { value: 1, name: "Pending" },
    { value: 2, name: "Start" },
    { value: 3, name: "Complete" },
    { value: 4, name: "Rejected" },
    { value: 5, name: "Approved" },
  ];

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <div
        id="basic-1_filter"
        className="dataTables_filter d-flex align-items-center gap-3"
      >
        <div className="d-flex align-items-center">
          <Label className="me-1">{SearchTableButton}:</Label>
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFilterText(e.target.value)
            }
            type="search"
            value={filterText}
          />
        </div>

        <FormGroup className="mt-3">
          <Input
            name="status"
            type="select"
            placeholder={"Inspection Status"}
            className="form-control form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="" disabled selected>
              Select Inspection Status
            </option>
            {statusArray?.map((item) => (
              <option value={item.value}>{item.name}</option>
            ))}
          </Input>
        </FormGroup>
      </div>
    );
  }, [filterText, status]);

  const paymentMethodArr = ["JazzCash", "Payfast"];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${BASE_URL}/statuswiseinspectionlistupdate`,
        {
          params: {
            payment_method: paymentMethod,
            security_deposit: securityDeposit,
            payment_token: paymentToken,
            inspection_id: inspectionId,
            payment_status: 1,
          },
        }
      );

      toast.success(response?.data?.message);
      setCentered(false);
      setUpdate(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Col sm="12">
      <Card className="basic-data-table">
        {isLoading ? (
          <Loading />
        ) : (
          <CardBody>
            <Row>
              <Col md="3" xs="8"></Col>
            </Row>

            <div className="table-responsive">
              <DataTable
                className="theme-scrollbar"
                data={filteredItems}
                columns={BrandListTableDataColumn}
                striped
                highlightOnHover
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
              />
            </div>
            <PaginationDynamic
              totalPages={total}
              currentPage={page}
              setCurrentPage={setPage}
            />
          </CardBody>
        )}
      </Card>

      <CommonModal centered isOpen={centred} toggle={closeToggle} size="xl">
        <div className="modal-toggle-wrapper">
          <h4 className="my-3 faq-title">Payment Info</h4>

          <form onSubmit={handleSubmit}>
            <Row>
              <Col lg="6" md="6">
                <FormGroup>
                  <Label>Payment Method</Label>
                  <Input
                    required
                    name="bodyType"
                    type="select"
                    placeholder={"Payment Method"}
                    className="form-control form-select"
                    value={paymentMethod}
                    onChange={(e: any) => setPaymentMethod(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Dealer City
                    </option>
                    {paymentMethodArr?.map((method: any, index) => (
                      <option key={index} value={method}>
                        {method}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>

              <Col lg="6" md="6">
                <FormGroup>
                  <Label check>Security Deposit</Label>
                  <Input
                    required
                    name="color"
                    type="number"
                    className="form-control"
                    placeholder="Enter Security Deposit"
                    value={securityDeposit}
                    onChange={(e: any) => setSecurityDeposit(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col lg="6" md="6">
                <FormGroup>
                  <Label check>Transaction Id</Label>
                  <Input
                    required
                    name="color"
                    type="text"
                    className="form-control"
                    placeholder="Enter Transaction Id"
                    value={paymentToken}
                    onChange={(e: any) => setPaymentToken(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col lg="6" md="6">
                <FormGroup>
                  <Label check>Inspection Token</Label>
                  <Input
                    required
                    name="color"
                    type="number"
                    className="form-control"
                    placeholder="Enter Inspection Token"
                    value={inspectionId}
                  />
                </FormGroup>
              </Col>
            </Row>

            <div className="d-flex justify-content-end align-items-center gap-3">
              <Button color="primary" type="submit">
                Submit
              </Button>

              <Button color="secondary" type="button" onClick={closeToggle}>
                {Close}
              </Button>
            </div>
          </form>
        </div>
      </CommonModal>
    </Col>
  );
};

export default brandslist;
