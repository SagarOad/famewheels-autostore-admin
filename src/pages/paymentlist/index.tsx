// import * as React from "react";
// import { useQuery } from "react-query";
// import axios from "axios";
// import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
// import PriceCheckIcon from "@mui/icons-material/PriceCheck";
// import PrivateRoute from "@/route/PrivateRoute";
// import DoneIcon from '@mui/icons-material/Done';
// import { ImpulseSpinner } from "react-spinners-kit";

// const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

// const page = () => {
//   const token = localStorage.getItem("authToken");

//   const fetchData = async () => {
//     const response = await axios.get(`${BASE_URL}/getAllPayments`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response?.data;
//   };
//   const { data: posts, error, isLoading } = useQuery("myPosts", fetchData);

//   if (error) {
//     console.log(error);
//   }

// const handleApprove = async (payment : any) =>{
//   console.log(payment)
// try {
//   const response = await axios.get(`${BASE_URL}/famepayment/inquirypayment?orderId=${payment.orderId}`,{
//     headers:{
//       Authorization: `Bearer ${token}`,
//     }
//   })
//   console.log(response)
// } catch (error) {
//   console.log(error)
// }
// }

//   const rows =
//     posts &&
//     posts.map((post: any) => {
//       console.log(post);
//       return {
//         id: post.paymentId,
//         orderId: post.orderId,
//         paymentMethod: post.paymentMethod,
//         securityDeposit: post.securityDeposit,
//         status: post.status,
//       };
//     });

// const columns = [
//   { field: "id", headerName: "ID",flex:1, width:30},
//   { field: "orderId", headerName: "Order Id",flex:1, width:130},
//   { field: "paymentMethod", headerName: "Payment Method",flex:1, width:130},
//   { field: "securityDeposit", headerName: "Security Deposit",flex:1, width:130},
//   { field: "status", headerName: "Status",flex:1, width:130},
//   {
//     field: "Action",
//     headerName: "Action",
//     sortable: false,
//     width: 60,
//     renderCell: (e: any) => {
//       console.log("row=====", e?.row);

//       return (
//         <button className="p-1 rounded-md m-1 bg-green-500" onClick={()=>handleApprove(e?.row)}>
//           <DoneIcon sx={{fontSize:"2rem",color:"white"}} />
//         </button>
//       );
//     },
//   },
// ];
//   return (
//     <PrivateRoute requiredRoles={["ROLE_BIDDER", "Admin"]}>
//       <section className="flex justify-center items-center w-[80vw] max-lg:w-[100vw]">

//       {isLoading ? (
//         <div className="flex justify-center items-center h-screen w-full">
//           <ImpulseSpinner color="#ED2024" size={120} />
//         </div>
//       ) : (
// <section className="flex justify-center items-center w-full">

// <div className="w-full mt-10 xl:mt-8 container">

//         <h1 className="font-bold px-4 text-4xl mt-2 mb-3">Payment List</h1>
//         <h4 className="px-4">
//           Dashboard / <span className="text-[#ED2024]">Payment List</span>
//         </h4>

//         <main className="flex w-full">
//           <div className="w-full p-4">
//             {rows && rows?.length > 0 && (
//               <DataGrid
//                 rows={rows}
//                 columns={columns}
//                 initialState={{
//                   pagination: {
//                     paginationModel: { page: 0, pageSize: 25 },
//                   },
//                 }}
//                 pageSizeOptions={[5, 10,25,50,100]}
//                 checkboxSelection={false}
//                 rowSelection={false}
//               />
//             )}
//           </div>
//         </main>

//         </div>

// </section>
//       )}

//       </section>
//     </PrivateRoute>
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
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

let posts: any;

const columns = [
  { id: "id", label: "Id", minWidth: 30 },
  { id: "orderId", label: "Order Id", minWidth: 100 },
  {
    id: "paymentMethod",
    label: "Payment Method",
    minWidth: 170,
    align: "center",
  },

  {
    id: "securityDeposit",
    label: "Security Deposit",
    minWidth: 170,
    align: "center",
  },

  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "center",
  },

  {
    id: "action",
    label: "Actions",
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

  const token = localStorage.getItem("authToken");

  const fetchData = async () => {
    const res = await axios.get(`${BASE_URL}/getAllPayments`, {
      params: {
        status: 2,
        pageSize: rowsPerPage,
        pageNo: page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  };

  const { data, error, isLoading } = useQuery(
    `myPosts_${rowsPerPage}_${page}`,
    fetchData
  );

  posts = data?.data;

  if (error) {
    console.log(error);
  }

  const rows =
    posts &&
    posts.map((post: any) => ({
      id: post.paymentId,
      orderId: post.orderId,
      paymentMethod: post.paymentMethod,
      securityDeposit: post.securityDeposit,
      status: post.status,
    }));

  console.log(posts);

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
            {/* <PostModal open={showModal} setOpen={setShowModal}/> */}

            <div className="mt-10 xl:mt-8 container col-span-12">
              <h1 className="font-bold px-4 text-4xl mt-2 mb-3">
                Payment List
              </h1>
              <h4 className="px-4">
                Dashboard / <span className="text-[#ED2024]">Payment</span>
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

                                <TableCell align="center">
                                  {row.orderId}
                                </TableCell>

                                <TableCell align="center">
                                  {row.paymentMethod}
                                </TableCell>

                                <TableCell align="center">
                                  {row.securityDeposit}
                                </TableCell>

                                <TableCell align="center">
                                  {row.status}
                                </TableCell>

                                {/* 
    
                        <TableCell align='center'>
                          {row.desc}
                        </TableCell> */}

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

                                  {/* <button className="p-2 mx-1 rounded-md my-1 bg-blue-500" onClick={()=>setShowModal(true)}>
                                     <VisibilityIcon sx={{fontSize:"1.5rem",color:"white"}}/>
                                                           </button> */}
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
