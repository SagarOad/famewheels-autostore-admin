"use client";
import { Badge, Button, Card, CardBody, Col, Input, Label } from "reactstrap";
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
import { CustomCellInterFaces, ScrollImageType, User } from "@/Types/TableType";
import { toast } from "react-toastify";
import { useAppSelector } from "@/Redux/Hooks";
import CommonModal from "@/Components/UiKits/Modal/Common/CommonModal";
import UserRequest from "@/Components/UserRequest/UserRequest";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const MemberRequests = () => {
  const { user } = useAppSelector((state) => state.user);

  const token = localStorage.getItem("authToken");

  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [getUpdate, setGetUpdate] = useState(false);
  const [userId, setUserId] = useState<any>(null);
  const [detailModal, setDetailModal] = useState(false);
  const detailsToggle = (id: number) => {
    setUserId(id);
    return setDetailModal(!detailModal);
    // router.push(`/${i18LangStatus}/new_car/newcarpostdetails?id=${id}`);
  };
  const closeDetailModal = () => {
    detailsToggle(userId); // Call forwardToggle with the necessary argument (userId)
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${BASE_URL}/memberrequest`, {
        params: {
          is_verified: 2,
          page: page,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setPage(response?.data?.data?.current_page);
      setTotal(response?.data?.data?.last_page);
      return response?.data.data?.data;
    } catch {
      console.log(error);
    } finally {
      console.log(error);
    }
  };

  const {
    data: users,
    error,
    isLoading,
  } = useQuery(`memberRequests_${page}${getUpdate}`, fetchData);

  const filteredItems = users?.filter((item: any) => {
    const lowerCaseFilterText = filterText.toLowerCase();

    return (
      (item?.name && item?.name.toLowerCase().includes(lowerCaseFilterText)) ||
      (item?.email &&
        item?.email.toLowerCase().includes(lowerCaseFilterText)) ||
      (item?.phone &&
        item?.phone.toLowerCase().includes(lowerCaseFilterText)) ||
      (item?.cnic && item?.cnic.toLowerCase().includes(lowerCaseFilterText))
    );
  });

  const handleReject = async (id: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/updateuserverification`, {
        params: {
          edituser_id: id,
          is_verified: 4,
          id: user?.id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response?.data?.message || "Rejected Succeffully");
      setGetUpdate(true);
      setDetailModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/updateuserverification`, {
        params: {
          edituser_id: id,
          is_verified: 3,
          id: user?.id,
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

  const ScrollImage: React.FC<ScrollImageType> = ({ image, title }) => {
    return (
      <>
        <img
          className="img-fluid table-avtar"
          src={`${image}`}
          alt="userImage"
        />{" "}
        {title}
      </>
    );
  };
  const CustomBadge: React.FC<CustomCellInterFaces> = ({ position, color }) => {
    return (
      <Badge pill color={color}>
        {position}
      </Badge>
    );
  };

  const UserColumn: TableColumn<User>[] = [
    {
      name: "Name",
      cell: (row) => (
        <ScrollImage
          image={
            "https://cdn.pixabay.com/photo/2017/01/30/23/52/female-2022387_1280.png"
          }
          title={row.name}
        />
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },

    {
      name: "Role",
      cell: (row) => <CustomBadge color={row.color} position={row.role} />,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "CNIC",
      selector: (row) => row.cnic,
    },
    {
      name: "Action",
      cell: (row) => {
        return (
          <ul
            className="action simple-list d-flex flex-row gap-2"
            key={row?.id}
          >
            <li className="edit">
              <button
                className="p-0 border-0 bg-transparent"
                onClick={() => handleApprove(row?.id)}
              >
                <i className="icofont icofont-check"></i>
              </button>
            </li>
            <li className="delete">
              <button
                className="p-0 border-0 bg-transparent"
                onClick={() => handleReject(row?.id)}
              >
                <i className="icon-trash" />
              </button>
            </li>
            <li className="view">
              <button
                className="p-0 border-0 bg-transparent"
                onClick={() => {
                  detailsToggle(row?.id);
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
                data={filteredItems}
                columns={UserColumn}
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
        size="lg"
      >
        <div className="modal-toggle-wrapper">
          <UserRequest id={userId} />
          <div className=" d-flex align-items-center pt-3">
            {/* <Button
              color="secondary"
              className="d-flex m-auto"
              onClick={closeDetailModal}
            >
              Close
            </Button> */}
            <Button
              color="danger"
              className="d-flex m-auto"
              onClick={() => handleReject(userId)}
            >
              Reject
            </Button>
            <Button
              color="success"
              className="d-flex m-auto"
              onClick={() => handleApprove(userId)}
            >
              Approve
            </Button>
          </div>
        </div>
      </CommonModal>
    </Col>
  );
};

export default MemberRequests;
