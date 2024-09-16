import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import NoteForm from "../pages/NoteForm.jsx";
import SignUpForm from "../pages/SignUpForm.jsx";
import SignInForm from "../pages/SignInForm.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

export default function Index() {
  let { user } = useContext(AuthContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: user ? <Home /> : <Navigate to={"./sign-in"} /> },
        {
          path: "/notes/create",
          element: user ? <NoteForm /> : <Navigate to={"./sign-in"} />,
        },
        { path: "/notes/edit/:id", element: <NoteForm /> },
        {
          path: "/sign-up",
          element: !user ? <SignUpForm /> : <Navigate to={"/"} />,
        },
        {
          path: "/sign-in",
          element: !user ? <SignInForm /> : <Navigate to={"/"} />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
