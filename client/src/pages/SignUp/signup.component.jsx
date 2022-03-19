import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import CustomTextField from "../../components/form/customTextField.component";

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

function Signup() {
  const [formFields, setFormField] = React.useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [ship, setShip] = React.useState(ships[6]);

  const handleChange = (field) => (event) => {
    setFormField({ ...formFields, [field]: event.target.value });
  };
  return (
    // form wrapper
    <Container maxWidth="sm">
      {/* form */}
      <Box sx={{ border: "2px solid red", padding: "2rem" }} component="form">
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
        <button type="submit">Submit</button>
      </Box>
    </Container>
  );
}

export default Signup;
