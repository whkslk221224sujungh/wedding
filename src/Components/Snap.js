import React, { useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { galleryImages } from "../data/weddingData";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const GridItem = styled.div`
  position: relative;
  aspect-ratio: 3 / 4;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-border);
  cursor: pointer;

  /* 첫 번째와 마지막이 2칸 차지 */
  &:first-child,
  &:last-child {
    grid-column: span 2;
    aspect-ratio: 4 / 3;
  }
`;

const GridImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);

  ${GridItem}:hover & {
    transform: scale(1.03);
  }
`;

// Lightbox
const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: ${fadeIn} 0.3s ease;
`;

const LightboxImage = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  animation: ${zoomIn} 0.3s cubic-bezier(0.22, 1, 0.36, 1);
`;

const LightboxClose = styled.button`
  position: absolute;
  top: var(--space-xl);
  right: var(--space-xl);
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const LightboxNav = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 56px;
  height: 56px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  ${(props) => props.$prev ? 'left: var(--space-lg);' : 'right: var(--space-lg);'}
`;

const LightboxCounter = styled.div`
  position: absolute;
  bottom: var(--space-xl);
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.7);
`;

// 첫 번째(0), 다섯 번째(4) 넓은 이미지를 맨 앞과 맨 뒤로 배치
const displayImages = (() => {
  const wideIndices = [0, 4]; // 1번째, 5번째 이미지
  const wide = wideIndices.map(i => galleryImages[i]); // [01.jpg, 05.jpg]
  const normal = galleryImages.filter((_, i) => !wideIndices.includes(i)); // 나머지 10개
  return [wide[0], ...normal, wide[1]]; // [첫번째넓은, 일반10개, 두번째넓은]
})();

function Snap() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  const navigateLightbox = useCallback((direction) => {
    setLightboxIndex(prev => (prev + direction + displayImages.length) % displayImages.length);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  }, [lightboxOpen, closeLightbox, navigateLightbox]);

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Section aria-labelledby="gallery-title">
      <Container>
        <Header>
          <SectionTitle id="gallery-title">Gallery</SectionTitle>
          <SectionDivider />
        </Header>
        <Grid role="list" aria-label="웨딩 갤러리">
          {displayImages.map((src, idx) => (
            <GridItem
              key={idx}
              role="listitem"
              onClick={() => openLightbox(idx)}
              style={{ cursor: 'zoom-in' }}
            >
              <GridImage
                src={src}
                alt={`웨딩 스냅 사진 ${idx + 1}`}
                loading={idx < 2 ? "eager" : "lazy"}
                width="600"
                height="800"
              />
            </GridItem>
          ))}
        </Grid>
      </Container>

      {lightboxOpen && (
        <LightboxOverlay onClick={closeLightbox} role="dialog" aria-modal="true" aria-label="이미지 전체보기">
          <LightboxImage
            src={displayImages[lightboxIndex]}
            alt={`웨딩 스냅 사진 ${lightboxIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
          <LightboxClose onClick={closeLightbox} aria-label="닫기">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </LightboxClose>
          {displayImages.length > 1 && (
            <>
              <LightboxNav $prev onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }} aria-label="이전 사진">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </LightboxNav>
              <LightboxNav onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }} aria-label="다음 사진">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </LightboxNav>
              <LightboxCounter>
                {lightboxIndex + 1} / {displayImages.length}
              </LightboxCounter>
            </>
          )}
        </LightboxOverlay>
      )}
    </Section>
  );
}

export default Snap;
