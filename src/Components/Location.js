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

const HotelFont = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const AdressFont = styled.div`
  font-size: 14px;
  padding-bottom: 20px;
`;

const StylesImage = styled.img`
  padding-right: ${(props) => props.isLeft && "40px"};
  padding-left: ${(props) => !props.isLeft && "40px"};
`;

function HowToGo() {
  return (
    <>
      <HotelFont>JW 메리어트 호텔 서울 5층 그랜드 볼룸</HotelFont>
      <AdressFont>서울 서초구 신반포로 176 (반포동 19-3)</AdressFont>
    </>
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
    </>
  );
};

export default Location;
