/*
* Simple Request a Quote form with:
*   blank field validation only
*   reusable FieldInput component
*   device responsive
*
* Author: Jose Quitain
*/

import React from 'react';

import FieldInput from './FieldInput.js';
import './quote.css';

const PrivacyPolicy = () => (
  <div className="row">
    <div className="request-label">&nbsp;</div>
    <div className="request-field">
      <div className="policy">The information collected will be used in accordance with our &nbsp;<a href="/" className="hfPrivacy">privacy policy</a>.</div>
    </div>
  </div>
)

const RequestQuote = () => {
  const [companyName, setCompanyName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [error, setError] = React.useState({ company: '', phone: '' })
  const [submitDisabled, setSubmitDisabled] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)

  // set changes
  const onChangeCompanyName = (e) => {
    setCompanyName(e.target.value)
  }

  const onChangePhone = (e) => {
    setPhone(e.target.value)
  }

  // do some validations
  const isCompanyNameValid = () => {
    return !( !companyName || !companyName.trim() || companyName.length === 0 );
  }

  const validateCompanyName = () => {
    setError({ company: '', phone: error.phone })
    if(!isCompanyNameValid()) {
      setError({ company: 'Company name is required.', phone: error.phone })
    }
    submitEnable()
  }

  const isPhoneValid = () => {
    return !( !phone || isNaN(phone) || phone.length < 10 || phone.length > 11 );
  }

  const validatePhone = () => {
    setError({ company: error.company, phone: '' })
    if(!isPhoneValid()) {
      setError({ company: error.company, phone: 'Phone is required. It should be numeric (10 to 11 in length).' })
    }
    submitEnable()
  }

  // enable/disable button
  const submitEnable = () => {
    if(!isCompanyNameValid() || !isPhoneValid()) {
      setSubmitDisabled(true)
    }
  }

  // submit payload
  const onSubmit = (e) => {
    e.preventDefault()
    if (isCompanyNameValid() && isPhoneValid()) {
      setSubmitted(true)
      const payload = {
        company: companyName,
        phone: phone
      }
      console.log('payload', payload)
    }
  }

  return (
    <div className="request-container">
      <form className="request-form" onSubmit={onSubmit}>
        <div className="request-quote">{submitted ? 'Thank you!' : 'Request a quote'}</div>
        {!submitted ? (
        <>
          <FieldInput
            value={companyName}
            input={{
              type:"text",
              label:"Company Name",
              id:"company",
              name:"company",
              placeholder:"company name"
            }}
            onChange={onChangeCompanyName}
            onBlur={validateCompanyName}
            error={error.company}
          />
          <FieldInput
            value={phone}
            input={{
              type:"text",
              label:"Phone Number",
              id:"phone",
              name:"phone",
              placeholder:"phone number"
            }}
            onChange={onChangePhone}
            onBlur={validatePhone}
            error={error.phone}
          />
        </>
        ) : null }
        <PrivacyPolicy />
        {!submitted ? (
        <>
          <div className="row">
            <div className="request-label">&nbsp;</div>
            <div className="request-field">
              <input type="submit" value="Request a quote" readOnly={submitDisabled} />
            </div>
          </div>
        </>
        ) : null}
      </form>
    </div>
  );
};

export default RequestQuote;
