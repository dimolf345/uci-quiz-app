/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function CustomTextField(props) {
  const { type, value, handleChange, fieldName, ...otherProps } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const passwordOptions = ["password", "text"];
  const capitalizeFirstLetter = (field) => {
    const char0 = field.charAt(0).toUpperCase();
    return char0 + field.substr(1);
  };
  const name = capitalizeFirstLetter(fieldName);
  let dynamicType =
    type !== "password" ? type : passwordOptions[Number(showPassword)];

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        type={dynamicType}
        onChange={handleChange}
        required
        variant="outlined"
        fullWidth
        label={props.label ? props.label : name}
        value={value}
        {...otherProps}
      />
      {type === "password" && (
        <FormGroup>
          <FormControlLabel
            onChange={() => setShowPassword(!showPassword)}
            control={<Checkbox checked={showPassword} />}
            label="Mostra campo"
          />
        </FormGroup>
      )}
    </Box>
  );
}

export default CustomTextField;
