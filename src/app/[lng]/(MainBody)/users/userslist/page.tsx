"use client";
import { Card, CardBody, Col, Input, Label } from "reactstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useQuery } from "react-query";
import { HtmlTableTittle, SearchTableButton } from "@/Constant";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import {
  HtmlColumnData as HtmlColumnData,
  HtmlData,
  UserColumn,
} from "@/Data/Form&Table/Table/DataTable/DataSourceData";
import { useMemo, useState } from "react";
import PaginationDynamic from "@/utils/Paginations";
import Loading from "@/app/loading";

const UsersList = () => {
  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${BASE_URL}/userlist`, {
        params: {
          role_id: 2,
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
  } = useQuery(`usersList_${page}`, fetchData);

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
    </Col>
  );
};

export default UsersList;
