import { toBeRequired } from "@testing-library/jest-dom/dist/matchers";
import { render } from "@testing-library/react";
import { map } from "highcharts";
import React, { useEffect, useState } from "react";
import backTestData from "../../SampleApiResponses/sampleApiGraphData";
import keyMetrics from "../../SampleApiResponses/SampleApiKeyMetrics";
import StockChart from "../chart/chart";
import MacdCrossoverSettings from '../../AlgorithmSettings/MacdCrossover'
import MvaCrossOverSettings from '../../AlgorithmSettings/MvaCrossover'
import BuyAndHoldSettings from '../../AlgorithmSettings/BuyAndHoldSettings'


function Tool2() {

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
        { name: "MACD", title: "MACD Crossover", settings: new MacdCrossoverSettings() },
        { name: "BUY_AND_HOLD", title: "Buy and Hold", settings: new BuyAndHoldSettings() },
        { name: "MVA", title: "Moving Average Crossover", settings: new MvaCrossOverSettings() }
    ]

    const EmptySettingsNew = {
        Algorithm: null,
    }

    const [Backtests, UpdateBacktests] = useState([])
    const [settings, UpdateSettings] = useState(EmptySettingsNew)
    const [isViewingResult, UpdateIsViewingResults] = useState(false)
    // const [BackTestResults, UpdateBackTestResults] = useState([sampleReults])
    const [BackTestResults, UpdateBackTestResults] = useState([])

    const GetUniqueKeyId = () => {
        return Math.random().toString().slice(2);
    }

    const HandleAddBacktest = (settings) => {

        if (settings.Algorithm.settings.AreSettingsValid()) {
            settings.Algorithm.settings.SaveBacktest()
            UpdateBacktests([...Backtests, settings.Algorithm.settings])
            UpdateSettings(EmptySettingsNew)

            // set dropdown to default "select algorithm"
            const dropdown = document.getElementById("algorithm-select");
            dropdown.value = "1";
        }
        else {
            settings.Algorithm.settings.ShowInvalidSettings()
        }
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
        UpdateSettings(EmptySettingsNew)
        UpdateIsViewingResults(true)

        // set dropdown to default "select algorithm"
        const dropdown = document.getElementById("algorithm-select");
        dropdown.value = "1";
    }

    // return jsx
    const RenderSettingsForAlgorithm = (currSettings) => {

        // console.log(`Running now --- Settings`)
        // console.log(currSettings)
        if (currSettings.Algorithm === null) return
        let alg = currSettings.Algorithm;
        return (
            <>
                {alg.settings.render()}
            </>
        );

    }

    const GetBackTestListItemJsx = (backtest) => {
        return (
            <>
                {backtest.render()}
            </>
        );
    }

    return (
        <div className="container-md mt-5">
            {!isViewingResult && <> <div className="row">
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
                <hr />


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






export default Tool2;