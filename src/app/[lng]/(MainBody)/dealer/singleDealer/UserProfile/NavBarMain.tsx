import { Nav, NavLink, NavItem } from "reactstrap";
import { useState, Fragment } from "react";
import { Href } from "@/Constant";
import { SocialAppCallBackType } from "@/Types/SocialAppType";
import { SocialNavData } from "@/Data/Application/SocialApp";
import { useAppSelector } from "@/Redux/Hooks";

const NavBarMain :React.FC<SocialAppCallBackType> = ({ callback,dealerData }) => {
  const [activeTab, setActiveTab] = useState(1);
  const { i18LangStatus } = useAppSelector((store) => store.langSlice);
  const tabHandler = ( id : number) => {
    setActiveTab(id);
    callback(id);
  };

  return (
    <Nav tabs className="border-tab tabs-scoial">
      {SocialNavData.map((data, index) => (
        <Fragment key={index}>
          {data.userProfile ? (
            <NavItem>
              <div className="user-designation" />
              <div className="title">
                <h4 className="text-capitalize">{dealerData?.name}</h4>
              </div>
              <div className="desc mt-2">{dealerData?.showroom_name}</div>
            </NavItem>
          ) : (
            <NavItem className="nav">
              <NavLink className={activeTab === data.id ? "active" : ""} onClick={() => tabHandler(data.id)}>
                {data.tittle}
              </NavLink>
            </NavItem>
          )}
        </Fragment>
      ))}
    </Nav>
  );
};

export default NavBarMain;
