import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { WithIndicator } from "@/Constant";
import { WithIndicatorData, WithIndicatorDataList } from "@/Data/BonusUi/OwlCarousel";
import { Card, CardBody, Col } from "reactstrap";
import CommonCarousel from "./Common/CommonCarousel";

const WithIndicators = ({images,id}:{images:any,id:any}) => {
  return (
    <Col>
      <Card>
        {/* <CommonCardHeader title={WithIndicator} span={WithIndicatorData} /> */}
        <CardBody className="bg-dark rounded p-2">
          <CommonCarousel id={id} images={images} data={WithIndicatorDataList} control indecators ride="carousel" />
        </CardBody>
      </Card>
    </Col>
  );
};

export default WithIndicators;
