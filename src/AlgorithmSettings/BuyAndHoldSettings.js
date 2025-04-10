
import { Component } from "react";
import {
    BaseSettings, BaseEndDateSetting, BaseNameSetting,
    BaseStartDateSetting, BaseStopLossSetting,
    INPUT_TYPES, DATE_TYPES, SETTING_IDS
} from "./BaseSettings";
import { RunBuyHoldBacktest, STRATEGIES } from "../backtestApiClient/BacktestApiClient";



class BuyAndHoldSettings extends BaseSettings {

    constructor(props) {
        super(props);
        this.Strategy = STRATEGIES.BUY_AND_HOLD;
        this.SETTINGS_IDS = {
            ...this.SETTINGS_IDS,
            BH_TRADING_TICKER: SETTING_IDS.BH_TRADING_TICKER
        }

        const settingsWithoutStopLoss = this.SettingParameters.filter(e => e.SettingId !== SETTING_IDS.BASE_STOP_LOSS_SETTING)
        this.SettingParameters = [
            ...settingsWithoutStopLoss,
            {
                SettingId: this.SETTINGS_IDS.BH_TRADING_TICKER,
                SettingName: "Ticker to Trade",
                DefaultValue: "SPXL",
                Value: null,
                ToolTip: "Tooltip for this settings",
                InputType: INPUT_TYPES.TICKER,
                IsValid: true,
                ValidationSettings: {
                    IsRequired: true
                },
            }
        ]
    }

    GetDescriptionText(){
        return "The buying and holding strategy is a long-term investment approach where an investor purchases assets and holds onto them for an extended period, regardless of market fluctuations."
    }

    GetParameterDescriptions(){
        return null
    }

    GetTitle(){
        return "Buy and Hold"
    }

    GetValues() {
        return null
    }

    RenderSettingResults() {

        return (
            <div>
                    <div className="" key={this.GetUniqueKeyId()}> <span className="font-monospace">Date range: {this.values[this.SETTINGS_IDS.BASE_START_DATE_SETTING]} - {this.values[this.SETTINGS_IDS.BASE_END_DATE_SETTING]}</span></div>
                    <div className="" key={this.GetUniqueKeyId()}> <span className="font-monospace">Ticker: {this.values[this.SETTINGS_IDS.BH_TRADING_TICKER]}</span></div>
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
                        Buy and Hold
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
                            <li className="list-group-item" key={this.GetUniqueKeyId()}> <span className="font-monospace">Ticker: {this.values[this.SETTINGS_IDS.BH_TRADING_TICKER]}</span></li>
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



export default BuyAndHoldSettings
