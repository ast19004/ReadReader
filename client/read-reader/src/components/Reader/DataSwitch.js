import Switch from "@mui/material/Switch";

import styled from "styled-components";

const DataSwitch = styled(Switch)(({ theme }) => ({
  width: 140,
  height: 45,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    // transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(70px)",
      "& .MuiSwitch-thumb:before": {
        content: '"Prizes"',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        "&:before": {
          content: '"History"',
          color: "white",
          width: "50%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
    },
  },
  "& .MuiSwitch-thumb": {
    borderRadius: "0",
    backgroundColor: "#001e3c",
    width: 50,
    height: 33,
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
    // borderRadius: 24 / 2,
    borderRadius: "0",
    "&:before": {
      content: '"Prizes"',
      color: "white",
      width: "90%",
      height: "100%",
      display: "flex",
      justifyContent: "end",
      alignItems: "center",
    },
  },
}));

export default DataSwitch;
