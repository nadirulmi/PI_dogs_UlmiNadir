const validation = (dogsForm, selectedTemperaments) => {
  const errors = {};

  if (dogsForm.name.length < 3 || dogsForm.name.length > 18) {
    errors.name =
      "The name must contain more than 3 letters and up to 18 letters";
  } else if (!/^[A-Za-z]+$/.test(dogsForm.name)) {
    errors.name = "The name can only contain letters";
  }

  if (dogsForm.min_weight < 1 || dogsForm.min_weight > 60) {
    errors.min_weight =
      "The minimum weight of the breed of dog must be between 0 to 60";
  } else if (!/^\d+$/.test(dogsForm.min_weight)) {
    errors.min_weight = "The minimum weight can only contain numbers";
  }

  if (dogsForm.max_weight < 1 || dogsForm.max_weight > 100) {
    errors.max_weight =
      "The maximus weight of the breed of dog must be between 1 to 100";
  } else if (!/^\d+$/.test(dogsForm.max_weight)) {
    errors.max_weight = "The maximus weight can only contain numbers";
  }

  if (dogsForm.min_height < 15 || dogsForm.min_height > 70) {
    errors.min_height =
      "The minimum height of the breed of dog must be between 15 to 70";
  } else if (!/^\d+$/.test(dogsForm.min_height)) {
    errors.min_height = "The minimum height can only contain numbers";
  }

  if (dogsForm.max_height < 20 || dogsForm.max_height > 110) {
    errors.max_height =
      "The maximus height of the breed of dog must be between 15 to 110";
  } else if (!/^\d+$/.test(dogsForm.max_height)) {
    errors.max_height = "The maximus height can only contain numbers";
  }

  if(dogsForm.life_span < 1 || dogsForm.life_span > 32){
    errors.life_span = "Life span should be between 1 and 32 years"
  }else if (!/^\d+$/.test(dogsForm.life_span)) {
    errors.life_span = "Life span can only contain numbers";
  }

  if (
    !/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
      dogsForm.image
    )
  ) {
    errors.image = "Only URL image";
  }
  if (selectedTemperaments.length === 0) {
    errors.temperaments = " You must select between 1 to 5 temperaments";
  }

  return errors;
};

export default validation;
