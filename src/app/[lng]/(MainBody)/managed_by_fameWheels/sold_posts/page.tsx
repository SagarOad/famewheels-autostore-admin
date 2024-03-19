"use client";
import { Button, Card, CardBody, Col, Input, Label } from "reactstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import axios from "axios";
import { useQuery } from "react-query";
import { HtmlTableTittle, SearchTableButton } from "@/Constant";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import {
  HtmlColumnData as HtmlColumnData,
  HtmlData,
} from "@/Data/Form&Table/Table/DataTable/DataSourceData";
import { useMemo, useState } from "react";
import PaginationDynamic from "@/utils/Paginations";
import Loading from "@/app/loading";
import CommonModal from "@/Components/UiKits/Modal/Common/CommonModal";
import SinglePost from "@/Components/SinglePost/SinglePost";
import { Posts } from "@/Types/TableType";
import {
  CenteredModals,
  Close,
  ImagePath,
  SomethingWentWrong,
  VerticallyCentered,
} from "@/Constant";
import { toast } from "react-toastify";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const RejectedPosts = () => {
  const token = localStorage.getItem("authToken");

  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postId, setPostId] = useState<any>(null);
  const [centred, setCentered] = useState(false);
  const [getUpdate, setGetUpdate] = useState(false);

  const centeredToggle = (id: number) => {
    setPostId(id);
    return setCentered(!centred);
  };
  const closeToggle = () => {
    centeredToggle(postId);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/postthroughwheels`, {
        params: {
          status: 4,
          page: page,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setPage(response?.data?.data?.current_page);
      setTotal(response?.data?.data?.last_page);
      return response?.data?.wheelsadds?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: ads,
    error,
    isLoading,
  } = useQuery(
    `sold_featured_ads_${rowsPerPage}_${page}${getUpdate}`,
    fetchData
  );

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

  const PostsColumn: TableColumn<Posts>[] = [
    {
      name: "S.no",
      selector: (row) => row.postId,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },

    {
      name: "Vehicle Condition",
      selector: (row) => row.vehicleCondition,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "City Name",
      selector: (row) => row.cityName,
      sortable: true,
    },

    {
      name: "Make",
      selector: (row) => row.makeName,
      sortable: true,
    },

    {
      name: "Model",
      selector: (row) => row.modelName,
      sortable: true,
    },

    {
      name: "Year",
      selector: (row) => row.yearName,
      sortable: true,
    },

    {
      name: "Action",
      // cell: (row) => <ActionDataSourcePosts id={row.postId} />,
      cell: (row) => {
        return (
          <ul
            className="action simple-list d-flex flex-row gap-2"
            key={row?.postId}
          >
            <li className="edit">
              <button
                className="p-0 border-0 bg-transparent"
                onClick={() => handleApprove(row?.postId)}
              >
                <i className="icofont icofont-check"></i>
              </button>
            </li>
            {/* <li className="delete">
            <button className="p-0 border-0 bg-transparent">
              <i className="icon-trash" />
            </button>
          </li> */}
            <li className="view">
              <button
                className="p-0 border-0 bg-transparent"
                onClick={() => {
                  centeredToggle(row?.postId);
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

  const handleApprove = async (id: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/approvedeclinepost`, {
        params: {
          post_id: id,
          status_id: 1,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response?.data?.message || "Approved Succeffully");
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
                data={ads}
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

      <div className="social-profile">
        <CommonModal centered isOpen={centred} toggle={closeToggle} size="xl">
          <div className="modal-toggle-wrapper">
            <SinglePost id={postId} />

            <Button
              color="secondary"
              className="d-flex m-auto"
              onClick={closeToggle}
            >
              {Close}
            </Button>
          </div>
        </CommonModal>
      </div>
    </Col>
  );
};

export default RejectedPosts;
