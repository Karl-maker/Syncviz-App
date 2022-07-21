import VirtualSpace from "../../pages/virtual-space";
import CreateVirtualSpace from "../../pages/create-virtual-space";
import SearchVirtualSpace from "../../pages/search-virtual-space";
import { Route, Routes } from "react-router-dom";
import PAGES from "../../utils/constants/page-names";

export default function PageNavigation() {
  return (
    <Routes>
      <Route
        path={PAGES.METAVERSE_FEED}
        caseSensitive={false}
        element={<SearchVirtualSpace />}
      />
      <Route
        path={PAGES.METAVERSE_ROOM}
        caseSensitive={false}
        element={<VirtualSpace />}
      />
      <Route
        path={PAGES.CREATE_METAVERSE}
        caseSensitive={false}
        element={<CreateVirtualSpace />}
      />
      <Route
        path={PAGES.METAVERSE_SEARCH}
        caseSensitive={false}
        element={<></>}
      />
    </Routes>
  );
}
