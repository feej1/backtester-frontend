import React, { useEffect, useState } from "react";
import './Homepage.css'
import { Link, Route, Routes } from "react-router-dom";
// import logo from '../../Images/nodes.jpg';

{/* <a href="https://www.vecteezy.com/free-vector/connect-background">Connect Background Vectors by Vecteezy</a> */ }



export default function Hompage() {

    return (
        <>
            <div className="container-fluid background-image position-absolute top-0 start-0 mt-5"></div>
            <div className="container-fluid text-start  row align-items-center justify-content-center content-over-background">
                <div className="col-8 col-xl-6 display-6 fw-lighter p-4 rounded bg-white bg-opacity-75">
                    <div className="display-6 fw-light">
                        Find a winning strategy
                    </div>
                    <div className="fs-5 fw-lighter mt-2">
                        Test algorithmic trading strategies on historical data with parameters choosen by you.
                        Compare results results with insightful statistics to help you choose a winning strategy.
                    </div>
                    <Link to="/Tool" className="btn btn-outline-primary mt-3">Backtest now</Link>
                </div>

            </div>
        </>
    );


}