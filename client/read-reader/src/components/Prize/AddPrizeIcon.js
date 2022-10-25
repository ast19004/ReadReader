import PrizesIcon from "@mui/icons-material/EmojiEvents";

import styled from "styled-components";

const AddPrizeIcon = (props) => {
  const fontSize = props.fontSize ? props.fontSize : "xsmall";

  return (
    <IconWrapper>
      <IconAddSymbol>
        <b>+</b>
      </IconAddSymbol>
      <PrizesIcon fontSize={fontSize} />
    </IconWrapper>
  );
};

export default AddPrizeIcon;

const IconWrapper = styled.span`
  display: flex;
`;

const IconAddSymbol = styled.span`
  font-size: 13px;
  margin-right: -3px;
`;
