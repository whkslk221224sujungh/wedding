import React from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: var(--space-3xl) 0;
  background: var(--color-bg-secondary);
  margin: 0 calc(-1 * var(--container-padding));
  max-width: none;
`;

const Container = styled.div`
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  text-align: center;
`;

const Title = styled.h2`
  font-family: var(--font-serif);
  font-size: var(--text-2xl);
  font-weight: 400;
  letter-spacing: var(--tracking-wider);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-sm);
`;

const Divider = styled.div`
  width: 40px;
  height: 1px;
  background: var(--color-accent);
  margin: 0 auto var(--space-md);
`;

const Subtitle = styled.p`
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-xl);
  line-height: var(--leading-relaxed);
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  align-items: center;
`;

const AccountButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  width: 100%;
  max-width: 320px;
  padding: var(--space-lg) var(--space-xl);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-secondary);
  color: var(--color-text-muted);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 500;
  cursor: not-allowed;
  transition: all var(--transition-fast);
  opacity: 0.6;
`;

const ButtonIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  opacity: 0.5;
`;

const DisabledNotice = styled.p`
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin: var(--space-md) 0 0;
`;

function TransferringMessage() {
  return (
    <Section aria-labelledby="account-title">
      <Container>
        <Title id="account-title">마음 전하기</Title>
        <Divider />
        <Subtitle>축복해주신 모든 분들께 진심으로 감사드립니다.</Subtitle>
        <ButtonsWrapper>
          <AccountButton disabled type="button">
            <ButtonIcon src="tuxedo.png" alt="" />
            신랑측 계좌번호 (마감)
          </AccountButton>
          <AccountButton disabled type="button">
            <ButtonIcon src="weddingDress.png" alt="" />
            신부측 계좌번호 (마감)
          </AccountButton>
        </ButtonsWrapper>
        <DisabledNotice>계좌 안내는 마감되었습니다.</DisabledNotice>
      </Container>
    </Section>
  );
}

export default TransferringMessage;
