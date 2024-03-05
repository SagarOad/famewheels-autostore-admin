import { Fragment } from "react";
import ActivityFeedClass from "./ActivityFeedClass";
import MutualFriends from "./MutualFriends";
import MyProfileClass from "./MyProfileClass";

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
