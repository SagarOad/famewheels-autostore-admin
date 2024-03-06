import { Href, ImagePath } from "@/Constant";
import { SocialAppCallBackType } from "@/Types/SocialAppType";
import Link from "next/link";
import { Card, Col, Row } from "reactstrap";
import NavBarMain from "./NavBarMain";
import UserProfileIcon from "./UserProfileIcon";

const UserProfile :React.FC<SocialAppCallBackType> = ({ callback,dealerData,imagepath }) => {
  return (
    <Row>
      <Col sm="12" className="box-col-12">
        <Card className="hovercard text-center">
          <div className="cardheader socialheader" style={{backgroundImage:`url(${imagepath}/${dealerData?.user_id}/${dealerData?.showroom_cover})`,backgroundRepeat:"no-repeat"}}/>
          <div className="user-image">
            <div className="avatar">
              <img alt="Avatar" className="object-fit-contain" style={{backgroundColor:"white"}} src={`${imagepath}/${dealerData?.user_id}/${dealerData?.showroom_logo}`} />
            </div>
            {/* <div className="icon-wrapper">
              <Link href={Href}><i className="icofont icofont-pencil-alt-5" /></Link>
            </div> */}
            {/* <UserProfileIcon /> */}
          </div>
          <div className="info market-tabs p-0">
            <NavBarMain callback={callback} dealerData={dealerData}/>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default UserProfile;
