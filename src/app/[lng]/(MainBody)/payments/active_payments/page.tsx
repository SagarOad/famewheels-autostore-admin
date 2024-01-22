"use client";
import { Card, CardBody, Col, Input, Label } from "reactstrap";
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
import { Payment } from "@/Types/TableType";

const HtmlSourcedData = () => {
  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${BASE_URL}/statuswisepaymentlist`, {
        params: {
          paymentstatus_id: 2,
          page: page,
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
    data: users,
    error,
    isLoading,
  } = useQuery(`active_payment_${page}`, fetchData);

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

  const PaymentColumn: TableColumn<Payment>[] = [
    {
      name: "S.no",
      selector: (row) => row.order_id,
      sortable: true,
    },

    {
      name: "Payment Method",
      selector: (row) => row.payment_method,
      sortable: true,
    },

    {
      name: "Security Dposit",
      selector: (row) => row.security_deposit,
      sortable: true,
    },

    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },

    {
      name: "Action",
      cell: (row) => {
        return (
          <ul
            className="action simple-list d-flex flex-row"
            key={row?.order_id}
          >
            <li className="edit">
              <button
                className="p-0 border-0 bg-transparent"
                onClick={() => handleApprove(row?.order_id)}
              >
                <i className="icofont icofont-check"></i>
              </button>
            </li>
            {/* <li className="delete">
            <button className="p-0 border-0 bg-transparent">
              <i className="icon-trash" />
            </button>
          </li> */}
          </ul>
        );
      },

      sortable: true,
    },
  ];

  const handleApprove = async (id: any) => {
    console.log(id);
    try {
      const response = await axios.get(
        `${BASE_URL}/famepayment/inquirypayment?orderId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
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
                columns={PaymentColumn}
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

export default HtmlSourcedData;
