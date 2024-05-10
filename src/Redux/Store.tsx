import { configureStore } from "@reduxjs/toolkit";
import HeaderBookmarkSlice from "./Reducers/HeaderBookmarkSlice";
import LayoutSlice from "./Reducers/LayoutSlice";
import ThemeCustomizerSlice from "./Reducers/ThemeCustomizerSlice";
import LanguageSlice from "./Reducers/LanguageSlice";
import ProductSlice from "./Reducers/ProductSlice";
import UserSlice from "./Reducers/UserSlice";
import FilterSlice from "./Reducers/FilterSlice";

const Store = configureStore({
  reducer: {
    layout: LayoutSlice,
    headerBookMark: HeaderBookmarkSlice,
    themeCustomizer: ThemeCustomizerSlice,
    langSlice: LanguageSlice,
    product: ProductSlice,
    user: UserSlice,
    filterData: FilterSlice,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
