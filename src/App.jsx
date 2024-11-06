import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";

function App() {
    return (
        <BrowserRouter basename={'/hibs/'}>
            <Routes>
                <Route path={'/'} element={<Home/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
