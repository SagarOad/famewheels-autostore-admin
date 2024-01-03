import * as React from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import { useQuery } from "react-query";
import PrivateRoute from "@/route/PrivateRoute";
import { ImpulseSpinner } from "react-spinners-kit";
import axios from "axios";
import PostModal from "@/components/modal/modal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
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

const columns = [
  { id: "title", label: "Title", minWidth: 170 },
  {
    id: "category",
    label: "Category",
    minWidth: 170,
  },

  {
    id: "city",
    label: "City",
    minWidth: 170,
  },
  {
    id: "registerdIn",
    label: "Registerd In",
    minWidth: 170,
  },
  {
    id: "price",
    label: "Price",
    minWidth: 170,
  },

  {
    id: "fullName",
    label: "Full Name",
    minWidth: 170,
  },

  {
    id: "phone",
    label: "Phone",
    minWidth: 170,
  },

  {
    id: "model",
    label: "Model",
    minWidth: 170,
  },

  {
    id: "act",
    label: "Action",
    minWidth: 170,
  },
];
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
const index = () => {
  const token = localStorage.getItem("authToken");

  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [showModal, setShowModal] = React.useState(false);
  const [postId, setPostId] = React.useState(null);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchData = async () => {
    const token = localStorage.getItem("authToken");

    const response = await axios.get(`${BASE_URL}/statuswisepostlist`, {
      params: {
        status_id: 1,
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
    data: posts,
    error,
    isLoading,
  } = useQuery(`approvedPosts_${rowsPerPage}_${page}`, fetchData);

  const handleReject = async (order: any) => {
    console.log(order);
    try {
      const response = await axios.get(`${BASE_URL}/ApproveOrDeclinePost`, {
        params: {
          postId: order?.id,
          statusId: 3,
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

  if (error) {
    console.log(error);
  }

  return (
    <PrivateRoute requiredRoles={["ROLE_BIDDER", "Admin"]}>
      <div className="w-[80vw] px-10 max-lg:w-screen max-xl:w-[75vw]">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <ImpulseSpinner color="#ED2024" size={120} />
          </div>
        ) : (
          <>
            <PostModal
              open={showModal}
              setOpen={setShowModal}
              postId={postId}
            />

            <div className="mt-10 xl:mt-8 container col-span-12">
              <h1 className="font-bold px-4 text-4xl mt-2 mb-3">Posts List</h1>
              <h4 className="px-4">
                Dashboard /{" "}
                <span className="text-[#ED2024]">Posts Approved</span>
              </h4>
            </div>
            <div className="flex justify-center items-center">
              <Paper sx={{ width: "100%", mt: 2 }}>
                <TableContainer sx={{ maxHeight: "100%" }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      {/* <TableRow>
              <TableCell  colSpan={2}>
                Country
              </TableCell>
              <TableCell  colSpan={3}>
                Details
              </TableCell>
            </TableRow> */}
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
                      {posts &&
                        posts.map((row: any) => {
                          return (
                            <StyledTableRow tabIndex={-1} key={row.postId}>
                              <TableCell>{row.title}</TableCell>

                              <TableCell>{row.category}</TableCell>

                              <TableCell>{row.city}</TableCell>

                              <TableCell>{row.registeredIn}</TableCell>

                              <TableCell>{row.price}</TableCell>

                              <TableCell>{row.fullName}</TableCell>

                              <TableCell>{row.phone}</TableCell>

                              <TableCell>{row.model}</TableCell>

                              {/* 
    
                        <TableCell align='center'>
                          {row.desc}
                        </TableCell> */}

                              <TableCell align="left">
                                <button
                                  // className="py-1 px-2 rounded-md my-1 bg-blue-500"
                                  onClick={() => {
                                    setPostId(row.postId);
                                    setShowModal(true);
                                  }}
                                >
                                  <VisibilityIcon
                                    sx={{
                                      fontSize: "1.5rem",
                                      color: "darkblue",
                                    }}
                                  />
                                </button>
                                <button
                                  // className="p-1 rounded-md my-1 bg-[#ED2024]"
                                  onClick={() => handleReject(row)}
                                >
                                  <CloseIcon
                                    sx={{ fontSize: "2rem", color: "red" }}
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
