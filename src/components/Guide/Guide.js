import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import './Guide.css'




function ToolGuide() {

    return (
        <>
            <div className="container-fluid background-image position-absolute top-0 start-0 mt-5"></div>
            {/* <div className="container-fluid text-start  row align-items-center justify-content-center">
                Hello
            </div> */}
             <div className="container-fluid content-over-background  row align-items-center justify-content-center">
                <div className="col-8 col-xl-6 bg-body-secondary shadow-lg p-3 rounded mt-4 mt-lg-0">
                </div>

            </div>
        </>

    )


}


export default ToolGuide;