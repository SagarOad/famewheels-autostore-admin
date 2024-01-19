"use client"
import { Card, CardBody, Col, Input, Label } from "reactstrap";
import DataTable from "react-data-table-component";
import axios from "axios"
import { useQuery } from "react-query";
import { HtmlTableTittle, SearchTableButton } from "@/Constant";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { HtmlColumnData as HtmlColumnData, HtmlColumn, HtmlData } from "@/Data/Form&Table/Table/DataTable/DataSourceData";
import { useMemo, useState } from "react";
import PaginationDynamic from "@/utils/Paginations";
import Loading from "@/app/loading";

const HtmlSourcedData = () => {
  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);


  const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${BASE_URL}/subscriberlist`, {
        params: {
          role_id: 2,
          page: page + 1,
        },
        headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvb25saW5lcGF5bWVudC5mYW1ld2hlZWxzLmNvbVwvYWRtaW5sb2dpbiIsImlhdCI6MTcwNTQ4MjAxNywiZXhwIjoxNzM3MDE4MDE3LCJuYmYiOjE3MDU0ODIwMTcsImp0aSI6IkVzS0tCeWZBU2p2NmJROWciLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.GhJbkN0daNzXoCrulaB55kI82fN9XnxT_Yl2ccaw4Cg`,
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
  } = useQuery(`subscribersList_${page}`, fetchData);




  const filteredItems = HtmlColumnData.filter((item : any) =>item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));
  const subHeaderComponentMemo = useMemo(() => {
    return (
      <div id="basic-1_filter" className="dataTables_filter d-flex align-items-center">
        <Label className="me-1">{SearchTableButton}:</Label>
        <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText} />
      </div>
    );
  }, [filterText]);

  return (
    <Col sm="12">
      <Card className="basic-data-table">
       {isLoading ? <Loading/> :  <CardBody>
          <div className="table-responsive">
            <DataTable className="theme-scrollbar" data={users} columns={HtmlColumn} striped highlightOnHover subHeader subHeaderComponent={subHeaderComponentMemo}/>
          </div>
          <PaginationDynamic totalPages={total} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </CardBody>}
      </Card>
    </Col>
  );
};

export default HtmlSourcedData;
