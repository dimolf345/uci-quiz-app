/* eslint-disable react/jsx-props-no-spreading */
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import PropTypes from "prop-types";

const marks = [
  {
    value: 10,
    label: "10",
  },
  {
    value: 30,
    label: "30",
  },
];

function CustomSlider({ value, setValue, label, ...otherProps }) {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Box
      sx={{
        minWidth: 200,
        width: "80%",
        maxWidth: 350,
        margin: "3rem auto",
      }}
    >
      <Slider
        value={value}
        aria-label={label}
        onChange={handleChange}
        min={10}
        valueLabelDisplay="auto"
        max={30}
        step={5}
        color="primary"
        marks={marks}
        {...otherProps}
      />
    </Box>
  );
}

CustomSlider.propTypes = {
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default CustomSlider;
