import { toBeRequired } from "@testing-library/jest-dom/dist/matchers";
import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import BuyAndHoldSettings from "../../AlgorithmSettings/BuyAndHoldSettings";
import { isNullOrUndef } from "chart.js/helpers";



function Description(props) {

    let text = "Select a backtest type, fill out the parameters, and add the the backtest to your list of tests. Once you have set all your tests select run tests to view statistics on how it preformed"
    let heading = ""
    if (!isNullOrUndef(props.setting)){
        text = props.setting.GetDescriptionText()
        heading = props.setting.GetTitle()
    }

    return (<>
        <div className="display-6 mb-2">{heading}</div> 
        {/* <div className="fs-4">{heading}</div>  */}
        <div className="fs-5 fw-lighter mb-2">{text}</div>
        {/* <div className="fs-6 mb-2">{text}</div> */}
    </>)

}


export default Description