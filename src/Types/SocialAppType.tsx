export interface SocialAppCallBackType {
  callback: (tab: number) => void;
  dealerData?:any,
  imagepath?:any
}

export interface SocialAppTabContentProp {
  activeTab: number;
  dealer:any
}

export interface HeaderWithIconPropsTypes {
  setIsOpen: (parameter: boolean) => void;
  isOpen: boolean;
  Heading: string;
}

export interface MyProfileClassCollapseProp {
  isFilter: any;
  dealer:any
}

export interface PeopleYouMayKnowProp {
  heading: string;
}

export interface MyActivityProp {
  heading: string;
}