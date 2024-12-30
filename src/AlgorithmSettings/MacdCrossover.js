
import { Component } from "react";
import {
    BaseSettings, BaseEndDateSetting, BaseNameSetting,
    BaseStartDateSetting, BaseStopLossSetting,
    INPUT_TYPES, DATE_TYPES
} from "./BaseSettings";



// class MacdCrossoverSettings extends Component {

//     MACD_SETTINGS_IDS = {
//         BASE_NAME_SETTING: 0, BASE_START_DATE_SETTING: 1,
//         BASE_END_DATE_SETTING: 2, BASE_STOP_LOSS_SETTING: 3, MACD_HOLD_ASSET_WHEN_NOT_TRADING: 4,
//         MACD_TRACK_SEPARATE_ASSET: 5, MACD_SEAPRATE_SIGNAL_TICKER: 6, MACD_STATIC_HOLDING_TICKER: 7,
//         MACD_TRADING_TICKER: 8, MACD_SHORT_TERM_EMA_PERIOD: 9, MACD_LONG_TERM_EMA_PERIOD: 10, MACD_SIGNAL_PERIOD: 11
//     }

//     SettingParameters = [
//         BaseNameSetting,
//         {
//             SettingId: this.MACD_SETTINGS_IDS.MACD_TRACK_SEPARATE_ASSET,
//             SettingName: "Use a Separate Asset for Trading Signals",
//             DefaultValue: false,
//             Value: null,
//             ToolTip: "Tooltip for this settings",
//             InputType: INPUT_TYPES.RADIO,
//             ValidationSettings: null,
//             RadioSettings: {
//                 ToggleTrue: [this.MACD_SETTINGS_IDS.MACD_SEAPRATE_SIGNAL_TICKER],
//                 ToggleFalse: []
//             }
//         },
//         {
//             SettingId: this.MACD_SETTINGS_IDS.MACD_HOLD_ASSET_WHEN_NOT_TRADING,
//             SettingName: "Hold an asset while not trading",
//             DefaultValue: false,
//             Value: null,
//             ToolTip: "Tooltip for this settings",
//             InputType: INPUT_TYPES.RADIO,
//             ValidationSettings: null,
//             RadioSettings: {
//                 ToggleTrue: [this.MACD_SETTINGS_IDS.MACD_STATIC_HOLDING_TICKER],
//                 ToggleFalse: []
//             }
//         },
//         {
//             SettingId: this.MACD_SETTINGS_IDS.MACD_SEAPRATE_SIGNAL_TICKER,
//             SettingName: "Signal Ticker",
//             DefaultValue: "SPY",
//             Value: null,
//             ToolTip: "Tooltip for this settings",
//             InputType: INPUT_TYPES.TICKER,
//             IsValid: true,
//             ValidationSettings: {
//                 IsRequired: true
//             }
//         },
//         {
//             SettingId: this.MACD_SETTINGS_IDS.MACD_STATIC_HOLDING_TICKER,
//             SettingName: "Static Holding Ticker",
//             DefaultValue: "SPXS",
//             Value: null,
//             ToolTip: "Tooltip for this settings",
//             InputType: INPUT_TYPES.TICKER,
//             IsValid: true,
//             ValidationSettings: {
//                 IsRequired: true
//             },
//         },
//         {
//             SettingId: this.MACD_SETTINGS_IDS.MACD_TRADING_TICKER,
//             SettingName: "Trading Ticker",
//             DefaultValue: "SPXL",
//             Value: null,
//             ToolTip: "Tooltip for this settings",
//             InputType: INPUT_TYPES.TICKER,
//             IsValid: true,
//             ValidationSettings: {
//                 IsRequired: true
//             },
//         },
//         {
//             SettingId: this.MACD_SETTINGS_IDS.MACD_SHORT_TERM_EMA_PERIOD,
//             SettingName: "Short Term EMA Period",
//             DefaultValue: 15,
//             Value: null,
//             ToolTip: "Tooltip for this settings",
//             InputType: INPUT_TYPES.INTEGER,
//             IsValid: true,
//             ValidationSettings: {
//                 MaxValue: 250,
//                 MinValue: 1,
//                 IsRequired: true,
//                 IsValid: true,
//                 IsLessThan: [this.MACD_SETTINGS_IDS.MACD_LONG_TERM_EMA_PERIOD],
//                 IsGreaterThan: []
//             }
//         },
//         {
//             SettingId: this.MACD_SETTINGS_IDS.MACD_LONG_TERM_EMA_PERIOD,
//             SettingName: "Long Term EMA Period",
//             DefaultValue: 30,
//             Value: null,
//             ToolTip: "Tooltip for this settings",
//             InputType: INPUT_TYPES.INTEGER,
//             IsValid: true,
//             ValidationSettings: {
//                 MaxValue: 250,
//                 MinValue: 1,
//                 IsRequired: true,
//                 IsValid: true,
//                 IsLessThan: [],
//                 IsGreaterThan: [this.MACD_SETTINGS_IDS.MACD_SHORT_TERM_EMA_PERIOD]
//             }
//         },
//         {
//             SettingId: this.MACD_SETTINGS_IDS.MACD_SIGNAL_PERIOD,
//             SettingName: "Macd Signal Period",
//             DefaultValue: 9,
//             Value: null,
//             ToolTip: "Tooltip for this settings",
//             InputType: INPUT_TYPES.INTEGER,
//             IsValid: true,
//             ValidationSettings: {
//                 MaxValue: 250,
//                 MinValue: 1,
//                 IsRequired: true,
//                 IsValid: true
//             }
//         },
//         BaseStartDateSetting,
//         BaseEndDateSetting,
//         BaseStopLossSetting
//     ]

