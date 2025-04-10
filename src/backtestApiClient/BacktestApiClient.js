import { SETTING_IDS } from "../AlgorithmSettings/BaseSettings"


const USE_LOCAL_BUILD = false
const BASE_DEPLOYED_API_URL = 'https://backtest-api-dev.azurewebsites.net/api/alpha-v1.0'
const LOCAL_DEPLOYED_API_URL = 'http://localhost:7071/api/alpha-v1.0'

const API_URL = USE_LOCAL_BUILD ? LOCAL_DEPLOYED_API_URL : BASE_DEPLOYED_API_URL

const STRATEGIES = {
    MACD_CROSS: 1,
    BUY_AND_HOLD: 2,
    MVA_CROSS: 0
}

const ERRORS = {
    INVALID_SETTINGS: 0,
    INTERNAL_SERVER_ERROR: 1,
    UNKNOWN_ERROR: 2
}

async function RunBacktest(settings) {
    switch (settings.Strategy) {
        case STRATEGIES.BUY_AND_HOLD:
            return await RunBuyHoldBacktest(settings)
        case STRATEGIES.MACD_CROSS:
            return await RunMacdBacktest(settings)
        case STRATEGIES.MVA_CROSS:
            return await RunMvaCrossBacktest(settings)
        default:
            console.log("Encountered unimplemented backtest strategy")
            throw new Error("Encountered unimplemented backtest strategy")
    }
}

async function RunMacdBacktest(settings) {

    let requestBody = {
        StartDate: settings.GetSettingValue(SETTING_IDS.BASE_START_DATE_SETTING),
        EndDate: settings.GetSettingValue(SETTING_IDS.BASE_END_DATE_SETTING),
        AssetToTrackTicker: settings.GetSettingValue(SETTING_IDS.MACD_SEAPRATE_SIGNAL_TICKER) ?? settings.GetSettingValue(SETTING_IDS.MACD_TRADING_TICKER),
        AssetToTradeTicker: settings.GetSettingValue(SETTING_IDS.MACD_TRADING_TICKER),
        StaticHoldingTicker: settings.GetSettingValue(SETTING_IDS.MACD_STATIC_HOLDING_TICKER),
        StopLossPercentage: Number(settings.GetSettingValue(SETTING_IDS.BASE_STOP_LOSS_SETTING)),
        ShortTermEma: Number(settings.GetSettingValue(SETTING_IDS.MACD_SHORT_TERM_EMA_PERIOD)),
        LongTermEma: Number(settings.GetSettingValue(SETTING_IDS.MACD_LONG_TERM_EMA_PERIOD)),
        MacdSignalLine: Number(settings.GetSettingValue(SETTING_IDS.MACD_SIGNAL_PERIOD)),
        Strategy: STRATEGIES.MACD_CROSS
    }

    const response = await fetch(`${API_URL}/backtest/macd`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })

    if (!response.ok) {
        const result = await HandleErrorResponse(settings, response)
        return result
    }
    try {
        const data = await response.json()
        return HandleSuccessResponse(settings, data)
    } catch (error) {
        console.log(`Error converting to json: ${error}`)
        return null
    }
}

async function RunBuyHoldBacktest(settings) {

    let requestBody = {
        StartDate: settings.GetSettingValue(SETTING_IDS.BASE_START_DATE_SETTING),
        EndDate: settings.GetSettingValue(SETTING_IDS.BASE_END_DATE_SETTING),
        AssetToTradeTicker: settings.GetSettingValue(SETTING_IDS.BH_TRADING_TICKER),
        Strategy: STRATEGIES.BUY_AND_HOLD
    }

    console.log(`${API_URL}/backtest/buyhold`)

    const response = await fetch(`${API_URL}/backtest/buyhold`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })

    if (!response.ok) {
        const result = await HandleErrorResponse(settings, response)
        return result
    }
    try {
        const data = await response.json()
        return HandleSuccessResponse(settings, data)
    } catch (error) {
        console.log(`Error converting to json: ${error}`)
        return null
    }
}

