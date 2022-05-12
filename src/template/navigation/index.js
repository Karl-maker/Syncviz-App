import MainPage from "../../pages/main";
import { Route, Routes } from "react-router-dom";

export default function PageNavigation() {
  return (
    <Routes>
      <Route path="/" caseSensitive={false} element={<MainPage />} />
    </Routes>
  );
}
