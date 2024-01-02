// import * as React from "react";

// // import SideBar from "@/components/SideBar";
// import { useQuery } from "react-query";
// import axios from "axios";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import VisibilityIcon from '@mui/icons-material/Visibility';

// import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
// import { TablePagination } from "@mui/material";
// import PrivateRoute from "@/route/PrivateRoute";
// import { ImpulseSpinner } from "react-spinners-kit";
// import PostModal from "@/components/modal/modal";

// // const columns = [
// //   { field: "id", headerName: "ID" },
// //   { field: "make", headerName: "MAke Name" },
// //   { field: "cat", headerName: "Category" },
// //   { field: "city", headerName: "City" },
// //   { field: "register", headerName: "Register" },
// //   { field: "price", headerName: "Price" },
// //   { field: "name", headerName: "Full Name" },
// //   { field: "phone", headerName: "Phone" },
// //   { field: "description", headerName: "Description" },
// // ];

// let posts: any;

// const url = `${process.env.API_URL}`;

// function createData(
//   id: number,
//   title: string,
//   modelName: string,
//   categoryName: string,
//   cityName: string,
//   registeredIn: string,
//   price: number,
//   fullName: string,
//   phone: number,
//   description: string
// ) {
//   return {
//     id,
//     title,
//     modelName,
//     categoryName,
//     cityName,
//     registeredIn,
//     price,
//     fullName,
//     phone,
//     description,
//   };
// }

// const page = () => {
//   const [page, setPage] = React.useState<Number>(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const [showModal, setShowModal] = React.useState(false);

//   const token = localStorage.getItem("authToken")

//   const handleChangePage = (event: any, newPage: number) => {
//     setPage(+page + 1);
//   };
//   const handleChangeRowsPerPage = (event: any) => {
//     console.log(event.target.value);
//     setRowsPerPage(+event.target.value);
//     // setPage(0);
//   };

//   const fetchData = async () => {
//     const res = await axios.get(`${url}/posts/type`, {
//       params: {
//         typeId: 3,
//         pageSize: rowsPerPage,
//         pageNo: page,
//       },
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return res;
//   };

//   const { data, error, isLoading } = useQuery(
//     `myPosts_${rowsPerPage}_${page}`,
//     fetchData
//   );

//   if (error) {
//     console.log(error);
//   }

//   posts = data?.data;
//   console.log(posts);

//   const rows =
//     posts &&
//     posts.map((post: any) =>
//       createData(
//         post.postId,
//         post.title,
//         post.modelName,
//         post.categoryName,
//         post.cityName,
//         post.registeredIn,
//         post.price,
//         post.fullName,
//         post.phone,
//         post.description
//       )
//     );
//   // createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   // createData("Eclair", 262, 16.0, 24, 6.0),
//   // createData("Cupcake", 305, 3.7, 67, 4.3),
//   // createData("Gingerbread", 356, 16.0, 49, 3.9),

//   // const rows =
//   //   posts &&
//   //   posts.map((post: any) => {
//   //     console.log(post);
//   //     return {
//   //       id: post.postId,
//   //       make: post.make.makeName,
//   //       cat: post.categoryName,
//   //       city: post.cityName,
//   //       register: post.registeredIn,
//   //       price: post.price,
//   //       name: post.user.name,
//   //       phone: post.user.phone,
//   //       description: post.description,
//   //     };
//   //   });

//   // console.log(rows);
//   return (
//     <PrivateRoute requiredRoles={["ROLE_BIDDER", "Admin"]}>
// <section className="flex justify-center items-center w-[80vw] max-lg:w-[100vw]">

//    {isLoading ? <div className="flex justify-center items-center h-screen w-full">
//    <ImpulseSpinner color="#ED2024" size={120}/>
//             </div>  :
// <section className="flex justify-center items-center">

// <div className="w-full mt-10 xl:mt-8 container">

//             <h1 className="font-bold px-4 text-4xl mt-2 mb-3">Posts List</h1>
//         <h4 className="px-4">
//           Dashboard / <span className="text-[#ED2024]">Posts List</span>
//         </h4>

//     <main className="flex">
//       {/* <SideBar /> */}

//       <div className="w-full p-4">
//         {/* {rows && rows?.length > 0 && (
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
//           />
//         )} */}

