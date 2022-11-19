/*global kakao*/
import React, { useEffect } from "react";
import styled from "styled-components";

const FlexColumn = styled.div`
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const HotelFont = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const AdressFont = styled.span`
  font-size: 14px;
  padding-bottom: 20px;
`;

const StylesImage = styled.img`
  padding-right: ${(props) => props.isLeft && "40px"};
  padding-left: ${(props) => !props.isLeft && "40px"};
`;

const TextBlock = styled.div`
  width: 380px;
  font-size: 15px;
`;

const Bold = styled.span`
  font-weight: bold;
`;

const Warn = styled.span`
  font-weight: bold;
  color: #ff4747;
`;

function HowToGo() {
  return (
    <>
      <HotelFont>JW 메리어트 호텔 서울 5층 그랜드 볼룸</HotelFont>
      <AdressFont>서울 서초구 신반포로 176 (반포동 19-3)</AdressFont>
    </>
  );
}

function HowToGoDetails() {
  return (
    <TextBlock>
      <Bold>JW 메리어트 서울</Bold> TEL 02-6282-6262{" "}
      <a href={`tel:0262826262`}>
        <img src="/wedding/call.png" alt="call" height={"15px"} />
      </a>
      <br />
      <br />
      <Bold>지하철 [3,7,9호선 고속터미널역] </Bold> <br />
      3,7,9호선 환승역사 7번 출구 방향 에스컬레이터 이용 <br />
      <Bold>→</Bold> 호남선 방면 에스컬레이터 이용 <br />
      <Bold>→</Bold> 신세계백화점 강남점 2층에서 BVLGARI(불가리) 오른편 아케이드{" "}
      <br />
      <Bold>→</Bold> 호텔 로비 또는 3, 7, 9호선 3호선 출구에서 왼편 10m <br />
      <Bold>→</Bold> 호텔 정문 <br />
      <br />
      <br />
      <Bold>주차</Bold> <br />
      호텔, 신세계 백화점 주차장 6시간 무료 주차 가능 <br />
      <Warn>(파미에스테이션 주차장은 유료)</Warn> <br />
      주차가 매우 혼잡할 수 있사오니 가급적 대중교통 이용을 부탁드립니다.
    </TextBlock>
  );
}
const KakaoMap = styled.div`
  max-width: 780px;
  width: 380px;
  min-width: 200px;
  height: 250px;
  display: block;
`;

const Location = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.5041, 127.0048),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(37.5041, 127.0048);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, []);

  return (
    <>
      <FlexColumn>
        <HowToGo />
        <KakaoMap id="map" />
      </FlexColumn>
      <FlexRow>
        <a href="https://map.kakao.com/link/to/195802694">
          <StylesImage
            src="/wedding/kakao_map.png"
            alt="kakao"
            height={"50px"}
            isLeft
          />
        </a>
        <a
          href={`nmap://route/car?dlat=37.5041&dlng=127.0048&dname=${encodeURI(
            "JW 메리어트 호텔 서울"
          )}&appname=wedding`}
        >
          <StylesImage
            src="/wedding/naver_map.png"
            alt="naver"
            height={"50px"}
          />
        </a>
      </FlexRow>
      <FlexRow>
        <HowToGoDetails />
      </FlexRow>
    </>
  );
};

export default Location;
