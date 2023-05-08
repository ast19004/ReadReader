import { FormControlLabel, Radio } from "@mui/material";

const ThemeRadioControl = (props) => {
  const themeColor = props.value;
  return (
    <FormControlLabel
      value={themeColor}
      control={
        <Radio
          onChange={props.onChange}
          sx={{
            color: themeColor,
            "&.Mui-checked": {
              color: themeColor,
            },
            "&.Mui-checked .css-11zohuh-MuiSvgIcon-root": {
              height: "2em",
              width: "2em",
              left: "-0.7rem",
              top: "-0.7rem",
            },
            "&.css-j204z7-MuiFormControlLabel-root": {
              marginLeft: "0",
              marginRight: "0",
            },
          }}
        />
      }
    />
  );
};

export default ThemeRadioControl;
