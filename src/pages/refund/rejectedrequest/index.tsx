import * as React from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import { useQuery } from "react-query";
import PrivateRoute from "@/route/PrivateRoute";
import { ImpulseSpinner } from "react-spinners-kit";
import axios from "axios";
import PostModal from "@/components/modal/modal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import toast from "react-hot-toast";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL_TESTING}`;

const columns = [
  { id: "refundDate", label: "Refund Date", minWidth: 100 },
  { id: "name", label: "Full Name", minWidth: 100 },
  { id: "orderId", label: "Order Id", minWidth: 100 },
  {
    id: "paymentMethod",
    label: "Payment Method",
    minWidth: 170,
  },

  {
    id: "securityDeposit",
    label: "Security Deposit",
    minWidth: 170,
  },

  {
    id: "action",
    label: "Actions",
    minWidth: 170,
  },
];

const index = () => {
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [showModal, setShowModal] = React.useState(false);
  const [getUpdate, setGetUpdate] = React.useState(false);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const token = localStorage.getItem("authToken");

  const fetchData = async () => {
    const response = await axios.get(`${BASE_URL}/statuswiserefundlist`, {
      params: { refundstatus_id: 2 },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTotal(response?.data?.data?.total);
    return response?.data.data?.data;
  };

  const {
    data: posts,
    error,
    isLoading,
  } = useQuery(`rejectedRefund_${rowsPerPage}_${page}${getUpdate}`, fetchData);

  if (error) {
    console.log(error);
  }

  const handleApprove = async (refund: any) => {
    try {
      const response = await axios.get(`${BASE_URL}/approvedeclinerefund`, {
        params: {
          refund_id: refund?.refund_id,
          refundstatus_id: 3,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response?.data?.message || "Approved Succefully");
      setGetUpdate(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (refund: any) => {
    console.log(refund);
    try {
      const response = await axios.get(`${BASE_URL}/ApproveRefundPayment`, {
        params: {
          orderId: refund?.orderId,
          status: "Declined",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("approve response =======", response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PrivateRoute requiredRoles={["ROLE_BIDDER", "Admin"]}>
      <div className="w-[80vw] px-10 max-lg:w-screen max-xl:w-[75vw]">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <ImpulseSpinner color="#ED2024" size={120} />
          </div>
        ) : (
          <>
            <div className="mt-10 xl:mt-8 container col-span-12">
              <h1 className="font-bold px-4 text-4xl mt-2 mb-3">
                Refund Request List
              </h1>
              <h4 className="px-4">
                Dashboard /{" "}
                <span className="text-[#ED2024]">Refund Request Rejected</span>
              </h4>
            </div>
            <div className="flex justify-center items-center">
              <Paper sx={{ width: "100%", mt: 2 }}>
                <TableContainer sx={{ maxHeight: "100%" }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <StyledTableCell
                            key={column.id}
                            align={"center"}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </StyledTableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {posts &&
                        posts.map((row: any) => {
                          return (
                            <StyledTableRow tabIndex={-1} key={row.id}>
                              <TableCell>{row.refund_date}</TableCell>
                              <TableCell>{row.name}</TableCell>
                              <TableCell>{row.order_id}</TableCell>

                              <TableCell>{row.payment_method}</TableCell>

                              <TableCell>{row.security_deposit}</TableCell>

                              <TableCell align="center">
                                <button
                                  className="p-2 rounded-md mx-1 bg-green-500"
                                  onClick={() => handleApprove(row)}
                                >
                                  <DoneIcon
                                    sx={{
                                      fontSize: "1.5rem",
                                      color: "white",
                                    }}
                                  />
                                </button>
                              </TableCell>
                            </StyledTableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[30]}
                  component="div"
                  count={total}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </div>
          </>
        )}
      </div>
    </PrivateRoute>
  );
};

export default index;