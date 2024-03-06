import { Fragment } from "react";
import ActivityFeedClass from "./ActivityFeedClass";


const LeftBar = ({dealer}:{dealer:any}) => {
  return (
    <Fragment>
        {/* <MyProfileClass />
        <MutualFriends /> */}
        <ActivityFeedClass dealer={dealer}/> 
    </Fragment>
  );
};

export default LeftBar;
