/* eslint-disable no-undef */
import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import axios from "axios";

import CustomTextField from "../../components/form/customTextField.component";
import { fetchPOST } from "../../utils/fetchAPI/postAPI";
import { userAtom, tokenAtom, roleAtom } from "../../atom";

const FIELDS = {
  email: "",
  password: "",
};

function Login() {
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const role = useAtom(roleAtom)[0];
  const navigate = useNavigate();
  const [formFields, setFormField] = React.useState(FIELDS);
  const [isLoading, setIsLoading] = React.useState(false);

  const resetFormFields = () => {
    setFormField(FIELDS);
  };

  useEffect(() => {
    if (role !== "guest") navigate("/");
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    resetFormFields();
    const response = await fetchPOST("/auth/login", {
      ...formFields,
    });
    if (response) {
      setIsLoading(false);
      // eslint-disable-next-line no-alert
      const message = `Ti sei loggato come ${response.user.name}`;
      await setToken(response.token);
      await setUser(response.user);
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
          Login
        </Typography>
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

        <LoadingButton
          loading={isLoading}
          loadingIndicator="Attendi..."
          variant="contained"
          endIcon={<SendIcon />}
          type="submit"
        >
          Autenticati
        </LoadingButton>
      </form>
    </Container>
  );
}

export default Login;
