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
  },

  // {
  //   title: "General",
  //   lanClass: "lan-1",
  //   menucontent: "Dashboards,Widgets",
  //   Items: [
  //     {
  //       title: "Ecom",
  //       id: 1,
  //       icon: "home",
  //       type: "sub",
  //       lanClass: "lan-3",
  //       path: "/dashboard/default_dashboard/ecommerce",
  //     },
  //   ],
  // },

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
          { path: "/users/management", title: "Management", type: "link" },
          { path: "/users/members", title: "Members", type: "link" },
          { path: "/users/subscribers", title: "Subscribers", type: "link" },
          { path: "/users/dealers", title: "Dealers", type: "link" },
          { path: "/users/inspectors", title: "Inspectors", type: "link" },
          { path: "/users/userslist", title: "Users List", type: "link" },
        ],
      },
    ],
  },

  {
    title: "Inspection",
    lanClass: "lan-3",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Inspection List",
        id: 3,
        icon: "widget",
        type: "sub",
        lanClass: "lan-6",
        active: false,
        children: [
          {
            path: "/inspection/inspectionlist",
            title: "Inspection List",
            type: "link",
          },
          {
            path: "/inspection/pending_inspection",
            title: "Pending Inspection",
            type: "link",
          },
          {
            path: "/inspection/rejected_inspection",
            title: "Rejected Inspection",
            type: "link",
          },
          {
            path: "/inspection/approved_inspection",
            title: "Approved Inspection",
            type: "link",
          },
        ],
      },
    ],
  },

  {
    title: "Car",
    lanClass: "lan-1",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Car Management",
        id: 4,
        icon: "widget",
        type: "sub",
        lanClass: "lan-6",
        active: false,
        children: [
          {
            path: "/cartransfer/car_transferlist",
            title: "Car Transfer",
            type: "link",
          },
          {
            path: "/cartransfer/car_import",
            title: "Car Import",
            type: "link",
          },
          {
            path: "/cartransfer/car_registration",
            title: "Car Registration",
            type: "link",
          },
        ],
      },
    ],
  },

  {
    title: "Posts",
    lanClass: "lan-1",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Website Posts",
        id: 5,
        icon: "widget",
        type: "sub",
        lanClass: "lan-6",
        active: false,
        children: [
          { path: "/posts/all_posts", title: "All Posts", type: "link" },
          {
            path: "/posts/pending_posts",
            title: "Pending Posts",
            type: "link",
          },
          {
            path: "/posts/rejected_posts",
            title: "Rejected Posts",
            type: "link",
          },
          {
            path: "/posts/approved_posts",
            title: "Approved Posts",
            type: "link",
          },
        ],
      },
    ],
  },

  {
    title: "Refund",
    lanClass: "lan-6",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Refund Requests",
        id: 6,
        icon: "widget",
        type: "sub",
        lanClass: "lan-6",
        active: false,
        children: [
          {
            path: "/refund/pending_refund",
            title: "Pending Refund",
            type: "link",
          },
          {
            path: "/refund/rejected_refund",
            title: "Rejected Refund",
            type: "link",
          },
          {
            path: "/refund/approved_refund",
            title: "Approved Refund",
            type: "link",
          },
        ],
      },
    ],
  },

  {
    title: "Payments",
    lanClass: "lan-7",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Payment Requests",
        id: 7,
        icon: "widget",
        type: "sub",
        lanClass: "lan-6",
        active: false,
        children: [
          {
            path: "/payments/active_payments",
            title: "Active Payments",
            type: "link",
          },
          {
            path: "/payments/wallet_payments",
            title: "Wallet Payments",
            type: "link",
          },
          {
            path: "/payments/used_payments",
            title: "Used Payments",
            type: "link",
          },
        ],
      },
    ],
  },

  {
    title: "Bidding",
    lanClass: "lan-7",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Bidding Requests",
        id: 7,
        icon: "widget",
        type: "sub",
        lanClass: "lan-6",
        active: false,
        children: [
          {
            path: "/bidding/pending_request",
            title: "Pending Request",
            type: "link",
          },
          {
            path: "/bidding/rejected_request",
            title: "Rejected Request",
            type: "link",
          },
          {
            path: "/bidding/forwarded_request",
            title: "Forwarded Request",
            type: "link",
          },
          {
            path: "/bidding/inprocess_request",
            title: "Inprocess Request",
            type: "link",
          },
          {
            path: "/bidding/inspected_request",
            title: "Inspected Request",
            type: "link",
          },
          {
            path: "/bidding/sale_through_famewheels",
            title: "Sale Through Request",
            type: "link",
          },
          {
            path: "/bidding/eligible",
            title: "Eligible Request",
            type: "link",
          },
          {
            path: "/bidding/not_eligible",
            title: "Not Eligible Request",
            type: "link",
          },
        ],
      },
    ],
  },

  {
    title: "Vehicles",
    lanClass: "lan-8",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "New Vehicles",
        id: 7,
        icon: "widget",
        type: "sub",
        lanClass: "lan-8",
        active: false,
        children: [
          {
            path: "/new_car/carpost",
            title: "Ad New Vehicles",
            type: "link",
          },
          {
            path: "/new_car/carpostlist",
            title: "New Vehicles List",
            type: "link",
          },
        ],
      },
    ],
  },
];