//     values = {};

//     GetValues() {
//         return null
//     }

//     #GetUniqueKeyId = () => {
//         return Math.random().toString().slice(2);
//     }

//     AreSettingsValid() {
//         return false;
//     }

//     #GetDisabledList() {
//         const disableList = []
//         this.SettingParameters.forEach(ele => {
//             if (ele.InputType === INPUT_TYPES.RADIO) {
//                 if ((ele.Value === null && ele.DefaultValue === false) || ele.Value === false) {
//                     disableList.push(...ele.RadioSettings.ToggleTrue);
//                 }
//             }
//         })
//         return disableList;
//     }

//     #ToggleInputsValidity(isValid, settingId) {
//         const ele = document.getElementById(settingId.toString() + "-input")
//         const invalidClassesApplied = ele.classList.contains("is-invalid") || ele.classList.contains("apply-shake")
//         if (isValid && invalidClassesApplied) {
//             ele.classList.remove("is-invalid");
//             ele.classList.remove("apply-shake");
//         }
//         else if (!isValid && !invalidClassesApplied) {
//             ele.classList.add("is-invalid");
//             ele.classList.add("apply-shake");
//         }
//     }

//     #MakeStringValidationFunction = (validationSettings, settingId) => {
//         return (value) => {
//             const isValid = value === null ||
//                 ((value.length <= validationSettings.MaxSize) &&
//                     (value.length >= validationSettings.MinSize) &&
//                     (value.AllowWhiteSpace ? true : /^[^\s]+$/.test(value)) &&
//                     (value.OnlyLetters ? /^[a-zA-Z]+$/.test(value) : true))

//             console.log(this.values)
//             this.values[settingId] = value

//             this.#ToggleInputsValidity(isValid, settingId)

//             return isValid;
//         }
//     }

//     #MakeDateValidationFunction = (validationSettings, settingId) => {
//         return (value) => {
//             const hasStartDate = this.values.hasOwnProperty(settingId)
//             const hasEndDate = this.values.hasOwnProperty(settingId);
//             const startDateValue = hasStartDate ? this.values[this.MACD_SETTINGS_IDS.BASE_START_DATE_SETTING] : null
//             const endDateValue = hasEndDate ? this.values[this.MACD_SETTINGS_IDS.BASE_END_DATE_SETTING] : null
//             const startSetting = this.SettingParameters.find(ele => ele.SettingId === this.MACD_SETTINGS_IDS.BASE_START_DATE_SETTING);
//             const endSetting = this.SettingParameters.find(ele => ele.SettingId === this.MACD_SETTINGS_IDS.BASE_START_DATE_SETTING);
//             const dateType = settingId === startSetting.SettingId ? DATE_TYPES.START_DATE :
//                 settingId === endSetting.SettingId ? DATE_TYPES.END_DATE : DATE_TYPES.OTHER_DATE;

//             function isGreaterThanMonth(date1, date2) {
//                 const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000; // Approximate milliseconds in a month
//                 const diffInMillis = Math.abs(date1.getTime() - date2.getTime());
//                 return diffInMillis > oneMonthInMillis;
//             }

//             this.values[settingId] = value

