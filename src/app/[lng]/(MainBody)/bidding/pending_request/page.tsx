"use client";
import {
  Button,
  Card,
  CardBody,
  Col,
  Input,
  Label,
  Form,
  FormGroup,
} from "reactstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import axios from "axios";
import { useQuery } from "react-query";
import { HtmlTableTittle, SearchTableButton } from "@/Constant";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import {
  HtmlColumnData as HtmlColumnData,
  HtmlData,
  DealerColumn,
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

const PendingRequests = () => {
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState("test123@gmail.com");
  const [inspectionSlot, setInspectionSlot] = useState("Test@123");

  const token = localStorage.getItem("authToken");

  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [total, setTotal] = useState(0);
  const [postId, setPostId] = useState<any>(null);
  const [detailModal, setDetailModal] = useState(false);
  const [forwardModal, setForwardModal] = useState(false);
  const [getUpdate, setGetUpdate] = useState(false);

  const detailsToggle = (id: number) => {
    setPostId(id);
    return setDetailModal(!detailModal);
  };

  const closeDetailModal = () => {
    detailsToggle(postId); // Call forwardToggle with the necessary argument (postId)
  };

  const closeForwardModal = () => {
    forwardToggle(postId); // Call forwardToggle with the necessary argument (postId)
  };
  const forwardToggle = (row: any) => {
    setPostId(row?.postId);
    setAddress(row?.address);
    return setForwardModal(!forwardModal);
  };
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${BASE_URL}/statuswiseauctionpostlist`,
        {
          params: {
            auctionpoststatus_id: 1,
            page: page,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotal(response?.data?.data?.last_page);
      console.log(response?.data);
      return response?.data?.data?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: users,
    error,
    isLoading,
  } = useQuery(`pending_bidding_${page}${getUpdate}`, fetchData);

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
    },

    {
      name: "Make",
      selector: (row) => row.makeName,
    },

    {
      name: "Model",
      selector: (row) => row.modelName,
    },

    {
      name: "Year",
      selector: (row) => row.yearName,
    },

    {
      name: "City Name",
      selector: (row) => row.cityName,
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
                title="Forward"
                className="p-0 border-0 bg-transparent"
                onClick={() => {
                  forwardToggle(row);
                }}
              >
                <i className="fa fa-mail-forward"></i>
              </button>
            </li>
            <li className="delete">
              <button
                title="Reject"
                className="p-0 border-0 bg-transparent"
                onClick={() => handleReject(row?.postId)}
              >
                <i className="icofont icofont-close"></i>
              </button>
            </li>

            <li className="primary-color">
              <button
                title="Normal"
                className="p-0 border-0 bg-transparent"
                onClick={() => handleNormal(row?.postId)}
              >
                <i className="icofont icofont-magic txt-primary"></i>
                {/* normal */}
              </button>
            </li>

            <li className="">
              <button
                title="Sale Through Famewheels"
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
    },
  ];
  const filteredItems = users?.filter(
    (item: any) =>
      item?.makeName &&
      item?.makeName.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleReject = async (id: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/moveauctionpost`, {
        params: {
          post_id: id,
          auctionpoststatus_id: 4,
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

  const handleApprove = async (id: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/moveauctionpost`, {
        params: {
          post_id: id,
          auctionpoststatus_id: 2,
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

  const formSubmitHandle = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${BASE_URL}/moveauctionpost`, {
        params: {
          post_id: postId,
          auctionpoststatus_id: 2,
          address: address,
          inspection_slot: inspectionSlot,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response?.data?.message || "Approved Succeffully");
      setGetUpdate(true);
      closeForwardModal();
    } catch (error: any) {
      toast.error(error?.data?.message || "Confirmation Failed");
      console.error("Login failed", error);
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
                className="theme-scrollbar "
                data={filteredItems}
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

      <CommonModal
        centered
        isOpen={forwardModal}
        toggle={closeForwardModal}
        size="md"
      >
        <div className="modal-toggle-wrapper">
          <Form className="theme-form">
            <h4>Confirmation</h4>
            <p>Confirm Address & Inspection Slot to proceed to inspection</p>
            <FormGroup>
              <Label className="col-form-label">Address</Label>
              <Input
                type="text"
                defaultValue={address}
                onChange={(event: any) => setAddress(event.target.value)}
                placeholder="Complete address"
              />
            </FormGroup>
            <FormGroup>
              <Label className="col-form-label">Inspection Slot</Label>
              <div className="position-relative">
                <Input
                  className="digits"
                  type="datetime-local"
                  defaultValue="2023-05-03T18:45:00"
                  onChange={(event: any) =>
                    setInspectionSlot(event.target.value)
                  }
                />
              </div>
            </FormGroup>
            <FormGroup className="mb-0">
              <div className="text-center mt-3">
                <Button
                  type="submit"
                  color="primary"
                  // block
                  // className="w-100"
                  className=" m-1"
                  onClick={formSubmitHandle}
                >
                  Confirm
                </Button>
                <Button
                  color="secondary"
                  className=" m-1"
                  onClick={closeForwardModal}
                >
                  {Close}
                </Button>
              </div>
            </FormGroup>
          </Form>
        </div>
      </CommonModal>
    </Col>
  );
};

export default PendingRequests;
