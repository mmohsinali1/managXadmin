import React from 'react';
import './App.css';
import '../src/Main/style.scss'
import MainLayOut from "./Common/Layout";
import 'antd/dist/antd.css'
import {HashRouter, Route,Switch} from 'react-router-dom'
function App() {return(
  <HashRouter>

    <Route component={MainLayOut}/>

    </HashRouter>
)
}

export default App;
