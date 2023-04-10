import "./App.css";
import { Route, Routes } from "react-router-dom";
import { public_routes, user_routes } from "./routes/routes";
import admin_routes from "./routes/routes";

function App() {
  return (
    <>
      <Routes>
        {public_routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        {admin_routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        {user_routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