//             const inputDate = new Date(value);
//             let isOtherDateSet = dateType === DATE_TYPES.START_DATE ? hasEndDate : hasStartDate
//             let startDate = dateType === DATE_TYPES.START_DATE ? inputDate :
//                 hasStartDate ? new Date(startDateValue) : null
//             let endDate = dateType === DATE_TYPES.END_DATE ? inputDate :
//                 endSetting.Value !== null ? new Date(endDateValue) : null

//             let isPairValid = isOtherDateSet ? isGreaterThanMonth(startDate, endDate) && endDate > startDate : true
//             let isEndDateValid = endDate !== null ? endDate <= endSetting.ValidationSettings.LatestEndDate && endDate >= startSetting.ValidationSettings.EarliestStartDate : true
//             let isStartDateValid = startDate !== null ? startDate <= endSetting.ValidationSettings.LatestEndDate && startDate >= startSetting.ValidationSettings.EarliestStartDate : true

//             this.#ToggleInputsValidity((isPairValid && isStartDateValid), startSetting.SettingId)
//             this.#ToggleInputsValidity((isPairValid && isEndDateValid), endSetting.SettingId)

//             return isPairValid && isEndDateValid && isStartDateValid;
//         }
//     }

//     #MakePercentValidationFunction = (validationSettings, settingId) => {
//         return (value) => {

//             const num = Number(value)
//             let isValid = (validationSettings.IsRequired ? (value !== null || value !== "") : true
//                 && (num !== NaN && num >= validationSettings.MinValue && num <= validationSettings.MaxValue));

//             let containsNoWhitespace = value != null && value.length > 0 ? /^[^\s]+$/.test(value) : true;
//             isValid = isValid && containsNoWhitespace;

//             this.values[settingId] = value

//             this.#ToggleInputsValidity(isValid, settingId)

//             return isValid;
//         }
//     }

//     #MakeRadioOnChangeHandler = (validationSettings, settingId) => {
//         return () => {

//             const radioSetting = this.SettingParameters.find(e => e.SettingId === settingId)
//             const settingToToggle = []
//             radioSetting.RadioSettings.ToggleTrue.forEach(i => {
//                 const ele = document.getElementById(i.toString())
//                 const isVisible = !ele.classList.contains("d-none")
//                 if (isVisible) {
//                     ele.classList.add("d-none")
//                 }
//                 else {
//                     ele.classList.remove("d-none")
//                 }
//             })


//         }
//     }

//     #MakeIntegerValidationFunciton = (validationSettings, settingId) => {
//         return (value) => {
//             {
//                 const num = Number(value)
//                 let isValid = (validationSettings.IsRequired ? (value !== null && value !== "") : true
//                     && (num !== NaN && num >= validationSettings.MinValue && num <= validationSettings.MaxValue));

//                 let containsNoWhitespace = value != null && value.length > 0 ? /^[^\s]+$/.test(value) : true;
//                 isValid = isValid && containsNoWhitespace;

//                 this.values[settingId] = value
//                 this.#ToggleInputsValidity(isValid, settingId)

//                 return isValid;
//             }
//         }
//     }

//     #MakeTickerValidaiton = (validationSettings, settingId) => {
//         return (value) => {
//             const containsOnlyAlphebetCharacters = /^[a-zA-Z]+$/.test(value);
//             const isValid = ((validationSettings.IsRequired ? value !== null : true)
//                 && (containsOnlyAlphebetCharacters)
//                 && value.length <= 4);

//             this.values[settingId] = value
//             this.#ToggleInputsValidity(isValid, settingId)

//             return isValid;


//         }
//     }

//     #RenderSetting(setting) {

//         const GetSettingAttributes = (setting) => {
//             switch (setting.InputType) {
//                 case INPUT_TYPES.DATE:
//                     return [this.#MakeDateValidationFunction(setting.ValidationSettings, setting.SettingId), "date"];
//                 case INPUT_TYPES.FLOAT:
//                     throw "Not Implemented";
//                 case INPUT_TYPES.INTEGER:
//                     return [this.#MakeIntegerValidationFunciton(setting.ValidationSettings, setting.SettingId), "text"]
//                 case INPUT_TYPES.PERCENT:
//                     return [this.#MakePercentValidationFunction(setting.ValidationSettings, setting.SettingId), "text"];
//                 case INPUT_TYPES.RADIO:
//                     return [this.#MakeRadioOnChangeHandler(setting.ValidationSettings, setting.SettingId), "checkbox"];
//                 case INPUT_TYPES.TICKER:
//                     return [this.#MakeTickerValidaiton(setting.ValidationSettings, setting.SettingId), "text"]
//                 case INPUT_TYPES.STRING:
//                     return [this.#MakeStringValidationFunction(setting.ValidationSettings, setting.SettingId), "text"];
//             }
//         }

