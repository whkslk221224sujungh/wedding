import React from "react";
import styled, { keyframes } from "styled-components";
import { coupleInfo } from "../data/weddingData";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  height: 70vh;
  min-height: 450px;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: var(--space-3xl);
  overflow: hidden;
  border-radius: 0 0 var(--radius-xl) var(--radius-xl);
`;

const HeroImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: ${fadeIn} 1s ease-out forwards;
  z-index: 0;
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(to top, var(--color-bg-primary) 0%, transparent 100%);
  z-index: 1;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 0 var(--container-padding);
  text-align: center;
  box-sizing: border-box;
`;

const NamesWrapper = styled.div`
  animation: ${slideUp} 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
  opacity: 0;
`;

const GroomBrideNames = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: var(--space-md);
  flex-wrap: wrap;
`;

const Name = styled.span`
  font-family: var(--font-serif);
  font-size: clamp(var(--text-3xl), 8vw, var(--text-5xl));
  font-weight: 300;
  letter-spacing: var(--tracking-wider);
  color: var(--color-text-primary);
  line-height: var(--leading-tight);
`;

const Ampersand = styled.span`
  font-family: var(--font-serif);
  font-size: clamp(var(--text-2xl), 6vw, var(--text-4xl));
  font-weight: 300;
  font-style: italic;
  color: var(--color-accent);
  letter-spacing: var(--tracking-wide);
`;

const InfoWrapper = styled.div`
  animation: ${slideUp} 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards;
  opacity: 0;
  margin-top: var(--space-lg);
`;

const DateText = styled.p`
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  font-weight: 400;
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0;
`;

const VenueText = styled.p`
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 400;
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
  margin: var(--space-xs) 0 0;
`;

function HeroAndHeroine() {
  return (
    <HeroSection aria-label="메인 히어로 섹션">
      <HeroImage src="snap/06.jpg" alt="신랑 신부 웨딩 사진" />
      <GradientOverlay />
      <ContentWrapper>
        <NamesWrapper>
          <GroomBrideNames>
            <Name>{coupleInfo.groom.name}</Name>
            <Ampersand>&</Ampersand>
            <Name>{coupleInfo.bride.name}</Name>
          </GroomBrideNames>
        </NamesWrapper>
        <InfoWrapper>
          <DateText>
            {coupleInfo.weddingTime} · {coupleInfo.weddingDate.replace(/-/g, '. ')}.
          </DateText>
          <VenueText>{coupleInfo.venue}</VenueText>
        </InfoWrapper>
      </ContentWrapper>
    </HeroSection>
  );
}

export default HeroAndHeroine;
