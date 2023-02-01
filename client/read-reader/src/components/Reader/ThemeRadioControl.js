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
            "&.css-11zohuh-MuiSvgIcon-root": {
              height: "2em !important",
              width: "2em !important",
              left: "-0.7rem !important",
              right: "-0.7rem !important",
            },
          }}
        />
      }
    />
  );
};

export default ThemeRadioControl;
