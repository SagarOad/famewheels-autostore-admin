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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL_TESTING}`;

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
const columns = [
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
    id: "name",
    label: "Full Name",
    minWidth: 170,
  },

  // {
  //   id: "action",
  //   label: "Actions",
  //   minWidth: 170,
  // },
];

const index = () => {
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [showModal, setShowModal] = React.useState(false);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const token = localStorage.getItem("authToken");

  const fetchData = async () => {
    const response = await axios.get(`${BASE_URL}/statuswisepaymentlist`, {
      params: {
        paymentstatus_id: 3,
        page: page + 1,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTotal(response?.data?.data?.total);
    return response?.data?.data?.data;
  };

  const {
    data: payments,
    error,
    isLoading,
  } = useQuery(`usedPayments_${page}`, fetchData);

  if (error) {
    console.log(error);
  }

  const handleApprove = async (payment: any) => {
    console.log(payment);
    try {
      const response = await axios.get(
        `${BASE_URL}/famepayment/inquirypayment?orderId=${payment.orderId}`,
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
    <PrivateRoute requiredRoles={["ROLE_BIDDER", "Admin"]}>
      <div className="w-[80vw] px-10 max-lg:w-screen max-xl:w-[75vw]">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <ImpulseSpinner color="#ED2024" size={120} />
          </div>
        ) : (
          <>
            <div className="mt-10 xl:mt-8 container col-span-12">
              <h1 className="font-bold px-4 text-4xl mt-2 mb-3">Payments</h1>
              <h4 className="px-4">
                Payments / <span className="text-[#ED2024]">Used Payments</span>
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
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </StyledTableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {payments &&
                        payments.map((row: any) => {
                          return (
                            <StyledTableRow tabIndex={-1} key={row.id}>
                              <TableCell>{row.order_id}</TableCell>

                              <TableCell>{row.payment_method}</TableCell>

                              <TableCell>{row.security_deposit}</TableCell>

                              <TableCell>{row.name}</TableCell>

                              {/* <TableCell>
                                <button
                                  onClick={() => handleApprove(row)}
                                >
                                  <DoneIcon
                                    sx={{
                                      fontSize: "1.5rem",
                                      color: "green",
                                    }}
                                  />
                                </button>
                              </TableCell> */}
                            </StyledTableRow>
                          );
                        })}
                      {payments?.length === 0 && (
                        <div>
                          <p>no data found.</p>
                        </div>
                      )}
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
