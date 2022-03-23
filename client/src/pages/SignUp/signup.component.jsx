import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

import CustomTextField from "../../components/form/customTextField.component";

const SHIPS = [
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
  const [ship, setShip] = React.useState(SHIPS[6]);
  const url = `${process.env.BASE_URL}/api/v1/users`;

  const handleChange = (field) => (event) => {
    setFormField({ ...formFields, [field]: event.target.value });
  };

  const handleSubmit = (e) => {
    console.log(url);
    e.preventDefault();
    const requestBodyObj = { ...formFields, ship };
    console.log(requestBodyObj);
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBodyObj),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    // form wrapper
    <Container maxWidth="sm">
      {/* form */}
      <form
        style={{ border: "2px solid red", padding: "2rem" }}
        onSubmit={handleSubmit}
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
          helperText="Il campo username può contenere solo lettere minuscole e numeri, senza spazi"
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
          {SHIPS.map((ship) => (
            <MenuItem key={ship} value={ship}>
              {`Nave ${ship.toUpperCase()}`}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" endIcon={<SendIcon />} type="submit">
          Registrati
        </Button>
      </form>
    </Container>
  );
}

export default Signup;
