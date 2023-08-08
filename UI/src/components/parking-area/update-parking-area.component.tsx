import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";

import GenericInput from "../../common/ui-elements/generic-input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import { ParkingArea } from "../../models/parking-area";
import { useForm } from "../../common/hooks/form-hook";
import useHttpClient from "../../common/hooks/http-hook";

const UpdateParkingArea = () => {
  const parkingId = useParams().parkingId;
  const { apiResponse, get } = useHttpClient<ParkingArea>();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
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

  useEffect(() => {
    const customHeaders = {
      "Content-Type": "application/json",
    };

    get(`http://localhost:5000/api/parking/${parkingId}`, customHeaders);
  }, []);

  useEffect(() => {
    if (apiResponse.data) {
      setFormData(
        {
          title: {
            value: ((apiResponse.data as any).parking as ParkingArea).title,
            isValid: true,
          },
          description: {
            value: ((apiResponse.data as any).parking as ParkingArea)
              .description,
            isValid: true,
          },
          imageUrl: {
            value: ((apiResponse.data as any).parking as ParkingArea).imageUrl,
            isValid: true,
          },
        },
        true
      );
    }
  }, [setFormData, apiResponse.data]);

  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      {apiResponse.data && (
        <form>
          <GenericInput
            id="title"
            element="input"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            onInput={inputHandler}
            initValue={((apiResponse.data as any).parking as ParkingArea).title}
            initValid={formState.inputs.description.isValid}
          />
          <GenericInput
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(10)]}
            errorText="Please enter a valid description of at least 10 characters"
            onInput={inputHandler}
            initValue={
              ((apiResponse.data as any).parking as ParkingArea).description
            }
            initValid={formState.inputs.description.isValid}
          />
          <GenericInput
            id="imageUrl"
            element="input"
            label="Image URL"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Please enter a valid image URL of at least 8 characters"
            onInput={inputHandler}
            initValue={
              ((apiResponse.data as any).parking as ParkingArea).imageUrl
            }
            initValid={formState.inputs.imageUrl.isValid}
          />
          <Button
            type="submit"
            size="small"
            variant="outlined"
            disabled={!formState.isValid}
          >
            Update Parking Area
          </Button>
        </form>
      )}
    </Box>
  );
};

export default UpdateParkingArea;
