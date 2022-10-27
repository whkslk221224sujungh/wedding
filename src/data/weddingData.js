/**
 * 결혼식 데이터 설정
 * 
 * ⚠️ 중요: Git에 커밋되는 이 파일에는 실제 개인정보를 절대 넣지 마세요!
 * 실제 배포 시에는 환경변수나 별도의 비공개 설정 파일로 주입하세요.
 * 
 * 마스킹 모드(기본값: true)에서는 모든 민감 정보가 마스킹되어 표시됩니다.
 * 실제 서비스 시 MASKED_MODE를 false로 변경하고 실제 데이터를 주입하세요.
 */

// 마스킹 모드 설정 (배포 시 false로 변경 가능)
export const MASKED_MODE = true;

/**
 * 환경변수에서 값 가져오기 (없는 경우 기본 마스킹 값 사용)
 * 실제 배포 시 다음 환경변수들을 설정하세요:
 * REACT_APP_GROOM_PHONE, REACT_APP_BRIDE_PHONE
 * REACT_APP_GROOM_FATHER_PHONE, REACT_APP_GROOM_MOTHER_PHONE
 * REACT_APP_BRIDE_FATHER_PHONE, REACT_APP_BRIDE_MOTHER_PHONE
 * REACT_APP_HOTEL_PHONE
 * REACT_APP_GROOM_ACCOUNT_1, REACT_APP_GROOM_ACCOUNT_2, REACT_APP_GROOM_ACCOUNT_3
 * REACT_APP_BRIDE_ACCOUNT_1, REACT_APP_BRIDE_ACCOUNT_2, REACT_APP_BRIDE_ACCOUNT_3
 */
function getEnvOrDefault(key, defaultValue) {
  return process.env[key] || defaultValue;
}

// 신랑/신부 기본 정보 (이름은 공개 정보이므로 실명 사용)
export const coupleInfo = {
  groom: {
    name: '김주환',
    nameMasked: '김*환',
  },
  bride: {
    name: '한수정',
    nameMasked: '한*정',
  },
  weddingDate: '2022-12-24',
  weddingTime: '낮 12시',
  venue: 'JW 메리어트 호텔 서울 5층 그랜드 볼룸',
  venueAddress: '서울 서초구 신반포로 176 (반포동 19-3)',
};

// 인사말
export const groomMessage = 
`소중한 분들을 모시고
새로운 시작을 알리게 되었습니다.

부족한 저희를 따뜻한 시선으로 지켜봐 주시고,
축복해 주시길 바랍니다.

오시는 길 편안하시길 바라며,
직접 뵙고 인사드리겠습니다.`;

export const brideMessage = 
`설레는 마음으로 초대장을 적습니다.

저희 두 사람의 소중한 날,
함께해 주시면 더없이 기쁠 것 같습니다.

바쁘시더라도 잠시 시간 내어
축복해 주시길 부탁드립니다.`;

// 연락처 정보 - Git에는 마스킹된 값만 저장, 실제 값은 환경변수로 주입
export const contactsData = {
  groom: {
    name: '김주환',
    phone: getEnvOrDefault('REACT_APP_GROOM_PHONE', '010-****-1159'),
    phoneMasked: '010-****-1159',
    relation: '신랑',
  },
  bride: {
    name: '한수정',
    phone: getEnvOrDefault('REACT_APP_BRIDE_PHONE', '010-****-3889'),
    phoneMasked: '010-****-3889',
    relation: '신부',
  },
  groomParents: [
    {
      name: '김동구',
      phone: getEnvOrDefault('REACT_APP_GROOM_FATHER_PHONE', '010-****-2523'),
      phoneMasked: '010-****-2523',
      relation: '아버지',
      side: '신랑측',
    },
    {
      name: '신태자',
      phone: getEnvOrDefault('REACT_APP_GROOM_MOTHER_PHONE', '010-****-5352'),
      phoneMasked: '010-****-5352',
      relation: '어머니',
      side: '신랑측',
    },
  ],
  brideParents: [
    {
      name: '한중희',
      phone: getEnvOrDefault('REACT_APP_BRIDE_FATHER_PHONE', '010-****-3883'),
      phoneMasked: '010-****-3883',
      relation: '아버지',
      side: '신부측',
    },
    {
      name: '김현회',
      phone: getEnvOrDefault('REACT_APP_BRIDE_MOTHER_PHONE', '010-****-3883'),
      phoneMasked: '010-****-3883',
      relation: '어머니',
      side: '신부측',
    },
  ],
};

// 호텔 연락처
export const hotelContact = {
  name: 'JW 메리어트 서울',
  phone: getEnvOrDefault('REACT_APP_HOTEL_PHONE', '02-****-6262'),
  phoneMasked: '02-****-6262',
};

