
import { Component } from "react";
import {
    BaseSettings, BaseEndDateSetting, BaseNameSetting,
    BaseStartDateSetting, BaseStopLossSetting,
    INPUT_TYPES, DATE_TYPES, SETTING_IDS
} from "./BaseSettings";
import { RunMvaCrossBacktest, STRATEGIES } from "../backtestApiClient/BacktestApiClient";




class MvaCrossOverSettings extends BaseSettings {

    constructor(props) {
        super(props);
        this.Strategy = STRATEGIES.MVA_CROSS;
        this.SETTINGS_IDS = {
            ...this.SETTINGS_IDS,
            MVA_TRACK_SEPARATE_ASSET: SETTING_IDS.MVA_TRACK_SEPARATE_ASSET,
            MVA_SEAPRATE_SIGNAL_TICKER: SETTING_IDS.MVA_SEAPRATE_SIGNAL_TICKER,
            MVA_TRADING_TICKER: SETTING_IDS.MVA_TRADING_TICKER,
            MVA_SHORT_TERM_MVA_PERIOD: SETTING_IDS.MVA_SHORT_TERM_MVA_PERIOD,
            MVA_LONG_TERM_MVA_PERIOD: SETTING_IDS.MVA_LONG_TERM_MVA_PERIOD
        }
        this.SettingParameters = [
            ...this.SettingParameters,
            {
                SettingId: this.SETTINGS_IDS.MVA_TRACK_SEPARATE_ASSET,
                SettingName: "Use a Separate Asset for Trading Signals",
                DefaultValue: false,
                Value: null,
                ToolTip: "Tooltip for this settings",
                InputType: INPUT_TYPES.RADIO,
                ValidationSettings: null,
                RadioSettings: {
                    ToggleTrue: [this.SETTINGS_IDS.MVA_SEAPRATE_SIGNAL_TICKER],
                    ToggleFalse: []
                }
            },
            {
                SettingId: this.SETTINGS_IDS.MVA_SEAPRATE_SIGNAL_TICKER,
                SettingName: "Signal Ticker",
                DefaultValue: "SPY",
                Value: null,
                ToolTip: "Tooltip for this settings",
                InputType: INPUT_TYPES.TICKER,
                IsValid: true,
                ValidationSettings: {
                    IsRequired: true
                }
            },
            {
                SettingId: this.SETTINGS_IDS.MVA_TRADING_TICKER,
                SettingName: "Trading Ticker",
                DefaultValue: "SPXL",
                Value: null,
                ToolTip: "Tooltip for this settings",
                InputType: INPUT_TYPES.TICKER,
                IsValid: true,
                ValidationSettings: {
                    IsRequired: true
                },
            },
            {
                SettingId: this.SETTINGS_IDS.MVA_SHORT_TERM_MVA_PERIOD,
                SettingName: "Short Term MVA Period",
                DefaultValue: 15,
                Value: null,
                ToolTip: "Tooltip for this settings",
                InputType: INPUT_TYPES.INTEGER,
                IsValid: true,
                ValidationSettings: {
                    MaxValue: 250,
                    MinValue: 1,
                    IsRequired: true,
                    IsValid: true,
                    IsLessThan: [this.SETTINGS_IDS.MVA_LONG_TERM_MVA_PERIOD],
                    IsGreaterThan: []
                }
            },
            {
                SettingId: this.SETTINGS_IDS.MVA_LONG_TERM_MVA_PERIOD,
                SettingName: "Long Term MVA Period",
                DefaultValue: 30,
                Value: null,
                ToolTip: "Tooltip for this settings",
                InputType: INPUT_TYPES.INTEGER,
                IsValid: true,
                ValidationSettings: {
                    MaxValue: 250,
                    MinValue: 1,
                    IsRequired: true,
                    IsValid: true,
                    IsLessThan: [],
                    IsGreaterThan: [this.SETTINGS_IDS.MVA_SHORT_TERM_MVA_PERIOD]
                }
            }
        ]
    }

    GetDescriptionText(){
        return `A Moving Average Crossover trading strategy is a  
        technical analysis tool used to identify potential buy and sell 
        signals in financial markets. 
        This strategy involves using two different moving averages 
        (MA's) a shorter-term moving average and a longer-term moving average. 
        Crossovers between them generate trading signals, the short term moving 
        above the long term is a buy signal while the short term dropping below 
        long term is a sell signal.`
    }

    GetTitle(){
        return "Moving Average Crossover"
    }

    GetValues() {
        return null
    }

