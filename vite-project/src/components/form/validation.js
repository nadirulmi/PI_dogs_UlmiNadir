const validation = (dogsForm, selectedTemperaments) => {
  const errors = {};

  if (dogsForm.name.length < 3 || dogsForm.name.length > 18) {
    errors.name =
      "The name must contain more than 3 letters and up to 18 letters";
  } else if (!/^[A-Za-z]+$/.test(dogsForm.name)) {
    errors.name = "The name can only contain letters";
  }

  if (!/^[1-9]\d?$/.test(dogsForm.min_weight) || dogsForm.min_weight > 60) {
    errors.min_weight =
      "The minimum weight of the breed of dog must be between 1 to 60";
  }
  
  if (!/^\d{1,2}$/.test(dogsForm.max_weight) || dogsForm.max_weight < 1 || dogsForm.max_weight > 100) {
    errors.max_weight =
    "The maximum weight of the breed of dog must be between 2 to 100";
  }

  if (dogsForm.min_height < 15 || dogsForm.min_height > 70 || !/^\d+$/.test(dogsForm.min_height)) {
    errors.min_height =
      "The minimum height of the breed of dog must be between 15 to 70";
  }

  if (dogsForm.max_height < 20 || dogsForm.max_height > 110 || !/^\d+$/.test(dogsForm.max_height)) {
    errors.max_height =
      "The maximum height of the breed of dog must be between 20 to 110";
  }

  if (parseInt(dogsForm.min_weight) >= parseInt(dogsForm.max_weight)) {
    errors.min_weight = "Minimum weight should be less than maximum weight";
  }

  if (dogsForm.min_height >= dogsForm.max_height) {
    errors.min_height = "Minimum height should be less than maximum height";
  }

  

  if (dogsForm.life_span < 1 || dogsForm.life_span > 32 || !/^\d+$/.test(dogsForm.life_span)) {
    errors.life_span = "Life span should be between 1 and 32 years";
  }

  if (!/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
    dogsForm.image
  )) {
    errors.image = "Only URL image";
  }

  if (selectedTemperaments.length === 0 || selectedTemperaments.length > 5) {
    errors.temperaments = "You must select between 1 to 5 temperaments";
  }

  return errors;
};

export default validation;
