import VirtualSpace from "../../pages/virtual-space";
import CreateVirtualSpace from "../../pages/create-virtual-space";
import { Route, Routes } from "react-router-dom";

export default function PageNavigation() {
  return (
    <Routes>
      <Route path="/" caseSensitive={false} element={<VirtualSpace />} />
      <Route
        path="/create"
        caseSensitive={false}
        element={<CreateVirtualSpace />}
      />
    </Routes>
  );
}
