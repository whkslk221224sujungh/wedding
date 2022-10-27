import React from "react";
import styled from "styled-components";
import { coupleInfo, groomMessage, brideMessage } from "../data/weddingData";

const Section = styled.section`
  padding: var(--space-3xl) 0;
`;

const Container = styled.div`
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: var(--space-2xl);
`;

const SectionTitle = styled.h2`
  font-family: var(--font-serif);
  font-size: var(--text-2xl);
  font-weight: 400;
  letter-spacing: var(--tracking-wider);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-sm);
`;

const SectionDivider = styled.div`
  width: 40px;
  height: 1px;
  background: var(--color-accent);
  margin: 0 auto;
`;

const MessagesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-xl);

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MessageCard = styled.article`
  padding: var(--space-xl);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);

  &:hover {
    border-color: var(--color-border-strong);
    box-shadow: var(--shadow-md);
  }
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
`;

const MessageLabel = styled.span`
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-accent);
`;

const MessageName = styled.span`
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-weight: 400;
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-primary);
`;

const MessageText = styled.p`
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 400;
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin: 0;
  white-space: pre-line;
`;

function InviteMessage() {
  return (
    <Section aria-labelledby="invite-message-title">
      <Container>
        <Header>
          <SectionTitle id="invite-message-title">인사말</SectionTitle>
          <SectionDivider />
        </Header>
        <MessagesGrid>
          <MessageCard>
            <MessageHeader>
              <MessageLabel>신랑</MessageLabel>
              <MessageName>{coupleInfo.groom.name}</MessageName>
            </MessageHeader>
            <MessageText>{groomMessage}</MessageText>
          </MessageCard>
          <MessageCard>
            <MessageHeader>
              <MessageLabel>신부</MessageLabel>
              <MessageName>{coupleInfo.bride.name}</MessageName>
            </MessageHeader>
            <MessageText>{brideMessage}</MessageText>
          </MessageCard>
        </MessagesGrid>
      </Container>
    </Section>
  );
}

export default InviteMessage;
