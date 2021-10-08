import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    imgPath:
      "https://firebasestorage.googleapis.com/v0/b/efootball-e37a5.appspot.com/o/carousel%2Fcarousel_4.png?alt=media&token=d2c926a9-de0e-4ed9-922f-99552c0e3260",
  },
  {
    imgPath:
      "https://firebasestorage.googleapis.com/v0/b/efootball-e37a5.appspot.com/o/carousel%2Fcarousel_3.png?alt=media&token=07872e4d-82bc-41f7-b558-bc0460dfc554",
  },
  {
    imgPath:
      "https://firebasestorage.googleapis.com/v0/b/efootball-e37a5.appspot.com/o/carousel%2Fcarousel_2.png?alt=media&token=31126d25-2ce4-44a8-8bd3-f6fbc270ad31",
  },
  {
    imgPath:
      // "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
      "https://firebasestorage.googleapis.com/v0/b/efootball-e37a5.appspot.com/o/carousel%2Fcarousel_1.jpg?alt=media&token=cf4bcad5-a7a3-4822-a895-2b628ef7f579",
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        width: 1300,
        maxWidth: "100%",
        flexGrow: 1,
        mx: "auto",
        padding: "0rem",
        marginTop: "66px",
      }}
    >
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 0,
          pl: 2,
          bgcolor: "background.default",
        }}
      ></Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={Math.random()}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 422,
                  display: "block",
                  // maxWidth: "100%",
                  overflow: "hidden",
                  // width: "100%",
                  mx: "auto",
                  mt: 2,
                }}
                src={step.imgPath}
                alt={"images"}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        style={{ backgroundColor: "#f5f5f5" }}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default SwipeableTextMobileStepper;
