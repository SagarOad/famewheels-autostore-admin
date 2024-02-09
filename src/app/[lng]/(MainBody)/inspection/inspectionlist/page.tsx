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
} from "reactstrap";
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
import { Inspection, Posts } from "@/Types/TableType";
import SinglePost from "@/Components/SinglePost/SinglePost";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const InspectionList = () => {
  const [filterText, setFilterText] = useState("");
  const [status, setStatus] = useState<number | any>(1);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [total, setTotal] = useState(0);
  const [postId, setPostId] = useState<any>(null);
  const [centred, setCentered] = useState(false);

  const centeredToggle = (id: number) => {
    setPostId(id);
    return setCentered(!centred);
  };

  const closeToggle = () => {
    centeredToggle(postId);
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${BASE_URL}/statuswiseinspectionlist`, {
        params: {
          inspectionstatus_id: status,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setPage(response?.data?.data?.current_page);
      setTotal(response?.data?.data?.last_page);
      return response?.data?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: inspectionData,
    error,
    isLoading,
  } = useQuery(`pending_inspection_${page}${status}`, fetchData);

  const filteredItems = inspectionData?.filter(
    (item: any) =>
      item?.model_name &&
      item?.model_name.toLowerCase().includes(filterText.toLowerCase())
  );

  const PostsColumn: TableColumn<Inspection>[] = [
    {
      name: "Make",
      selector: (row) => row.make_name,
    },

    {
      name: "Model",
      selector: (row) => row.model_name,
    },
    {
      name: "City",
      selector: (row) => row.city_name,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },

    {
      name: "Phone",
      selector: (row) => row.phone,
    },

    {
      name: "Slot",
      selector: (row) => row.inspection_slot,
    },

    // {
    //   name: "Action",
    //   cell: (row) => {
    //     return (
    //       <ul
    //         className="action simple-list d-flex flex-row gap-2"
    //         key={row?.inspection_id}
    //       >
    //         <li className="edit">
    //           <button className="p-0 border-0 bg-transparent">
    //             <i className="icofont icofont-check" />
    //           </button>
    //         </li>
    //         <li className="delete">
    //           <button className="p-0 border-0 bg-transparent">
    //             <i className="icofont icofont-close"></i>
    //           </button>
    //         </li>
    //         <li className="view">
    //           <button
    //             className="p-0 border-0 bg-transparent"
    //             onClick={() => {
    //               centeredToggle(row?.inspection_id);
    //             }}
    //           >
    //             <i className="icon-eye link-primary" />
    //           </button>
    //         </li>
    //       </ul>
    //     );
    //   },
    // },
  ];

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

      <CommonModal centered isOpen={centred} toggle={closeToggle} size="xl">
        <div className="modal-toggle-wrapper">
          {/* <ul className="modal-img">
            <li className="text-center">
              <img src={`${ImagePath}/gif/danger.gif`} alt="error" />
            </li>
          </ul>
          <h4 className="text-center pb-2">{SomethingWentWrong}</h4>
          <p className="text-center">
            Attackers on malicious activity may trick you into doing something
            dangerous like installing software or revealing your personal
            informations.
          </p> */}

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
    </Col>
  );
};

export default InspectionList;
