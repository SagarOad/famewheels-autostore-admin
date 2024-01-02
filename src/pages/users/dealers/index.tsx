import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { useQuery } from "react-query";
import PrivateRoute from "@/route/PrivateRoute";
import { ImpulseSpinner } from "react-spinners-kit";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
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
} from "@mui/material";
import { getInitials } from "@/utils/get-initials";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL_TESTING}`;

interface User {
  id: number;
  name: string;
  email: string;
  phone: number;
  role: {
    roleName: string;
  };
  cnic: number;
  address: string;
}

const columns = [
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
  },
  {
    id: "phone",
    label: "Phone",
    minWidth: 170,
  },
  {
    id: "role",
    label: "Role",
    minWidth: 170,
  },

  {
    id: "cnic",
    label: "CNIC",
    minWidth: 170,
  },

  {
    id: "address",
    label: "Address",
    minWidth: 170,
  },

  {
    id: "action",
    label: "Action",
    minWidth: 150,
  },
];

const index = () => {
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${BASE_URL}/userlist`, {
        params: {
          role_id: 6,
          page: page + 1,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setPage(response?.data?.data?.current_page);
      setTotal(response?.data?.data?.total);
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
  } = useQuery(`membersList_${page}`, fetchData);

  if (error) {
    console.log(error);
  }

  return (
    <PrivateRoute requiredRoles={["Bidder", "Admin"]}>
      <div className="m-5" style={{ height: "94%", width: "97%" }}>
        <h1 className="font-bold px-4 text-4xl mt-2 mb-3">Dealers</h1>
        <h4 className="px-4">
          Dashboard / <span className="text-[#ED2024]">Dealers List</span>
        </h4>
        <Card
          className="mx-2 my-2"
          style={{ height: "83%", width: "99%", overflowY: "scroll" }}
        >
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns?.map((column) => (
                    <TableCell
                      key={column.id}

                      // style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {users &&
                  users?.map((user: any) => {
                    return (
                      <TableRow hover key={user?.id}>
                        <TableCell>
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                          >
                            <Avatar src={user?.avatar}>
                              {getInitials(user?.name)}
                            </Avatar>
                            <Typography variant="subtitle2">
                              {user?.name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>{user?.email}</TableCell>

                        <TableCell>{user?.phone}</TableCell>

                        <TableCell>{user?.role?.roleName}</TableCell>

                        <TableCell>{user?.cnic}</TableCell>

                        <TableCell>{user?.address}</TableCell>
                        <TableCell>
                          <button className="p-1 rounded-md my-1 bg-[#ED2024]">
                            <CloseIcon
                              sx={{ fontSize: "2rem", color: "white" }}
                            />
                          </button>

                          <button className="p-2 mx-1 rounded-md my-1 bg-indigo-500">
                            <EditIcon
                              sx={{ fontSize: "1.5rem", color: "white" }}
                            />
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Box>
        </Card>
        <TablePagination
          rowsPerPageOptions={[30]}
          // component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </PrivateRoute>
  );
};

export default index;
