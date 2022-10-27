import React from 'react';
import styled from 'styled-components';

const DarkBackground = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-primary);
  z-index: 9999;
`;

const ContainerStyles = styled.div`
  width: 120px;
  height: 2px;
  background: var(--color-border);
  border-radius: 1px;
  overflow: hidden;
  margin-top: var(--space-lg);
`;

const FillerStyles = styled.div`
  height: 100%;
  width: ${(props) => `${props.percent || 0}%`};
  background: var(--color-accent);
  border-radius: inherit;
  transition: width 0.1s linear;
`;

const TextStyles = styled.span`
  font-family: var(--font-serif);
  font-size: var(--text-3xl);
  font-weight: 300;
  letter-spacing: var(--tracking-wider);
  color: var(--color-text-primary);
`;

const LabelStyles = styled.span`
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-muted);
  margin-top: var(--space-sm);
  text-transform: uppercase;
`;

const InitialPage = (props) => {
  const { percent } = props;
  return (
    <DarkBackground>
      <TextStyles>JUHWAN & SUJUNG</TextStyles>
      <ContainerStyles>
        <FillerStyles percent={percent} />
      </ContainerStyles>
      <LabelStyles>{`${percent}%`}</LabelStyles>
    </DarkBackground>
  );
};

export default InitialPage;
