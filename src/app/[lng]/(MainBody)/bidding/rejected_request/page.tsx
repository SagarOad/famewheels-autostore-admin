"use client";
import { Button, Card, CardBody, Col, Input, Label } from "reactstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import axios from "axios";
import { useQuery } from "react-query";
import { HtmlTableTittle, SearchTableButton } from "@/Constant";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import {
  HtmlColumnData as HtmlColumnData,
  HtmlColumn,
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

const HtmlSourcedData = () => {
  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [total, setTotal] = useState(0);
  const [postId, setPostId] = useState<any>(null);
  const [centred, setCentered] = useState(false);
  const [getUpdate, setGetUpdate] = useState(false);

  const centeredToggle = (id:number) => {
    setPostId(id)
   return setCentered(!centred);
  }

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`http://146.71.76.22/famewheelsbackend/statuswiseauctionpostlist`, {
        params: {
          auctionpoststatus_id: 4,
          page: page,
        },
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvb25saW5lcGF5bWVudC5mYW1ld2hlZWxzLmNvbVwvYWRtaW5sb2dpbiIsImlhdCI6MTcwNTQ4MjAxNywiZXhwIjoxNzM3MDE4MDE3LCJuYmYiOjE3MDU0ODIwMTcsImp0aSI6IkVzS0tCeWZBU2p2NmJROWciLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.GhJbkN0daNzXoCrulaB55kI82fN9XnxT_Yl2ccaw4Cg`,
        },
      });
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
  } = useQuery(`all_post_${page}${getUpdate}`, fetchData);

  const filteredItems = HtmlColumnData.filter(
    (item: any) =>item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
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
      name: "Action",
      // cell: (row) => <ActionDataSourcePosts id={row.postId} />,
      cell: (row) => {
        return (
          <ul className="action simple-list d-flex flex-row gap-2" key={row?.postId}>
          {/* <li className="edit">
            <button className="p-0 border-0 bg-transparent" onClick={()=>handleApprove(row?.postId)}>
            <i className="icofont icofont-check"></i>
            </button>
          </li>
          <li className="delete">
            <button className="p-0 border-0 bg-transparent" onClick={()=>handleReject(row?.postId)}>
              <i className="icon-trash" />
            </button>
          </li> */}

          <li className="delete">
            <button className="p-0 border-0 bg-transparent" onClick={()=>handleNormal(row?.postId)}>
              <i className="icon-trash" />
              normal
            </button>
          </li>

          <li className="delete">
            <button className="p-0 border-0 bg-transparent" onClick={()=>handleThrough(row?.postId)}>
              <i className="icon-trash" />
              through
            </button>
          </li>

          <li className="view">
            <button className="p-0 border-0 bg-transparent" onClick={()=>{centeredToggle(row?.postId)
            }}>
              <i className="icon-eye link-primary" />
            </button>
          </li>
        </ul>
        );
      } ,
      sortable: true,
    },
  ];

  const handleNormal = async (id: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/moveauctionpost`, {
        params: {
          post_id: id,
          auctionpoststatus_id: 5,
        },
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvb25saW5lcGF5bWVudC5mYW1ld2hlZWxzLmNvbVwvYWRtaW5sb2dpbiIsImlhdCI6MTcwNTQ4MjAxNywiZXhwIjoxNzM3MDE4MDE3LCJuYmYiOjE3MDU0ODIwMTcsImp0aSI6IkVzS0tCeWZBU2p2NmJROWciLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.GhJbkN0daNzXoCrulaB55kI82fN9XnxT_Yl2ccaw4Cg`,
        },
      });
      toast.success(response?.data?.message || "Rejected Succeffully");
      setGetUpdate(true);
      console.log("approve response =======", response?.data);
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
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvb25saW5lcGF5bWVudC5mYW1ld2hlZWxzLmNvbVwvYWRtaW5sb2dpbiIsImlhdCI6MTcwNTQ4MjAxNywiZXhwIjoxNzM3MDE4MDE3LCJuYmYiOjE3MDU0ODIwMTcsImp0aSI6IkVzS0tCeWZBU2p2NmJROWciLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.GhJbkN0daNzXoCrulaB55kI82fN9XnxT_Yl2ccaw4Cg`,
        },
      });
      toast.success(response?.data?.message || "Rejected Succeffully");
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

      <CommonModal centered isOpen={centred} toggle={centeredToggle} size="xl">
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

<SinglePost id={postId}/>

          <Button
            color="secondary"
            className="d-flex m-auto"
            onClick={centeredToggle}
            >
            {Close}
          </Button>
            </div>
      </CommonModal>
    </Col>
  );
};

export default HtmlSourcedData;


