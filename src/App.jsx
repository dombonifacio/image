import { useRoutes } from "react-router-dom";

import "./App.css";

import { Images } from "./pages/Images";
import { Home } from "./pages/Home";

function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/images",
      element: <Images />,
    },
  ]);

  return element;
}

export default App;
