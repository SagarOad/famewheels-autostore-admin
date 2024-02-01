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
import { Inspection, Posts } from "@/Types/TableType";
import SinglePost from "@/Components/SinglePost/SinglePost";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const ApprovedInspection = () => {
  const [filterText, setFilterText] = useState("");
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
          inspectionstatus_id: 5,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setPage(response?.data?.data?.current_page);
      setTotal(response?.data?.data?.last_page);
      console.log(response?.data);
      return response?.data?.data?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: inspectionData,
    error,
    isLoading,
  } = useQuery(`approved_inspection_${page}`, fetchData);

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

  const PostsColumn: TableColumn<Inspection>[] = [
    {
      name: "Make",
      selector: (row) => row.make_name,
      sortable: true,
    },

    {
      name: "Model",
      selector: (row) => row.model_name,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.city_name,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },

    {
      name: "Make",
      selector: (row) => row.phone,
      sortable: true,
    },

    {
      name: "Model",
      selector: (row) => row.inspection_slot,
      sortable: true,
    },

    // {
    //   name: "Action",
    //   // cell: (row) => <ActionDataSourcePosts id={row.postId} />,
    //   cell: (row) => {
    //     return (
    //       <ul
    //         className="action simple-list d-flex flex-row gap-2"
    //         key={row?.postId}
    //       >
    //         <li className="edit">
    //           <button className="p-0 border-0 bg-transparent">
    //             <i className="icon-pencil-alt" />
    //           </button>
    //         </li>
    //         <li className="delete">
    //           <button className="p-0 border-0 bg-transparent">
    //             <i className="icon-trash" />
    //           </button>
    //         </li>
    //         <li className="view">
    //           <button
    //             className="p-0 border-0 bg-transparent"
    //             onClick={() => {
    //               centeredToggle(row?.postId);
    //             }}
    //           >
    //             <i className="icon-eye link-primary" />
    //           </button>
    //         </li>
    //       </ul>
    //     );
    //   },
    //   sortable: true,
    // },
  ];

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
                data={inspectionData}
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

export default ApprovedInspection;
