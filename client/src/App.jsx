import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/index";
import { Toaster } from "react-hot-toast";
import "./assets/styles/colors.css";
import "./assets/styles/textstyles.css";

function App() {
  return (
    <div className="app">
      <RouterProvider router={routes} />
      <Toaster />
    </div>
  );
}

export default App;