//         const [ValidationFunction, inputType] = GetSettingAttributes(setting);
//         const disableList = this.#GetDisabledList();

//         if (inputType === "checkbox") {
//             return (
//                 <div className="text-start form-check form-check-reverse form-switch mb-3" key={this.#GetUniqueKeyId()}>
//                     <label className="">{setting.SettingName}:</label>
//                     <input className="form-check-input" type="checkbox"
//                         onChange={(e) => ValidationFunction()}
//                     />
//                 </div>
//             )
//         }
//         else {
//             const inputGroupClasses = disableList.includes(setting.SettingId) ? "input-group mb-3 d-none setting" : "input-group mb-3 setting";
//             return (
//                 <div className={inputGroupClasses} id={setting.SettingId} key={this.#GetUniqueKeyId()}>
//                     <div className="input-group">
//                         <div className="input-group-text">{setting.ValidationSettings.IsRequired ? setting.SettingName + "*" : setting.SettingName}</div>
//                         <input type={inputType}
//                             id={setting.SettingId.toString() + "-input"}
//                             className="form-control"
//                             placeholder={setting.DefaultValue !== null ? setting.DefaultValue.toString() : null}
//                             onBlur={(e) => ValidationFunction(e.target.value)}
//                             defaultValue={setting.Value}
//                         />
//                         {/* {!settings.NameIsValid && <InvalidFeedback Message="Error" />} */}
//                     </div>
//                 </div>
//             )
//         }
//     }

//     render() {
//         return (
//             <>
//                 {this.SettingParameters.map(settingParameter => {
//                     return this.#RenderSetting(settingParameter)
//                 })}
//             </>
//         )
//     }

// }



// class MacdCrossoverSettingsB extends BaseSettings {

//     constructor(props) {
//         super(props);
//         this.SETTINGS_IDS = {
//             MACD_HOLD_ASSET_WHEN_NOT_TRADING: 4,
//             MACD_TRACK_SEPARATE_ASSET: 5, 
//             MACD_SEAPRATE_SIGNAL_TICKER: 6, 
//             MACD_STATIC_HOLDING_TICKER: 7,
//             MACD_TRADING_TICKER: 8, 
//             MACD_SHORT_TERM_EMA_PERIOD: 9, 
//             MACD_LONG_TERM_EMA_PERIOD: 10, 
//             MACD_SIGNAL_PERIOD: 11
//         }
//         this.SettingParameters = [
//             {
//                 SettingId: this.SETTINGS_IDS.MACD_TRACK_SEPARATE_ASSET,
//                 SettingName: "Use a Separate Asset for Trading Signals",
//                 DefaultValue: false,
//                 Value: null,
//                 ToolTip: "Tooltip for this settings",
//                 InputType: INPUT_TYPES.RADIO,
//                 ValidationSettings: null,
//                 RadioSettings: {
//                     ToggleTrue: [this.SETTINGS_IDS.MACD_SEAPRATE_SIGNAL_TICKER],
//                     ToggleFalse: []
//                 }
//             },
//             {
//                 SettingId: this.SETTINGS_IDS.MACD_HOLD_ASSET_WHEN_NOT_TRADING,
//                 SettingName: "Hold an asset while not trading",
//                 DefaultValue: false,
//                 Value: null,
//                 ToolTip: "Tooltip for this settings",
//                 InputType: INPUT_TYPES.RADIO,
//                 ValidationSettings: null,
//                 RadioSettings: {
//                     ToggleTrue: [this.SETTINGS_IDS.MACD_STATIC_HOLDING_TICKER],
//                     ToggleFalse: []
//                 }
//             },
//             {
//                 SettingId: this.SETTINGS_IDS.MACD_SEAPRATE_SIGNAL_TICKER,
//                 SettingName: "Signal Ticker",
//                 DefaultValue: "SPY",
//                 Value: null,
//                 ToolTip: "Tooltip for this settings",
//                 InputType: INPUT_TYPES.TICKER,
//                 IsValid: true,
//                 ValidationSettings: {
//                     IsRequired: true
//                 }
//             },
//             {
//                 SettingId: this.SETTINGS_IDS.MACD_STATIC_HOLDING_TICKER,
//                 SettingName: "Static Holding Ticker",
//                 DefaultValue: "SPXS",
//                 Value: null,
//                 ToolTip: "Tooltip for this settings",
//                 InputType: INPUT_TYPES.TICKER,
//                 IsValid: true,
//                 ValidationSettings: {
//                     IsRequired: true
//                 },
//             },
//             {
//                 SettingId: this.SETTINGS_IDS.MACD_TRADING_TICKER,
//                 SettingName: "Trading Ticker",
//                 DefaultValue: "SPXL",
//                 Value: null,
//                 ToolTip: "Tooltip for this settings",
//                 InputType: INPUT_TYPES.TICKER,
//                 IsValid: true,
//                 ValidationSettings: {
//                     IsRequired: true
//                 },
//             },
//             {
//                 SettingId: this.SETTINGS_IDS.MACD_SHORT_TERM_EMA_PERIOD,
//                 SettingName: "Short Term EMA Period",
//                 DefaultValue: 15,
//                 Value: null,
//                 ToolTip: "Tooltip for this settings",
//                 InputType: INPUT_TYPES.INTEGER,
//                 IsValid: true,
//                 ValidationSettings: {
//                     MaxValue: 250,
//                     MinValue: 1,
//                     IsRequired: true,
//                     IsValid: true,
//                     IsLessThan: [this.SETTINGS_IDS.MACD_LONG_TERM_EMA_PERIOD],
//                     IsGreaterThan: []
//                 }
//             },
//             {
//                 SettingId: this.SETTINGS_IDS.MACD_LONG_TERM_EMA_PERIOD,
//                 SettingName: "Long Term EMA Period",
//                 DefaultValue: 30,
//                 Value: null,
//                 ToolTip: "Tooltip for this settings",
//                 InputType: INPUT_TYPES.INTEGER,
//                 IsValid: true,
//                 ValidationSettings: {
//                     MaxValue: 250,
//                     MinValue: 1,
//                     IsRequired: true,
//                     IsValid: true,
//                     IsLessThan: [],
//                     IsGreaterThan: [this.SETTINGS_IDS.MACD_SHORT_TERM_EMA_PERIOD]
//                 }
//             },
//             {
//                 SettingId: this.SETTINGS_IDS.MACD_SIGNAL_PERIOD,
//                 SettingName: "Macd Signal Period",
//                 DefaultValue: 9,
//                 Value: null,
//                 ToolTip: "Tooltip for this settings",
//                 InputType: INPUT_TYPES.INTEGER,
//                 IsValid: true,
//                 ValidationSettings: {
//                     MaxValue: 250,
//                     MinValue: 1,
//                     IsRequired: true,
//                     IsValid: true
//                 }
//             }
//         ]
//     }

