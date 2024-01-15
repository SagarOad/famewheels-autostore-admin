import * as React from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import { useQuery } from "react-query";
import PrivateRoute from "@/route/PrivateRoute";
import { ImpulseSpinner } from "react-spinners-kit";
import axios from "axios";
import PostModal from "@/components/modal/modal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styled } from "@mui/material/styles";

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

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const columns = [
  { id: "id", label: "S.No.", minWidth: 30 },
  {
    id: "make",
    label: "Make",
    minWidth: 100,
  },
  {
    id: "model",
    label: "Model",
    minWidth: 100,
  },
  { id: "year", label: "Year", minWidth: 30 },
  { id: "city", label: "City", minWidth: 100 },

  {
    id: "fullName",
    label: "Full Name",
    minWidth: 170,
  },
  {
    id: "phone",
    label: "Contact",
    minWidth: 170,
  },
  // {
  //   id: "filer",
  //   label: "Filer",
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

  const fetchData = async () => {
    const token = localStorage.getItem("authToken");

    const response = await axios.get(`${BASE_URL}/carimportlist`, {
      params: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTotal(response?.data?.initial?.total);
    return response?.data?.initial?.data;
  };

  const {
    data: inspections,
    error,
    isLoading,
  } = useQuery(`inspectionsList_${rowsPerPage}_${page}`, fetchData);

  if (error) {
    console.log(error);
  }

  return (
    <PrivateRoute requiredRoles={["ROLE_BIDDER", "ROLE_ADMIN"]}>
      <div className="w-[80vw] px-10 max-lg:w-screen max-xl:w-[75vw]">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <ImpulseSpinner color="#ED2024" size={120} />
          </div>
        ) : (
          <>
            {/* <PostModal open={showModal} setOpen={setShowModal} /> */}

            <div className="mt-10 xl:mt-8 container col-span-12">
              <h1 className="font-bold px-4 text-4xl mt-2 mb-3">Import</h1>
              <h4 className="px-4">
                Dashboard / <span className="text-[#ED2024]">Car Import</span>
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
                      {inspections &&
                        inspections.map((data: any, index: number) => {
                          return (
                            <StyledTableRow
                              tabIndex={-1}
                              key={data?.inspection_id}
                            >
                              <TableCell>{index}</TableCell>
                              <TableCell>{data?.make}</TableCell>
                              <TableCell>{data?.model_name}</TableCell>
                              <TableCell>{data?.year}</TableCell>

                              <TableCell>{data?.city}</TableCell>

                              <TableCell>{data?.name}</TableCell>

                              <TableCell>
                                {data?.email} {"-"} {data?.mobile_no}
                              </TableCell>

                              {/* <TableCell align="left">
                                <button
                                  className="py-1 px-2 rounded-md my-1 bg-blue-500"
                                  onClick={() => setShowModal(true)}
                                >
                                  <VisibilityIcon
                                    sx={{
                                      fontSize: "1.5rem",
                                      color: "white",
                                    }}
                                  />
                                </button>
                              </TableCell> */}
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
