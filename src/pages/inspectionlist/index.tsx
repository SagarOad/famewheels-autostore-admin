// import * as React from "react";

// // import SideBar from "@/components/SideBar";
// import { useQuery } from "react-query";
// import axios from "axios";
// import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
// import PrivateRoute from "@/route/PrivateRoute";
// import { ImpulseSpinner } from "react-spinners-kit";

// const columns = [
//   { field: "id", headerName: "ID",width:130 },
//   { field: "city", headerName: "City",width:130 },
//   { field: "address", headerName: "Address",width:130 },
//   { field: "inspectionslot", headerName: "Inspection Slot",width:130 },
//   { field: "vehicle", headerName: "Vehicle",width:130 },
//   { field: "fullName", headerName: "Full Name",width:130 },
//   { field: "phone", headerName: "Phone",width:130 },
//   { field: "description", headerName: "Description",width:130 },
// ];

// let posts: any;

// const url = `${process.env.BASE_URL}`;

// const page = () => {
//   console.log(url);

// const token = localStorage.getItem("authToken")

//   const fetchData = async () => {
//     const res = await axios.get(`https://portal.famewheels.com/fame/getInspection`, {
//       params:{
//             brand_id: "id",

//       },
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return res;
//   };

//   const { data, error, isLoading } = useQuery("myPosts", fetchData);

//   if (error) {
//     console.log(error);
//   }

//   posts = data?.data;
//   console.log(posts);

//   const rows =
//     posts &&
//     posts.map((post: any) => {
//       console.log(post);
//       return {
//         id: post.inspectionId,
//         city: post.city,
//         address: post.address,
//         inspectionslot: post.inspectionSlot,
//         vehicle: post.vehicleType,
//         fullName: post.fullName,
//         phone: post.phone,
//         description: post.description,
//       };
//     });

//   return (
//     <PrivateRoute requiredRoles={["ROLE_BIDDER", "Admin"]}>
//       <section className="flex justify-center items-center w-[80vw] max-lg:w-[100vw]">

// {isLoading ? <div className="flex justify-center items-center h-screen w-full">
// <ImpulseSpinner color="#ED2024" size={120}/>
//             </div>  :
// <section className="flex justify-center items-center ">

// <div className="w-full mt-10 xl:mt-8 container">
//             <h1 className="font-bold px-4 text-4xl mt-2 mb-3">Inspection List</h1>
//         <h4 className="px-4">
//           Dashboard / <span className="text-[#ED2024]">Inspection List</span>
//         </h4>

//     <main className="w-full">
//       {/* <SideBar /> */}

//       <div className="w-full p-4">

//         {rows && rows?.length > 0 && (
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             initialState={{
//               pagination: {
//                 paginationModel: { page: 0, pageSize: 25 },
//               },
//             }}
//             pageSizeOptions={[5, 10]}
//             checkboxSelection={false}
//             scrollbarSize={2}
//           />
//         )}
//       </div>
//     </main>

//     </div>

//     </section>

//     }
//       </section>
//   </PrivateRoute>

//   );
// };

// export default page;

import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useQuery } from "react-query";
import PrivateRoute from "@/route/PrivateRoute";
import { ImpulseSpinner } from "react-spinners-kit";
import axios from "axios";
import PostModal from "@/components/modal/modal";
import VisibilityIcon from "@mui/icons-material/Visibility";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

let posts: any;

const columns = [
  { id: "id", label: "Id", minWidth: 30 },
  { id: "city", label: "City", minWidth: 100 },

  {
    id: "address",
    label: "Address",
    minWidth: 170,
    align: "center",
  },

  {
    id: "inspectionslot",
    label: "Inspection Slot",
    minWidth: 170,
    align: "center",
  },

  {
    id: "vehicle",
    label: "Vehicle",
    minWidth: 170,
    align: "center",
  },

  {
    id: "fullName",
    label: "Full Name",
    minWidth: 170,
    align: "center",
  },

  {
    id: "phone",
    label: "Phone",
    minWidth: 170,
    align: "center",
  },

  {
    id: "description",
    label: "Description",
    minWidth: 170,
    align: "center",
  },
];

const index = () => {
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

    const res = await axios.get(`${BASE_URL}/getInspection`, {
      params: {
        brand_id: "id",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  };

  const { data, error, isLoading } = useQuery(
    `inspection_${rowsPerPage}_${page}`,
    fetchData
  );

  posts = data?.data;

  if (error) {
    console.log(error);
  }
  console.log(posts);

  const rows =
    posts &&
    posts.map((post: any) => ({
      id: post.inspectionId,
      city: post.city,
      address: post.address,
      inspectionslot: post.inspectionSlot,
      vehicle: post.vehicleType,
      fullName: post.fullName,
      phone: post.phone,
      description: post.description,
    }));

  return (
    <PrivateRoute requiredRoles={["ROLE_BIDDER", "Admin"]}>
      <div className="w-[80vw] px-10 max-lg:w-screen max-xl:w-[75vw]">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <ImpulseSpinner color="#ED2024" size={120} />
          </div>
        ) : (
          <>
            <PostModal open={showModal} setOpen={setShowModal} />

            <div className="mt-10 xl:mt-8 container col-span-12">
              <h1 className="font-bold px-4 text-4xl mt-2 mb-3">
                Inspection List
              </h1>
              <h4 className="px-4">
                Dashboard /{" "}
                <span className="text-[#ED2024]">Inspection List</span>
              </h4>
            </div>
            <div className="flex justify-center items-center">
              <Paper sx={{ width: "100%", mt: 2 }}>
                <TableContainer sx={{ maxHeight: "100%" }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      {/* <TableRow>
              <TableCell align="center" colSpan={2}>
                Country
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
            </TableRow> */}
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={"center"}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows &&
                        rows
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row: any) => {
                            console.log("row ==== ", row);
                            return (
                              <TableRow tabIndex={-1} key={row.id}>
                                <TableCell align="center">{row.id}</TableCell>

                                <TableCell align="center">{row.city}</TableCell>

                                <TableCell align="center">
                                  {row.address}
                                </TableCell>

                                <TableCell align="center">
                                  {row.inspectionslot}
                                </TableCell>

                                <TableCell align="center">
                                  {row.vehicle}
                                </TableCell>

                                <TableCell align="center">
                                  {row.fullName}
                                </TableCell>

                                <TableCell align="center">
                                  {row.phone}
                                </TableCell>

                                <TableCell align="center">
                                  {row.description}
                                </TableCell>

                                <TableCell align="left">
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
                                </TableCell>
                              </TableRow>
                            );
                          })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[20, 50, 100]}
                  component="div"
                  count={rows.length}
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
