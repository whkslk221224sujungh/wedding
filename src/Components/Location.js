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
  justify-content: space-around;
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

const TextBlock = styled.div`
  width: 340px;
  font-size: 15px;
  margin-top: ${(props) => props.top || '30px'};
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
      <Bold>호텔 전화번호</Bold><br />
      JW 메리어트 서울 | TEL 02-6282-6262{" "}
      <a href={`tel:0262826262`}>
        <img src="/wedding/call.png" alt="call" height={"15px"} />
      </a>
      <br />
      <br />
      <Bold>지하철 안내</Bold><br />
      3,7,9호선 환승역사 7번 출구 방향 에스컬레이터<br />
      <Bold>→</Bold> 호남선 방면 에스컬레이터 이용<br />
      <Bold>→</Bold> 신세계백화점 2층에서 BVLGARI(불가리) 오른편<br />
      <Bold>→</Bold> JW 메리어트 호텔 로비로 연결<br />
      <br />
      <Bold>주차 안내</Bold> <br />
      호텔, 신세계 백화점 주차장 6시간 무료 주차 가능 <br />
      <Warn>※ 파미에스테이션 주차장은 유료</Warn> <br />
      ※ 주차가 매우 혼잡할 수 있습니다.
    </TextBlock>
  );
}
const KakaoMap = styled.div`
  max-width: 780px;
  width: 340px;
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
        <TextBlock top ='0px'>
          <FlexRow>
            <a href="https://map.kakao.com/link/to/195802694">
              <img
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
              <img
                src="/wedding/naver_map.png"
                alt="naver"
                height={"50px"}
              />
            </a>
            <a href={`https://apis.openapi.sk.com/tmap/app/routes?appKey=${process.env.REACT_APP_TMAP_KEY}&name=JW메리어트호텔서울&lon=127.004&lat=37.5041`}>
              <img
                src = "/wedding/tmap.jpg"
                alt="tmap"
                height={"50px"}
              />
            </a>
          </FlexRow>
        </TextBlock>
      </FlexRow>
      <FlexRow>
        <HowToGoDetails />
      </FlexRow>
    </>
  );
};

export default Location;
