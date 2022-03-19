import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutLinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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
  const [showPassword, setShowPassword] = React.useState(false);
  const [fields, setField] = React.useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    ship: "martinengo",
  });
  const handleChange = (field) => (event) => {
    setField({ ...fields, [field]: event.target.value });
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
        <FormControl sx={{ mb: 2 }} fullWidth variant="outline">
          <InputLabel sx={{ mx: 1 }} htmlFor="username">
            Username
          </InputLabel>
          <OutLinedInput
            aria-label="username"
            type="text"
            onChange={handleChange("username")}
            id="username"
            value={fields.username}
          />
        </FormControl>
        {/* Email */}
        <FormControl sx={{ mb: 2 }} fullWidth variant="outline">
          <InputLabel sx={{ mx: 1 }} htmlFor="email">
            Email
          </InputLabel>
          <OutLinedInput
            aria-label="email"
            type="email"
            onChange={handleChange("email")}
            id="email"
            value={fields.email}
          />
        </FormControl>
        {/* Ship */}
        <TextField
          sx={{ mb: 2 }}
          select
          value={fields.ship}
          onChange={handleChange("ship")}
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
        <FormControl sx={{ mb: 2 }} fullWidth variant="outline">
          <InputLabel sx={{ mx: 1 }} htmlFor="password">
            Password
          </InputLabel>
          <OutLinedInput
            aria-label="password"
            type={showPassword ? "text" : "password"}
            onChange={handleChange("password")}
            id="password"
            value={fields.password}
          />
        </FormControl>
        <FormControl sx={{ mb: 2 }} fullWidth variant="outline">
          <InputLabel sx={{ mx: 1 }} htmlFor="confirmPassword">
            Conferma Password
          </InputLabel>
          <OutLinedInput
            aria-label="passwordConfirm"
            type={showPassword ? "text" : "password"}
            onChange={handleChange("passwordConfirm")}
            id="passwordConfirm"
            value={fields.passwordConfirm}
          />
        </FormControl>
        <FormGroup>
          <FormControlLabel
            onChange={() => setShowPassword(!showPassword)}
            control={<Checkbox checked={showPassword} />}
            label="Mostra Password"
          />
        </FormGroup>
      </Box>
    </Container>
  );
}

export default Signup;
