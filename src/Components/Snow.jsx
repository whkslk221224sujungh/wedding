import React, { useEffect, useRef } from 'react';

const SNOWFLAKE_COUNT = 30;
const SNOWFLAKES = ['❄', '❅', '❆', '●', '○'];

function Snow({ children }) {
  const containerRef = useRef(null);
  const flakesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 전체 문서 높이 계산 (뷰포트보다 긴 페이지 대응)
    const getDocHeight = () => Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      window.innerHeight
    );
    
    const docHeight = getDocHeight();
    const fallDistance = docHeight + 100; // 문서 끝 + 여유

    // Create snowflakes
    const createFlake = (index) => {
      const flake = document.createElement('div');
      const type = SNOWFLAKES[Math.floor(Math.random() * SNOWFLAKES.length)];
      const size = Math.random() * 0.8 + 0.6; // 0.6 ~ 1.4rem
      const left = Math.random() * 100; // 0~100%
      const drift = (Math.random() - 0.5) * 150; // -75~75px horizontal drift
      const duration = Math.random() * 15 + 20; // 20~35s (더 느리게)
      const delay = Math.random() * 8; // 0~8s delay
      const opacity = Math.random() * 0.4 + 0.6; // 0.6~1.0

      flake.className = 'snowflake';
      flake.textContent = type;
      flake.style.cssText = `
        left: ${left}%;
        font-size: ${size}rem;
        --drift: ${drift}px;
        --fall-distance: ${fallDistance}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        opacity: ${opacity};
      `;

      container.appendChild(flake);
      flakesRef.current.push(flake);
    };

    // Staggered creation for natural look
    for (let i = 0; i < SNOWFLAKE_COUNT; i++) {
      setTimeout(() => createFlake(i), i * 200);
    }

    // 리사이즈 시 낙하 거리 업데이트
    const handleResize = () => {
      const newDocHeight = getDocHeight();
      const newFallDistance = newDocHeight + 100;
      flakesRef.current.forEach(flake => {
        flake.style.setProperty('--fall-distance', `${newFallDistance}px`);
      });
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      flakesRef.current.forEach(flake => flake.remove());
      flakesRef.current = [];
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="snow-container" aria-hidden="true" />
      {children}
    </>
  );
}

export default Snow;
