import { FormEvent } from "react";
import GenericInput from "../../common/ui-elements/generic-input";
import { Box, Button, Typography } from "@mui/material";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import { useForm } from "../../common/hooks/form-hook";

const CreateParkingArea = () => {
  const [ formState, inputHandler ] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      imageUrl: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <Box p={4}>
      <Typography variant="h6">Create Parking Area</Typography>
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <form onSubmit={handleFormSubmit}>
          <GenericInput
            id="title"
            element="input"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid parking area title."
            onInput={inputHandler}
          />
          <GenericInput
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Please enter a valid description of at least 8 characters."
            onInput={inputHandler}
          />
          <GenericInput
            id="address"
            element="input"
            label="Address"
            validators={[VALIDATOR_MINLENGTH(10)]}
            errorText="Please enter a valid address of at least 10 characters."
            onInput={inputHandler}
          />
          <GenericInput
            id="imageUrl"
            element="input"
            label="Image URL"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Please enter a valid image URL of at least 8 characters."
            onInput={inputHandler}
          />
          <Button
            type="submit"
            disabled={!formState.isValid}
            variant="outlined"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default CreateParkingArea;
