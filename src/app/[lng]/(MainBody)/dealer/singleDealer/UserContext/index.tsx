import { Row, TabContent, TabPane } from "reactstrap";
import AboutTab from "./AboutTab";
import TimelineTab from "./TimeLineTab";
import AllCards from "./AllCards";
import PhotosTab from "./PhotosTab";
import { SocialAppTabContentProp } from "@/Types/SocialAppType";

const SocialAppTabContent :React.FC<SocialAppTabContentProp> = ({ activeTab,dealer }) => {
  return (
    <TabContent activeTab={activeTab} className="tab-content">
      <TabPane tabId={1}>
        <TimelineTab dealer={dealer}/>
      </TabPane>
      <TabPane tabId={2}>
        <AboutTab />
      </TabPane>
      <TabPane tabId={3}>
        <Row>
          <AllCards />
        </Row>
      </TabPane>
      <TabPane tabId={4}>
        <Row>
          <PhotosTab />
        </Row>
      </TabPane>
    </TabContent>
  );
};

export default SocialAppTabContent;
