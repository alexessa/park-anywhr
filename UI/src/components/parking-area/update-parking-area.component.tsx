import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import GenericInput from "../../common/ui-elements/generic-input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import { ParkingArea } from "../../models/parking-area";
import { useForm } from "../../common/hooks/form-hook";
import { useHttpClient } from "../../common/hooks/http-hook";

const UpdateParkingArea = () => {
  const parkingId = useParams().parkingId;
  const navigate = useNavigate();
  const [loadedParking, setLoadedParking] = useState<ParkingArea>();
  const { isLoading, error, sendRequest } = useHttpClient();

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
    const fetchParking = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/parking/${parkingId}`
        );
        setLoadedParking(responseData.parking);
        setFormData(
          {
            title: {
              value: (responseData.parking as ParkingArea).title,
              isValid: true,
            },
            description: {
              value: (responseData.parking as ParkingArea).description,
              isValid: true,
            },
            imageUrl: {
              value: (responseData.parking as ParkingArea).imageUrl,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchParking();
  }, [sendRequest, parkingId, setFormData]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parking = {
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
      imageUrl: formState.inputs.imageUrl.value,
    };
    try {
      await sendRequest(
        `http://localhost:5000/api/parking/${parkingId}`,
        "PATCH",
        JSON.stringify(parking),
        { "Content-Type": "application/json" }
      );
      navigate("/");
    } catch (err) {}
  };

  if (!loadedParking) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card>
          <Typography variant="h6">Could not find location</Typography>
        </Card>
      </Box>
    );
  }

  return (
    <>
      {error && <Alert severity="error">{(error as any).message}</Alert>}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 27 }}>
          <CircularProgress />
        </Box>
      )}
      <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
        {!isLoading && loadedParking && (
          <form onSubmit={submitHandler}>
            <GenericInput
              id="title"
              element="input"
              label="Title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid title"
              onInput={inputHandler}
              initValue={formState.inputs.title.value}
              initValid={formState.inputs.title.isValid}
            />
            <GenericInput
              id="description"
              element="textarea"
              label="Description"
              validators={[VALIDATOR_MINLENGTH(10)]}
              errorText="Please enter a valid description of at least 10 characters"
              onInput={inputHandler}
              initValue={formState.inputs.description.value}
              initValid={formState.inputs.description.isValid}
            />
            <GenericInput
              id="imageUrl"
              element="input"
              label="Image URL"
              validators={[VALIDATOR_MINLENGTH(8)]}
              errorText="Please enter a valid image URL of at least 8 characters"
              onInput={inputHandler}
              initValue={formState.inputs.imageUrl.value}
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
    </>
  );
};

export default UpdateParkingArea;
