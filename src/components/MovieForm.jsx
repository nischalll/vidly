import React, { useState, useEffect } from "react";
import Input from "../common/Input";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from '../services/fakeMovieService';
import Select from '../common/Select';

export default function MovieForm({ match, history }) {
  const [account, setForm] = useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  });
  const [genres] = useState(getGenres);
  const [errors, setErrors] = useState({});

  const [schema] = useState({
    _id:Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().label("Genre"),
    numberInStock: Joi.number().min(0).max(100).required().label("Number in Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
  });

  useEffect(()=>{
    const movieId =match.params.id;
    if(movieId==="new") return;

    const movie =getMovie(movieId);
    if(!movie) return history.replace("/not-found");

    setForm(mapToViewModel(movie));
  },[]);

  function mapToViewModel(movie){
    return {
      _id:movie._id,
      title:movie.title,
      genreId:movie.genre._id,
      numberInStock:movie.numberInStock,
      dailyRentalRate:movie.dailyRentalRate
    };
  }

  function validate() {
    const options = { abortEarly: false };
    const { error } = Joi.validate(account, schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  }

  function handleSubmit(e){
    e.preventDefault();

    const errors = validate();
    setErrors(errors);
    if (errors) return;
    else doSubmit();
  }

  function doSubmit(){
    saveMovie(account);
    history.push("/movies");
  };

  function validateProperty({ name, value }) {
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, subSchema);
    if (!error) return null;
    return error.details[0].message;
  }

  function handleChange({ currentTarget: input }) {
    console.log("handle change called");
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
      <h1>MovieForm {match.params.id}</h1>
      <form onSubmit={handleSubmit}>
        <Input
          value={account.title}
          name="title"
          id="title"
          onChange={handleChange}
          error={errors.title}
          label="Title"
        />

        {/* <Input
          value={account.genreId}
          name="genreId"
          id="genreId"
          onChange={handleChange}
          error={errors.genreId}
          label="genreId"
        /> */}

        <Select
          name="genreId"
          value={account.genreId}
          id="genreId"
          onChange={handleChange}
          error={errors.genreId}
          label="Genre"
          options={genres}
        />
        <Input
          value={account.numberInStock}
          name="numberInStock"
          id="numberInStock"
          onChange={handleChange}
          error={errors.numberInStock}
          label="Number In Stock"
        />

        <Input
          value={account.dailyRentalRate}
          name="dailyRentalRate"
          id="rate"
          onChange={handleChange}
          error={errors.rate}
          label="rate"
        />
        {console.log(validate())}
        <button disabled={validate()} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
