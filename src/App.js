import {
  Link,
  Route,
  HashRouter,
  Routes,
  Router,
  Outlet,
  NavLink,
} from "react-router-dom";

import Login from "./Login";
import SignUp from "./SignUp";
import Todo from "./Todo";
import "./css/all.scss";

export default function App() {
  function DefLayout() {
    return (
      <div>
        <Outlet />
      </div>
    );
  }

  function Notfound() {
    return (
      <div className="w:100vw h:100vh t:center padding:30px bg:#FFD370">
        <h1>404 Notfound</h1><br/>
        <Link to="/">回首頁</Link>
      </div>
    );
  }

  return (
    <Routes>
      <Route path={""||"/"} element={<DefLayout />} >
      <Route path="signup" element={<SignUp />} />
      <Route index element={<Login/>}/>
      <Route path="todo" element={<Todo />}></Route>
      </Route>
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}
