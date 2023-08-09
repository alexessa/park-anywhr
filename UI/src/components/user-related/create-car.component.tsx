import { FormEvent, useContext } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import GenericInput from "../../common/ui-elements/generic-input";
import { VALIDATOR_REQUIRE } from "../../util/validators";
import { AuthContext } from "../../common/context/authentication-context";
import { useForm } from "../../common/hooks/form-hook";
import { useHttpClient } from "../../common/hooks/http-hook";

const CreateCar = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      number_plate: {
        value: "",
        isValid: false,
      },
      brand: {
        value: "",
        isValid: false,
      },
      model: {
        value: "",
        isValid: false,
      },
      colour: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/user/cars/${auth.user.email}`,
        "POST",
        JSON.stringify({
          number_plate: formState.inputs.number_plate.value.trim(),
          brand: formState.inputs.brand.value,
          model: formState.inputs.model.value,
          colour: formState.inputs.colour.value,
        }),
        { "Content-Type": "application/json" }
      );
      navigate("/profile");
    } catch (err) {}
  };

  return (
    <>
      {error && <Alert severity="error">{(error as any).message}</Alert>}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 27 }}>
          <CircularProgress />
        </Box>
      )}
      <Box p={4}>
        <Typography variant="h6">Create Car</Typography>
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <form onSubmit={handleFormSubmit}>
            <GenericInput
              id="number_plate"
              element="input"
              label="Number Plate"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your car's number plate."
              onInput={inputHandler}
            />
            <GenericInput
              id="brand"
              element="input"
              label="Car Brand"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please your car's brand name."
              onInput={inputHandler}
            />
            <GenericInput
              id="model"
              element="input"
              label="Car Model"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your car's model name."
              onInput={inputHandler}
            />
            <GenericInput
              id="colour"
              element="input"
              label="Car Colour"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your car's color."
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
    </>
  );
};

export default CreateCar;
