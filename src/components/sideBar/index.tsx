import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ChecklistIcon from "@mui/icons-material/Checklist";
import PersonIcon from "@mui/icons-material/Person";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import SortIcon from "@mui/icons-material/Sort";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PaidIcon from "@mui/icons-material/Paid";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import PostAddIcon from "@mui/icons-material/PostAdd";
import logo from "../../../public/assets/fame-wheels-logo.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import ListIcon from "@mui/icons-material/List";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Logout } from "@mui/icons-material";
import { useRouter } from "next/router";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import CarRentalIcon from "@mui/icons-material/CarRental";

const Sidebar = () => {
  const [showRefund, setShowRefund] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showPayments, setShowPayments] = useState(false);

  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(!open)}
          className="max-lg:flex hidden mx-2 p-1 bg-red-500 rounded-full absolute top-1 z-50"
        >
          <MenuIcon sx={{ color: "white" }} fontSize="large" />
        </button>
      )}

      {open && (
        <div className="h-screen w-screen bg-black z-40 opacity-40 absolute top-0 left-0"></div>
      )}

      <aside
        className={`lg:flex  pl-3 ${
          open ? "flex absolute" : "hidden"
        } flex-col w-64 min-h-screen py-2 justify-between ${
          open ? "absolute" : "sticky"
        } z-50`}
      >
        {open && (
          <button
            onClick={() => setOpen(!open)}
            className="max-xl:flex hidden absolute left-52 top-1 p-1 bg-red-500 rounded-full"
          >
            <CloseIcon sx={{ color: "white" }} fontSize="large" />
          </button>
        )}

        <div className=" mt-6 flex flex-col gap-10 align-items-center align-items-sm-start px-3 pt-5 text-white min-vh-100">
          <Link href="/">
            <Image src={logo} alt={`Fame Wheels`} width={200} height={50} />
          </Link>
          <ul className="flex flex-col mb-sm-auto mb-0 gap-2" id="menu">
            <li className="nav-item">
              <Link
                href="/"
                className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
              >
                <DashboardIcon sx={{ color: "#ED2024", fontSize: 20 }} />
                <span className="ms-2  d-sm-inline">Dashboard</span>
              </Link>
            </li>

            {/* <li className="nav-item">
              <Link
                href="/userslist"
                className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
              >
                <PersonIcon sx={{ color: "#ED2024", fontSize: 20 }} />
                <span className="ms-2  d-sm-inline">User List</span>
              </Link>
            </li> */}
            <button
              data-bs-toggle="collapse"
              className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
            >
              <PersonIcon sx={{ color: "#ED2024", fontSize: 20 }} />

              <span
                className="ms-2  d-sm-inline"
                onClick={() => setShowUsers(!showUsers)}
              >
                User Management
                {showUsers ? (
                  <ArrowDropUpIcon sx={{ color: "#ED2024" }} />
                ) : (
                  <ArrowDropDownIcon sx={{ color: "#ED2024" }} />
                )}
              </span>
            </button>
            {showUsers && (
              <div className="ml-5">
                <li>
                  <Link
                    href="/users/management"
                    data-bs-toggle="collapse"
                    className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
                  >
                    <ListIcon sx={{ color: "#ED2024", fontSize: 20 }} />

                    <span className="ms-2  d-sm-inline">Management</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/users/members"
                    data-bs-toggle="collapse"
                    className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
                  >
                    <ChecklistIcon sx={{ color: "#ED2024", fontSize: 20 }} />

                    <span className="ms-2  d-sm-inline">Members</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/users/subscribers"
                    data-bs-toggle="collapse"
                    className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
                  >
                    <SortIcon sx={{ color: "#ED2024", fontSize: 20 }} />

                    <span className="ms-2  d-sm-inline">Subscribers</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/users/dealers"
                    data-bs-toggle="collapse"
                    className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
                  >
                    <ListIcon sx={{ color: "#ED2024", fontSize: 20 }} />

                    <span className="ms-2  d-sm-inline">Dealers</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/users/inspectors"
                    data-bs-toggle="collapse"
                    className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
                  >
                    <ListIcon sx={{ color: "#ED2024", fontSize: 20 }} />

                    <span className="ms-2  d-sm-inline">Inspectors</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/users/all"
                    data-bs-toggle="collapse"
                    className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
                  >
                    <ListIcon sx={{ color: "#ED2024", fontSize: 20 }} />

                    <span className="ms-2  d-sm-inline">Users</span>
                  </Link>
                </li>
              </div>
            )}
            <li>
              <Link
                href="/inspectionlist"
                data-bs-toggle="collapse"
                className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
              >
                <FindReplaceIcon sx={{ color: "#ED2024", fontSize: 20 }} />
                <span className="ms-2  d-sm-inline">Inspection List</span>{" "}
              </Link>
            </li>
            <li>
              <Link
                href="/cartransfer"
                data-bs-toggle="collapse"
                className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
              >
                <TransferWithinAStationIcon
                  sx={{ color: "#ED2024", fontSize: 20 }}
                />
                <span className="ms-2  d-sm-inline">Car Transfer</span>{" "}
              </Link>
            </li>
            <li>
              <Link
                href="/carimport"
                data-bs-toggle="collapse"
                className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
              >
                <CarRentalIcon sx={{ color: "#ED2024", fontSize: 20 }} />
                <span className="ms-2  d-sm-inline">Car Import</span>{" "}
              </Link>
            </li>
            <li>
              <Link
                href="/carregistration"
                data-bs-toggle="collapse"
                className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
              >
                <NoCrashIcon sx={{ color: "#ED2024", fontSize: 20 }} />
                <span className="ms-2  d-sm-inline">Car Registration</span>{" "}
              </Link>
            </li>
            <li>
              <Link
                href="/postlist"
                data-bs-toggle="collapse"
                className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
              >
                <DynamicFeedIcon sx={{ color: "#ED2024", fontSize: 20 }} />
                <span className="ms-2  d-sm-inline">All Posts</span>{" "}
              </Link>
            </li>
            <li>
              <Link
                href="/addbidding"
                data-bs-toggle="collapse"
                className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
              >
                <PostAddIcon sx={{ color: "#ED2024", fontSize: 20 }} />

                <span className="ms-2  d-sm-inline">Add Bidding Post</span>
              </Link>
            </li>
            <li>
              <Link
                href="/newcarpost"
                data-bs-toggle="collapse"
                className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
              >
                <DirectionsCarIcon sx={{ color: "#ED2024", fontSize: 20 }} />

                <span className="ms-2  d-sm-inline">Add New Vehicle</span>
              </Link>
            </li>

            <button
              data-bs-toggle="collapse"
              className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
            >
              <PaidIcon sx={{ color: "#ED2024", fontSize: 20 }} />

              <span
                className="ms-2  d-sm-inline"
                onClick={() => setShowPayments(!showPayments)}
              >
                Payments
                {showPayments ? (
                  <ArrowDropUpIcon sx={{ color: "#ED2024" }} />
                ) : (
                  <ArrowDropDownIcon sx={{ color: "#ED2024" }} />
                )}
              </span>
            </button>
            {showPayments && (
              <div className="ml-5">
                <li>
                  <Link
                    href="/payments/activepayments"
                    data-bs-toggle="collapse"
                    className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
                  >
                    <AvTimerIcon sx={{ color: "#ED2024", fontSize: 20 }} />

                    <span className="ms-2  d-sm-inline">Active Payments</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/payments/walletpayments"
                    data-bs-toggle="collapse"
                    className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
                  >
                    <AccountBalanceWalletIcon
                      sx={{ color: "#ED2024", fontSize: 20 }}
                    />

                    <span className="ms-2  d-sm-inline">Wallet Payments</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/payments/usedpayments"
                    data-bs-toggle="collapse"
                    className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
                  >
                    <ChecklistIcon sx={{ color: "#ED2024", fontSize: 20 }} />

                    <span className="ms-2  d-sm-inline">Used Payments</span>
                  </Link>
                </li>
              </div>
            )}
            {/* <hr /> */}
            <button
              data-bs-toggle="collapse"
              className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
            >
              <PriceCheckIcon sx={{ color: "#ED2024", fontSize: 20 }} />

              <span
                className="ms-2  d-sm-inline"
                onClick={() => setShowRefund(!showRefund)}
              >
                Refund Request{" "}
                {showRefund ? (
                  <ArrowDropUpIcon sx={{ color: "#ED2024" }} />
                ) : (
                  <ArrowDropDownIcon sx={{ color: "#ED2024" }} />
                )}
              </span>
            </button>

            {showRefund && (
              <div className="mx-3">
                <li>
                  <Link
                    href="/refund/pendingrequest"
                    data-bs-toggle="collapse"
                    className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
                  >
                    <CurrencyExchangeIcon
                      sx={{ color: "#ED2024", fontSize: 20 }}
                    />

                    <span className="ms-2  d-sm-inline">Pending Requests</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refund/approvedrequest"
                    data-bs-toggle="collapse"
                    className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
                  >
                    <ChecklistIcon sx={{ color: "#ED2024", fontSize: 20 }} />

                    <span className="ms-2  d-sm-inline">
                      Approved Refund Requests
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refund/rejectedrequest"
                    data-bs-toggle="collapse"
                    className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
                  >
                    <PlaylistRemoveIcon
                      sx={{ color: "#ED2024", fontSize: 20 }}
                    />

                    <span className="ms-2  d-sm-inline">
                      Rejected Refund Requests
                    </span>
                  </Link>
                </li>
              </div>
            )}
            {/* <hr /> */}

            <button
              data-bs-toggle="collapse"
              className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
            >
              <ListIcon sx={{ color: "#ED2024", fontSize: 20 }} />

              <span
                className="ms-2  d-sm-inline"
                onClick={() => setShowPost(!showPost)}
              >
                Website Posts{" "}
                {showPost ? (
                  <ArrowDropUpIcon sx={{ color: "#ED2024" }} />
                ) : (
                  <ArrowDropDownIcon sx={{ color: "#ED2024" }} />
                )}
              </span>
            </button>

            {showPost && (
              <div className="ml-5">
                <li>
                  <Link
                    href="/postlist/approved"
                    data-bs-toggle="collapse"
                    className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
                  >
                    <ChecklistIcon sx={{ color: "#ED2024", fontSize: 20 }} />

                    <span className="ms-2  d-sm-inline">Approved Posts</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/postlist/pending"
                    data-bs-toggle="collapse"
                    className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
                  >
                    <SortIcon sx={{ color: "#ED2024", fontSize: 20 }} />

                    <span className="ms-2  d-sm-inline">Pending Posts</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/postlist/rejected"
                    data-bs-toggle="collapse"
                    className="flex gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left p-2"
                  >
                    <PlaylistRemoveIcon
                      sx={{ color: "#ED2024", fontSize: 20 }}
                    />

                    <span className="ms-2  d-sm-inline">Rejected Posts</span>
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>

        <div className="mx-5">
          <button
            className="flex md:mb-5  mb-0 gap-2 text-base font-semibold text-gray-700 hover:bg-[#ed202311] rounded-md w-full justify-left items-center p-3"
            onClick={handleLogout}
          >
            <Logout sx={{ color: "#ED2024", fontSize: 20 }} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
