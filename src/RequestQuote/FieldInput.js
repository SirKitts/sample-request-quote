import React from 'react';

import './quote.css';

const FieldInput = ({
  value, input, onChange, onBlur, error
}) => {
  return (
    <div className="row">
      <div className="request-label">
        <label htmlFor="lname">{input.label}</label>
      </div>
      <div className="request-field">
        <input
          type={input.type}
          id={input.id}
          name={input.name}
          placeholder={input.placeholder}
          value={value}
          onChange={e => onChange(e)}
          onBlur={onBlur}
        />
      </div>
      {error ? (<div style={{ fontSize: 12, color: "red"}}>{error}</div>) : null}
    </div>
  )
}

export default FieldInput;
