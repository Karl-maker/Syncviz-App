import VirtualSpace from "../../pages/virtual-space";
import { Route, Routes } from "react-router-dom";

export default function PageNavigation() {
  return (
    <Routes>
      <Route path="/" caseSensitive={false} element={<VirtualSpace />} />
      {/* <Route
        path="/virtul-space"
        caseSensitive={false}
        element={<VirtualSpace />}
      /> */}
    </Routes>
  );
}
