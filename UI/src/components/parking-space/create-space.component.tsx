import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import GenericInput from "../../common/ui-elements/generic-input";
import { VALIDATOR_REQUIRE } from "../../util/validators";
import { ParkingArea } from "../../models/parking-area";
import { useHttpClient } from "../../common/hooks/http-hook";
import { useForm } from "../../common/hooks/form-hook";
import { ArrowBack } from "@mui/icons-material";

const CreateParkingSpace = () => {
  const parkingId = useParams().parkingId;
  const navigate = useNavigate();
  const [loadedParking, setLoadedParking] = useState<ParkingArea>();
  const { isLoading, error, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      totalParkingSpaces: {
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
      } catch (err) {}
    };
    fetchParking();
  }, [sendRequest, parkingId]);

  const handleSpaceFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/parking/space/${parkingId}`,
        "POST",
        JSON.stringify({
          title: loadedParking!.title,
          location: loadedParking!.location,
          totalParkingSpaces: formState.inputs.totalParkingSpaces.value,
        }),
        { "Content-Type": "application/json" }
      );
      navigate(`/parking/space/${parkingId}`);
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
        <Typography variant="h6">Create Parking Spaces</Typography>
        <Box
          sx={{
            textAlign: "center",
            p: 4,
          }}
        >
          {loadedParking && (
            <Box>
              <Typography variant="h6">{loadedParking.title}</Typography>
              <Typography variant="subtitle1">
                {loadedParking.address}
              </Typography>
              <form onSubmit={handleSpaceFormSubmit}>
                <GenericInput
                  id="totalParkingSpaces"
                  element="input"
                  label="Number of Parking Spaces"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid number of parking spaces."
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
          )}
        </Box>
        <Link to={`/parking/space/${parkingId}`}>
          <Button variant="outlined" sx={{ color: "#4db6ac" }}>
            <ArrowBack /> Back
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default CreateParkingSpace;
