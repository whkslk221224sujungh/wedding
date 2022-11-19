import React from "react";
import styled from "styled-components";

const Div = styled.div`
  padding-top: ${(props) => props.top || "200px"};
  display: flex;
  font-family: "NanumSquareRoundR";
  justify-content: center;
  font-size: ${(props) => props.size || "1rem"};
  font-weight: ${(props) => props.weight && props.weight};
`;

const Button = styled.button`
  outline: none;
  border: none;
  border-radius: 4px;
  padding-left: 1rem;
  padding-right: 1rem;
  background: #e1dddd;
  height: 40px;
  width: 200px;
`;

function TransferringMessage({
  onClickBrideAccount,
  onClickBridegroomAccount,
}) {
  return (
    <>
      <Div size="20px" weight="bold">
        신랑 & 신부에게 마음 전하기
      </Div>
      <Div top="10px" size="18px">
        축복의 의미로 축의금을 전달해보세요.
      </Div>
      <Div top="20px" size="15px">
        <Button onClick={onClickBridegroomAccount}>
          <img src="/wedding/tuxedo.png" alt="tuxedo" height={"30px"} />
          &nbsp; 신랑측 계좌번호
        </Button>
      </Div>
      <Div top="10px" size="15px">
        <Button onClick={onClickBrideAccount}>
          <img
            src="/wedding/weddingDress.png"
            alt="weddingDress"
            height={"30px"}
          />
          신부측 계좌번호
        </Button>
      </Div>
    </>
  );
}

export default TransferringMessage;
