import Header from "./header";

export default function Layout({ children }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2 col-sm-0 d-none d-lg-block">
          {
            // Side menu bar
          }
          Sidebar
        </div>
        <div className="col-lg-10 col-sm-12">
          <div className="row">
            {
              // header (top of screen)
            }
            <Header />
          </div>
          <div className="row">
            {
              // main body with page
            }
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
