import { Admin, Hr, USER, User } from "@/Constant";
import { MenuItem } from "@/Types/LayoutTypes";

export const MenuList: MenuItem[] | undefined = [
  {
    title: "General",
    lanClass: "lan-1",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Dashboards",
        id: 1,
        icon: "home",
        type: "sub",
        lanClass: "lan-3",
        path: "/dashboard/default_dashboard",
      },
    ],
    role: [Admin],
  },

  {
    title: "Users",
    lanClass: "lan-2",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Users Management",
        id: 2,
        icon: "widget",
        type: "sub",
        lanClass: "lan-2",
        active: false,
        children: [
          {
            path: "/users/management",
            title: "Management",
            type: "link",
            role: [Admin],
          },
          { path: "/users/members", title: "Members", type: "link" },
          {
            path: "/users/subscribers",
            title: "Subscribers",
            type: "link",
            role: [Admin],
          },
          { path: "/users/dealers", title: "Dealers", type: "link" },
          {
            path: "/users/inspectors",
            title: "Inspectors",
            type: "link",
            role: [Admin],
          },
          {
            path: "/users/userslist",
            title: "Users List",
            type: "link",
            role: [Admin],
          },
          {
            path: "/users/membersrequests",
            title: "Member Requests",
            type: "link",
            role: [Admin],
          },
          {
            path: "/users/rejected-members-requests",
            title: "Rejected Requests",
            type: "link",
            role: [Admin],
          },
        ],
      },
    ],
    role: [Admin],
  },
  {
    title: "Products",
    lanClass: "lan-3",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Products",
        id: 3,
        icon: "widget",
        type: "sub",
        lanClass: "lan-6",
        active: false,
        children: [
          // {
          //   path: "/products/productslist",
          //   title: "Products List",
          //   type: "link",
          //   role: [Admin, User],
          // },
          {
            path: "/products/addproducts",
            title: "Add Products",
            type: "link",
            role: [Admin, User],
          },
          {
            path: "/products/all-products",
            title: "Products List",
            type: "link",
            role: [Admin, User],
          },
        ],
      },
    ],
    role: [Admin, User],
  },

  // {
  //   title: "Products",
  //   lanClass: "lan-3",
  //   menucontent: "Dashboards,Widgets",
  //   Items: [
  //     {
  //       title: "Products",
  //       id: 3,
  //       icon: "widget",
  //       type: "sub",
  //       lanClass: "lan-6",
  //       active: false,
  //       children: [
  //         {
  //           path: "/inspection/inspectionlist",
  //           title: "Inspection List",
  //           type: "link",
  //           role: [Admin, User],
  //         },
  //         {
  //           path: "/inspection/user_inspection_packages",
  //           title: "User Inspection Packages",
  //           type: "link",
  //           role: [Admin, User],
  //         },
  //         // {
  //         //   path: "/inspection/rejected_inspection",
  //         //   title: "Rejected Inspection",
  //         //   type: "link",
  //         // },
  //         // {
  //         //   path: "/inspection/approved_inspection",
  //         //   title: "Approved Inspection",
  //         //   type: "link",
  //         // },
  //       ],
  //     },
  //   ],
  //   role: [Admin, User],
  // },

  {
    title: "Car",
    lanClass: "lan-1",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Category",
        id: 4,
        icon: "widget",
        type: "sub",
        lanClass: "lan-6",
        active: false,
        children: [
          {
            path: "/categories/categorylist",
            title: "Category List",
            type: "link",
            role: [Admin],
          },
          {
            path: "/categories/addcategory",
            title: "Add Category",
            type: "link",
            role: [Admin],
          },
        ],
      },
    ],
    role: [Admin, Hr],
  },


  {
    title: "Make",
    lanClass: "lan-1",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Make",
        id: 5,
        icon: "widget",
        type: "sub",
        lanClass: "lan-6",
        active: false,
        children: [
          { path: "/posts/all_posts", title: "All Posts", type: "link" },
          {
            path: "/make/makelist",
            title: "Make List",
            type: "link",
            role: [Admin],
          },
          {
            path: "/make/addmake",
            title: "Add Make",
            type: "link",
            role: [Admin],
          },
        ],
      },
      {
        title: "Brand",
        id: 5,
        icon: "widget",
        type: "sub",
        lanClass: "lan-6",
        active: false,
        children: [
          { path: "/posts/all_posts", title: "All Posts", type: "link" },
          {
            path: "/brands/brandslist",
            title: "Brands List",
            type: "link",
            role: [Admin],
          },
          {
            path: "/brands/addbrand",
            title: "Add Brand",
            type: "link",
            role: [Admin],
          },
        ],
      },
    ],
    role: [Admin, Hr],
  },

  {
    title: "Order",
    lanClass: "lan-3",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Order",
        id: 6,
        icon: "widget",
        type: "sub",
        lanClass: "lan-6",
        active: false,
        children: [
          {
            path: "/order/orderlist",
            title: "Order List",
            type: "link",
            role: [Admin, User],
          },
          {
            path: "/products/addproducts",
            title: "Add Products",
            type: "link",
            role: [Admin, User],
          },
        ],
      },
    ],
    role: [Admin, User],
  },

  {
    title: "Refund",
    lanClass: "lan-6",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Refund Requests",
        id: 7,
        icon: "widget",
        type: "sub",
        lanClass: "lan-6",
        active: false,
        children: [
          {
            path: "/refund/pending_refund",
            title: "Pending Refund",
            type: "link",
            role: [Admin],
          },
          {
            path: "/refund/rejected_refund",
            title: "Rejected Refund",
            type: "link",
            role: [Admin],
          },
          {
            path: "/refund/approved_refund",
            title: "Approved Refund",
            type: "link",
            role: [Admin],
          },
        ],
      },
    ],
    role: [Admin, Hr],
  },

  {
    title: "Payments",
    lanClass: "lan-7",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Payment Requests",
        id: 8,
        icon: "widget",
        type: "sub",
        lanClass: "lan-6",
        active: false,
        children: [
          {
            path: "/payments/active_payments",
            title: "Active Payments",
            type: "link",
            role: [Admin],
          },
          {
            path: "/payments/wallet_payments",
            title: "Wallet Payments",
            type: "link",
            role: [Admin],
          },
          {
            path: "/payments/used_payments",
            title: "Used Payments",
            type: "link",
            role: [Admin],
          },
        ],
      },
    ],
    role: [Admin, Hr],
  },

  {
    title: "Bidding",
    lanClass: "lan-7",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Bidding Requests",
        id: 9,
        icon: "widget",
        type: "sub",
        lanClass: "lan-6",
        active: false,
        children: [
          {
            path: "/bidding/pending_request",
            title: "Pending Request",
            type: "link",
            role: [Admin],
          },
          {
            path: "/bidding/rejected_request",
            title: "Rejected Request",
            type: "link",
            role: [Admin],
          },
          {
            path: "/bidding/forwarded_request",
            title: "Forwarded Request",
            type: "link",
            role: [Admin],
          },
          {
            path: "/bidding/inprocess_request",
            title: "Inspection Started",
            type: "link",
            role: [Admin],
          },
          {
            path: "/bidding/inspected_request",
            title: "Inspected Request",
            type: "link",
            role: [Admin],
          },
          {
            path: "/bidding/sale_through_famewheels",
            title: "Sale Through Request",
            type: "link",
            role: [Admin],
          },
          {
            path: "/bidding/eligible",
            title: "Eligible Request",
            type: "link",
            role: [Admin],
          },
          {
            path: "/bidding/not_eligible",
            title: "Not Eligible Request",
            type: "link",
            role: [Admin],
          },
        ],
      },
    ],
    role: [Admin, Hr],
  },

  {
    title: "Vehicles",
    lanClass: "lan-8",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "New Vehicles",
        id: 10,
        icon: "widget",
        type: "sub",
        lanClass: "lan-8",
        active: false,
        children: [
          {
            path: "/new_car/carpost",
            title: "Ad New Vehicles",
            type: "link",
            role: [Admin],
          },
          {
            path: "/new_car/carpostlist",
            title: "New Vehicles List",
            type: "link",
            role: [Admin],
          },
        ],
      },
    ],
    role: [Admin, Hr],
  },

  {
    title: "Auction",
    lanClass: "lan-8",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Auction Cars",
        id: 11,
        icon: "widget",
        type: "sub",
        lanClass: "lan-8",
        active: false,
        children: [
          {
            path: "/auction/auction_cars",
            title: "Auction Cars List",
            type: "link",
            role: [Admin],
          },
        ],
      },
    ],
    role: [Admin, Hr],
  },

  {
    title: "Dealer",
    lanClass: "lan-8",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Dealer Info",
        id: 12,
        icon: "widget",
        type: "sub",
        lanClass: "lan-8",
        active: false,
        children: [
          {
            path: "/dealer/add_dealer",
            title: "Add Dealer",
            type: "link",
            role: [Admin],
          },
          {
            path: "/dealer/dealerslist",
            title: "Dealers List",
            type: "link",
            role: [Admin],
          },
        ],
      },
    ],
    role: [Admin, Hr],
  },
];
