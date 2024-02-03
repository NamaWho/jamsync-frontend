import { Outlet } from "react-router-dom";
import logo from "./logo.svg";

function App() {
  return (
    <div className="flex overflow-scroll ">
      {/* <div className="basis-[12%] h-[100vh]">
          <Sidebar />
        </div>
        <div className="basis-[88%] border overflow-scroll h-[100vh]">
          <Dashboardview />
          <div>
            <Outlet></Outlet>
          </div>
        </div> */}
    </div>
  );
}

export default App;
