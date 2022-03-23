import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import CustomTextField from "../../components/form/customTextField.component";
import { fetchPOST } from "../../utiles/fetchAPI/postAPI";

const ships = [
  "bergamini",
  "fasan",
  "margottini",
  "carabiniere",
  "alpino",
  "rizzo",
  "martinengo",
  "marceglia",
];

const FIELDS = {
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

function Signup() {
  const [formFields, setFormField] = React.useState(FIELDS);
  const [ship, setShip] = React.useState(ships[6]);
  const [isLoading, setIsLoading] = React.useState(false);

  const resetFormFields = () => {
    setFormField(FIELDS);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    resetFormFields();
    const response = await fetchPOST("/users", {
      ...formFields,
      ship,
      role: "user",
    });
    if (response) {
      setIsLoading(false);
    }
  };

  const handleChange = (field) => (event) => {
    setFormField({ ...formFields, [field]: event.target.value });
  };
  return (
    // form wrapper
    <Container maxWidth="sm">
      {/* form */}
      <form
        onSubmit={handleSubmit}
        style={{ border: "2px solid red", padding: "2rem" }}
      >
        <Typography
          sx={{ mb: 2 }}
          fontWeight="bold"
          color="primary"
          element="h3"
          variant="h5"
        >
          Registrati
        </Typography>
        {/* Username */}
        <CustomTextField
          handleChange={handleChange("username")}
          fieldName="username"
          type="text"
          value={formFields.username}
        />
        {/* Email */}
        <CustomTextField
          handleChange={handleChange("email")}
          fieldName="email"
          type="email"
          value={formFields.email}
        />
        {/* Password */}
        <CustomTextField
          handleChange={handleChange("password")}
          fieldName="password"
          type="password"
          value={formFields.password}
        />
        {/* PasswordConfirm */}
        <CustomTextField
          handleChange={handleChange("passwordConfirm")}
          fieldName="passwordConfirm"
          type="password"
          label="Conferma Password"
          value={formFields.passwordConfirm}
        />
        <TextField
          sx={{ mb: 2 }}
          select
          value={ship}
          onChange={(e) => setShip(e.target.value)}
          label="Seleziona la nave"
          id="ship"
          fullWidth
        >
          {ships.map((ship) => (
            <MenuItem key={ship} value={ship}>
              {`Nave ${ship.toUpperCase()}`}
            </MenuItem>
          ))}
        </TextField>
        <LoadingButton
          loading={isLoading}
          loadingIndicator="Attendi..."
          variant="contained"
          endIcon={<SendIcon />}
          type="submit"
        >
          Registrati
        </LoadingButton>
      </form>
    </Container>
  );
}

export default Signup;
