import { toBeRequired } from "@testing-library/jest-dom/dist/matchers";
import { render } from "@testing-library/react";
import { map } from "highcharts";
import React, { useEffect, useState } from "react";
import StockChart from "../chart/chart";
import { RunSampleBacktest, RunBuyHoldBacktest, RunMvaCrossBacktest, RunMacdBacktest, RunBacktest, ERRORS } from "../../backtestApiClient/BacktestApiClient.js";
import MacdCrossoverSettings from '../../AlgorithmSettings/MacdCrossover'
import MvaCrossOverSettings from '../../AlgorithmSettings/MvaCrossover'
import BuyAndHoldSettings from '../../AlgorithmSettings/BuyAndHoldSettings'
import { SETTING_IDS } from "../../AlgorithmSettings/BaseSettings";
import Description from "../AlgorithmDescription/Desription.js";
import { Tooltip } from "bootstrap";


function Tool2() {

    const ALGORITHMS = [
        { name: "MACD", title: "MACD Crossover", GetParameters: () => new MacdCrossoverSettings() },
        { name: "BUY_AND_HOLD", title: "Buy and Hold", GetParameters: () => new BuyAndHoldSettings() },
        { name: "MVA", title: "Moving Average Crossover", GetParameters: () => new MvaCrossOverSettings() }
    ]

    // fully filled out backtests
    const [Backtests, UpdateBacktests] = useState([])

    const EmptySettings = {
        Algorithm: null,
        Parameters: null
    }
    // settings currently displayed
    const [settings, UpdateSettings] = useState(EmptySettings)

    // TODO : change name to areBacktestsSubmitted
    // are backtest results being viewed
    const [isViewingResult, UpdateIsViewingResults] = useState(false)

    // array of results for a set of ran backtests
    // const [BackTestResults, UpdateBackTestResults] = useState([SAMPLE RESULTS HERE])
    const [BackTestResults, UpdateBackTestResults] = useState([])

    // are backtest request being handled
    const [isLoading, UpdateIsLoading] = useState(false)

    // if there was an error getting backtests
    const [wasError, UpdateWasError] = useState(false)

    // currently selected backtest result
    const [currentBacktestResult, UpdateCurrentBacktestResult] = useState(-1)

    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))
        console.log(`tooltip list: ${tooltipList}`)
    })

    const HandleRemoveBacktest = (settingId) => {
        let filteredBacktests = Backtests.filter(backtest => backtest.BacktestId !== settingId)
        UpdateBacktests([...filteredBacktests])
    }

    const HandleAddBacktest = (settings) => {

        if (settings.Parameters.AreSettingsValid()) {
            settings.Parameters.SaveBacktest()
            UpdateBacktests([...Backtests, settings.Parameters])
            UpdateSettings(EmptySettings)

            // set dropdown to default "select algorithm"
            const dropdown = document.getElementById("algorithm-select");
            dropdown.value = "1";
        }
        else {
            settings.Parameters.ShowInvalidSettings()
        }
    }

    const HandleSelectResult = (indexInBacktestResults) => {
        UpdateCurrentBacktestResult(indexInBacktestResults)
    }

    const HandleSelectAlgorithm = (selectedTitle) => {
        let alg = ALGORITHMS.find((x) => x.title === selectedTitle);
        UpdateSettings((prevSetting) => ({
            ...prevSetting,
            Algorithm: alg ?? null,
            Parameters: alg?.GetParameters() ?? null
        }));
    }

    const HandleRunBackTestsClick = async () => {

        UpdateIsLoading(true)
        UpdateIsViewingResults(true)

        for (let i = 0; i < Backtests.length; i++) {
            let backtest = Backtests[i]
            let data = await RunBacktest(backtest);
            UpdateBackTestResults(prevValue => [...prevValue, data])
        }

        UpdateIsLoading(false)
        UpdateCurrentBacktestResult(0)

        UpdateBacktests([])
        UpdateSettings(EmptySettings)
    }

    // return jsx
    const RenderSettingsForAlgorithm = (currSettings) => {

        if (currSettings.Algorithm === null) return
        else {
            return (
                <>
                    {currSettings.Parameters.render()}
                </>
            )
        }


    }

    const GetBackTestListItemJsx = (backtest) => {
        return (
            <>
                {/* {backtest.render()} */
                    backtest.RenderAddedBacktestListItem(HandleRemoveBacktest)}
            </>
        );
    }

    function BacktestResult() {

        return (
            <>
                <StockChart data={BackTestResults[currentBacktestResult].backtestGraphData} isLoading={false} seriesName={`${BackTestResults[0].BackTestSettings.GetSettingValue(SETTING_IDS.BASE_NAME_SETTING)}`} />

                <div className="fs-3">Metrics</div>
                <div className="text-Left row">
                    <div className="col">
                        <div className="fs-5 mb-1 mt-2">General</div>
                        {BackTestResults[currentBacktestResult].BackTestStatistics.filter(stat => stat.metricType === 0).map((ele) => {

                            return (
                                <div className="font-monospace">{ele.metricDisplayName}: {ele.metricValue.toFixed(2)}</div>
                            );
                        })}
                    </div>
                    <div className="col">
                        <div className="fs-5  mb-1 mt-2">Wins</div>
                        {BackTestResults[currentBacktestResult].BackTestStatistics.filter(stat => stat.metricType === 1).map((ele) => {

                            return (
                                <div className="font-monospace">{ele.metricDisplayName}: {ele.metricValue.toFixed(2)}</div>
                            );
                        })}
                    </div>
                    <div className="col">
                        <div className="fs-5  mb-1 mt-2">Losses</div>
                        {BackTestResults[currentBacktestResult].BackTestStatistics.filter(stat => stat.metricType === 2).map((ele) => {

                            return (
                                <div className="font-monospace">{ele.metricDisplayName}: {ele.metricValue.toFixed(2)}</div>
                            );
                        })}
                    </div>
                </div>
                <div className="fs-3 mt-2">Backtest Settings</div>
                {BackTestResults[currentBacktestResult].BackTestSettings.RenderSettingResults()}
            </>)
    }

    function BacktestError() {

        const backtestError = BackTestResults[currentBacktestResult].Error
        let errorText = ''
        if (backtestError === ERRORS.INTERNAL_SERVER_ERROR) {
            errorText = "We ran into some issue when processing this backtest. Something may need to be fixed, sorry for the issue."
        }
        else if (backtestError === ERRORS.INVALID_SETTINGS) {
            errorText = "The settings you passed into this strategy were invalid, please try again with different values"
        }
        else {
            errorText = errorText = "We ran into some issue when processing this backtest. Something may need to be fixed, sorry for the issue."
        }

        return (
            <div className="container-fluid content-over-background  row align-items-center justify-content-center">
                <div className="col-8 col-xl-6 row bg-body-secondary shadow-lg p-3 rounded mt-3 mt-lg-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30vmin" height="30vmin" fill="IndianRed" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                    </svg>
                    <div className="text-center px-4 mt-3 fs-5">
                        {errorText}
                    </div>
                </div>
            </div>
        )
    }

    function ReInitPage() {
        UpdateSettings(EmptySettings)
        UpdateIsViewingResults(false)

        // array of results for a set of ran backtests
        // const [BackTestResults, UpdateBackTestResults] = useState([SAMPLE RESULTS HERE])
        UpdateBackTestResults([])

        // are backtest request being handled
        UpdateIsLoading(false)

        // if there was an error getting backtests
        UpdateWasError(false)

        // currently selected backtest result
        UpdateCurrentBacktestResult(-1)

    }

    if (!isViewingResult && !isLoading) {
        return (
            <div className="container-md mt-5">
                <Description setting={settings.Parameters} />
                <div className="row">
                    <div className="container col-12 col-md-6">
                        <div className="input-group my-3">
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
                        <button type="" className="btn btn-primary" disabled={settings.Algorithm === null} onClick={() => HandleAddBacktest(settings)}>
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
                </div>
            </div>
        );
    }
    else if (isLoading) {
        return (
            <Spinner />
        )
    }
    // display results
    else {
        return (

            <div className="container-md">
                <button className="mt-2" onClick={() => ReInitPage()}>
                    &larr;
                </button>
                <div>
                    <div className="row mt-3">
                        <div className="col-8 col-md-4">
                            <div className="display-4">Results</div>
                        </div>
                        <div className="col-8 col-8-md">
                            <div className="input-group my-3 w-100">
                                <label className="input-group-text" htmlFor="backtest-select">Backtests</label>
                                <select className="form-select" id="backtest-select" onChange={(e) => HandleSelectResult(e.target.value)}>
                                    {BackTestResults.map((test, index) => {
                                        console.log(`back results: ${BackTestResults}`)
                                        let name = test.BackTestSettings.GetSettingValue(SETTING_IDS.BASE_NAME_SETTING)
                                        return (
                                            <option value={index} key={name}>{name}</option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <hr />
                    {BackTestResults[currentBacktestResult].Error === null ? BacktestResult() : BacktestError()}

                </div>

            </div>
        );
    }

}

function InvalidFeedback(props) {

    return (
        <div className="invalid-feedback">
            {props.Message}
        </div>)
}

function Spinner() {

    const spinnerStyle = {
        width: "30vmin",
        height: "30vmin",
        marginTop: "20vh",
        borderWidth: "2vmin"
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-primary" style={spinnerStyle} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}




export default Tool2;