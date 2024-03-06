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
import {
  CenteredModals,
  Close,
  ImagePath,
  SomethingWentWrong,
  VerticallyCentered,
} from "@/Constant";
import { Posts } from "@/Types/TableType";
import SinglePost from "@/Components/SinglePost/SinglePost";
import { toast } from "react-toastify";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const RejectedRequests = () => {
  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [total, setTotal] = useState(0);
  const [postId, setPostId] = useState<any>(null);
  const [detailModal, setDetailModal] = useState(false);

  const [getUpdate, setGetUpdate] = useState(false);

  const detailsToggle = (id: number) => {
    setPostId(id);
    return setDetailModal(!detailModal);
  };

  const closeDetailModal = () => {
    detailsToggle(postId); // Call forwardToggle with the necessary argument (postId)
  };
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${BASE_URL}/statuswiseauctionpostlist`,
        {
          params: {
            auctionpoststatus_id: 4,
            page: page,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotal(response?.data?.data?.last_page);
      return response?.data?.data?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: users,
    error,
    isLoading,
  } = useQuery(`rejected_bidding_${page}${getUpdate}`, fetchData);

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
      name: "City Name",
      selector: (row) => row.cityName,
      sortable: true,
    },
    {
      name: "User Name",
      selector: (row) => row.user_name,
    },
    {
      name: "User Phone",
      selector: (row) => row.phone,
    },
    {
      name: "User Phone",
      selector: (row) => row.user_address,
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
            <li className="Pending">
              <button
                className="p-0 border-0 bg-transparent"
                onClick={() => handleApprove(row?.postId)}
              >
                <i className="icofont icofont-check"></i>
              </button>
            </li>

            <li className="delete">
              <button
                title="Normal"
                className="p-0 border-0 bg-transparent"
                onClick={() => handleNormal(row?.postId)}
              >
                <i className="icofont icofont-magic txt-primary"></i>
                {/* normal */}
              </button>
            </li>

            <li className="delete">
              <button
                title="Sale Through famewheels"
                className="p-0 border-0 bg-transparent"
                onClick={() => handleThrough(row?.postId)}
              >
                <i className="icofont icofont-car text-danger"></i>
                {/* through */}
              </button>
            </li>

            <li className="view">
              <button
                title="Details"
                className="p-0 border-0 bg-transparent"
                onClick={() => {
                  detailsToggle(row?.postId);
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
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${BASE_URL}/moveauctionpost`, {
        params: {
          post_id: id,
          auctionpoststatus_id: 1,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response?.data?.message || "Rejected Succeffully");
      setGetUpdate(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleNormal = async (id: number) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${BASE_URL}/moveauctionpost`, {
        params: {
          post_id: id,
          auctionpoststatus_id: 5,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response?.data?.message || "Rejected Succeffully");
      setGetUpdate(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleThrough = async (id: number) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${BASE_URL}/moveauctionpost`, {
        params: {
          post_id: id,
          auctionpoststatus_id: 6,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response?.data?.message || "Rejected Succeffully");
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
                data={users}
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

export default RejectedRequests;
