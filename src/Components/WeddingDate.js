import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { coupleInfo } from "../data/weddingData";

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

const CalendarCard = styled.div`
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--color-border);
`;

const MonthYear = styled.div`
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  font-weight: 400;
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-primary);
`;

const CalendarNav = styled.button`
  width: 36px;
  height: 36px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-card);
  color: var(--color-text-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
    background: var(--color-bg-secondary);
  }
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--space-xs);
  margin-bottom: var(--space-sm);
`;

const WeekDay = styled.div`
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-text-muted);
  text-align: center;
  padding: var(--space-xs) 0;
  letter-spacing: var(--tracking-normal);
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--space-xs);
`;

const DayButton = styled.button`
  aspect-ratio: 1;
  border: none;
  background: transparent;
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 400;
  border-radius: var(--radius-full);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  position: relative;

  &:hover:not(:disabled) {
    background: var(--color-bg-secondary);
  }

  &:disabled {
    color: var(--color-text-muted);
    cursor: default;
  }

  ${(props) => props.$isWeddingDay && `
    background: var(--color-accent);
    color: #fff;
    font-weight: 600;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #fff;
      opacity: 0.6;
    }
  `}

  ${(props) => props.$isToday && !props.$isWeddingDay && `
    border: 1px solid var(--color-accent);
    color: var(--color-accent);
  `}
`;

const DDayCard = styled.div`
  margin-top: var(--space-xl);
  padding: var(--space-xl);
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%);
  border-radius: var(--radius-lg);
  text-align: center;
  color: #fff;
`;

const DDayLabel = styled.div`
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  opacity: 0.8;
  margin-bottom: var(--space-xs);
`;

const DDayNumber = styled.div`
  font-family: var(--font-serif);
  font-size: var(--text-4xl);
  font-weight: 300;
  letter-spacing: var(--tracking-wide);
  line-height: var(--leading-tight);
`;

const DDayText = styled.div`
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 400;
  opacity: 0.9;
  margin-top: var(--space-sm);
`;

function WeddingDate() {
  // 결혼식 날짜 기준으로 캘린더 초기화 (2022년 12월)
  const [currentDate, setCurrentDate] = useState(() => new Date(coupleInfo.weddingDate));
  const [dday, setDday] = useState(0);

  useEffect(() => {
    const weddingDate = new Date(coupleInfo.weddingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    weddingDate.setHours(0, 0, 0, 0);
    const diffTime = weddingDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDday(diffDays);
  }, []);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weddingDate = new Date(coupleInfo.weddingDate);
  weddingDate.setHours(0, 0, 0, 0);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const renderDays = () => {
    const days = [];
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <DayButton
          key={`prev-${i}`}
          disabled
          $isWeddingDay={false}
          $isToday={false}
        >
          {prevMonthDays - i}
        </DayButton>
      );
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0);
      const isWeddingDay = date.getTime() === weddingDate.getTime();
      const isToday = date.getTime() === today.getTime();
      
      days.push(
        <DayButton
          key={day}
          disabled={false}
          $isWeddingDay={isWeddingDay}
          $isToday={isToday}
        >
          {day}
        </DayButton>
      );
    }
    
    // Next month days
    const totalCells = days.length;
    const remainingCells = (7 - (totalCells % 7)) % 7;
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <DayButton
          key={`next-${day}`}
          disabled
          $isWeddingDay={false}
          $isToday={false}
        >
          {day}
        </DayButton>
      );
    }
    
    return days;
  };

  const daysPassed = Math.abs(dday);

  return (
    <Section aria-labelledby="calendar-title">
      <Container>
        <Header>
          <SectionTitle id="calendar-title">예식 일정</SectionTitle>
          <SectionDivider />
        </Header>
        <CalendarCard>
          <CalendarHeader>
            <CalendarNav onClick={prevMonth} aria-label="이전 달">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </CalendarNav>
            <MonthYear>
              {year}년 {month + 1}월
            </MonthYear>
            <CalendarNav onClick={nextMonth} aria-label="다음 달">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </CalendarNav>
          </CalendarHeader>
          <WeekDays role="row" aria-label="요일">
            {weekDays.map((day, idx) => (
              <WeekDay key={idx} role="columnheader">{day}</WeekDay>
            ))}
          </WeekDays>
          <DaysGrid role="grid" aria-label="달력">
            {renderDays()}
          </DaysGrid>
          <DDayCard>
            <DDayLabel>기념일</DDayLabel>
            <DDayNumber mono>{daysPassed}</DDayNumber>
            <DDayText>
              결혼한 지 {daysPassed}일이 지났습니다
            </DDayText>
          </DDayCard>
        </CalendarCard>
      </Container>
    </Section>
  );
}

export default WeddingDate;
