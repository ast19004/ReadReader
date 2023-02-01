import { FormControlLabel, Radio } from "@mui/material";

const ThemeRadioControl = (props) => {
  const themeColor = props.value;
  return (
    <FormControlLabel
      value={themeColor}
      control={
        <Radio
          sx={{
            color: themeColor,
            "&.Mui-checked": {
              color: themeColor,
              //   fontSize: "30px",
            },
            "&.css-11zohuh-MuiSvgIcon-root": {
              height: "2em",
              width: "2em",
              left: "-0.7rem",
              right: "-0.7rem",
            },
          }}
        />
      }
    />
  );
};

export default ThemeRadioControl;
