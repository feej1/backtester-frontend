import { Component } from "react";

const INPUT_TYPES = { TICKER: 0, STRING: 1, PERCENT: 2, INTEGER: 3, FLOAT: 4, DATE: 5, RADIO: 6 }
const DATE_TYPES = { END_DATE: 0, START_DATE: 1, OTHER_DATE: 2 }

const SETTING_IDS = {
    // base setting ids
    BASE_NAME_SETTING: 0, BASE_START_DATE_SETTING: 1,
    BASE_END_DATE_SETTING: 2, BASE_STOP_LOSS_SETTING: 3,
    // macd setting ids
    MACD_HOLD_ASSET_WHEN_NOT_TRADING: 4, MACD_TRACK_SEPARATE_ASSET: 5,
    MACD_SEAPRATE_SIGNAL_TICKER: 6, MACD_STATIC_HOLDING_TICKER: 7,
    MACD_TRADING_TICKER: 8, MACD_SHORT_TERM_EMA_PERIOD: 9,
    MACD_LONG_TERM_EMA_PERIOD: 10, MACD_SIGNAL_PERIOD: 11,
    // buy and hold setting ids
    BH_TRADING_TICKER: 12,
    // MVA cross Settings
    MVA_HOLD_ASSET_WHEN_NOT_TRADING: 13, MVA_TRACK_SEPARATE_ASSET: 14,
    MVA_SEAPRATE_SIGNAL_TICKER: 15, MVA_STATIC_HOLDING_TICKER: 16,
    MVA_TRADING_TICKER: 17,MVA_SHORT_TERM_MVA_PERIOD: 18,
    MVA_LONG_TERM_MVA_PERIOD: 19

}

const BaseNameSetting = {
    SettingId: SETTING_IDS.BASE_NAME_SETTING,
    SettingName: "Name",
    DefaultValue: "New Backtest",
    Value: null,
    ToolTip: "Tooltip for this settings",
    InputType: INPUT_TYPES.STRING,
    IsValid: true,
    ValidationSettings: {
        MaxSize: 40,
        MinSize: 3,
        AllowWhiteSpace: true,
        OnlyLetters: false,
        IsRequired: true
    }
};

const BaseStartDateSetting = {
    SettingId: SETTING_IDS.BASE_START_DATE_SETTING,
    SettingName: "Start Date",
    DefaultValue: null,
    Value: null,
    ToolTip: "Tooltip for this settings",
    InputType: INPUT_TYPES.DATE,
    IsValid: true,
    ValidationSettings: {
        IsRequired: true,
        DateType: DATE_TYPES.START_DATE,
        EarliestStartDate: new Date("2000-01-01")
    }  // custom handler for dates so there are no other settings
};

const BaseEndDateSetting = {
    SettingId: SETTING_IDS.BASE_END_DATE_SETTING,
    SettingName: "End Date",
    DefaultValue: null,
    Value: null,
    ToolTip: "Tooltip for this settings",
    InputType: INPUT_TYPES.DATE,
    IsValid: true,
    ValidationSettings: {
        IsRequired: true,
        DateType: DATE_TYPES.END_DATE,
        LatestEndDate: new Date()
    }  // custom handler for dates so there are no other settings
};

// deprecated
const BaseStopLossSetting = {
    SettingId: SETTING_IDS.BASE_STOP_LOSS_SETTING,
    SettingName: "Stop Loss Percentage",
    DefaultValue: null,
    Value: null,
    ToolTip: "Tooltip for this settings",
    InputType: INPUT_TYPES.PERCENT,
    IsValid: true,
    ValidationSettings: {
        MaxValue: 50,
        MinValue: 0,
        IsRequired: false
    }
};


class BaseSettings extends Component {

    constructor(props) {
        super(props)
        this.BacktestId = crypto.randomUUID().toString()
        this.values = {};
        this.Strategy = null;
        this.SettingParameters = [
            BaseNameSetting,
            BaseStartDateSetting,
            BaseEndDateSetting,
        ]
        this.SETTINGS_IDS = {
            BASE_NAME_SETTING: SETTING_IDS.BASE_NAME_SETTING, 
            BASE_START_DATE_SETTING: SETTING_IDS.BASE_START_DATE_SETTING,
            BASE_END_DATE_SETTING: SETTING_IDS.BASE_END_DATE_SETTING
        }
        this.IsSaved = false
    }

    GetSettingValue(settingId) {

        if (this.values.hasOwnProperty(settingId)) {
            return this.values[settingId];
        }

        return null;

    }

    RenderSettingResults() {

        return (
            <div>
                Not yet implemented
            </div>
        )
    }

