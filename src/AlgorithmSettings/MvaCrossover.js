
import { Component } from "react";
import {
    BaseSettings, BaseEndDateSetting, BaseNameSetting,
    BaseStartDateSetting, BaseStopLossSetting,
    INPUT_TYPES, DATE_TYPES
} from "./BaseSettings";



class MvaCrossOverSettings extends BaseSettings {

    constructor(props) {
        super(props);
        this.SETTINGS_IDS = {
            ...this.SETTINGS_IDS,
            MVA_HOLD_ASSET_WHEN_NOT_TRADING: 4,
            MVA_TRACK_SEPARATE_ASSET: 5,
            MVA_SEAPRATE_SIGNAL_TICKER: 6,
            MVA_STATIC_HOLDING_TICKER: 7,
            MVA_TRADING_TICKER: 8,
            MVA_SHORT_TERM_MVA_PERIOD: 9,
            MVA_LONG_TERM_MVA_PERIOD: 10
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
                SettingId: this.SETTINGS_IDS.MVA_HOLD_ASSET_WHEN_NOT_TRADING,
                SettingName: "Hold an asset while not trading",
                DefaultValue: false,
                Value: null,
                ToolTip: "Tooltip for this settings",
                InputType: INPUT_TYPES.RADIO,
                ValidationSettings: null,
                RadioSettings: {
                    ToggleTrue: [this.SETTINGS_IDS.MVA_STATIC_HOLDING_TICKER],
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
                SettingId: this.SETTINGS_IDS.MVA_STATIC_HOLDING_TICKER,
                SettingName: "Static Holding Ticker",
                DefaultValue: "SPXS",
                Value: null,
                ToolTip: "Tooltip for this settings",
                InputType: INPUT_TYPES.TICKER,
                IsValid: true,
                ValidationSettings: {
                    IsRequired: true
                },
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

    GetValues() {
        return null
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

    #RenderAddedBacktestListItem() {
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

    render() {
        if (this.IsSaved) {
            return (
                <>
                    {this.#RenderAddedBacktestListItem()}
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





 const MvaCrossoverSettingsParams = [
    {
        SettingName: "Use a Separate Asset for Trading Signals",
        DefaultValue: false,
        Value: null,
        ToolTip: "Tooltip for this settings",
        InputType: INPUT_TYPES.RADIO,
        ValidationSettings: null,
        RadioSettings: {
            Enabled: [2],
            Disabled: []
        }
    },
    {
        SettingName: "Hold an asset while not trading",
        DefaultValue: false,
        Value: null,
        ToolTip: "Tooltip for this settings",
        InputType: INPUT_TYPES.RADIO,
        ValidationSettings: null,
        RadioSettings: {
            Enabled: [2],
            Disabled: []
        }
    },
    {
        SettingName: "Signal Ticker",
        DefaultValue: false,
        Value: null,
        ToolTip: "Tooltip for this settings",
        InputType: INPUT_TYPES.TICKER,
        ValidationSettings: null,
    },
    {
        SettingName: "Static Holding Ticker",
        DefaultValue: false,
        Value: null,
        ToolTip: "Tooltip for this settings",
        InputType: INPUT_TYPES.TICKER,
        ValidationSettings: null,
    },
    {
        SettingName: "Trading Ticker",
        DefaultValue: false,
        Value: null,
        ToolTip: "Tooltip for this settings",
        InputType: INPUT_TYPES.TICKER,
        ValidationSettings: null,
    },
    {
        SettingName: "Short Term MVA Period",
        DefaultValue: false,
        Value: null,
        ToolTip: "Tooltip for this settings",
        InputType: INPUT_TYPES.INTEGER,
        ValidationSettings: null,
    },
    {
        SettingName: "Long Term MVA Period",
        DefaultValue: false,
        Value: null,
        ToolTip: "Tooltip for this settings",
        InputType: INPUT_TYPES.INTEGER,
        ValidationSettings: null,
    },
    BaseStartDateSetting,
    BaseEndDateSetting,
    BaseStopLossSetting

 ]




export default MvaCrossOverSettings