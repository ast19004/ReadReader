import { FormControl, RadioGroup, Typography } from "@mui/material";

import ThemeRadioControl from "./ThemeRadioControl";

const ThemeSelection = (props) => {
  return (
    <FormControl id="themeColor-label">
      <Typography align="center" variant="h6" component="span" color="#FFC354">
        Select theme color
      </Typography>
      <RadioGroup
        aria-labelledby="themeColor-label"
        defaultValue="#FFC354"
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