//     GetValues() {
//         return null
//     }

//     AreSettingsValid() {
//         return false;
//     }

//     #RenderSetting(setting) {

//         const [ValidationFunction, inputType] = this.GetSettingAttributes(setting);
//         const disableList = this.GetDisabledList();

//         if (inputType === "checkbox") {
//             return (
//                 <div className="text-start form-check form-check-reverse form-switch mb-3" key={this.GetUniqueKeyId()}>
//                     <label className="">{setting.SettingName}:</label>
//                     <input className="form-check-input" type="checkbox"
//                         onChange={(e) => ValidationFunction()}
//                     />
//                 </div>
//             )
//         }
//         else {
//             const inputGroupClasses = disableList.includes(setting.SettingId) ? "input-group mb-3 d-none setting" : "input-group mb-3 setting";
//             return (
//                 <div className={inputGroupClasses} id={setting.SettingId} key={this.GetUniqueKeyId()}>
//                     <div className="input-group">
//                         <div className="input-group-text">{setting.ValidationSettings.IsRequired ? setting.SettingName + "*" : setting.SettingName}</div>
//                         <input type={inputType}
//                             id={setting.SettingId.toString() + "-input"}
//                             className="form-control"
//                             placeholder={setting.DefaultValue !== null ? setting.DefaultValue.toString() : null}
//                             onBlur={(e) => ValidationFunction(e.target.value)}
//                             defaultValue={setting.Value}
//                         />
//                         {/* {!settings.NameIsValid && <InvalidFeedback Message="Error" />} */}
//                     </div>
//                 </div>
//             )
//         }
//     }

//     render() {
//         return (
//             <>
//                 {this.SettingParameters.map(settingParameter => {
//                     return this.#RenderSetting(settingParameter)
//                 })}
//             </>
//         )
//     }

// }

// class BaseSettings extends Component {

//     constructor(props) {
//         super(props)
//         this.values = {};
//         this.SettingParameters = [
//             BaseNameSetting,
//             BaseStartDateSetting,
//             BaseEndDateSetting,
//             BaseStopLossSetting
//         ]
//         this.SETTINGS_IDS = {
//             BASE_NAME_SETTING: 0, BASE_START_DATE_SETTING: 1,
//             BASE_END_DATE_SETTING: 2, BASE_STOP_LOSS_SETTING: 3
//         }
//     }

