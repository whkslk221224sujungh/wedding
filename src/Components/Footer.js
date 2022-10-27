import React from "react";
import styled from "styled-components";

const FooterSection = styled.footer`
  padding: var(--space-3xl) 0 var(--space-2xl);
  text-align: center;
  border-top: 1px solid var(--color-border);
  margin-top: var(--space-2xl);
`;

const Container = styled.div`
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
`;

const Credit = styled.p`
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin: 0 0 var(--space-xs);
  line-height: var(--leading-relaxed);
`;

const MadeBy = styled.p`
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin: 0;
  opacity: 0.7;
`;

function Footer() {
  return (
    <FooterSection role="contentinfo">
      <Container>
        <Credit>JUHWAN & SUJUNG</Credit>
        <MadeBy>Made with love</MadeBy>
      </Container>
    </FooterSection>
  );
}

export default Footer;