//         {/* // custom pagination table  */}

// <PostModal open={showModal} setOpen={setShowModal}/>

//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>ID</TableCell>
//                 <TableCell align="left">Title</TableCell>
//                 <TableCell align="left">Model Name</TableCell>
//                 <TableCell align="left">Category</TableCell>
//                 <TableCell align="left">City</TableCell>
//                 <TableCell align="left">Price</TableCell>
//                 <TableCell align="left">Phone</TableCell>
//                 <TableCell align="left">Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows && rows.map((row: any) => (
//                   <TableRow
//                     key={row.name}
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <TableCell component="th" scope="row">
//                       # {row.id}
//                     </TableCell>
//                     <TableCell align="left">{row.title}</TableCell>
//                     <TableCell align="left">{row.modelName}</TableCell>
//                     <TableCell align="left">{row.categoryName}</TableCell>
//                     <TableCell align="left">{row.cityName}</TableCell>
//                     <TableCell align="left">{row.price}</TableCell>
//                     <TableCell align="left">{row.phone}</TableCell>
//                     <TableCell align="left">

//                       <button className="py-1 px-2 rounded-md my-1 bg-blue-500" onClick={()=>setShowModal(true)}>

//                       <VisibilityIcon sx={{fontSize:"1.5rem",color:"white"}}/>

//                       </button>

//                       </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 100]}
//           component="div"
//           count={rows && rows.length}
//           rowsPerPage={rowsPerPage}
//           page={+page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </div>
//     </main>
//     </div>

// </section>

//     }
// </section>
//  </PrivateRoute>
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
  { id: "title", label: "Title", minWidth: 100 },
  {
    id: "category",
    label: "Category",
    minWidth: 170,
    align: "center",
  },

  {
    id: "city",
    label: "City",
    minWidth: 170,
    align: "center",
  },
  {
    id: "registerdIn",
    label: "Registerd In",
    minWidth: 170,
    align: "center",
  },
  {
    id: "price",
    label: "Price",
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
    id: "model",
    label: "Model",
    minWidth: 170,
    align: "center",
  },

  {
    id: "desc",
    label: "Description",
    minWidth: 170,
    align: "center",
  },
];

const index = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
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

    const res = await axios.get(`${BASE_URL}/posts/type`, {
      params: {
        typeId: 3,
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
      id: post.postId,
      title: post.title,
      model: post.modelName,
      category: post.categoryName,
      city: post.cityName,
      registeredIn: post.registeredIn,
      price: post.price,
      fullName: post.user.name,
      phone: post.user.phone,
      desc: post.description,
    }));

  console.log(posts);

  return (
    <PrivateRoute requiredRoles={["ROLE_BIDDER", "Admin"]}>
      <div className="w-[80vw] px-10 max-lg:w-screen max-xl:w-[75vw]">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <ImpulseSpinner color="#ED2024" size={120} />
          </div>
        ) : (
          <>
            {postId && (
              <PostModal
                open={showModal}
                setOpen={setShowModal}
                postId={postId}
              />
            )}

            <div className="mt-10 xl:mt-8 container col-span-12">
              <h1 className="font-bold px-4 text-4xl mt-2 mb-3">Posts List</h1>
              <h4 className="px-4">
                Dashboard / <span className="text-[#ED2024]">Posts List</span>
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
                                  {row.title}
                                </TableCell>

                                <TableCell align="center">
                                  {row.category}
                                </TableCell>

                                <TableCell align="center">{row.city}</TableCell>

                                <TableCell align="center">
                                  {row.registeredIn}
                                </TableCell>

                                <TableCell align="center">
                                  {row.price}
                                </TableCell>

                                <TableCell align="center">
                                  {row.fullName}
                                </TableCell>

                                <TableCell align="center">
                                  {row.phone}
                                </TableCell>

                                <TableCell align="center">
                                  {row.model}
                                </TableCell>

                                <TableCell align="center">{row.desc}</TableCell>

                                <TableCell align="left">
                                  <button
                                    className="py-1 px-2 rounded-md my-1 bg-blue-500"
                                    onClick={() => {
                                      setPostId(row.id);
                                      setShowModal(true);
                                    }}
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
