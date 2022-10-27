import React from 'react';
import styled from 'styled-components';

const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
`;

const ContainerStyles = styled.div`
  height: 5px;
  width: 40;
  border-radius: 50;
  background-color: #e0e0de;
  margin: 50;
  justify-content: center;
`;

const FillerStyles = styled.div`
  height: 5px;
  width: ${(props) => `${props.percent || 75}%`};
  background-color: #5bcf8d;
  border-radius: inherit;
`;

const TextStyles = styled.span`
  padding-bottom: 5px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  background: black;
  display: flex;
  justify-content: center;
`;

const LabelStyles = styled.span`
  padding: 5;
  color: white;
  font-weight: bold;
  font-size: 14px;
`;

const InitialPage = (props) => {
  const { percent } = props;
  return (
    <DarkBackground>
      <ContainerStyles>
        <TextStyles>JUHWAN & SUJUNG</TextStyles>
        <FillerStyles percent={percent}>
          <LabelStyles>{` ${percent}%`}</LabelStyles>
        </FillerStyles>
      </ContainerStyles>
    </DarkBackground>
  );
};

export default InitialPage;
