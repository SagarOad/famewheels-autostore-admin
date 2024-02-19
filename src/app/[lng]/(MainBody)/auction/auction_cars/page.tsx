"use client";
import { Button, Card, CardBody, Col, Input, Label, Tooltip } from "reactstrap";
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
import { BasicTooltips, MagicPleaseHoverMe } from "@/Constant";
// import { InlineTooltip } from "./InlineTooltip";
import { BasicTooltipData } from "@/Data/Uikits/tooltip";
import { useAppSelector } from "@/Redux/Hooks";
import Link from "next/link";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const AuctionCarsList = () => {

  const { i18LangStatus } = useAppSelector((state) => state.langSlice);


  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [total, setTotal] = useState(0);
  const [postId, setPostId] = useState<any>(null);
  const [centred, setCentered] = useState(false);

  const [tooltip1, settooltip1] = useState(false);
  const toggle = () => settooltip1(!tooltip1);

  const [tooltip2, settooltip2] = useState(false);
  const toggle2 = () => settooltip2(!tooltip2);


  const [tooltip3, settooltip3] = useState(false);
  const toggle3 = () => settooltip3(!tooltip3);


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
      const response = await axios.get(`${BASE_URL}/statuswisepostlist`, {
        params: {
          status_id: 2,
          page: page,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setPage(response?.data?.data?.current_page);
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
  } = useQuery(`auctionCars${page}`, fetchData);

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
        <Label className="me-2">{SearchTableButton}:</Label>
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
            <Link href={`/${i18LangStatus}/sale_invoice`} className="edit">
              <button className="p-0 border-0 bg-transparent" id={`Tooltip-1`}>
              <i className="icofont icofont-sale-discount fs-4"></i>
              </button>
                <Tooltip target={`Tooltip-1`} placement="top" isOpen={tooltip1} toggle={toggle}>
            Sale Receipt
          </Tooltip>
            </Link>
            <Link href={`/${i18LangStatus}/car_sale_agreement`} className="delete">
              <button className="p-0 border-0 bg-transparent" id="Tooltip-2">
              <i className="icofont icofont-law-document fs-4"></i>
              </button>
              <Tooltip target={"Tooltip-2"} placement="top" isOpen={tooltip2} toggle={toggle2}>
            Sale Agreement
          </Tooltip>
            </Link>
            <Link href={`/${i18LangStatus}/delivery_receipt`} className="view">
              <button
              id="Tooltip-3"
                className="p-0 border-0 bg-transparent"
              >
                <i className="icofont icofont-delivery-time link-primary fs-4 "></i>
              </button>
              <Tooltip target={"Tooltip-3"} placement="top" isOpen={tooltip3} toggle={toggle3}>
            Delivery Receipt
          </Tooltip>
            </Link>
          </ul>
        );
      },
      sortable: true,
    },
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

    </Col>
  );
};

export default AuctionCarsList;
