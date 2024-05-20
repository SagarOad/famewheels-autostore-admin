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
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/Redux/Hooks";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const categorylist = () => {
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);

  const token = localStorage.getItem("authToken");

  const [filterText, setFilterText] = useState("");
  const [update, setUpdate] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/product-categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setPage(response?.data?.data?.current_page);
      setTotal(response?.data?.data?.last_page);
      return response?.data[1];
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: categoryData,
    error,
    isLoading,
  } = useQuery(`category_List_${page}${update}`, fetchData);

  const PostsColumn: TableColumn<Categories>[] = [
    {
      name: "S.No",
      selector: (row) => row.category_id,
    },
    {
      name: "Category",
      selector: (row) => row.category_name,
    },

    {
      name: "Action",
      cell: (row) => {
        return (
          <ul
            className="action simple-list d-flex flex-row gap-2"
            key={row?.category_id}
          >
            <li className="edit">
              <button
                className="p-0 border-0 bg-transparent"
                id="Tooltip-2"
                onClick={() => editCategory(row.category_id)}
              >
                <i className="icofont icofont-pencil link-primary fs-4"></i>
              </button>
              <Tooltip target={"Tooltip-2"} placement="top">
                Edit
              </Tooltip>
            </li>

            <li className="view">
              <button
                className="p-0 border-0 bg-transparent"
                onClick={() => removeCategory(row.category_id)}
              >
                <i className="icon-trash link-danger fs-5" />
              </button>
            </li>
          </ul>
        );
      },
    },
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
      </div>
    );
  }, [filterText]);

  const removeCategory = async (id: any) => {
    const formData = new FormData();

    formData.append("category_id", id);

    try {
      const response = await axios.post(
        `${BASE_URL}/delete-product-categories`,
        formData,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      if (response.status == 200) {
        setUpdate(true);
        toast.success(response?.data)
      }
    } catch (error) {
      console.log(error);
      toast.error("Couldn't Delete Category");
    }
  };

  const editCategory = async (id: number) => {
    router.push(`/en/categories/addcategory?id=${id}`);
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
                data={categoryData}
                columns={PostsColumn}
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
  );
};

export default categorylist;
