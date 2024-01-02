import { NextPage } from "next";
import React, { useCallback, useRef } from "react";

import Styles from "./layout.module.css";
import LayoutContext, { useLayoutReducer } from "./layout.context";
import Sidebar from "@/components/sideBar";

const MainLayout: NextPage<React.PropsWithChildren<{}>> = (props) => {
  const [state, dispatch] = useLayoutReducer();

  return (
    <LayoutContext.Provider value={[state, dispatch]}>
      <div className="flex h-screen">
        <div className="shadow-2xl">
          <Sidebar />
        </div>

        <div className={`${Styles.main__body} myDiv`}>{props.children}</div>
      </div>
    </LayoutContext.Provider>
  );
};

export default MainLayout;
