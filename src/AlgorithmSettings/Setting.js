import { toBeRequired } from "@testing-library/jest-dom/matchers"
import { Component, useState } from "react";



// class DateSettingF extends Setting {

//     constructor(props) {
//         super(props)
//         this.AdditionalValidationFunctions.push((value) => {

//         })
//     }

//     DatesFurtherThanNumberOfDays(date1, date2, daysApart) {
//         const daysInMillis = daysApart * 24 * 60 * 60 * 1000; // Approximate milliseconds in a month
//         const diffInMillis = Math.abs(date1.getTime() - date2.getTime());
//         return diffInMillis > daysInMillis;
//     }

//     DatesCloserThanNumberOfDays(date1, date2, daysApart) {
//         const daysInMillis = daysApart * 24 * 60 * 60 * 1000; // Approximate milliseconds in a month
//         const diffInMillis = Math.abs(date1.getTime() - date2.getTime());
//         return diffInMillis < daysInMillis;
//     }

//     IsBeforeOtherSetting(validationSettings) {
//         // expected input {
//         //  OtherSettings: setting,
//         //  MaxDaysApart: int,
//         //  MinDaysApart: int
//         //}
//         const IsBeforeOtherSettingValidation = (value) => {
//             if (validationSettings.OtherSetting.IsValid && validationSettings.OtherSetting.HasValue()) {
//                 // if other setting has a valid value compare 
//                 // them and return result
//                 // and then validate the other setting
//                 const inputDate = new Date(value);
//                 const otherDate = new Date(validationSettings.OtherSetting.Value);

//                 if (inputDate >= otherDate) {
//                     return false;
//                 }

//                 if (validationSettings.hasOwnProperty("MinDaysApart") &&
//                     !this.DatesFurtherThanNumberOfDays(inputDate, otherDate, validationSettings.MinDaysApart)) {
//                     return false
//                 }

//                 if (validationSettings.hasOwnProperty("MaxDaysApart") &&
//                     !this.DatesCloserThanNumberOfDays(inputDate, otherDate, validationSettings.MaxDaysApart)) {
//                     return false
//                 }
//             }
//             return true;
//         }
//         this.AdditionalValidationFunctions.push(IsBeforeOtherSettingValidation)
//         return this;

//     }

//     IsAfterOtherSetting(validationSettings) {
//         // expected input {
//         //  OtherSettings: setting,
//         //  MaxDaysApart: int,
//         //  MinDaysApart: int
//         //}
//         const IsAfterOtherSettingValidation = (value) => {
//             if (validationSettings.OtherSetting.IsValid && validationSettings.OtherSetting.HasValue()) {
//                 // if other setting has a valid value compare 
//                 // them and return result
//                 // and then validate the other setting
//                 const inputDate = new Date(value);
//                 const otherDate = new Date(validationSettings.OtherSetting.Value);

//                 if (inputDate <= otherDate) {
//                     return false;
//                 }

//                 if (validationSettings.hasOwnProperty("MinDaysApart") &&
//                     !this.DatesFurtherThanNumberOfDays(inputDate, otherDate, validationSettings.MinDaysApart)) {
//                     return false
//                 }

//                 if (validationSettings.hasOwnProperty("MaxDaysApart") &&
//                     !this.DatesCloserThanNumberOfDays(inputDate, otherDate, validationSettings.MaxDaysApart)) {
//                     return false
//                 }
//             }
//             return true;
//         }
//         this.AdditionalValidationFunctions.push(IsAfterOtherSettingValidation)
//         return this;

//     }

// }

// class IntegerSetting extends Setting {

//     constructor(props) {
//         super(props)
//         this.AdditionalValidationFunctions.push((value) => {
//             return this.IsNumber(value)
//         })
//     }

//     IsNumber(value) {
//         if (isNaN(Number(value))) {
//             // console.log(`isnumber flase`)
//             return false
//         }
//         // console.log(`isnumber true`)
//         return true;
//     }

