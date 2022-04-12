import React, { useState } from "react";
import Input from "../common/Input";
import Joi from "joi-browser";

export default function LoginForm() {
  const [account, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const [schema] = useState({
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  });

  function validate() {
    const options = { abortEarly: false };
    const { error } = Joi.validate(account, schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errors = validate();
    setErrors(errors);
    if (errors) return;
    else console.log("submitted");
  }

  function validateProperty({ name, value }) {
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, subSchema);
    if (!error) return null;
    return error.details[0].message;
  }

  function handleChange({ currentTarget: input }) {
    const newErrors = errors;
    const errorMessage = validateProperty(input);
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete errors[input.name];
    const newInput = { ...account };
    newInput[input.name] = input.value;
    setForm(newInput);
    setErrors(newErrors);
    console.log(account);
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          value={account.username}
          name="username"
          id="username"
          onChange={handleChange}
          error={errors.username}
          label="Username"
        />

        <Input
          value={account.password}
          name="password"
          id="password"
          onChange={handleChange}
          error={errors.password}
          label="Password"
        />
        <button disabled={validate()} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
