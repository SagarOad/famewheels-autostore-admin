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
            role: [Admin, User],
          },
          // {
          //   path: "/inspection/pending_inspection",
          //   title: "Pending Inspection",
          //   type: "link",
          // },
          // {
          //   path: "/inspection/rejected_inspection",
          //   title: "Rejected Inspection",
          //   type: "link",
          // },
          // {
          //   path: "/inspection/approved_inspection",
          //   title: "Approved Inspection",
          //   type: "link",
          // },
        ],
      },
    ],
    role: [Admin, User],
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
            role: [Admin],
          },
          {
            path: "/cartransfer/car_import",
            title: "Car Import",
            type: "link",
            role: [Admin],
          },
          {
            path: "/cartransfer/car_registration",
            title: "Car Registration",
            type: "link",
            role: [Admin],
          },
        ],
      },
    ],
    role: [Admin, Hr],
  },

  {
    title: "Posts",
    lanClass: "lan-1",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Normal Ads",
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
            role: [Admin],
          },
          {
            path: "/posts/rejected_posts",
            title: "Rejected Posts",
            type: "link",
            role: [Admin],
          },
          {
            path: "/posts/approved_posts",
            title: "Approved Posts",
            type: "link",
            role: [Admin],
          },
        ],
      },
      {
        title: "Managed by FameWheels",
        id: 5,
        icon: "widget",
        type: "sub",
        lanClass: "lan-6",
        active: false,
        children: [
          { path: "/posts/all_posts", title: "All Posts", type: "link" },
          {
            path: "/managed_by_fameWheels/active_posts",
            title: "Active Ads",
            type: "link",
            role: [Admin],
          },
          {
            path: "/managed_by_fameWheels/sold_posts",
            title: "Sold Ads",
            type: "link",
            role: [Admin],
          },
          {
            path: "/managed_by_fameWheels/all_posts",
            title: "All Ads",
            type: "link",
            role: [Admin],
          },
        ],
      },
    ],
    role: [Admin, Hr],
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
        id: 7,
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
        id: 7,
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