//     IsBetween(min, max) {
//         const isBetweenValidator = (value) => {
//             const num = Number(value)
//             if (num < min || num > max) {
//                 return false
//             }
//             return true
//         }
//         this.AdditionalValidationFunctions.push(isBetweenValidator)
//         return this;
//     }

//     IsGreaterThanSetting(setting) {
//         const isGreaterThanSettingValidation = (value) => {
//             if (setting.IsValid && setting.HasValue()) {
//                 // if other setting has a valid value compare 
//                 // them and return result
//                 // and then validate the other setting
//                 const num = Number(value)
//                 if (num <= setting.Value) {
//                     return false;
//                 }

//                 // validate other setting
//                 setting.Validate(setting.Value)
//                 return true;
//             }

//             // otherwise return true
//             return true;
//         }
//         this.ValidationFunctions.push(isGreaterThanSettingValidation)
//         return this;
//     }

//     IsLessThanSetting(setting) {
//         const isLessThenSettingValidation = (value) => {
//             if (setting.IsValid && setting.HasValue()) {
//                 // if other setting has a valid value compare 
//                 // them and return result
//                 // and then validate the other setting
//                 const num = Number(value)
//                 if (num >= setting.Value) {
//                     return false;
//                 }
//                 return true;
//             }

//             // otherwise return true
//             return true;
//         }
//         this.AdditionalValidationFunctions.push(isLessThenSettingValidation)
//         return this;
//     }

// }

const INPUT_TYPES = {
    CHECKBOX: 'checkbox',
    DATE: 'date',
    TEXT: 'text'
}

class SettingValidator {

    constructor(isRequired){
        this.ValidationFunctions = [this.#HasValue]
        this.IsRequired = isRequired
    }

    #HasValue(value){
        // console.log(`value has vlaue: ${value}`)
        if (value === null || value === undefined) return false;
    
        value = value.trim()
        if (value === "") return false;
    
        return true;
    }

    Validate(value){
        if (this.IsRequired) {
            if (!this.#HasValue(value)) {
                // console.log(`first false`)
                return false;
            }
    
            for (const valid of this.ValidationFunctions) {
                if (!valid(value)) {
                    return false;
                }
            }
        }
        else {
            if (this.#HasValue(value)) {
                for (const valid of this.ValidationFunctions) {
                    if (!valid(value)) {
                        return false;
                    }
                }
            }
        }
        // console.log(`validate true`)
        return true;
    }
}

class TextSettingValidator extends SettingValidator{
    constructor(isRequired){
        super(isRequired)
    }

    CharacterCountBetween(min, max) {
        const characterCountBetweenValidator = (value) => {
            if (value.length >= min && value.length <= max) {
                return false;
            }
            return true;
        }
        this.ValidationFunctions.push(characterCountBetweenValidator)
        return this
    }

}



// class IntegerSettingProperty extends SettingProperty {

//     constructor(){
//         super()
//     }

//     IsNumber(value) {
//         if (isNaN(Number(value))) {
//             // console.log(`isnumber flase`)
//             return false
//         }
//         // console.log(`isnumber true`)
//         return true;
//     }

//     IsBetween(min, max) {
//         const isBetweenValidator = (value) => {
//             const num = Number(value)
//             if (num < min || num > max) {
//                 return false
//             }
//             return true
//         }
//         this.AdditionalValidationFunctions.push(isBetweenValidator)
//         return this;
//     }

//     IsGreaterThanSetting(setting) {
//         const isGreaterThanSettingValidation = (value) => {
//             if (setting.IsValid && setting.HasValue()) {
//                 // if other setting has a valid value compare 
//                 // them and return result
//                 // and then validate the other setting
//                 const num = Number(value)
//                 if (num <= setting.Value) {
//                     return false;
//                 }

//                 // validate other setting
//                 setting.Validate(setting.Value)
//                 return true;
//             }

//             // otherwise return true
//             return true;
//         }
//         this.ValidationFunctions.push(isGreaterThanSettingValidation)
//         return this;
//     }

