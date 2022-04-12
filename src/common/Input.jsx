import React from 'react'

export default function Input({name, label, value, error, onChange}) {
  return (
    <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      onChange={onChange}
      name={name}
      value={value}
      id={name}
      placeholder={name}
      type="text"
      className="form-control"
    />
    {error && <div className="alert alert-danger">{error}</div>}
  </div>
  )
}