// 계좌 정보 - Git에는 마스킹된 값만 저장, 실제 값은 환경변수로 주입
export const accountData = {
  groom: [
    {
      relation: '신랑',
      name: '김주환',
      nameMasked: '김*환',
      bank: '새마을금고',
      accountNumber: getEnvOrDefault('REACT_APP_GROOM_ACCOUNT_1', '9003-****-6906-2'),
      accountNumberMasked: '9003-****-6906-2',
    },
    {
      relation: '신랑 혼주 (부)',
      name: '김동구',
      nameMasked: '김*구',
      bank: '국민은행',
      accountNumber: getEnvOrDefault('REACT_APP_GROOM_ACCOUNT_2', '205701-**-******'),
      accountNumberMasked: '205701-**-******',
    },
    {
      relation: '신랑 혼주 (모)',
      name: '신태자',
      nameMasked: '신*자',
      bank: '국민은행',
      accountNumber: getEnvOrDefault('REACT_APP_GROOM_ACCOUNT_3', '502901-**-******'),
      accountNumberMasked: '502901-**-******',
    },
  ],
  bride: [
    {
      relation: '신부',
      name: '한수정',
      nameMasked: '한*정',
      bank: '국민은행',
      accountNumber: getEnvOrDefault('REACT_APP_BRIDE_ACCOUNT_1', '91073-*******'),
      accountNumberMasked: '91073-*******',
    },
    {
      relation: '신부 혼주 (부)',
      name: '한중희',
      nameMasked: '한*희',
      bank: '국민은행',
      accountNumber: getEnvOrDefault('REACT_APP_BRIDE_ACCOUNT_2', '006-**-****-051'),
      accountNumberMasked: '006-**-****-051',
    },
    {
      relation: '신부 혼주 (모)',
      name: '김현회',
      nameMasked: '김*회',
      bank: '우리은행',
      accountNumber: getEnvOrDefault('REACT_APP_BRIDE_ACCOUNT_3', '1002-*-******'),
      accountNumberMasked: '1002-*-******',
    },
  ],
};

// 갤러리 이미지 목록
export const galleryImages = [
  'snap/01.jpg',
  'snap/02.jpg',
  'snap/03.jpg',
  'snap/04.jpg',
  'snap/05.jpg',
  'snap/06.jpg',
  'snap/07.jpg',
  'snap/08.jpg',
  'snap/09.jpg',
  'snap/10.jpg',
  'snap/11.jpg',
  'snap/12.jpg',
];

// 지도 위치 정보
export const mapLocation = {
  lat: 37.5041,
  lng: 127.0048,
  name: 'JW 메리어트 호텔 서울',
};

// 지도 링크
export const mapLinks = {
  kakao: 'https://map.kakao.com/link/to/195802694',
  google: 'https://www.google.com/maps/dir/?api=1&destination=JW%20%EB%A9%94%EB%A6%AC%EC%96%B4%ED%8A%B8%20%ED%98%B8%ED%85%94%20%EC%84%9C%EC%9A%B8&travelmode=driving',
  naver: 'nmap://route/car?dlat=37.5041&dlng=127.0048&dname=JW%20%EB%A9%94%EB%A6%AC%EC%96%B4%ED%8A%B8%20%ED%98%B8%ED%85%94%20%EC%84%9C%EC%9A%B8&appname=wedding',
  tmap: 'https://apis.openapi.sk.com/tmap/app/routes?appKey=YOUR_TMAP_KEY&name=JW%EB%A9%94%EB%A6%AC%EC%96%B4%ED%8A%B8%ED%98%B8%ED%85%94%EC%84%9C%EC%9A%B8&lon=127.004&lat=37.5041',
};

/**
 * 표시용 데이터 가져오기 (마스킹 모드 고려)
 */
export function getDisplayContacts() {
  if (MASKED_MODE) {
    return {
      groom: { ...contactsData.groom, phone: contactsData.groom.phoneMasked },
      bride: { ...contactsData.bride, phone: contactsData.bride.phoneMasked },
      groomParents: contactsData.groomParents.map(p => ({ ...p, phone: p.phoneMasked })),
      brideParents: contactsData.brideParents.map(p => ({ ...p, phone: p.phoneMasked })),
    };
  }
  return contactsData;
}

export function getDisplayAccounts(side) {
  const normalizedSide = (side || '').toLowerCase();
  const data = accountData[normalizedSide];
  if (!data || !Array.isArray(data)) {
    return [];
  }
  if (MASKED_MODE) {
    return data.map(item => ({
      ...item,
      name: item.nameMasked,
      accountNumber: item.accountNumberMasked,
    }));
  }
  return data;
}

export function getDisplayHotelContact() {
  if (MASKED_MODE) {
    return { ...hotelContact, phone: hotelContact.phoneMasked };
  }
  return hotelContact;
}
