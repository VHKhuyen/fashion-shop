import { RouterProvider } from "react-router-dom";
import "./assets/styles/textstyles.css";
import { routes } from "./routes";

const App = () => {
  return (
    <div className="app">
      <RouterProvider router={routes} />
    </div>
  );
};

export default App;
