import { Href, ImagePath } from "@/Constant";
import { FriendData } from "@/Data/Application/SocialApp";
import { MyProfileClassCollapseProp } from "@/Types/SocialAppType";
import { CardBody, Col, Collapse, Row } from "reactstrap";
 
const ActivityFeedCollapse :React.FC<MyProfileClassCollapseProp> = ({ isFilter,dealer }) => {
  return (
    <>
    <Collapse isOpen={isFilter}>
      <CardBody className="social-status filter-cards-view">
          <div className="d-flex">
            {/* <img className="img-50 rounded-circle m-r-15" src={`${ImagePath}/user/${data.imageName}`} alt="user"/> */}
            <div className="flex-grow-1">

<Row>
<Col sm="4"><span className="f-w-600 d-block">Dealer Name</span></Col>

<Col sm="8">{dealer?.name}</Col>

<Col sm="4"><span className="f-w-600 d-block">Dealer Email</span></Col>

<Col sm="8">{dealer?.email}</Col>

<Col xs="4"><span className="f-w-600 d-block">Dealer Phone</span></Col>

<Col xs="8">{dealer?.phone}</Col>

<Col xs="4"><span className="f-w-600 d-block">Dealer City</span></Col>

<Col xs="8">{dealer?.city_name}</Col>

</Row>

            </div>
          </div>
      </CardBody>
    </Collapse>

  
    </>
  );
};

export default ActivityFeedCollapse;
