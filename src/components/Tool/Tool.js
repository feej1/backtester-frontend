import { toBeRequired } from "@testing-library/jest-dom/dist/matchers";
import { render } from "@testing-library/react";
import { map } from "highcharts";
import React, { useEffect, useState } from "react";
import backTestData from "../../SampleApiResponses/sampleApiGraphData";
import keyMetrics from "../../SampleApiResponses/SampleApiKeyMetrics";
import StockChart from "../chart/chart";


const END_DATE = 0;
const START_DATE = 1;
const EARLIEST_START_DATE = new Date("2000-01-01")
const LATEST_END_DATE = new Date()

function Tool() {

    const sampleBacktest = {
        Algorithm: { name: "MACD", title: "MACD Crossover" },
        Name: "Sample MACD Test",
        IndicatorTicker: "SPY",
        BearTicker: "SPXL",
        BullTicker: "SPXS",
        StartDate: Date("10-01-2021"),
        EndDate: Date("10-01-2024"),
        StopLossPercentage: 3,
        NameIsValid: true,
        IndicatorTickerIsValid: true,
        BearTickerIsValid: true,
        BullTickerIsValid: true,
        StartDateIsValid: true,
        EndDateIsValid: true,
        StopLossPercentageIsValid: true,
    }

    const sampleReults = {
        BackTestSettings: sampleBacktest,
        BackTestStatistics: keyMetrics,
        backtestData: backTestData
    }

    const ALGORITHMS = [
        { name: "MACD", title: "MACD Crossover" },
        { name: "BUY_AND_HOLD", title: "Buy and Hold" },
        { name: "MVA", title: "Moving Average Crossover" }]


    const EmptySettings = {
        Algorithm: null,
        Name: null,
        IndicatorTicker: null,
        BearTicker: null,
        BullTicker: null,
        StartDate: null,
        EndDate: null,
        StopLossPercentage: null,
        NameIsValid: true,
        IndicatorTickerIsValid: true,
        BearTickerIsValid: true,
        BullTickerIsValid: true,
        StartDateIsValid: true,
        EndDateIsValid: true,
        StopLossPercentageIsValid: true,
    }

    const [Backtests, UpdateBacktests] = useState([])
    const [settings, UpdateSettings] = useState(EmptySettings)
    const [isViewingResult, UpdateIsViewingResults] = useState(false)
    // const [BackTestResults, UpdateBackTestResults] = useState([sampleReults])
    const [BackTestResults, UpdateBackTestResults] = useState([])

    const GetUniqueKeyId = () => {
        return Math.random().toString().slice(2);
    }

    const HandleAddBacktest = (settings) => {

        // validate settings before clicking since all settings start as valid
        // are valid needs to be on the back half of the assignments otherwise 
        // the validate function will not run because of short circut
        let areValid = ValidateBacktestName(settings.Name)
        areValid = ValidateInidcator(settings.IndicatorTicker) && areValid
        areValid = ValidateBearTicker(settings.BearTicker) && areValid
        areValid = ValidateBullTicker(settings.BullTicker) && areValid
        areValid = ValidateStopLoss(settings.StopLossPercentage) && areValid
        areValid = HandleDateValidation() && areValid

        if (areValid) {
            UpdateBacktests([...Backtests, settings])
            UpdateSettings(EmptySettings)

            // set dropdown to default "select algorithm"
            const dropdown = document.getElementById("algorithm-select");
            dropdown.value = "1";
        }
    }

    const ValidateBacktestName = (value) => {

        const NAME_MAX_VALUE = 30
        const isValid = (value !== null && value.trim() !== "")

        UpdateSettings((prevSettings) => ({
            ...prevSettings,
            NameIsValid: isValid
        }));

        if (isValid) {
            UpdateSettings((prevSettings) => ({
                ...prevSettings,
                Name: value.trim()
            }));
        }
        return isValid;

    }

    const ValidateInidcator = (value) => {

        const containsOnlyAlphebetCharacters = /^[a-zA-Z]+$/.test(value);
        const isValid = (value !== null && containsOnlyAlphebetCharacters);

        UpdateSettings((prevSettings) => ({
            ...prevSettings,
            IndicatorTickerIsValid: isValid
        }));

        if (isValid) {
            UpdateSettings((prevSettings) => ({
                ...prevSettings,
                IndicatorTicker: value
            }));
        }
        return isValid;

    }

    const ValidateBearTicker = (value) => {

        const containsOnlyAlphebetCharacters = /^[a-zA-Z]+$/.test(value);
        const isValid = (value !== null && containsOnlyAlphebetCharacters);

        UpdateSettings((prevSettings) => ({
            ...prevSettings,
            BearTickerIsValid: isValid
        }));

        if (isValid) {
            UpdateSettings((prevSettings) => ({
                ...prevSettings,
                BearTicker: value
            }));
        }
        return isValid;

    }

    const ValidateBullTicker = (value) => {

        const containsOnlyAlphebetCharacters = /^[a-zA-Z]+$/.test(value);
        const isValid = value === "" || (value !== "" && containsOnlyAlphebetCharacters);

        UpdateSettings((prevSettings) => ({
            ...prevSettings,
            BullTickerIsValid: isValid
        }));

        if (isValid) {
            UpdateSettings((prevSettings) => ({
                ...prevSettings,
                BullTicker: value === "" ? null : value
            }));
        }
        return isValid;

    }

    const ValidateStopLoss = (value) => {

        const num = Number(value)
        const isValid = (value === null || value === "") || (num !== NaN && num > .5 && num < 50);

        UpdateSettings((prevSettings) => ({
            ...prevSettings,
            StopLossPercentageIsValid: isValid
        }));

        if (isValid) {
            UpdateSettings((prevSettings) => ({
                ...prevSettings,
                StopLossPercentage: value === "" ? null : value
            }));
        }
        return isValid;

    }

    const HandleDateValidation = (value, dateType) => {

        function isGreaterThanMonth(date1, date2) {
            const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000; // Approximate milliseconds in a month
            const diffInMillis = Math.abs(date1.getTime() - date2.getTime());
            return diffInMillis > oneMonthInMillis;
        }

        if (dateType === START_DATE) {
            UpdateSettings((prevSettings) => ({
                ...prevSettings,
                StartDate: value
            }));
        }
        else if (dateType === END_DATE) {
            UpdateSettings((prevSettings) => ({
                ...prevSettings,
                EndDate: value
            }));
        }
        else {
            if (settings.EndDate === null || settings.StartDate === null) {
                UpdateSettings((prevSettings) => ({
                    ...prevSettings,
                    EndDateIsValid: false,
                    StartDateIsValid: false
                }));
                return false
            }
        }

        const inputDate = new Date(value);
        let isOtherDateSet = dateType === START_DATE ? settings.EndDate !== null : settings.StartDate !== null
        let startDate = dateType === START_DATE ? inputDate :
            settings.StartDate !== null ? new Date(settings.StartDate) : null
        let endDate = dateType === END_DATE ? inputDate :
            settings.EndDate !== null ? new Date(settings.EndDate) : null

        let isPairValid = isOtherDateSet ? isGreaterThanMonth(startDate, endDate) && endDate > startDate : true
        let isEndDateValid = endDate !== null ? endDate <= LATEST_END_DATE && endDate > EARLIEST_START_DATE : true
        let isStartDateValid = startDate !== null ? startDate <= LATEST_END_DATE && startDate > EARLIEST_START_DATE : true

        UpdateSettings((prevSettings) => ({
            ...prevSettings,
            EndDateIsValid: isPairValid && isEndDateValid,
            StartDateIsValid: isPairValid && isStartDateValid
        }));

        return isPairValid && isEndDateValid && isStartDateValid

    }

    const AreAddBackTestsDisabled = (val) => {
        const areSettingsValid = settings.NameIsValid && settings.IndicatorTickerIsValid && settings.BearTickerIsValid
            && settings.BullTickerIsValid && settings.StartDateIsValid && settings.EndDateIsValid && settings.StopLossPercentageIsValid;

        return (!areSettingsValid) || settings.Algorithm === null;
    }

    const HandleSelectAlgorithm = (selectedTitle) => {
        let alg = ALGORITHMS.find((x) => x.title === selectedTitle);
        UpdateSettings((prevSetting) => ({
            ...prevSetting,
            Algorithm: alg ?? null
        }));
    }

    const HandleRunBackTestsClick = () => {
        let results = []
        Backtests.map((backtest) => {
            const result = {
                BackTestSettings: backtest,
                BackTestStatistics: keyMetrics,
                backtestData: backTestData
            }
            results.push(result);
        })
        UpdateBackTestResults([...BackTestResults, results])
        UpdateBacktests([])
        UpdateSettings(EmptySettings)
        UpdateIsViewingResults(true)

        // set dropdown to default "select algorithm"
        const dropdown = document.getElementById("algorithm-select");
        dropdown.value = "1";
    }

    // return jsx
    const RenderSettingsForAlgorithm = (currSettings) => {

        if (currSettings.Algorithm === null) return
        let alg = currSettings.Algorithm;

        if (alg.name !== null) {
            return (
                <>
                    <div className="input-group mb-3 w-80">
                        <label className="visually-hidden" htmlFor="backtest-name"></label>
                        <div className="input-group">
                            <div className="input-group-text">BackTest Name *</div>
                            <input type="text" className={settings.NameIsValid ? "form-control" : "apply-shake form-control is-invalid"}
                                id="backtest-name" placeholder={`My ${settings.Algorithm.title} test`}
                                onBlur={(e) => ValidateBacktestName(e.target.value)} />
                            {/* {!settings.NameIsValid && <InvalidFeedback Message="Error" />} */}
                        </div>
                    </div>

                    <div className="input-group mb-3 w-80">
                        <label className="visually-hidden" htmlFor="indicator-ticker"></label>
                        <div className="input-group">
                            <div className="input-group-text">Indicator Ticker *</div>
                            <input type="text" className={settings.IndicatorTickerIsValid ? "form-control" : "apply-shake form-control is-invalid"} 
                            id="indicator-ticker" placeholder="SPY" onBlur={(e) => ValidateInidcator(e.target.value)} />
                        </div>
                    </div>

                    <div className="input-group mb-3 w-80">
                        <label className="visually-hidden" htmlFor="bear-ticker"></label>
                        <div className="input-group">
                            <div className="input-group-text">Bear Signal Ticker *</div>
                            <input type="text" className={settings.BearTickerIsValid ? "form-control" : "apply-shake form-control is-invalid"} id="bear-ticker" placeholder="QQQ" onBlur={(e) => ValidateBearTicker(e.target.value)} />
                        </div>
                    </div>

                    <div className="input-group mb-3 w-80">
                        <label className="visually-hidden" htmlFor="bull-ticker"></label>
                        <div className="input-group">
                            <div className="input-group-text">Bull Signal Ticker</div>
                            <input type="text" className={settings.BullTickerIsValid ? "form-control" : " apply-shake form-control is-invalid"} id="bull-ticker" placeholder="SQQQ" onBlur={(e) => ValidateBullTicker(e.target.value)} />
                        </div>
                    </div>

                    <div className="input-group mb-3 w-80">
                        <label className="visually-hidden" htmlFor="start-date"></label>
                        <div className="input-group">
                            <div className="input-group-text">Start Date *</div>
                            <input id="start-date" className={settings.StartDateIsValid ? "form-control" : "apply-shake form-control is-invalid"} type="date" onBlur={(e) => HandleDateValidation(e.target.value, START_DATE)} />
                        </div>
                    </div>

                    <div className="input-group mb-3 w-80">
                        <label className="visually-hidden" htmlFor="end-date"></label>
                        <div className="input-group">
                            <div className="input-group-text">End Date *</div>
                            <input id="end-date" className={settings.EndDateIsValid ? "form-control" : "apply-shake form-control is-invalid"} type="date" onBlur={(e) => HandleDateValidation(e.target.value, END_DATE)} />
                        </div>
                    </div>

                    <div className="input-group mb-3 w-80">
                        <label className="visually-hidden" htmlFor="stop-loss-percentage"></label>
                        <div className="input-group">
                            <div className="input-group-text">Stop Loss Percentage</div>
                            <input type="text" className={settings.StopLossPercentageIsValid ? "form-control" : "apply-shake form-control is-invalid"} id="stop-loss-percentage" placeholder="5" onBlur={(e) => ValidateStopLoss(e.target.value)} />
                            <div className="input-group-text">%</div>
                        </div>
                    </div>

                </>
            );
        }
    }

    const GetBackTestListItemJsx = (backtest) => {

        const id = GetUniqueKeyId();

        return (
            <li className="list-group-item" key={id}>
                <div className="d-flex flex-wrap justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{backtest.Name} </div>
                        {backtest.Algorithm.title}
                    </div>
                    <a className="btn btn-primary" data-bs-toggle="collapse" href={"#" + id} role="button" aria-expanded="false" aria-controls={id}>
                        &#9660;
                    </a>
                </div>

                <div className="collapse my-1" id={id}>
                    <div className="w-100">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item" key={GetUniqueKeyId()}> <span className="font-monospace">Date Range: {backtest.StartDate} - {backtest.EndDate}</span></li>
                            <li className="list-group-item" key={GetUniqueKeyId()}> <span className="font-monospace">Indicator Ticker: {backtest.IndicatorTicker}</span></li>
                            <li className="list-group-item" key={GetUniqueKeyId()}> <span className="font-monospace">Bear Ticker: {backtest.BearTicker}</span></li>
                            {backtest.BullTicker !== null && <li className="list-group-item" key={GetUniqueKeyId()}> <span className="font-monospace">Bull Ticker: {backtest.BullTicker}</span></li>}
                            {backtest.StopLossPercentage !== null && <li className="list-group-item" key={GetUniqueKeyId()}> <span className="font-monospace">Stop Loss Percentage: {backtest.StopLossPercentage}%</span></li>}
                        </ul>
                    </div>
                </div>
            </li>
        );
    }

    return (
        <div className="container-md mt-5">
            {!isViewingResult && <> <div className="row">
                <div className="container col-12 col-md-6">
                    <div className="input-group my-3 w-80">
                        <label className="input-group-text" htmlFor="algorithm-select">Algorithms</label>
                        <select className="form-select" id="algorithm-select" onChange={(e) => HandleSelectAlgorithm(e.target.value)}>
                            <option value="1">Select Algorithm</option>
                            {ALGORITHMS.map(x => {
                                return (
                                    <option value={x.title} key={x.title}>{x.title}</option>
                                );
                            })}
                        </select>
                    </div>

                    {RenderSettingsForAlgorithm(settings)}
                    <button type="" className="btn btn-primary" disabled={AreAddBackTestsDisabled()} onClick={() => HandleAddBacktest(settings)}>
                        Add Backtest
                    </button>

                </div>

                <div className="container col-12 col-md-6 mt-3">

                    <ul className="list-group">
                        {Backtests.map((x) => {
                            return GetBackTestListItemJsx(x);
                        })}
                    </ul>

                </div>

            </div>

                <hr className="mt-4" />
                <div className="d-grid gap-2 mt-1">
                    <button className="btn btn-success" onClick={(e) => HandleRunBackTestsClick()} disabled={Backtests.length === 0} type="button">Run Backtests</button>
                </div></>}

            {isViewingResult && <div>
                <div className="row">
                    <div className="col-8 col-md-4">
                        <div className="display-4">Results</div>
                    </div>
                    <div className="col-8 col-8-md">
                        <div className="input-group my-3 w-100">
                            <label className="input-group-text" htmlFor="backtest-select">Backtests</label>
                            <select className="form-select" id="backtest-select">
                                <option value="1">Select backtest</option>
                                {ALGORITHMS.map(x => {
                                    return (
                                        <option value={x.title} key={x.title}>{x.title}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <hr/>


                <div className="fs-3 mb-2">Backtest Settings</div>
                


                <div className="fs-3 mb-2">Portfolio Value Graph</div>
                <StockChart data={backTestData} isLoading={false} seriesName={`${BackTestResults[0].BackTestSettings.Name}`} />
                
                <div className="fs-3">Metrics</div>
                <div className="col-6 text-Left">
                    <div className="">
                        <div className="fs-5 mb-1 mt-2">General</div>
                        {BackTestResults[0].BackTestStatistics.GeneralMetrics.map((ele) => {
                            return (

                                <div className="font-monospace">{ele.MetricName}: {ele.Value}</div>
                            );
                        })}
                    </div>
                    <div >
                        <div className="fs-5  mb-1 mt-2">Wins</div>
                        {BackTestResults[0].BackTestStatistics.Winners.map((ele) => {
                            return (
                                <div className=" font-monospace">{ele.MetricName}: {ele.Value}</div>
                            );
                        })}
                    </div>
                    <div className="">
                        <div className="fs-5  mb-1 mt-2">Losses</div>
                        {BackTestResults[0].BackTestStatistics.Losers.map((ele) => {
                            return (
                                <div className=" font-monospace">{ele.MetricName}: {ele.Value}</div>
                            );
                        })}
                    </div>
                </div>
            </div>}

        </div>
    );

}



function InvalidFeedback(props) {

    return (
        <div className="invalid-feedback">
            {props.Message}
        </div>)
}






export default Tool;