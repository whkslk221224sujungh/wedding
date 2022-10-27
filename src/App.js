import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InitialPage from "./Components/InitialPage";
import HeroAndHeroine from "./Components/HeroAndHeroine";
import InviteMessage from "./Components/InviteMessage";
import Snap from "./Components/Snap";
import WeddingDate from "./Components/WeddingDate";
import Location from "./Components/Location";
import Contacts from "./Components/Contacts";
import Footer from "./Components/Footer";
import TransferringMessage from "./Components/TransferringMessage";
import Snow from "./Components/Snow";
import "./index.css";

const PageWrapper = styled.div`
  min-height: 100vh;
  
  background: var(--color-bg-primary);
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
`;

const Section = styled.section`
  padding: var(--space-3xl) 0;
  opacity: 1;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: var(--color-bg-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.5s ease, visibility 0.5s ease;
  
  &.hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
`;

const LoadingText = styled.div`
  font-family: var(--font-serif);
  font-size: var(--text-3xl);
  font-weight: 300;
  letter-spacing: var(--tracking-wider);
  color: var(--color-text-primary);
  margin-top: var(--space-lg);
`;

const LoadingProgress = styled.div`
  width: 120px;
  height: 2px;
  background: var(--color-border);
  border-radius: 1px;
  margin-top: var(--space-lg);
  overflow: hidden;
`;

const LoadingBar = styled.div`
  height: 100%;
  background: var(--color-accent);
  border-radius: 1px;
  transition: width 0.1s linear;
`;

function App() {
  const [percent, setPercent] = useState(0);
  const [loadingHidden, setLoadingHidden] = useState(false);

  useEffect(() => {
    if (!(percent > 100)) {
      const fn = setInterval(() => {
        const operand =
          100 - percent < 5
            ? 100 - percent || 3
            : Math.floor(Math.random() * 5);
        setPercent(percent + operand);
      }, 20);
      return () => clearInterval(fn);
    } else {
      setTimeout(() => setLoadingHidden(true), 300);
    }
  }, [percent]);

  return (
    <PageWrapper>
      <LoadingOverlay className={loadingHidden ? 'hidden' : ''}>
        <LoadingText>JUHWAN & SUJUNG</LoadingText>
        <LoadingProgress>
          <LoadingBar style={{ width: `${percent}%` }} />
        </LoadingProgress>
      </LoadingOverlay>

      {!loadingHidden ? null : (
        <>
          <MainContent>
            <Snow>
              <HeroAndHeroine />
              <InviteMessage />
              <Snap />
              <WeddingDate />
              <Location />
              <Contacts />
              <TransferringMessage />
              <Footer />
            </Snow>
          </MainContent>
        </>
      )}
    </PageWrapper>
  );
}

export default App;
