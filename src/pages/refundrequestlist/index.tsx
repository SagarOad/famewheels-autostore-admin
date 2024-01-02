// import * as React from "react";

// // import SideBar from "@/components/SideBar";
// import { useQuery } from "react-query";
// import axios from "axios";
// import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
// import PrivateRoute from "@/route/PrivateRoute";
// import { ImpulseSpinner } from "react-spinners-kit";
// import PriceCheckIcon from "@mui/icons-material/PriceCheck";
// import CloseIcon from '@mui/icons-material/Close';
// import DoneIcon from '@mui/icons-material/Done';

// let posts: any;

// const url = `${process.env.API_URL}`;

// // type IRefund  = {
// //   orderId: number;
// //   paymentId: number;
// //   paymentMethod: string;
// //   securityDeposit: string;
// //   status: string;
// //   paymentToken: string;

// //   payment: {
// //     user: {
// //       userName: string;
// //       email: string;
// //       phone: string;
// //       roleName: string;
// //     };
// //     paymentMethod: string;
// //     securityDeposit: string;
// //     orderId: number;
// //   };
// // }

// const page = () => {
//   const token = localStorage.getItem("authToken")

//   console.log(url);

//   const fetchData = async () => {
//     const res = await axios.get(`${url}/GetAllRefundRequests`, {
//       params: { status: "Request" },
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

//   const handleApprove = async (refund:any) => {
//     console.log(refund)
//     try {
//       const response = await axios.get(`${url}/ApproveRefundPayment`,{
//         params: {
//           orderId: refund?.orderId,
//           status: "Approved",
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//     })

//     console.log("approve response =======",response?.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const handleReject = async (refund:any) => {
//     console.log(refund)
//     try {
//       const response = await axios.get(`${url}/ApproveRefundPayment`,{
//         params: {
//           orderId: refund?.orderId,
//           status: "Declined",
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//     })

//     console.log("approve response =======",response?.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const columns = [
//     { field: "id", headerName: "ID",width:130, },
//     { field: "orderId", headerName: "Order Id",width:130, },
//     { field: "memberPaymentRefundId", headerName: "Member Payment Refund Id",width:130, },
//     { field: "paymentMethod", headerName: "Payment Method",width:130, },
//     { field: "securityDeposit", headerName: "Security Deposit",width:130, },
//     { field: "status", headerName: "Status",width:130, },
//     {
//       field: "Action",
//       headerName: "Action",
//       sortable: false,
//       width:150,
//       renderCell: (e: any) => {
//         console.log("row=====", e?.row);

//         return (
//           <div>

//           <button className="p-1 rounded-md my-1 bg-green-500 mr-3" onClick={()=>handleApprove(e?.row)}>
//           <DoneIcon sx={{fontSize:"2rem",color:"white"}} />
//           </button>

//           <button className="p-1 rounded-md my-1 bg-[#ED2024]" onClick={()=>handleReject(e?.row)}>
//             <CloseIcon sx={{fontSize:"2rem",color:"white"}}  />
//           </button>
//           </div>
//         );
//       },
//     },

//   ];

//   const rows =
//     posts &&
//     posts.map((post: any) => {
//       console.log(post);
//       return {
//         id: post.payment.paymentId,
//         orderId: post.payment.orderId,
//         memberPaymentRefundId: post.memberPaymentRefundId,
//         paymentMethod: post.payment.paymentMethod,
//         securityDeposit: post.payment.securityDeposit,
//         status: post.status,
//       };
//     });

//   return (
//     <PrivateRoute requiredRoles={["ROLE_BIDDER", "Admin"]}>
// <section className="flex justify-center items-center w-[80vw] max-lg:w-[100vw]">

//  {isLoading ? <div className="flex justify-center items-center h-screen w-full">
//  <ImpulseSpinner color="#ED2024" size={120}/>
//             </div>  :
//             <section className="flex justify-center items-center">

//         <div className="w-full mt-10 xl:mt-8 container">
//          <h1 className="font-bold px-4 text-4xl mt-2 mb-3">Refund Pending</h1>
//         <h4 className="px-4">
//           Dashboard / <span className="text-[#ED2024]">Refund Pending</span>
//         </h4>

//             <main className="flex w-full">
//       {/* <SideBar /> */}

//       <div className="w-full p-4">
//         {rows && rows?.length > 0 && (
//           <DataGrid
//           rowSelection={false}
//           rows={rows}
//           columns={columns}
//           initialState={{
//             pagination: {
//               paginationModel: { page: 0, pageSize: 10 },
//             },
//           }}
//           pageSizeOptions={[5, 10]}
//           checkboxSelection={false}
//           />
//           )}
//       </div>
//     </main>

//     </div>
//         </section>
//     }
// </section>
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
    id: "memberPaymentRefundId",
    label: "Member Payment RefundId",
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
    const res = await axios.get(`${BASE_URL}/GetAllRefundRequests`, {
      params: { status: "Request" },
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
      id: post.payment.paymentId,
      orderId: post.payment.orderId,
      memberPaymentRefundId: post.memberPaymentRefundId,
      paymentMethod: post.payment.paymentMethod,
      securityDeposit: post.payment.securityDeposit,
      status: post.status,
    }));

  console.log(posts);

  const handleApprove = async (refund: any) => {
    console.log(refund);
    try {
      const response = await axios.get(`${BASE_URL}/ApproveRefundPayment`, {
        params: {
          orderId: refund?.orderId,
          status: "Approved",
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
            <PostModal open={showModal} setOpen={setShowModal} />

            <div className="mt-10 xl:mt-8 container col-span-12">
              <h1 className="font-bold px-4 text-4xl mt-2 mb-3">
                Refund Request List
              </h1>
              <h4 className="px-4">
                Dashboard /{" "}
                <span className="text-[#ED2024]">Refund Request Pending</span>
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
                                  {row.memberPaymentRefundId}
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

                                  <button
                                    className="p-1 rounded-md my-1 bg-[#ED2024]"
                                    onClick={() => handleReject(row)}
                                  >
                                    <CloseIcon
                                      sx={{ fontSize: "2rem", color: "white" }}
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
