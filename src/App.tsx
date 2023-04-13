import React from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "./component/login";
import FirstView from "./component/first-view";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<FirstView/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="about" element={<p> about</p>}/>
            </Routes>
        </div>
    );
}

export default App;
