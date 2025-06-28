import { Outlet } from "react-router-dom";
import "./App.css";
import { useAppDispatch } from "./app/store";
import { useEffect } from "react";
import { checkAuth } from "./features/auth/authThunk";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
