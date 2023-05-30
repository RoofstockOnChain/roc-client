import { FC, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';

export const Mint: FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const mint = () => {
    // TODO: Mint the token
  };

  return (
    <Stack spacing={2}>
      <Stepper activeStep={activeStep}>
        <Step>
          <StepLabel>Recipient Address</StepLabel>
        </Step>
        <Step>
          <StepLabel>Property Information</StepLabel>
        </Step>
        <Step>
          <StepLabel>Images</StepLabel>
        </Step>
        <Step>
          <StepLabel>Documents</StepLabel>
        </Step>
        <Step>
          <StepLabel>Preview</StepLabel>
        </Step>
      </Stepper>
      {activeStep === 0 && (
        <RecipientAddressStep onNext={() => setActiveStep(1)} />
      )}
      {activeStep === 1 && (
        <PropertyInformationStep onNext={() => setActiveStep(2)} />
      )}
      {activeStep === 2 && <ImagesStep onNext={() => setActiveStep(3)} />}
      {activeStep === 3 && <DocumentsStep onNext={() => setActiveStep(4)} />}
      {activeStep === 4 && <PreviewStep onMint={mint} />}
    </Stack>
  );
};

interface RecipientAddressStepProps {
  onNext: () => void;
}

const RecipientAddressStep: FC<RecipientAddressStepProps> = ({ onNext }) => {
  return (
    <>
      <TextField label="To" variant="outlined" size="small" />
      <Button variant="outlined" onClick={onNext}>
        Next
      </Button>
    </>
  );
};

interface PropertyInformationStepProps {
  onNext: () => void;
}

const PropertyInformationStep: FC<PropertyInformationStepProps> = ({
  onNext,
}) => {
  return (
    <>
      <TextField
        label="Description"
        variant="outlined"
        size="small"
        multiline={true}
        rows={3}
      />
      <TextField label="Address" variant="outlined" size="small" />
      <TextField label="City" variant="outlined" size="small" />
      <TextField label="State" variant="outlined" size="small" />
      <TextField label="Zip" variant="outlined" size="small" />
      <FormControl>
        <FormLabel>Property Type</FormLabel>
        <RadioGroup row>
          <FormControlLabel value="House" control={<Radio />} label="House" />
          <FormControlLabel
            value="Apartment"
            control={<Radio />}
            label="Apartment"
          />
        </RadioGroup>
      </FormControl>
      <TextField label="Bedrooms" variant="outlined" size="small" />
      <TextField label="Bathrooms" variant="outlined" size="small" />
      <TextField label="Year Built" variant="outlined" size="small" />
      <TextField label="Home Size (Sq Ft)" variant="outlined" size="small" />
      <TextField label="Lot Size (Sq Ft)" variant="outlined" size="small" />
      <TextField label="Market" variant="outlined" size="small" />
      <Button variant="outlined" onClick={onNext}>
        Next
      </Button>
    </>
  );
};

interface ImagesStepProps {
  onNext: () => void;
}

const ImagesStep: FC<ImagesStepProps> = ({ onNext }) => {
  return (
    <>
      <Button variant="outlined" onClick={onNext}>
        Next
      </Button>
    </>
  );
};

interface DocumentsStepProps {
  onNext: () => void;
}

const DocumentsStep: FC<DocumentsStepProps> = ({ onNext }) => {
  return (
    <>
      <Button variant="outlined" onClick={onNext}>
        Next
      </Button>
    </>
  );
};

interface PreviewStepProps {
  onMint: () => void;
}

const PreviewStep: FC<PreviewStepProps> = ({ onMint }) => {
  return (
    <>
      <Button variant="outlined" onClick={onMint}>
        Mint
      </Button>
    </>
  );
};