//     GetValues() {
//         return null
//     }

//     GetSettingAttributes(setting) {
//         switch (setting.InputType) {
//             case INPUT_TYPES.DATE:
//                 return [this.#MakeDateValidationFunction(setting.ValidationSettings, setting.SettingId), "date"];
//             case INPUT_TYPES.FLOAT:
//                 throw "Not Implemented";
//             case INPUT_TYPES.INTEGER:
//                 return [this.#MakeIntegerValidationFunciton(setting.ValidationSettings, setting.SettingId), "text"]
//             case INPUT_TYPES.PERCENT:
//                 return [this.#MakePercentValidationFunction(setting.ValidationSettings, setting.SettingId), "text"];
//             case INPUT_TYPES.RADIO:
//                 return [this.#MakeRadioOnChangeHandler(setting.ValidationSettings, setting.SettingId), "checkbox"];
//             case INPUT_TYPES.TICKER:
//                 return [this.#MakeTickerValidaiton(setting.ValidationSettings, setting.SettingId), "text"]
//             case INPUT_TYPES.STRING:
//                 return [this.#MakeStringValidationFunction(setting.ValidationSettings, setting.SettingId), "text"];
//         }
//     }

//     GetUniqueKeyId = () => {
//         return Math.random().toString().slice(2);
//     }

//     AreSettingsValid() {
//         return false;
//     }

//     GetDisabledList() {
//         const disableList = []
//         this.SettingParameters.forEach(ele => {
//             if (ele.InputType === INPUT_TYPES.RADIO) {
//                 if ((ele.Value === null && ele.DefaultValue === false) || ele.Value === false) {
//                     disableList.push(...ele.RadioSettings.ToggleTrue);
//                 }
//             }
//         })
//         return disableList;
//     }

//     #ToggleInputsValidity(isValid, settingId) {
//         const ele = document.getElementById(settingId.toString() + "-input")
//         const invalidClassesApplied = ele.classList.contains("is-invalid") || ele.classList.contains("apply-shake")
//         if (isValid && invalidClassesApplied) {
//             ele.classList.remove("is-invalid");
//             ele.classList.remove("apply-shake");
//         }
//         else if (!isValid && !invalidClassesApplied) {
//             ele.classList.add("is-invalid");
//             ele.classList.add("apply-shake");
//         }
//     }

//     #MakeStringValidationFunction = (validationSettings, settingId) => {
//         return (value) => {
//             const isValid = value === null ||
//                 ((value.length <= validationSettings.MaxSize) &&
//                     (value.length >= validationSettings.MinSize) &&
//                     (value.AllowWhiteSpace ? true : /^[^\s]+$/.test(value)) &&
//                     (value.OnlyLetters ? /^[a-zA-Z]+$/.test(value) : true))

//             console.log(this.values)
//             this.values[settingId] = value

//             this.#ToggleInputsValidity(isValid, settingId)

//             return isValid;
//         }
//     }

//     #MakeDateValidationFunction = (validationSettings, settingId) => {

//         return (value) => {
//             const hasStartDate = this.values.hasOwnProperty(settingId)
//             const hasEndDate = this.values.hasOwnProperty(settingId);
//             const startDateValue = hasStartDate ? this.values[this.SETTINGS_IDS.BASE_START_DATE_SETTING] : null
//             const endDateValue = hasEndDate ? this.values[this.SETTINGS_IDS.BASE_END_DATE_SETTING] : null
//             const startSetting = this.SettingParameters.find(ele => ele.SettingId === this.SETTINGS_IDS.BASE_START_DATE_SETTING);
//             const endSetting = this.SettingParameters.find(ele => ele.SettingId === this.SETTINGS_IDS.BASE_START_DATE_SETTING);
//             const dateType = settingId === startSetting.SettingId ? DATE_TYPES.START_DATE :
//                 settingId === endSetting.SettingId ? DATE_TYPES.END_DATE : DATE_TYPES.OTHER_DATE;

//             function isGreaterThanMonth(date1, date2) {
//                 const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000; // Approximate milliseconds in a month
//                 const diffInMillis = Math.abs(date1.getTime() - date2.getTime());
//                 return diffInMillis > oneMonthInMillis;
//             }

//             this.values[settingId] = value

