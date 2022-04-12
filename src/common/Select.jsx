import React from 'react'

export default function Select({name, onChange, label, options, error, ...rest}) {
  return (
    <div className='form-group'>
        <label htmlFor="{name}">{label}</label>
        <select onChange={onChange} name={name} id={name} className="form-control">
            <option value=""/>
            {options.map(option =>(
                    <option key={option._id} value={option._id}>
                        {option.name}
                    </option>
            ))}
        </select>
        {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  )
}