    RenderSettingResults() {

        return (
            <div>
                <div className="" key={this.GetUniqueKeyId()}> <span className="font-monospace">Date range: {this.values[this.SETTINGS_IDS.BASE_START_DATE_SETTING]} - {this.values[this.SETTINGS_IDS.BASE_END_DATE_SETTING]}</span></div>
                <div className="" key={this.GetUniqueKeyId()}> <span className="font-monospace">Ticker: {this.values[this.SETTINGS_IDS.MVA_TRADING_TICKER]}</span></div>
                <div className="" key={this.GetUniqueKeyId()}> <span className="font-monospace">Short term MVA: {this.values[this.SETTINGS_IDS.MVA_SHORT_TERM_MVA_PERIOD]}</span></div>
                <div className="" key={this.GetUniqueKeyId()}> <span className="font-monospace">Long term MVA: {this.values[this.SETTINGS_IDS.MVA_LONG_TERM_MVA_PERIOD]}</span></div>
                {this.values.hasOwnProperty(this.SETTINGS_IDS.MVA_STATIC_HOLDING_TICKER) &&
                    <div className="" key={this.GetUniqueKeyId()}> <span className="font-monospace">Holding asset in downtime: {this.values[this.SETTINGS_IDS.MVA_STATIC_HOLDING_TICKER]}</span></div>}
                {this.values.hasOwnProperty(this.SETTINGS_IDS.MVA_SEAPRATE_SIGNAL_TICKER) &&
                    <div className="" key={this.GetUniqueKeyId()}> <span className="font-monospace">Tracking separate asset: {this.values[this.SETTINGS_IDS.MVA_SEAPRATE_SIGNAL_TICKER]}</span></div>}

            </div>
        )
    }

    #RenderSettingParams(setting) {

        const [ValidationFunction, inputType] = this.GetSettingAttributes(setting);
        const disableList = this.GetDisabledList();

        if (inputType === "checkbox") {
            return (
                <div className="text-start form-check form-check-reverse form-switch mb-3" key={this.GetUniqueKeyId()}>
                    <label className="">{setting.SettingName}:</label>
                    <input className="form-check-input" type="checkbox"
                        onChange={(e) => ValidationFunction()}
                    />
                </div>
            )
        }
        else {
            const inputGroupClasses = disableList.includes(setting.SettingId) ? "input-group mb-3 d-none setting" : "input-group mb-3 setting";
            return (
                <div className={inputGroupClasses} id={setting.SettingId} key={this.GetUniqueKeyId()}>
                    <div className="input-group">
                        <div className="input-group-text">{setting.ValidationSettings.IsRequired ? setting.SettingName + "*" : setting.SettingName}</div>
                        <input type={inputType}
                            id={setting.SettingId.toString() + "-input"}
                            className="form-control"
                            placeholder={setting.DefaultValue !== null ? setting.DefaultValue.toString() : null}
                            onBlur={(e) => ValidationFunction(e.target.value)}
                            defaultValue={setting.Value}
                        />
                        {/* {!settings.NameIsValid && <InvalidFeedback Message="Error" />} */}
                    </div>
                </div>
            )
        }
    }

    RenderAddedBacktestListItem(HandleRemoveBacktest) {
        const id = this.GetUniqueKeyId();

        return (
            <li className="list-group-item" key={id}>
                <div className="d-flex flex-wrap justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{this.values[this.SETTINGS_IDS.BASE_NAME_SETTING]} </div>
                        MVA Crossover
                    </div>
                    <a className="btn btn-primary" data-bs-toggle="collapse" href={"#" + id} role="button" aria-expanded="false" aria-controls={id}>
                        &#9660;
                    </a>
                    <button type="button" className="btn-close px-3" aria-label="Close" onClick={() => HandleRemoveBacktest(this.BacktestId)}></button>
                </div>

                <div className="collapse my-1" id={id}>
                    <div className="w-100">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item" key={this.GetUniqueKeyId()}> <span className="font-monospace">Date range: {this.values[this.SETTINGS_IDS.BASE_START_DATE_SETTING]} - {this.values[this.SETTINGS_IDS.BASE_END_DATE_SETTING]}</span></li>
                            <li className="list-group-item" key={this.GetUniqueKeyId()}> <span className="font-monospace">Ticker: {this.values[this.SETTINGS_IDS.MVA_TRADING_TICKER]}</span></li>
                            <li className="list-group-item" key={this.GetUniqueKeyId()}> <span className="font-monospace">Short term MVA: {this.values[this.SETTINGS_IDS.MVA_SHORT_TERM_MVA_PERIOD]}</span></li>
                            <li className="list-group-item" key={this.GetUniqueKeyId()}> <span className="font-monospace">Long term MVA: {this.values[this.SETTINGS_IDS.MVA_LONG_TERM_MVA_PERIOD]}</span></li>
                            {this.values.hasOwnProperty(this.SETTINGS_IDS.MVA_STATIC_HOLDING_TICKER) &&
                                <li className="list-group-item" key={this.GetUniqueKeyId()}> <span className="font-monospace">Holding asset in downtime: {this.values[this.SETTINGS_IDS.MVA_STATIC_HOLDING_TICKER]}</span></li>}
                            {this.values.hasOwnProperty(this.SETTINGS_IDS.MVA_SEAPRATE_SIGNAL_TICKER) &&
                                <li className="list-group-item" key={this.GetUniqueKeyId()}> <span className="font-monospace">Tracking separate asset: {this.values[this.SETTINGS_IDS.MVA_SEAPRATE_SIGNAL_TICKER]}</span></li>}
                        </ul>
                    </div>
                </div>
            </li>
        );
    }

    // need to update to account for making backtest list item public
    render() {
        if (this.IsSaved) {
            return (
                <>
                    {this.RenderAddedBacktestListItem()}
                </>
            )
        }

        else {
            return (
                <>
                    {this.SettingParameters.map(settingParameter => {
                        return this.#RenderSettingParams(settingParameter)
                    })}
                </>
            )
        }
    }



}


export default MvaCrossOverSettings