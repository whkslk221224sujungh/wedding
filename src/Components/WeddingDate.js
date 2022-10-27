import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import moment from "moment/moment";
import styled from "styled-components";

const Dot = styled.div`
  height: 8px;
  width: 8px;
  background-color: #f87171;
  border-radius: 50%;
  display: flex;
  margin-left: 40%;
`;

const FlexColumn = styled.div`
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WeddingLeftComment = styled.div`
  padding-top: 10px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #333;
  font-weight: 600;
`;

function WeddingDate() {
  const now = new Date();
  const weddingDay = new Date(2022, 11, 24);
  const dDay = Math.ceil((weddingDay - now) / 1000 / 60 / 60 / 24);
  return (
    <FlexColumn
      data-aos="fade-up"
      data-aos-duration="1500"
      data-aos-easing="ease-out"
    >
      <WeddingLeftComment>
        좌니 ❤️ 두덩 결혼식이 {dDay}일 남았습니다.
      </WeddingLeftComment>
      <Calendar
        activeStartDate={weddingDay}
        formatDay={(locale, date) => moment(date).format("D")}
        value={now}
        minDetail="month"
        maxDetail="month"
        navigationLabel={null}
        calendarType="US"
        nextLabel={null}
        next2Label={null}
        prevLabel={null}
        prev2Label={null}
        showNeighboringMonth={false}
        tileContent={({ date, view }) => {
          if (
            moment(date).format("YYYY-MM-DD") ===
            moment(weddingDay).format("YYYY-MM-DD")
          ) {
            return <Dot></Dot>;
          }
        }}
      />
    </FlexColumn>
  );
}

export default WeddingDate;
