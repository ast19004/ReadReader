import { Button } from "@mui/material";

import styles from "./CustomButton.module.css";

const CustomButton = (props) => {
  const classes = props.className
    ? styles.customButton + props.className
    : styles.customButton;
  const variant = props.variant ? props.variant : "contained";

  return (
    <Button
      className={classes}
      href={props.href}
      onClick={props.onClick}
      variant={variant}
      type={props.type}
      sx={props.sx}
    >
      {props.children}
    </Button>
  );
};

export default CustomButton;
