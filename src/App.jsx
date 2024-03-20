/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registration from "./pages/Registration/Registration";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Message from "./pages/Message/Message";
import Setting from "./pages/Setting/Setting";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Registration />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/home" element={<Home />}>
          <Route path="message" element={<Message />}></Route>
          <Route path="setting" element={<Setting />}></Route>
        </Route>
      </>
    )
  );
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
