import { FormControl, RadioGroup, Typography } from "@mui/material";

import ThemeRadioControl from "./ThemeRadioControl";

const ThemeSelection = (props) => {
  const defaultValue = props.value;

  return (
    <FormControl id="themeColor-label" value={defaultValue}>
      <Typography
        align="center"
        variant="h6"
        component="span"
        color={defaultValue}
      >
        Select theme color
      </Typography>
      <RadioGroup
        aria-labelledby="themeColor-label"
        value={`${props.value}`}
        name="theme_color"
        onChange={props.onChange}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          justifyContent: "space-around",
        }}
      >
        <ThemeRadioControl value="#FFC354" />
        <ThemeRadioControl value="#F05624" />
        <ThemeRadioControl value="#49C5B6" />
        <ThemeRadioControl value="#2779A7" />
        <ThemeRadioControl value="#F6B8D1" />
      </RadioGroup>
    </FormControl>
  );
};

export default ThemeSelection;
