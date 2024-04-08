import classes from "../src/App.module.css";
import CardForm from "./components/CardForm";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Card from "./components/Card";
import Router from "./Router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Router />,
    children: [
      { path: "/CardForm", element: <CardForm /> },
      { path: "Cards", element: <Card /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
