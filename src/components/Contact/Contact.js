import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import './Contact.css'

const BANNED_CHARACTERS = ["<", ">", "&", ";", ":"]

function BannedCharactersPresent(value) {

    if (value === null) return false;

    let result = false
    BANNED_CHARACTERS.forEach((char) => {
        if (value.includes(char)) result = true
    })
    return result;
}

function Contact() {

    const [reuturnEmail, SetReturnEmail] = useState(null)
    const [emailContent, SetEmailContent] = useState(null)
    const [emailSubject, SetEmailSubject] = useState("bug")

    const ValidEmail = (email) => {

        if (email === null) return true;

        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const ValidContent = (content) => {
        if (content === null) return true;

        if (content === "" || BannedCharactersPresent(content)) return false;
        else return true
    };

    function ValidEmailSubject(value) {

        const NAME_MAX_VALUE = 30
        const isValid = (value !== null && value.trim() !== "") && !BannedCharactersPresent(value) && value.length < NAME_MAX_VALUE

        return isValid;

    }

    function UpdateEmailSubject(ele) {
        if (ele.type === "radio" && ele.value !== "other") SetEmailSubject(ele.value)
        else {
            let text = document.getElementById("subject-text-input").value
            SetEmailSubject(text)
        }
    }

    function SubmitContactRequest() {
        if (emailContent === null || emailSubject === null){
            SetEmailContent("")
            SetReturnEmail("")
            return
        }
        else {
            console.log("Submitting email contact")
        }

    }


    return (
        <>
            <div className="container-fluid background-image position-absolute top-0 start-0 mt-5"></div>
            <div className="container-fluid content-over-background  row align-items-center justify-content-center">
                <div className="col-8 col-xl-4 bg-white bg-opacity-75 rounded me-xl-5 mt-4 mt-lg-0">
                    <div className="display-4 mb-2 ">Contact the Developer</div>
                    <div className="fw-light fs-5">I would be happy to hear about any bugs you find, features ideas, questions, or any general thoughts and ideas you may have regarding the site.</div>
                </div>
                <div className="col-8 col-xl-6 bg-body-secondary shadow-lg p-3 rounded mt-4 mt-lg-0">
                    <form>
                        <div className="row mb-3">
                            <label className=" col-md-2 col-form-label">Your Email</label>
                            <div className="col-md-10">
                                <input type="email" className={ValidEmail(reuturnEmail) ? "form-control" : "form-control is-invalid apply-shake"} id="inputEmail" onBlur={(e) => SetReturnEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-md-2 col-form-label">Message</label>
                            <div className="col-md-10">
                                <div className="input-group">
                                    <textarea className={ValidContent(emailContent) ? "form-control MaxHeight" : " MaxHeight form-control is-invalid apply-shake"} aria-label="With textarea" onBlur={(e) => SetEmailContent(e.target.value)}></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="inputPassword3" className="col-md-2 col-form-label">Subject</label>

                            <div className="col-md-10">
                                <fieldset id="email-subject" onChange={(e) => UpdateEmailSubject(e.target)}>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gridRadios" id="bugRadio" value="bug" defaultChecked />
                                        <label className="form-check-label" htmlFor="bugRadio">
                                            Report Bug
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gridRadios" id="featureRadio" value="feature" />
                                        <label className="form-check-label" htmlFor="featureRadio">
                                            Feature Request
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="gridRadios" id="otherRadio" value="other" />
                                        <label className="form-check-label" htmlFor="otherRadio">
                                            <input type="text" id="subject-text-input" className={ValidEmailSubject(emailSubject) ? "form-control" : "form-control is-invalid apply-shake"}
                                             defaultValue="Other" disabled={emailSubject === "bug" || emailSubject === "feature"} />
                                        </label>
                                    </div>
                                </fieldset>
                            </div>
                        </div>

                        <button type="button" onClick={(e) => SubmitContactRequest()} disabled={!(ValidContent(emailContent) && ValidEmail(reuturnEmail) && ValidEmailSubject(emailSubject))}
                         className="btn btn-primary">Submit</button>
                    </form>
                </div>

            </div>
        </>
    );

}

export default Contact;