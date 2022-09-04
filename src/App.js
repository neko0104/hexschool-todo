import {
  Link,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

import Login from "./Login";
import SignUp from "./SignUp";
import Todo from "./Todo";
import "./css/all.scss";
import { useEffect, useState,} from "react";
import { Token } from "./components/htmlElement";

export default function App() {
  const [token, setToken] = useState();

  function Notfound() {
    return (
      <div className="w:100vw h:100vh t:center padding:30px bg:#FFD370">
        <h1>404 Notfound</h1><br/>
        <Link to="/">回首頁</Link>
      </div>
    );
  }

  return (
    <Token.Provider value={token}>
    <Routes>
      <Route path={""||"/"} element={<Outlet />} >
      <Route path="signup" element={<SignUp setToken={setToken}/>} />
      <Route index element={<Login setToken={setToken}/>}/>
      <Route path="todo" element={<Todo setToken={setToken}/>}></Route>
      </Route>
      <Route path="*" element={<Notfound />} />
    </Routes>
    </Token.Provider>
  );
}
