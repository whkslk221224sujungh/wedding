import React from 'react';
import styled from 'styled-components';

const Outer = styled.div`
  padding-top: 50px;
`;

const Template = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${(props) => props.top || '15px'};
  padding-left: 20px;
  padding-right: 20px;
`;

const Span = styled.span`
  white-space: pre-wrap;
  font-family: '나눔고딕', 'Noto Serif KR', serif;
  font-size: ${(props) => props.fontSize || '16px'};
  font-weight: ${(props) => props.weight || 520};
`;

function InviteMessage() {
  return (
    <Outer
      data-aos="fade-up"
      data-aos-duration="1500"
      data-aos-easing="ease-out"
    >
      <Template>
        <Span>2011년 선후배라는 이름으로 만나</Span>
      </Template>
      <Template>
        <Span>2014년 재미있는 연애를 시작하고</Span>
      </Template>
      <Template>
        <Span>2022년 설레는 연애를 시작하려 합니다.</Span>
      </Template>
      <Template>
        <Span>저희 두 사람의 새로운 시작, 함께 축복해 주시면</Span>
      </Template>
      <Template>
        <Span>감사하겠습니다.</Span>
      </Template>
      <div
        data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-easing="ease-out"
      >
        <Template top="50px">
          <Span weight="bold">
            김동구 · 신태자 <Span fontSize="14px">의 아들</Span> 주환
          </Span>
        </Template>
        <Template>
          <Span weight="bold">
            한중희 · 김현회
            <Span fontSize="14px">{` 의  딸  `}</Span>
            {' 수정'}
          </Span>
        </Template>
      </div>
    </Outer>
  );
}

export default InviteMessage;
