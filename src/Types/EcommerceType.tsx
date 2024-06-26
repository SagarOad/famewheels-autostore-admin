import { InputType } from "reactstrap/types/lib/Input";

export interface OrderHistoryTableColumns {
  image: string;
  productName: string;
  tag: string;
  size: string;
  color: string;
  articleNumber: number;
  units: number;
  price: string;
  icon: JSX.Element;
}

export interface OrderHistoryImageType {
  name: string;
  tag?: string;
}

export interface FormGroupCommonProp {
  type: InputType;
  placeholder?: string;
  formClass?: string;
  rows?: number;
}

export interface SelectCommonProp {
  data: string[];
  size: number;
  selectClass?: string;
}

export interface ProductListTableDataColumnType {
  image: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  quantity: number;
  status: string;
  rating: number;
}
export interface BrandListTableDataColumnType {
  brand_name: string;
  created_at: string;
  make_names: [];
  make_it?: string;
  status_id?: number;
  brand_id?: number;
}
export interface MakeListTableDataColumnType {
  makeName?: string;
  makeId?: number;
  makeImage?: string;
  famousMake?: number;
}


export interface ProductListTableProduct {
  images?: string;
  name?: string;
  rate?: number;
}

interface VariantsInterface {
  color: string;
  images: string;
}

export interface ProductItemInterface {
  id: number;
  image: string;
  name: string;
  note: string;
  description: string;
  discountPrice: string;
  status: string;
  price: number;
  stock: string;
  review: string;
  category: string;
  colors: string[];
  size: string[];
  tags: string[];
  variants: VariantsInterface[];
  ribbonClassName?: string;
  rating: number;
}

export interface ProductInterface {
  product_id: number;
  product_token: string;
  product_title: string;
  product_slug: string;
  product_description: string;
  discountPrice: string;
  product_cover: string;
  product_actual_price: number;
  product_discounted_price: string;
  product_stock_quantity: any;
  // colors: string[];
  // size: string[];
  // tags: string[];
  // variants: VariantsInterface[];
  // ribbonClassName?: string;
  vendor_id: number;
  brand_id: number;
  product_category_id: number;
  status_id:number;
}




export interface ProductSliceProp {
  filterToggle: boolean;
  productItem: ProductItemInterface[];
  symbol: string;
}

export interface ClothsDetailsTabContentProp {
  activeTab: number;
  dimensions:any
engineMotor:any
transmission:any
steering:any
suspension:any
wheelTyre:any
fuelEconomy:any
safety:any
exterior:any
instrument:any
info:any
comfort:any
}

interface VariantsType {
  color: string;
  images: string;
}
export interface CartType {
  variants: VariantsType[];
  total?: any;
  sum?: number;
  id: number;
  image: string;
  name: string;
  note: string;
  description: string;
  discountPrice: string;
  price: number;
  status: string;
  ribbonClassName?: string;
  stock: string;
  review: string;
  rating: number;
  category: string;
  colors: string[];
  size: string[];
  tags: string[];
}

interface ValueInterface {
  min: number;
  max: number;
}
export interface FilterInterface {
  color: string;
  searchBy: string;
  value: ValueInterface;
  sortBy: string;
  category: string[];
  brand: string[];
}

interface CommonProductSlideData {
  rowClass?: string;
  image: string;
  title: string;
  text: string;
}

export interface CommonProductSlideProp {
  data: CommonProductSlideData;
}

export interface CartSliceProp {
  cart: CartType[];
  tax: number;
}

export interface HoverButtonsProp {
  item: ProductItemInterface;
  setDataId: (id: number) => void;
  setOpenModal: (key: boolean) => void;
}

export interface ProductDetailsProp {
  item: ProductInterface;
}

export interface ProductModalInterfaceType {
  value: boolean;
  setOpenModal: (value: boolean) => void;
  dataId: any | number;
}

export interface ModalProductDetailsProp {
  singleProduct: ProductInterface;
}

export interface ModalQuantityProp {
  quantity: number;
  setQuantity: (key: number) => void;
}

export interface ModalButtonsProp {
  singleProduct: ProductItemInterface;
  quantity: number;
}

export interface CartQuantityButtonProp {
  item: CartType;
}

export interface InvoicePrintType {
  handlePrint?: () => void;
}

export interface AddProductSliceType {
  navId: number;
  tabId: number;
  formValue: any;
}

export interface CheckoutFormType {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  chech: boolean;
}