//     IsLessThanSetting(setting) {
//         const isLessThenSettingValidation = (value) => {
//             if (setting.IsValid && setting.HasValue()) {
//                 // if other setting has a valid value compare 
//                 // them and return result
//                 // and then validate the other setting
//                 const num = Number(value)
//                 if (num >= setting.Value) {
//                     return false;
//                 }
//                 return true;
//             }

//             // otherwise return true
//             return true;
//         }
//         this.AdditionalValidationFunctions.push(isLessThenSettingValidation)
//         return this;
//     }

// }


/*
new plan
--------

settings state var is a class with functions 

settings is state var in tool component.
Tool component passes SetSettings state funct to child componenet
    child is a functional component (MacdSettings, ect) with state vars for each settings
    custom written functions for each setting to update its a state var for that setting (maybe not needed)? and parent settings var
it displays child setting component 
    isValid is a state var controlled by parent component passed as a prop to child
    isHidden is a state var controlled by parent component passed as a prop to child



have a SettingValidationCreator that can has functons to add validatons, and 1 function to return a validation function



*/


function BuyAndHoldStrategySettings(){

    const [BacktestNameIsValid, SetBacktestNameIsValid] = useState(true)
    let BacktestNameValue = null
    const BacktNameValidator = new TextSettingValidator(true).CharacterCountBetween(3,20)

    const [StartDateIsValid, SetStarDateIsValid] = useState(true)
    let StartDateValue = null

    const [EndDateIsValid, SetEndDateIsValid] = useState(true)
    let EndDateValue = null

    const [TickerIsValid, SetTickerIsValid] = useState(true)
    let TickerValue = null

    const UpdateBacktestName = (value) => {
        BacktestNameValue = value
        SetBacktestNameIsValid(BacktNameValidator.Validate(value))
    }

    const UpdateStartDate = (value) => {

    }

    const UpdateEndDate = (value) => {

    }

    const UpdateTicker = (value) => {

    }

    return (
        <>
            <TextSetting SetValue={UpdateBacktestName}  IsValid={BacktestNameIsValid} IsRequired={true} IsHidden={false} DisplayName="Backtest Name" PlaceHolderValue="My backtest" />
        </>
    )


}

function TextSetting(props) {


    const InputType = "text" 

    const EventHanlder = (value) => {
        props.SetValue(value)
    }

    const inputGroupClasses = props.IsHidden ? "input-group mb-3 d-none setting" : "input-group mb-3 setting";
    console.log("rendering text setting")
    return (
        <div className={inputGroupClasses} key={crypto.randomUUID()}>
            <div className="input-group">
                <div className="input-group-text">{props.IsRequired ? props.DisplayName + "*" : props.DisplayName}</div>
                <input type={InputType}
                    className={props.IsValid ? "form-control" : "form-control apply-shake is-invalid"}
                    placeholder={props.PlaceHolderValue !== null ? props.PlaceHolderValue.toString() : null}
                    onBlur={(e) => EventHanlder(e.target.value)}
                />
            </div>
        </div>
    )
}

function DateSetting(){

}



export default BuyAndHoldStrategySettings









/*
------- PLAN FUTURE -------
Two use modes for tool
premade trading strategries (alpha version)
build you own (beta)

Build queries using data structure like

// need to figure out how to join buy and sell clauses with logical && or || operators
const betaSettings = {
    'tickers': [],
    'buyConditions': [
        {
            'subject': {
                'type': 'indicators(sma, ema, rsi, macd, macd signal) || price(close, open)',
                // specific subject params ex macd
                'short_ema': 5,
                'long_ema': 10,
                'signal_period': 6
            },
            'condition': 'above || below || between',
            'context': { // options for this will be conditonal on subject
                'type': 'indicators(sma, ema, rsi, macd, macd signal) || price(close, open) || integer',
                // specific subject params ex macd
                'short_ema': 5,
                'long_ema': 10,
                'signal_period': 6
            },

        }
    ],
    'sell': [  
        {
            'subject': '',
            'condition': '',
            'context': ''
        }
        // ... more conditions
    ]

}


*/



