/* eslint-disable no-undef */
import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import CustomTextField from "../../components/form/customTextField.component";
import { fetchPOST } from "../../utils/fetchAPI/postAPI";
import FormDialog from "../../components/form/formDialog.component";

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

const FIELDS = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

function Signup() {
  const [formFields, setFormField] = useState(FIELDS);
  const [myShip, setMyShip] = useState(SHIPS[6]);
  const [isLoading, setIsLoading] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  console.log(adminPassword);

  const resetFormFields = () => {
    setFormField(FIELDS);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    resetFormFields();
    const response = await fetchPOST("/users", {
      ...formFields,
      ship: myShip,
      adminPassword,
    });
    if (response) {
      setIsLoading(false);
      // eslint-disable-next-line no-alert
      alert(response.message);
    }
  };

  const handleChange = (field) => (event) => {
    setFormField({ ...formFields, [field]: event.target.value });
  };
  return (
    // form wrapper
    <Container maxWidth="sm">
      {/* form */}
      <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
        <Typography
          sx={{ mb: 2 }}
          fontWeight="bold"
          color="primary"
          element="h3"
          variant="h5"
        >
          Registrati
        </Typography>
        {/* Name */}
        <CustomTextField
          handleChange={handleChange("name")}
          fieldName="Nome e Cognome"
          value={formFields.name}
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
        {/* Select Dropdown for ship */}
        <TextField
          sx={{ mb: 2 }}
          select
          value={myShip}
          onChange={(e) => setMyShip(e.target.value)}
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
        <FormDialog
          fieldValue={adminPassword}
          setFieldValue={setAdminPassword}
        />
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
