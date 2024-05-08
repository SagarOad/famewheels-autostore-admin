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
import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { HtmlTableTittle, PaymentStatus, SearchTableButton } from "@/Constant";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PaginationDynamic from "@/utils/Paginations";
import Loading from "@/app/loading";
import { toast } from "react-toastify";
import {
  BrandListTableData,
  BrandListTableDataColumn,
} from "@/Data/Application/Ecommerce";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const brandslist = () => {
  const router = useRouter();

  const [filterText, setFilterText] = useState("");
  const [status, setStatus] = useState<number | any>(1);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [deleted, setDeleted] = useState(false);
  const [edit, setEdit] = useState(false);

  const fetchBrandList = async () => {
    const res = await axios.get(`${BASE_URL}/brand-list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data[1]?.data;
    };

  const {
    data: BrandList,
    error: brandError,
    isLoading,
  } = useQuery(`myBrandsList_${deleted}`, fetchBrandList);

  console.table(BrandList);

  // useEffect(() => {
  //   fetchBrandList();
  // }, []);

  const handleDeleteBrand = async (brandId: any) => {

    try {
      const formData: any = new FormData();
      formData.append("brand_id", brandId);

      await axios.post(`${BASE_URL}/delete-brand`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Brand Deleted!");
      // router.push(`/en/brands/brandslist`);
    setDeleted(!deleted);
    } catch (error) {
      console.error("Error deleting brand:", error);
      toast.error("Failed to delete brand");
    } finally {
      // setDeleted(false);
    }
  };



  const handleEditBrand = async (brandId: any) => {
    setEdit(true)

    router.push(`/en/brands/addbrand?id=${brandId}`)

  };




  const filteredItems = BrandList?.filter((item: any) =>
    item.brand_name.toLowerCase().includes(filterText.toLowerCase())
  );


  const token = localStorage.getItem("authToken");

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

  return (
    <>
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
                  columns={[
                    ...BrandListTableDataColumn,
                    {
                      name: "Action",
                      cell: (row) => (
                        <div className="d-flex align-items-center justify-content-center gap-2">
                        <Button
                          color="danger"
                          onClick={() => handleDeleteBrand(row.brand_id)}
                          >
                          Delete
                        </Button>

                        <Button
                          color="primary"
                          onClick={() => handleEditBrand(row.brand_id)}
                        >
                          Edit
                        </Button>


                          </div>
                      ),
                    },
                  ]}
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
      </Col>
    </>
  );
};

export default brandslist;
