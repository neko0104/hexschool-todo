import { Route, Router } from 'react-router-dom';
import { useContext } from 'react';
import Login from './Login';
import Todo from './Todo';
import SignUp from './SignUp';
import './css/all.scss';

function App() {
  return (
    <div className="App">
        {/* <Login/> */}
        {/* <Todo/> */}
        <SignUp/>
    </div>
  );
}

export default App;
