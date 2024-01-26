"use client";
import { Button, Card, CardBody, Col, Input, Label } from "reactstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import axios from "axios";
import { useQuery } from "react-query";
import { HtmlTableTittle, SearchTableButton } from "@/Constant";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import {
  HtmlColumnData as HtmlColumnData,
} from "@/Data/Form&Table/Table/DataTable/DataSourceData";
import { useMemo, useState } from "react";
import PaginationDynamic from "@/utils/Paginations";
import Loading from "@/app/loading";
import CommonModal from "@/Components/UiKits/Modal/Common/CommonModal";
import {
  Close,
} from "@/Constant";
import { NewCarList, Posts } from "@/Types/TableType";
import SinglePost from "@/Components/SinglePost/SinglePost";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/Redux/Hooks";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const CarPostList = () => {
  const token = localStorage.getItem("authToken");
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
const router = useRouter()

  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [postId, setPostId] = useState<any>(null);
  const [detailModal, setDetailModal] = useState(false);
  const [getUpdate, setGetUpdate] = useState(false);

  const detailsToggle = (id: number) => {
    setPostId(id);
    // return setDetailModal(!detailModal);
    router.push(`/${i18LangStatus}/new_car/newcarpostdetails?id=${id}`)
  };

  const closeDetailModal = () => {
    detailsToggle(postId); // Call forwardToggle with the necessary argument (postId)
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/newcarpostlilst`,
        {
         params:{
page
         },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotal(response?.data?.last_page);
      console.log(response?.data);
      return response?.data?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: cars,
    error,
    isLoading,
  } = useQuery(`new_carList${page}${getUpdate}`, fetchData);

  const filteredItems = HtmlColumnData.filter(
    (item: any) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );
  const subHeaderComponentMemo = useMemo(() => {
    return (
      <div
        id="basic-1_filter"
        className="dataTables_filter d-flex align-items-center"
      >
        <Label className="me-1">{SearchTableButton}:</Label>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFilterText(e.target.value)
          }
          type="search"
          value={filterText}
        />
      </div>
    );
  }, [filterText]);

  const PostsColumn: TableColumn<NewCarList>[] = [
    {
      name: "S.no",
      selector: (row) => row.newcarpost_id,
      sortable: true,
    },

    {
      name: "Make",
      selector: (row) => row.make,
      sortable: true,
    },

    {
      name: "Model",
      selector: (row) => row.model_name,
      sortable: true,
    },

    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },

    {
      name: "Price",
      selector: (row) => row.newcarpost_price,
      sortable: true,
    },
    {
      name: "variants",
      selector: (row) => row.newcarpost_variants,
      sortable: true,
    },

    {
      name: "Action",
      // cell: (row) => <ActionDataSourcePosts id={row.postId} />,
      cell: (row) => {
        return (
          <ul
            className="action simple-list d-flex flex-row gap-2"
            key={row?.newcarpost_id}
          >
            <li className="delete">
              <button
                className="p-0 border-0 bg-transparent"
                onClick={() => handleDelete(row?.newcarpost_id)}
              >
                <i className="icon-trash" />
              </button>
            </li>

            <li className="view">
              <button
                className="p-0 border-0 bg-transparent"
                onClick={() => {
                  detailsToggle(row?.newcarpost_id);
                }}
              >
                <i className="icon-eye link-primary" />
              </button>
            </li>
          </ul>
        );
      },
      sortable: true,
    },
  ];

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/savenewcarpostdelete`, {
        params: {
          newcarpost_id: id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response?.data?.message || "Deleted Succeffully");
      setGetUpdate(true);
      console.log("approve response =======", response?.data);
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
            <div className="table-responsive">
              <DataTable
                className="theme-scrollbar"
                data={cars}
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

      <CommonModal
        centered
        isOpen={detailModal}
        toggle={closeDetailModal}
        size="xl"
      >
        <div className="modal-toggle-wrapper">
          <SinglePost id={postId} />

          <Button
            color="secondary"
            className="d-flex m-auto"
            onClick={closeDetailModal}
          >
            {Close}
          </Button>
        </div>
      </CommonModal>
    </Col>
  );
};

export default CarPostList;
