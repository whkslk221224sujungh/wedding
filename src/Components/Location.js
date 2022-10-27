import React from "react";
import styled from "styled-components";
import { getDisplayHotelContact, mapLocation, mapLinks, coupleInfo } from "../data/weddingData";
import { getContactHref } from "../utils/masking";
import { MASKED_MODE } from "../data/weddingData";

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

const VenueInfo = styled.div`
  text-align: center;
  margin-bottom: var(--space-xl);
`;

const VenueName = styled.h3`
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  font-weight: 400;
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-xs);
`;

const VenueAddress = styled.p`
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: var(--leading-relaxed);
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 300px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-border);
  margin-bottom: var(--space-xl);
  box-shadow: var(--shadow-md);
`;

const MapIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const MapLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
`;

const MapLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  flex: 1;
  max-width: 140px;
  min-width: 120px;
  padding: var(--space-md) var(--space-lg);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-full);
  background: var(--color-bg-card);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 500;
  text-decoration: none;
  transition: all var(--transition-fast);
  white-space: nowrap;

  &:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
    background: var(--color-bg-secondary);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const MapLinkIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;

const GoogleMapIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

const DetailsCard = styled.div`
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
`;

const DetailSection = styled.div`
  margin-bottom: var(--space-lg);
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailTitle = styled.h4`
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-accent);
  margin: 0 0 var(--space-md);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--color-border);
`;

const DetailContent = styled.div`
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
`;

const DetailLine = styled.div`
  margin-bottom: var(--space-sm);
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  font-weight: 500;
  color: var(--color-text-primary);
`;

const WarnText = styled.span`
  font-weight: 500;
  color: var(--color-accent-dark);
`;

const HotelPhoneLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-text-primary);
  text-decoration: none;
  font-weight: 500;
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.$disabled ? 'none' : 'auto')};
  transition: all var(--transition-fast);

  &:hover {
    color: var(--color-accent);
  }
`;

const PhoneIcon = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
`;

const MaskedNotice = styled.span`
  display: block;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-top: var(--space-xs);
`;

const Arrow = styled.span`
  color: var(--color-accent);
  font-weight: 500;
  margin: 0 var(--space-xs);
`;

