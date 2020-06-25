import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavPanel from './NavPanel';
import Login from './Login';
import MainPage from './MainPage';

export default function App2(){
    const [login, setLogin] = useState({state: false, id: null, name: null})
    return (
        <div>
            <NavPanel login={login} setLogin={setLogin}/>
            { login.state === true ? <MainPage /> : <Login login={login} setLogin={setLogin} />}
        </div>

    )
}