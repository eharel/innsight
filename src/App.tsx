import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  // RouterProvider is the new API introduced in React Router v6.4+
  // It leverages the Data API features including loaders and actions
  return <RouterProvider router={router} />;
}

export default App;
