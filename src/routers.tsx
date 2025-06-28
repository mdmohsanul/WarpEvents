import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PageNotFound from "./pages/PageNotFound";


const appRouter = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
      { path: "/", element: <LoginPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
       { path: "*", element: <PageNotFound /> },
        ]
    }
])

export default appRouter