//             const inputDate = new Date(value);
//             let isOtherDateSet = dateType === DATE_TYPES.START_DATE ? hasEndDate : hasStartDate
//             let startDate = dateType === DATE_TYPES.START_DATE ? inputDate :
//                 hasStartDate ? new Date(startDateValue) : null
//             let endDate = dateType === DATE_TYPES.END_DATE ? inputDate :
//                 endSetting.Value !== null ? new Date(endDateValue) : null

//             let isPairValid = isOtherDateSet ? isGreaterThanMonth(startDate, endDate) && endDate > startDate : true
//             let isEndDateValid = endDate !== null ? endDate <= endSetting.ValidationSettings.LatestEndDate && endDate >= startSetting.ValidationSettings.EarliestStartDate : true
//             let isStartDateValid = startDate !== null ? startDate <= endSetting.ValidationSettings.LatestEndDate && startDate >= startSetting.ValidationSettings.EarliestStartDate : true

//             this.#ToggleInputsValidity((isPairValid && isStartDateValid), startSetting.SettingId)
//             this.#ToggleInputsValidity((isPairValid && isEndDateValid), endSetting.SettingId)

//             return isPairValid && isEndDateValid && isStartDateValid;
//         }
//     }

//     #MakePercentValidationFunction = (validationSettings, settingId) => {
//         return (value) => {

//             const num = Number(value)
//             let isValid = (validationSettings.IsRequired ? (value !== null || value !== "") : true
//                 && (num !== NaN && num >= validationSettings.MinValue && num <= validationSettings.MaxValue));

//             let containsNoWhitespace = value != null && value.length > 0 ? /^[^\s]+$/.test(value) : true;
//             isValid = isValid && containsNoWhitespace;

//             this.values[settingId] = value

//             this.#ToggleInputsValidity(isValid, settingId)

//             return isValid;
//         }
//     }

//     #MakeRadioOnChangeHandler = (validationSettings, settingId) => {
//         return () => {

//             const radioSetting = this.SettingParameters.find(e => e.SettingId === settingId)
//             const settingToToggle = []
//             radioSetting.RadioSettings.ToggleTrue.forEach(i => {
//                 const ele = document.getElementById(i.toString())
//                 const isVisible = !ele.classList.contains("d-none")
//                 if (isVisible) {
//                     ele.classList.add("d-none")
//                 }
//                 else {
//                     ele.classList.remove("d-none")
//                 }
//             })


//         }
//     }

//     #MakeIntegerValidationFunciton = (validationSettings, settingId) => {
//         return (value) => {
//             {
//                 const num = Number(value)
//                 let isValid = (validationSettings.IsRequired ? (value !== null && value !== "") : true
//                     && (num !== NaN && num >= validationSettings.MinValue && num <= validationSettings.MaxValue));

//                 let containsNoWhitespace = value != null && value.length > 0 ? /^[^\s]+$/.test(value) : true;
//                 isValid = isValid && containsNoWhitespace;

//                 this.values[settingId] = value
//                 this.#ToggleInputsValidity(isValid, settingId)

//                 return isValid;
//             }
//         }
//     }

//     #MakeTickerValidaiton = (validationSettings, settingId) => {
//         return (value) => {
//             const containsOnlyAlphebetCharacters = /^[a-zA-Z]+$/.test(value);
//             const isValid = ((validationSettings.IsRequired ? value !== null : true)
//                 && (containsOnlyAlphebetCharacters)
//                 && value.length <= 4);

//             this.values[settingId] = value
//             this.#ToggleInputsValidity(isValid, settingId)

//             return isValid;


//         }
//     }

// }

class MacdCrossOverSettings extends BaseSettings {

