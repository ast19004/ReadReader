import Switch from "@mui/material/Switch";

import styled from "styled-components";

const DataSwitch = styled(Switch)(({ theme }) => ({
  width: 140,
  height: 45,
  padding: 9,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(60px)",
      "& .MuiSwitch-thumb:before": {
        content: '"Prizes"',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#001e3c",
    width: 50,
    height: 32,
    padding: "5px 10px",
    "&:before": {
      content: '"History"',
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 24 / 2,
  },
}));

export default DataSwitch;
