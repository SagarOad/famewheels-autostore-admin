import { Href, ImagePath } from "@/Constant";
import { FriendData } from "@/Data/Application/SocialApp";
import { MyProfileClassCollapseProp } from "@/Types/SocialAppType";
import { CardBody, Col, Collapse, Row } from "reactstrap";
 
const ShowroomInfo :React.FC<MyProfileClassCollapseProp> = ({ isFilter,dealer }) => {
  return (
    <>
    <Collapse isOpen={isFilter}>
      <CardBody className="social-status filter-cards-view">
          <div className="d-flex">
            {/* <img className="img-50 rounded-circle m-r-15" src={`${ImagePath}/user/${data.imageName}`} alt="user"/> */}
            <div className="flex-grow-1">

<Row>
<Col sm="4"><span className="f-w-600 d-block">Showroom Name</span></Col>

<Col sm="8">{dealer?.showroom_name}</Col>

<Col sm="4"><span className="f-w-600 d-block">Showroom Phone</span></Col>

<Col sm="8">{dealer?.showroom_no}</Col>

<Col xs="4"><span className="f-w-600 d-block">Showroom Address</span></Col>

<Col xs="8">{dealer?.showroom_address}</Col>


</Row>

            </div>
          </div>
      </CardBody>
    </Collapse>

  
    </>
  );
};

export default ShowroomInfo;
