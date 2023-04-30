import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/index";
import "./assets/styles/textstyles.css";

function App() {
  return (
    <div className="app">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
