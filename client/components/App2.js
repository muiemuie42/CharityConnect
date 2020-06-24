import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavPanel from './NavPanel';
import Login from './Login';
import MainPage from './MainPage';

export default class App2 extends React.Component{
    constructor(props){
        super(props);
        this.login = false;
    }

    render() {
        return (
            <div>
                <Router>
                    <center className='navpanel'>
                        <NavPanel />
                    </center>
                    <Switch>
                        <Route exact path='/'  component={Login}/>
                        {/* <Route exact path='/' component={MainPage}/> */}
                    </Switch>
                </Router>
            </div>

        )
    }
    
}