"use client";
import { Button, Card, CardBody, Col, Input, Label } from "reactstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import axios from "axios";
import { useQuery } from "react-query";
import { HtmlTableTittle, SearchTableButton } from "@/Constant";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { HtmlColumnData as HtmlColumnData } from "@/Data/Form&Table/Table/DataTable/DataSourceData";
import { useMemo, useState } from "react";
import PaginationDynamic from "@/utils/Paginations";
import Loading from "@/app/loading";
import CommonModal from "@/Components/UiKits/Modal/Common/CommonModal";
import { Close } from "@/Constant";
import { NewCarList, Posts, ScrollImageType, ShowroomList } from "@/Types/TableType";
import SinglePost from "@/Components/SinglePost/SinglePost";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/Redux/Hooks";
import NewCarDetials from "@/Components/SinglePost/NewCar";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const DealersList = () => {
  const token = localStorage.getItem("authToken");
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
  const router = useRouter();

  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [postId, setPostId] = useState<any>(null);
  const [detailModal, setDetailModal] = useState(false);
  const [getUpdate, setGetUpdate] = useState(false);

  const detailsToggle = (id: number) => {
    setPostId(id);
    return setDetailModal(!detailModal);
    // router.push(`/${i18LangStatus}/new_car/newcarpostdetails?id=${id}`);
  };

  const handleEdit = (id: number) => {
    setPostId(id);
    // return setDetailModal(!detailModal);
    router.push(`/${i18LangStatus}/new_car/carpost?id=${id}`);
  };

  const closeDetailModal = () => {
    detailsToggle(postId); // Call forwardToggle with the necessary argument (postId)
  };

  const openDetails = () => {
    router.push(`/${i18LangStatus}/new_car/newcarpostdetails?id=${postId}`);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/dealerlist`, {
        params: {
            status_id:1,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotal(response?.data?.last_page);


      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: dealers,
    error,
    isLoading,
  } = useQuery(`dealers_List_${page}${getUpdate}`, fetchData);

  const filteredItems = dealers?.filter((item: any) => {
    const lowerCaseFilterText = filterText.toLowerCase();

    return (
      (item?.make && item?.make.toLowerCase().includes(lowerCaseFilterText)) ||
      (item?.model_name &&
        item?.model_name.toLowerCase().includes(lowerCaseFilterText)) ||
      (item?.newcarpost_variants &&
        item?.newcarpost_variants
          .toLowerCase()
          .includes(lowerCaseFilterText)) ||
      (item?.newcarpost_price &&
        item?.newcarpost_price.toString().includes(lowerCaseFilterText))
    );
  });

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

  const PostsColumn: TableColumn<ShowroomList>[] = [
    {
      name: "S.no",
      selector: (row) => row.showroom_id,
    },

    {
      name: "Showroom name",
      selector: (row) => row.showroom_name,
    },

    {
      name: "Showroom No",

      selector: (row) => row.showroom_no,
    },

    {
      name: "showroom_address",
      selector: (row) => row.showroom_address,
    },

   

    {
      name: "Action",
      cell: (row) => {
        return (
          <ul
            className="action simple-list d-flex flex-row gap-2"
            key={row?.showroom_id}
          >
            <li className="edit">
              <button
                className="p-0 border-0 bg-transparent"
                onClick={() => handleEdit(row?.showroom_id)}
              >
                <i className="icon-pencil" />
              </button>
            </li>

            <li className="delete">
              <button
                className="p-0 border-0 bg-transparent"
                onClick={() => handleDelete(row?.showroom_id)}
              >
                <i className="icon-trash" />
              </button>
            </li>

            <li className="view">
              <button
                className="p-0 border-0 bg-transparent"
                onClick={() => {
                  detailsToggle(row?.showroom_id);
                }}
              >
                <i className="icon-eye link-primary" />
              </button>
            </li>
          </ul>
        );
      },
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
                data={dealers}
                columns={PostsColumn}
                highlightOnHover
                subHeader
                striped
                fixedHeader
                fixedHeaderScrollHeight="70vh"
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
        size="lg"
      >
        <div className="modal-toggle-wrapper">
          <NewCarDetials id={postId} />
          <div className=" d-flex align-items-center pt-2">
            <Button
              color="secondary"
              className="d-flex m-auto"
              onClick={closeDetailModal}
            >
              {Close}
            </Button>
            <Button
              color="secondary"
              className="d-flex m-auto"
              onClick={openDetails}
            >
              {"View More"}
            </Button>
          </div>
        </div>
      </CommonModal>
    </Col>
  );
};

export default DealersList;
