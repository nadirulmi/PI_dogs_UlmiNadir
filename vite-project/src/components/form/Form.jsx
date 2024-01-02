import Swal from 'sweetalert2';
import dogs from "../img/dogs.jpg"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getTemperaments } from "../../redux/actions/actions";
import validation from "./validation";
import { useNavigate } from "react-router-dom";
import style from "./Form.module.css";

export const Form = () => {
  const navigate = useNavigate();
  const tempers = useSelector((state) => state.Alltemperaments);
  const initialDogsForm = {
    name: "",
    min_weight: "",
    max_weight: "",
    min_height: "",
    max_height: "",
    life_span: "",
    temperaments: [],
    image: "",
  };

  const dispatch = useDispatch();
  const [dogsForm, setDogsForm] = useState(initialDogsForm);
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getTemperaments());
    if (
      dogsForm.name !== "" ||
      dogsForm.max_weight !== "" ||
      dogsForm.min_height !== "" 
    ) {
      const userValidated = validation(dogsForm, selectedTemperaments);
      setErrors(userValidated);
    }
  }, [dogsForm, selectedTemperaments]);

  const handleForm = (event) => {
    const { name, value } = event.target;
    setDogsForm({
      ...dogsForm,
      [name]: value,
    });
  };

  const handleTemperaments = (event) => {
    const selectedTemperament = event.target.value;

    if (selectedTemperaments.length >= 5) return;

    if (!selectedTemperaments.includes(selectedTemperament)) {
      setSelectedTemperaments([...selectedTemperaments, selectedTemperament]);
    }
  };

  const handleRemoveTemperament = (selectedTemperament) => {
    setSelectedTemperaments(
      selectedTemperaments.filter((temp) => temp !== selectedTemperament)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const combinedData = {
      weight: `${dogsForm.min_weight} - ${dogsForm.max_weight}`,
      height: `${dogsForm.min_height} - ${dogsForm.max_height}`,
      life_span: dogsForm.life_span,
      name: dogsForm.name,
      temperaments: selectedTemperaments,
      image: dogsForm.image,
    };
    dispatch(createDog(combinedData));
    Swal.fire({
      text: "Dog created successfully!",
      icon: "success",
      confirmButtonColor: '#9C6630',
    });
   
    navigate("https://pidogsulminadir-production.up.railway.app/dogs");
  };

  const handleReset = () => {
    setDogsForm(initialDogsForm);
    setSelectedTemperaments([]);
  };

  return (
    <div className={style.small}>
      <h1>Create your Dog</h1>
      <div className={style.container}>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div className={style.form}>
            <div className={style.name}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                value={dogsForm.name}
                id="name"
                name="name"
                onChange={handleForm}
              />
              {errors.name && (
                <p style={{ color: "rgb(171, 4, 4)" }} className="error">
                  {errors.name}
                </p>
              )}
            </div>

            <div className={style.min_weight}>
              <label htmlFor="min_weight">Min weight:</label>
              <input
                type="text"
                value={dogsForm.min_weight}
                id="min_weight"
                name="min_weight"
                onChange={handleForm}
              />
              {errors.min_weight && (
                <p style={{ color: "rgb(171, 4, 4)" }} className="error">
                  {errors.min_weight}
                </p>
              )}
            </div>

            <div className={style.max_weight}>
              <label htmlFor="max_weight">Max weight:</label>
              <input
                type="text"
                value={dogsForm.max_weight}
                id="max_weight"
                name="max_weight"
                onChange={handleForm}
              />
              {errors.max_weight && (
                <p style={{ color: "rgb(171, 4, 4)" }} className="error">
                  {errors.max_weight}
                </p>
              )}
            </div>

            <div className={style.min_height}>
              <label htmlFor="min_height">Min height:</label>
              <input
                type="text"
                value={dogsForm.min_height}
                id="min_height"
                name="min_height"
                onChange={handleForm}
              />
              {errors.min_height && (
                <p style={{ color: "rgb(171, 4, 4)" }} className="error">
                  {errors.min_height}
                </p>
              )}
            </div>
          </div>

          <div className={style.form}>
            <div className={style.max_height}>
              <label htmlFor="max_height">Max height:</label>
              <input
                type="text"
                value={dogsForm.max_height}
                id="max_height"
                name="max_height"
                onChange={handleForm}
              />
              {errors.max_height && (
                <p style={{ color: "rgb(171, 4, 4)" }} className="error">
                  {errors.max_height}
                </p>
              )}
            </div>

            <div className={style.life_span}>
              <label htmlFor="life_span">Life span:</label>
              <input
                type="text"
                value={dogsForm.life_span}
                id="life_span"
                name="life_span"
                min="1"
                max="32"
                onChange={handleForm}
              />
              <p style={{ color: "rgb(171, 4, 4)" }} className="error">
                {errors.life_span}
              </p>
            </div>

            <div>
              <label htmlFor="image">Add your URL image:</label>
              <input
                type="url"
                value={dogsForm.image}
                id="image"
                name="image"
                onChange={handleForm}
              />
              {errors.image && (
                <p style={{ color: "rgb(171, 4, 4)" }} className="error">
                  {errors.image}
                </p>
              )}
            </div>

            <div className={style.formSelect}>
              <label htmlFor="temperaments">Add temperaments:</label>
              <select name="temperaments" onChange={handleTemperaments}>
                <option value="">Select temperaments</option>
                {tempers?.map((temp, index) => (
                  <option key={index} value={temp.temperament}>
                    {temp.temperament}
                  </option>
                ))}
              </select>
              {errors.temperaments && (
                <p style={{ color: "rgb(171, 4, 4)" }} className="error">
                  {errors.temperaments}
                </p>
              )}
            </div>
          </div>
          <div className={style.buttons}>
              {selectedTemperaments.map((selectedTemp, index) => (
                <div key={index}>
                  {selectedTemp}
                  <button
                    type="button"
                    onClick={() => handleRemoveTemperament(selectedTemp)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          <div className={style.bottom}>
            <input
              type="submit"
              value="Create"
              disabled={
                !dogsForm.name ||
                !dogsForm.min_weight ||
                !dogsForm.max_weight ||
                !dogsForm.min_height ||
                !dogsForm.max_height ||
                !dogsForm.life_span ||
                !dogsForm.image ||
                !dogsForm.temperaments ||
                errors.name ||
                errors.min_weight ||
                errors.max_weight ||
                errors.min_height ||
                errors.max_height ||
                errors.image ||
                errors.temperaments ||
                errors.life_span
              }
            />
            <input type="reset" value="Reset" />
          </div>
        </form>
        <div style={{marginLeft: "90px"}}>
        <img src={dogs}></img>
        </div>
      </div>
    </div>
  );
};