    constructor(props) {
        super(props);
        this.SETTINGS_IDS = {
            ...this.SETTINGS_IDS,
            MACD_HOLD_ASSET_WHEN_NOT_TRADING: 4,
            MACD_TRACK_SEPARATE_ASSET: 5,
            MACD_SEAPRATE_SIGNAL_TICKER: 6,
            MACD_STATIC_HOLDING_TICKER: 7,
            MACD_TRADING_TICKER: 8,
            MACD_SHORT_TERM_EMA_PERIOD: 9,
            MACD_LONG_TERM_EMA_PERIOD: 10,
            MACD_SIGNAL_PERIOD: 11
        }
        this.SettingParameters = [
            ...this.SettingParameters,
            {
                SettingId: this.SETTINGS_IDS.MACD_TRACK_SEPARATE_ASSET,
                SettingName: "Use a Separate Asset for Trading Signals",
                DefaultValue: false,
                Value: null,
                ToolTip: "Tooltip for this settings",
                InputType: INPUT_TYPES.RADIO,
                ValidationSettings: null,
                RadioSettings: {
                    ToggleTrue: [this.SETTINGS_IDS.MACD_SEAPRATE_SIGNAL_TICKER],
                    ToggleFalse: []
                }
            },
            {
                SettingId: this.SETTINGS_IDS.MACD_HOLD_ASSET_WHEN_NOT_TRADING,
                SettingName: "Hold an asset while not trading",
                DefaultValue: false,
                Value: null,
                ToolTip: "Tooltip for this settings",
                InputType: INPUT_TYPES.RADIO,
                ValidationSettings: null,
                RadioSettings: {
                    ToggleTrue: [this.SETTINGS_IDS.MACD_STATIC_HOLDING_TICKER],
                    ToggleFalse: []
                }
            },
            {
                SettingId: this.SETTINGS_IDS.MACD_SEAPRATE_SIGNAL_TICKER,
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
                SettingId: this.SETTINGS_IDS.MACD_STATIC_HOLDING_TICKER,
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
                SettingId: this.SETTINGS_IDS.MACD_TRADING_TICKER,
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
                SettingId: this.SETTINGS_IDS.MACD_SHORT_TERM_EMA_PERIOD,
                SettingName: "Short Term EMA Period",
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
                    IsLessThan: [this.SETTINGS_IDS.MACD_LONG_TERM_EMA_PERIOD],
                    IsGreaterThan: []
                }
            },
            {
                SettingId: this.SETTINGS_IDS.MACD_LONG_TERM_EMA_PERIOD,
                SettingName: "Long Term EMA Period",
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
                    IsGreaterThan: [this.SETTINGS_IDS.MACD_SHORT_TERM_EMA_PERIOD]
                }
            },
            {
                SettingId: this.SETTINGS_IDS.MACD_SIGNAL_PERIOD,
                SettingName: "Macd Signal Period",
                DefaultValue: 9,
                Value: null,
                ToolTip: "Tooltip for this settings",
                InputType: INPUT_TYPES.INTEGER,
                IsValid: true,
                ValidationSettings: {
                    MaxValue: 250,
                    MinValue: 1,
                    IsRequired: true,
                    IsValid: true
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
                        MACD Crossover
                    </div>
                    <a className="btn btn-primary" data-bs-toggle="collapse" href={"#" + id} role="button" aria-expanded="false" aria-controls={id}>
                        &#9660;
                    </a>
                </div>

                <div className="collapse my-1" id={id}>
                    <div className="w-100">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item" key={this.GetUniqueKeyId()}> <span className="font-monospace">Date range: {this.values[this.SETTINGS_IDS.BASE_START_DATE_SETTING]} - {this.values[this.SETTINGS_IDS.BASE_END_DATE_SETTING]}</span></li>
                            <li className="list-group-item" key={this.GetUniqueKeyId()}> <span className="font-monospace">Ticker: {this.values[this.SETTINGS_IDS.MACD_TRADING_TICKER]}</span></li>
                            <li className="list-group-item" key={this.GetUniqueKeyId()}> <span className="font-monospace">Short term EMA: {this.values[this.SETTINGS_IDS.MACD_SHORT_TERM_EMA_PERIOD]}</span></li>
                            <li className="list-group-item" key={this.GetUniqueKeyId()}> <span className="font-monospace">Long term EMA: {this.values[this.SETTINGS_IDS.MACD_LONG_TERM_EMA_PERIOD]}</span></li>
                            <li className="list-group-item" key={this.GetUniqueKeyId()}> <span className="font-monospace">MACD signal period: {this.values[this.SETTINGS_IDS.MACD_SIGNAL_PERIOD]}</span></li>
                            {this.values.hasOwnProperty(this.SETTINGS_IDS.MACD_STATIC_HOLDING_TICKER) &&
                                <li className="list-group-item" key={this.GetUniqueKeyId()}> <span className="font-monospace">Holding asset in downtime: {this.values[this.SETTINGS_IDS.MACD_STATIC_HOLDING_TICKER]}</span></li>}
                            {this.values.hasOwnProperty(this.SETTINGS_IDS.MACD_SEAPRATE_SIGNAL_TICKER) &&
                                <li className="list-group-item" key={this.GetUniqueKeyId()}> <span className="font-monospace">Tracking separate asset: {this.values[this.SETTINGS_IDS.MACD_SEAPRATE_SIGNAL_TICKER]}</span></li>}
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

export default MacdCrossOverSettings