// 구글맵 임베드 URL 생성 (place 모드: 장소 표시 + 마커)
const getGoogleMapsEmbedUrl = () => {
  const { name } = mapLocation;
  const q = encodeURIComponent(`${name} ${coupleInfo.venueAddress}`);
  return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${q}&zoom=16&maptype=roadmap`;
};

const Location = () => {
  const hotel = getDisplayHotelContact();
  const telHref = getContactHref('tel', hotel.phone, MASKED_MODE);
  const isDisabled = MASKED_MODE;
  const embedUrl = getGoogleMapsEmbedUrl();

  return (
    <Section aria-labelledby="location-title">
      <Container>
        <Header>
          <SectionTitle id="location-title">오시는 길</SectionTitle>
          <SectionDivider />
        </Header>
        
        <VenueInfo>
          <VenueName>{mapLocation.name}</VenueName>
          <VenueAddress>{coupleInfo.venueAddress}</VenueAddress>
        </VenueInfo>

        <MapWrapper>
          <MapIframe
            src={embedUrl}
            title="JW 메리어트 호텔 서울 위치"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </MapWrapper>

        <MapLinks>
          {/* 구글맵 왼쪽, 카카오맵 오른쪽 - 동일 너비 */}
          <MapLink
            href={mapLinks.google}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="구글맵으로 길찾기"
          >
            <GoogleMapIcon aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2Z" fill="#4285F4"/>
                <path d="M12 2C8.13401 2 5 5.13401 5 9C5 10.7432 6.23012 12.2989 8 13.1773C7.51616 13.7812 7.0905 14.4367 6.73787 15.1318C5.71306 14.4783 5 13.4148 5 12.25C5 9.53102 7.12398 7.27703 10.1992 7.14834V7.14834C10.6738 6.25645 11.3877 5.51424 12.25 5.00214V5.00214C13.5276 5.42557 14.6889 6.09645 15.6838 6.9775C16.5193 6.25282 17.5796 5.75 18.75 5.5C20.7769 4.5771 23 6.80412 23 9.5C23 12.9768 20.2879 15.9555 17.0002 17.7766C14.9103 18.8898 12.6691 19.5 10 19.5C7.16516 19.5 4.5 16.8348 4.5 14C4.5 12.75 5.01515 11.55 5.75 10.5H5.75C4.55964 11.6321 3.75 13.0994 3.75 14.75C3.75 17.7327 6.1475 20.2045 9.5 21.2023V21.2023C12.217 21.9779 15.0533 22 17.75 22C20.8035 22 23.5 19.3035 23.5 16.25C23.5 14.5608 22.9021 13.0037 21.9375 11.75C22.4738 10.7587 22.75 9.6875 22.75 8.5C22.75 5.46243 20.2876 3 17.25 3C14.8954 3 12.75 4.27778 12 6.125V6.125C12 4.50832 12 3.25 12 2Z" fill="#34A853"/>
                <path d="M12 2C8.13401 2 5 5.13401 5 9C5 10.7432 6.23012 12.2989 8 13.1773C7.51616 13.7812 7.0905 14.4367 6.73787 15.1318C5.71306 14.4783 5 13.4148 5 12.25C5 9.53102 7.12398 7.27703 10.1992 7.14834V7.14834C10.6738 6.25645 11.3877 5.51424 12.25 5.00214V5.00214C13.5276 5.42557 14.6889 6.09645 15.6838 6.9775C16.5193 6.25282 17.5796 5.75 18.75 5.5C20.7769 4.5771 23 6.80412 23 9.5C23 12.9768 20.2879 15.9555 17.0002 17.7766C14.9103 18.8898 12.6691 19.5 10 19.5C7.16516 19.5 4.5 16.8348 4.5 14C4.5 12.75 5.01515 11.55 5.75 10.5H5.75C4.55964 11.6321 3.75 13.0994 3.75 14.75C3.75 17.7327 6.1475 20.2045 9.5 21.2023V21.2023C12.217 21.9779 15.0533 22 17.75 22C20.8035 22 23.5 19.3035 23.5 16.25C23.5 14.5608 22.9021 13.0037 21.9375 11.75C22.4738 10.7587 22.75 9.6875 22.75 8.5C22.75 5.46243 20.2876 3 17.25 3C14.8954 3 12.75 4.27778 12 6.125V6.125C12 4.50832 12 3.25 12 2Z" fill="#FBBC05"/>
                <path d="M12 2C8.13401 2 5 5.13401 5 9C5 10.7432 6.23012 12.2989 8 13.1773C7.51616 13.7812 7.0905 14.4367 6.73787 15.1318C5.71306 14.4783 5 13.4148 5 12.25C5 9.53102 7.12398 7.27703 10.1992 7.14834V7.14834C10.6738 6.25645 11.3877 5.51424 12.25 5.00214V5.00214C13.5276 5.42557 14.6889 6.09645 15.6838 6.9775C16.5193 6.25282 17.5796 5.75 18.75 5.5C20.7769 4.5771 23 6.80412 23 9.5C23 12.9768 20.2879 15.9555 17.0002 17.7766C14.9103 18.8898 12.6691 19.5 10 19.5C7.16516 19.5 4.5 16.8348 4.5 14C4.5 12.75 5.01515 11.55 5.75 10.5H5.75C4.55964 11.6321 3.75 13.0994 3.75 14.75C3.75 17.7327 6.1475 20.2045 9.5 21.2023V21.2023C12.217 21.9779 15.0533 22 17.75 22C20.8035 22 23.5 19.3035 23.5 16.25C23.5 14.5608 22.9021 13.0037 21.9375 11.75C22.4738 10.7587 22.75 9.6875 22.75 8.5C22.75 5.46243 20.2876 3 17.25 3C14.8954 3 12.75 4.27778 12 6.125V6.125C12 4.50832 12 3.25 12 2Z" fill="#EA4335"/>
              </svg>
            </GoogleMapIcon>
            구글맵
          </MapLink>
          <MapLink
            href={mapLinks.kakao}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="카카오맵으로 길찾기"
          >
            <MapLinkIcon src={`${process.env.PUBLIC_URL}/kakao_map.png`} alt="" />
            카카오맵
          </MapLink>
        </MapLinks>

        <DetailsCard>
          <DetailSection>
            <DetailTitle>호텔 전화번호</DetailTitle>
            <DetailContent>
              <DetailLine>
                <DetailLabel>{hotel.name} | TEL </DetailLabel>
                <HotelPhoneLink
                  href={telHref}
                  $disabled={isDisabled}
                  aria-label={isDisabled ? `호텔 전화 걸기 (마스킹 모드: ${hotel.phoneMasked})` : `호텔 전화 걸기: ${hotel.phone}`}
                  onClick={(e) => isDisabled && e.preventDefault()}
                >
                  <PhoneIcon src={`${process.env.PUBLIC_URL}/call.png`} alt="" $disabled={isDisabled} />
                  {hotel.phone}
                </HotelPhoneLink>
              </DetailLine>
              {isDisabled && (
                <MaskedNotice>개인정보 보호 모드</MaskedNotice>
              )}
            </DetailContent>
          </DetailSection>

          <DetailSection>
            <DetailTitle>지하철 안내</DetailTitle>
            <DetailContent>
              <DetailLine>3, 7, 9호선 환승역사 7번 출구 방향 에스컬레이터</DetailLine>
              <DetailLine><Arrow>→</Arrow> 호남선 방면 에스컬레이터 이용</DetailLine>
              <DetailLine><Arrow>→</Arrow> 신세계백화점 2층에서 BVLGARI(불가리) 오른편</DetailLine>
              <DetailLine><Arrow>→</Arrow> JW 메리어트 호텔 로비로 연결</DetailLine>
            </DetailContent>
          </DetailSection>

          <DetailSection>
            <DetailTitle>주차 안내</DetailTitle>
            <DetailContent>
              <DetailLine>호텔, 신세계 백화점 주차장 6시간 무료 주차 가능</DetailLine>
              <DetailLine><WarnText>※ 파미에스테이션 주차장은 유료</WarnText></DetailLine>
              <DetailLine>※ 주차가 매우 혼잡할 수 있습니다</DetailLine>
            </DetailContent>
          </DetailSection>
        </DetailsCard>
      </Container>
    </Section>
  );
};

export default Location;
