import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(50px);
  }
  to {
    transform: translateY(10px);
  }
`;

const ImageBlock = styled.img`
  width: 100%;
  animation-name: ${fadeIn};
  animation-duration: 1.25s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
`;

const TextBlock = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${(props) => props.top || "10px"};
  padding-left: 20px;
  padding-right: 20px;
  animation-name: ${slideUp};
  animation-duration: 1.25s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
`;

const Pair = styled.div`
  padding-right: ${(props) => props.isLeft && "14%"};
  padding-left: ${(props) => !props.isLeft && "14%"};
`;
const Span = styled.span`
  font-weight: 520;
  font-size: ${(props) => props.fontSize || "18px"};
  font-weight: ${(props) => props.weight && props.weight};
`;

function HeroAndHeroine() {
  return (
    <>
      <ImageBlock src="snap/06.jpg" />
      <TextBlock top = "60px">
        <Pair isLeft>
          <Span weight='bold'>김주환</Span>
        </Pair>
        <Pair>
          <Span weight='bold'>한수정</Span>
        </Pair>
      </TextBlock>
      <TextBlock top="40px">
        <Span fontSize="17px">2022년 12월24일 토요일 낮 12시</Span>
      </TextBlock>
      <TextBlock top="10px">
        <Span fontSize="17px">JW 메리어트 호텔 서울 5층 그랜드 볼룸</Span>
      </TextBlock>
    </>
  );
}

export default HeroAndHeroine;
