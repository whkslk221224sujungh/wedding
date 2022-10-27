import React from "react";
import styled from "styled-components";
import { getDisplayContacts } from "../data/weddingData";
import { getContactHref } from "../utils/masking";
import { MASKED_MODE } from "../data/weddingData";

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

const ContactsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ContactCard = styled.article`
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
`;

const ContactHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--color-border);
`;

const ContactLabel = styled.span`
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-accent);
`;

const ContactName = styled.span`
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-weight: 400;
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-primary);
`;

const ContactActions = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--space-md);
`;

const ActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-full);
  background: ${(props) => props.$disabled ? 'var(--color-bg-secondary)' : 'var(--color-bg-card)'};
  color: ${(props) => props.$disabled ? 'var(--color-text-muted)' : 'var(--color-text-primary)'};
  cursor: ${(props) => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${(props) => props.$disabled ? 0.6 : 1};
  pointer-events: ${(props) => props.$disabled ? 'none' : 'auto'};
  transition: all var(--transition-fast);

  &:hover:not([pointer-events="none"]) {
    border-color: var(--color-accent);
    color: var(--color-accent);
    background: var(--color-bg-secondary);
    transform: scale(1.05);
  }

  &:active:not([pointer-events="none"]) {
    transform: scale(0.95);
  }
`;

const ActionIcon = styled.img`
  width: 22px;
  height: 22px;
  object-fit: contain;
  opacity: ${(props) => props.$disabled ? 0.5 : 1};
`;

const MaskedNotice = styled.span`
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-align: center;
  padding-top: var(--space-xs);
  display: block;
  width: 100%;
`;

const ParentsSection = styled.div`
  margin-top: var(--space-xl);
`;

const ParentsTitle = styled.h3`
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin: 0 0 var(--space-lg);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--color-border);
`;

const ParentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
`;

const ParentItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
  padding: var(--space-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
`;

const ParentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
`;

const ParentRelation = styled.span`
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-text-muted);
`;

const ParentName = styled.span`
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-text-primary);
`;

const ParentActions = styled.div`
  display: flex;
  gap: var(--space-sm);
  flex-shrink: 0;
`;

const ParentActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-full);
  background: ${(props) => props.$disabled ? 'var(--color-bg-card)' : 'var(--color-bg-secondary)'};
  color: ${(props) => props.$disabled ? 'var(--color-text-muted)' : 'var(--color-text-secondary)'};
  cursor: ${(props) => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${(props) => props.$disabled ? 0.5 : 1};
  pointer-events: ${(props) => props.$disabled ? 'none' : 'auto'};
  transition: all var(--transition-fast);

  &:hover:not([pointer-events="none"]) {
    border-color: var(--color-accent);
    color: var(--color-accent);
    background: var(--color-bg-card);
  }
`;

const ParentActionIcon = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
  opacity: ${(props) => props.$disabled ? 0.5 : 1};
`;

function ContactCardComponent({ relation, name, phone, maskedPhone }) {
  const telHref = getContactHref('tel', phone, MASKED_MODE);
  const smsHref = getContactHref('sms', phone, MASKED_MODE);
  const isDisabled = MASKED_MODE;

  return (
    <ContactCard>
      <ContactHeader>
        <ContactLabel>{relation}</ContactLabel>
        <ContactName>{name}</ContactName>
      </ContactHeader>
      <ContactActions>
        <ActionButton
          href={telHref}
          $disabled={isDisabled}
          aria-label={isDisabled ? `전화 걸기 (마스킹 모드: ${maskedPhone})` : `전화 걸기: ${phone}`}
          onClick={(e) => isDisabled && e.preventDefault()}
        >
          <ActionIcon src="call.png" alt="" $disabled={isDisabled} />
        </ActionButton>
        <ActionButton
          href={smsHref}
          $disabled={isDisabled}
          aria-label={isDisabled ? `문자 보내기 (마스킹 모드: ${maskedPhone})` : `문자 보내기: ${phone}`}
          onClick={(e) => isDisabled && e.preventDefault()}
        >
          <ActionIcon src="message.png" alt="" $disabled={isDisabled} />
        </ActionButton>
      </ContactActions>
      {isDisabled && (
        <MaskedNotice>개인정보 보호 모드</MaskedNotice>
      )}
    </ContactCard>
  );
}

function ParentsSectionComponent({ title, parents }) {
  return (
    <ParentsSection>
      <ParentsTitle>{title}</ParentsTitle>
      <ParentsList>
        {parents.map((parent, idx) => (
          <ParentItem key={idx}>
            <ParentInfo>
              <ParentRelation>{parent.relation}</ParentRelation>
              <ParentName>{parent.name}</ParentName>
            </ParentInfo>
            <ParentActions>
              <ParentActionButton
                href={getContactHref('tel', parent.phone, MASKED_MODE)}
                $disabled={MASKED_MODE}
                aria-label={MASKED_MODE ? `전화 걸기 (마스킹 모드: ${parent.phoneMasked})` : `전화 걸기: ${parent.phone}`}
                onClick={(e) => MASKED_MODE && e.preventDefault()}
              >
                <ParentActionIcon src="call.png" alt="" $disabled={MASKED_MODE} />
              </ParentActionButton>
              <ParentActionButton
                href={getContactHref('sms', parent.phone, MASKED_MODE)}
                $disabled={MASKED_MODE}
                aria-label={MASKED_MODE ? `문자 보내기 (마스킹 모드: ${parent.phoneMasked})` : `문자 보내기: ${parent.phone}`}
                onClick={(e) => MASKED_MODE && e.preventDefault()}
              >
                <ParentActionIcon src="message.png" alt="" $disabled={MASKED_MODE} />
              </ParentActionButton>
            </ParentActions>
          </ParentItem>
        ))}
      </ParentsList>
    </ParentsSection>
  );
}

function Contacts() {
  const contacts = getDisplayContacts();

  return (
    <Section aria-labelledby="contacts-title">
      <Container>
        <Header>
          <SectionTitle id="contacts-title">연락처</SectionTitle>
          <SectionDivider />
        </Header>
        <ContactsGrid>
          <ContactCardComponent
            relation="신랑"
            name={contacts.groom.name}
            phone={contacts.groom.phone}
            maskedPhone={contacts.groom.phoneMasked}
          />
          <ContactCardComponent
            relation="신부"
            name={contacts.bride.name}
            phone={contacts.bride.phone}
            maskedPhone={contacts.bride.phoneMasked}
          />
        </ContactsGrid>
        <ParentsSectionComponent
          title="신랑측 혼주"
          parents={contacts.groomParents}
        />
        <ParentsSectionComponent
          title="신부측 혼주"
          parents={contacts.brideParents}
        />
      </Container>
    </Section>
  );
}

export default Contacts;
