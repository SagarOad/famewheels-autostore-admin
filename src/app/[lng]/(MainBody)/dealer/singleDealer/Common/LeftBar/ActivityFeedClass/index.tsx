import { useState } from "react";
import { Card } from "reactstrap";
import ActivityFeedCollapse from "./ActivityFeedCollapase";
import HeaderWithIcon from "../../HeaderWithIcon";
import { ActivityFeed } from "@/Constant";
import ShowroomInfo from "./ShowroomInfor";

const ActivityFeedClass = ({dealer}:{dealer:any}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [ShowOpen, setShowOpen] = useState(true);

  return (
    <>
    <Card>
      <HeaderWithIcon Heading={"Dealer Info"} isOpen={isOpen} setIsOpen={setIsOpen} />
      <ActivityFeedCollapse isFilter={isOpen} dealer={dealer}/>
    </Card>

<Card>
<HeaderWithIcon Heading={"Showroom Info"} isOpen={ShowOpen} setIsOpen={setShowOpen} />
<ShowroomInfo isFilter={ShowOpen} dealer={dealer}/>
</Card>
</>
  );
};

export default ActivityFeedClass;