    SaveBacktest() {

        if (!this.AreSettingsValid()) {
            return false;
        }

        // clear values with d-none
        const hiddenSettings = document.getElementsByClassName("d-none")
        for (const element of hiddenSettings) {
            delete this.values[Number(element.id)]
        }

        // clear values with that are not required and are null or empty
        for (const setting of this.SettingParameters) {
            const id = setting.SettingId
            if (this.values.hasOwnProperty(id) && (this.values[id] === null || this.values[id] === "")) {
                delete this.values[id]
            }
        }
        this.IsSaved = true
    }

    GetSettingAttributes(setting) {
        switch (setting.InputType) {
            case INPUT_TYPES.DATE:
                return [this.#MakeDateValidationFunction(setting.ValidationSettings, setting.SettingId), "date"];
            case INPUT_TYPES.FLOAT:
                throw "Not Implemented";
            case INPUT_TYPES.INTEGER:
                return [this.#MakeIntegerValidationFunciton(setting.ValidationSettings, setting.SettingId), "text"]
            case INPUT_TYPES.PERCENT:
                return [this.#MakePercentValidationFunction(setting.ValidationSettings, setting.SettingId), "text"];
            case INPUT_TYPES.RADIO:
                return [this.#MakeRadioOnChangeHandler(setting.ValidationSettings, setting.SettingId), "checkbox"];
            case INPUT_TYPES.TICKER:
                return [this.#MakeTickerValidaiton(setting.ValidationSettings, setting.SettingId), "text"]
            case INPUT_TYPES.STRING:
                return [this.#MakeStringValidationFunction(setting.ValidationSettings, setting.SettingId), "text"];
        }
    }

    GetUniqueKeyId = () => {
        return Math.random().toString().slice(2);
    }

    AreSettingsValid() {

        let isValid = true;
        // check setting for settings that are invalid and present == not valid
        const invalidDocuments = document.getElementsByClassName("is-invalid")
        for (const element of invalidDocuments) {
            if (!element.classList.contains("d-none")) {
                isValid = false
                break;
            }
        }

        // check for settings that are required, dont have a value and are being displayed
        for (const setting of this.SettingParameters) {
            const isValuePresent = this.values.hasOwnProperty(setting.SettingId)
            const htmlEle = document.getElementById(setting.SettingId.toString())
            if (!isValuePresent && setting.InputType !== INPUT_TYPES.RADIO &&
                !htmlEle.classList.contains("d-none") && setting.ValidationSettings.IsRequired) {
                isValid = false
                break;
            }
        }

        return isValid;
    }

    ShowInvalidSettings() {

        for (const setting of this.SettingParameters) {
            console.log("gererer")
            const ele = document.getElementById(setting.SettingId.toString() + "-input")
            if (ele === null) {
                continue;
            }
            ele.classList.remove("apply-shake");
            ele.classList.remove("is-invalid");

            const isValuePresent = this.values.hasOwnProperty(setting.SettingId)
            if (!isValuePresent && setting.ValidationSettings.IsRequired) {
                ele.classList.add("is-invalid");
                ele.classList.add("apply-shake");
            }
        }
    }

    GetDisabledList() {
        const disableList = []
        this.SettingParameters.forEach(ele => {
            if (ele.InputType === INPUT_TYPES.RADIO) {
                if ((ele.Value === null && ele.DefaultValue === false) || ele.Value === false) {
                    disableList.push(...ele.RadioSettings.ToggleTrue);
                }
            }
        })
        return disableList;
    }

    #ToggleInputsValidity(isValid, settingId) {
        const ele = document.getElementById(settingId.toString() + "-input")
        const invalidClassesApplied = ele.classList.contains("is-invalid") || ele.classList.contains("apply-shake")
        if (isValid && invalidClassesApplied) {
            ele.classList.remove("is-invalid");
            ele.classList.remove("apply-shake");
        }
        else if (!isValid && !invalidClassesApplied) {
            ele.classList.add("is-invalid");
            ele.classList.add("apply-shake");
        }
    }

    #MakeStringValidationFunction = (validationSettings, settingId) => {
        return (value) => {
            const isValid = value === null ||
                ((value.length <= validationSettings.MaxSize) &&
                    (value.length >= validationSettings.MinSize) &&
                    (validationSettings.AllowWhiteSpace ? true : /^[^\s]+$/.test(value)) &&
                    (validationSettings.OnlyLetters ? /^[a-zA-Z]+$/.test(value) : true))

            this.values[settingId] = value

            this.#ToggleInputsValidity(isValid, settingId)

            return isValid;
        }
    }

    #MakeDateValidationFunction = (validationSettings, settingId) => {

        return (value) => {
            const hasStartDate = this.values.hasOwnProperty(this.SETTINGS_IDS.BASE_START_DATE_SETTING);
            const hasEndDate = this.values.hasOwnProperty(this.SETTINGS_IDS.BASE_END_DATE_SETTING);
            const startDateValue = hasStartDate ? this.values[this.SETTINGS_IDS.BASE_START_DATE_SETTING] : null
            const endDateValue = hasEndDate ? this.values[this.SETTINGS_IDS.BASE_END_DATE_SETTING] : null
            const startSetting = this.SettingParameters.find(ele => ele.SettingId === this.SETTINGS_IDS.BASE_START_DATE_SETTING);
            const endSetting = this.SettingParameters.find(ele => ele.SettingId === this.SETTINGS_IDS.BASE_END_DATE_SETTING);
            const dateType = settingId === startSetting.SettingId ? DATE_TYPES.START_DATE :
                settingId === endSetting.SettingId ? DATE_TYPES.END_DATE : DATE_TYPES.OTHER_DATE;

            function isGreaterThanMonth(date1, date2) {
                const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000; // Approximate milliseconds in a month
                const diffInMillis = Math.abs(date1.getTime() - date2.getTime());
                return diffInMillis > oneMonthInMillis;
            }

            this.values[settingId] = value

            const inputDate = new Date(value);
            let isOtherDateSet = dateType === DATE_TYPES.START_DATE ? hasEndDate : hasStartDate
            let startDate = dateType === DATE_TYPES.START_DATE ? inputDate :
                hasStartDate ? new Date(startDateValue) : null
            let endDate = dateType === DATE_TYPES.END_DATE ? inputDate :
                hasStartDate ? new Date(endDateValue) : null

            let isPairValid = isOtherDateSet ? isGreaterThanMonth(startDate, endDate) && endDate > startDate : true
            let isEndDateValid = endDate !== null ? endDate <= endSetting.ValidationSettings.LatestEndDate && endDate >= startSetting.ValidationSettings.EarliestStartDate : true
            let isStartDateValid = startDate !== null ? startDate <= endSetting.ValidationSettings.LatestEndDate && startDate >= startSetting.ValidationSettings.EarliestStartDate : true

            this.#ToggleInputsValidity((isPairValid && isStartDateValid), startSetting.SettingId)
            this.#ToggleInputsValidity((isPairValid && isEndDateValid), endSetting.SettingId)

            return isPairValid && isEndDateValid && isStartDateValid;
        }
    }

    #MakePercentValidationFunction = (validationSettings, settingId) => {
        return (value) => {

            const num = Number(value)
            let isValid = (validationSettings.IsRequired ? (value !== null || value !== "") : true
                && (num !== NaN && num >= validationSettings.MinValue && num <= validationSettings.MaxValue));

            let containsNoWhitespace = value != null && value.length > 0 ? /^[^\s]+$/.test(value) : true;
            isValid = isValid && containsNoWhitespace;

            this.values[settingId] = value

            this.#ToggleInputsValidity(isValid, settingId)

            return isValid;
        }
    }

    #MakeRadioOnChangeHandler = (validationSettings, settingId) => {
        return () => {

            const radioSetting = this.SettingParameters.find(e => e.SettingId === settingId)
            const settingToToggle = []
            radioSetting.RadioSettings.ToggleTrue.forEach(i => {
                const ele = document.getElementById(i.toString())
                const isVisible = !ele.classList.contains("d-none")
                if (isVisible) {
                    ele.classList.add("d-none")
                }
                else {
                    ele.classList.remove("d-none")
                }
            })


        }
    }

    #MakeIntegerValidationFunciton = (validationSettings, settingId) => {
        return (value) => {
            {
                const num = Number(value)
                let isValid = (validationSettings.IsRequired ? (value !== null && value !== "") : true)
                    && NaN !== num
                    && (num >= validationSettings.MinValue && num <= validationSettings.MaxValue);

                let containsNoWhitespace = value != null && value.length > 0 ? /^[^\s]+$/.test(value) : true;
                isValid = isValid && containsNoWhitespace;

                this.values[settingId] = value
                this.#ToggleInputsValidity(isValid, settingId)

                return isValid;
            }
        }
    }

    #MakeTickerValidaiton = (validationSettings, settingId) => {
        return (value) => {
            const containsOnlyAlphebetCharacters = /^[a-zA-Z]+$/.test(value);
            const isValid = ((validationSettings.IsRequired ? value !== null : true)
                && (containsOnlyAlphebetCharacters)
                && value.length <= 4);

            this.values[settingId] = value
            this.#ToggleInputsValidity(isValid, settingId)

            return isValid;


        }
    }


}

export { BaseSettings, BaseEndDateSetting, BaseNameSetting, BaseStartDateSetting, BaseStopLossSetting, INPUT_TYPES, DATE_TYPES, SETTING_IDS };