async function RunMvaCrossBacktest(settings) {

    let requestBody = {
        StartDate: settings.GetSettingValue(SETTING_IDS.BASE_START_DATE_SETTING),
        EndDate: settings.GetSettingValue(SETTING_IDS.BASE_END_DATE_SETTING),
        AssetToTrackTicker: settings.GetSettingValue(SETTING_IDS.MVA_SEAPRATE_SIGNAL_TICKER) ?? settings.GetSettingValue(SETTING_IDS.MVA_TRADING_TICKER),
        AssetToTradeTicker: settings.GetSettingValue(SETTING_IDS.MVA_TRADING_TICKER),
        StaticHoldingTicker: settings.GetSettingValue(SETTING_IDS.MVA_STATIC_HOLDING_TICKER),
        StopLossPercentage: Number(settings.GetSettingValue(SETTING_IDS.BASE_STOP_LOSS_SETTING)),
        ShortTermMva: Number(settings.GetSettingValue(SETTING_IDS.MVA_SHORT_TERM_MVA_PERIOD)),
        LongTermMva: Number(settings.GetSettingValue(SETTING_IDS.MVA_LONG_TERM_MVA_PERIOD)),
        Strategy: STRATEGIES.MVA_CROSS
    }

    const response = await fetch(`${API_URL}/backtest/mva`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })

    if (!response.ok) {
        const result = await HandleErrorResponse(settings, response)
        return result
    }
    try {
        const data = await response.json()
        return HandleSuccessResponse(settings, data)
    } catch (error) {
        console.log(`Error converting to json: ${error}`)
        return null
    }
}

async function RunSampleBacktest(settings) {

    let requestBody = {
        StartDate: "2018-10-24",
        EndDate: "2022-01-01",
        AssetToTrackTicker: "SPXL",
        AssetToTradeTicker: "SPXL",
        StaticHoldingTicker: null,
        StopLossPercentage: null,
        ShortTermMva: 9,
        LongTermMva: 15,
        Strategy: 0
    }

    const response = await fetch(`${API_URL}/backtest/mva`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })

    if (!response.ok) {
        const result = await HandleErrorResponse(settings, response)
        return result
    }
    try {
        const data = await response.json()
        return HandleSuccessResponse(settings, data)
    } catch (error) {
        console.log(`Error converting to json: ${error}`)
        return null
    }
}

async function HandleErrorResponse(settings, response) {
    console.log(`error status: ${response.status}`)
    let error = null
    if (response.status === 400) {
        const errorText = await response.text()
        if (errorText === 'Error: Invalid Settings') {
            console.log(`Invalid Settings`)
            error = ERRORS.INVALID_SETTINGS
        }
        console.log(`Error: ${error}`)
        error = ERRORS.UNKNOWN_ERROR
    }
    else if (response.status === 500) {
        console.log(`Error: 500`)
        error = ERRORS.INTERNAL_SERVER_ERROR
    }
    else {
        error = ERRORS.UNKNOWN_ERROR
    }

    return {
        BackTestSettings: settings,
        BackTestStatistics: null,
        backtestGraphData: null,
        Error: error
    }
}

function HandleSuccessResponse(settings, data) {
    if (data === null || data === "null") {
        console.log("Api ran into some problem, null was returned")
        return null
    }

    // metrics returned from api is an object not list, must be converted
    let metrics = []
    for (var key in data.backtestStatistics) {
        // if (data.backtestStatistics.hasOwnProperty(key)) {
        //     metrics.push(data.backtestStatistics[key]);
        // }
        metrics.push(data.backtestStatistics[key]);
    }

    // chart data is a list of objects, highcharts needs a list of lists
    let chartData = []
    data.portfolioValues.forEach(ele => {
        let newEle = [ele.date, ele.value]
        chartData.push(newEle);
    })

    return {
        BackTestSettings: settings,
        BackTestStatistics: metrics,
        backtestGraphData: chartData,
        Error: null
    }
}

export { RunSampleBacktest, RunBuyHoldBacktest, RunMacdBacktest, RunMvaCrossBacktest, RunBacktest, ERRORS, STRATEGIES };


