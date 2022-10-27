/**
 * 개인정보 마스킹 유틸리티
 * 전화번호, 계좌번호, 이름 등의 민감 정보를 일관되게 마스킹합니다.
 */

/**
 * 전화번호 마스킹
 * @param {string} phone - 전화번호 (하이픈 포함/미포함 모두 가능)
 * @param {string} pattern - 마스킹 패턴: 'middle' (가운데 4자리), 'ends' (앞/뒤 2자리씩)
 * @returns {string} 마스킹된 전화번호
 */
export function maskPhone(phone, pattern = 'middle') {
  if (!phone) return '';
  
  // 숫자만 추출
  const digits = phone.replace(/\D/g, '');
  
  // 11자리 휴대폰 번호 (010-xxxx-xxxx)
  if (digits.length === 11 && digits.startsWith('010')) {
    if (pattern === 'middle') {
      return `${digits.slice(0, 3)}-****-${digits.slice(7)}`;
    }
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}**-**${digits.slice(9)}`;
  }
  
  // 10자리 지역번호 포함 (02-xxxx-xxxx 등)
  if (digits.length === 10) {
    if (pattern === 'middle') {
      return `${digits.slice(0, 2)}-****-${digits.slice(6)}`;
    }
    return `${digits.slice(0, 2)}-${digits.slice(2, 4)}**-**${digits.slice(8)}`;
  }
  
  // 9-10자리 일반 번호
  if (digits.length >= 9) {
    if (pattern === 'middle') {
      const midStart = Math.floor(digits.length / 2) - 2;
      return `${digits.slice(0, midStart)}-****-${digits.slice(midStart + 4)}`;
    }
  }
  
  // 그 외: 앞 3자리, 뒤 4자리만 표시
  if (digits.length >= 7) {
    return `${digits.slice(0, 3)}****${digits.slice(-4)}`;
  }
  
  return phone; // 마스킹 불가능한 경우 원본 반환
}

/**
 * 계좌번호 마스킹
 * @param {string} account - 계좌번호 (하이픈 포함/미포함)
 * @returns {string} 마스킹된 계좌번호
 */
export function maskAccount(account) {
  if (!account) return '';
  
  const digits = account.replace(/\D/g, '');
  
  // 10-14자리 계좌번호 일반적인 경우
  if (digits.length >= 10) {
    const visibleFront = 3;
    const visibleBack = 4;
    const maskedLength = digits.length - visibleFront - visibleBack;
    if (maskedLength > 0) {
      return `${digits.slice(0, visibleFront)}${'*'.repeat(maskedLength)}${digits.slice(-visibleBack)}`;
    }
  }
  
  // 하이픈 유지하며 마스킹
  const parts = account.split('-');
  if (parts.length >= 2) {
    return parts.map((part, i) => {
      if (i === 0) return part; // 첫 번째 파트는 표시
      if (i === parts.length - 1) return part; // 마지막 파트는 표시
      return '*'.repeat(part.length);
    }).join('-');
  }
  
  return '*'.repeat(account.length);
}

/**
 * 이름 마스킹
 * @param {string} name - 이름
 * @param {string} pattern - 마스킹 패턴: 'initial' (초성만), 'middle' (가운데 문자), 'all' (전체)
 * @returns {string} 마스킹된 이름
 */
export function maskName(name, pattern = 'middle') {
  if (!name) return '';
  
  // 한글 이름인 경우 (2-4자)
  const koreanRegex = /^[가-힣]{2,4}$/;
  if (koreanRegex.test(name)) {
    if (pattern === 'initial') {
      // 초성만 추출 (간단한 버전)
      return name.split('').map(char => {
        const code = char.charCodeAt(0) - 0xAC00;
        if (code >= 0 && code < 11172) {
          const cho = Math.floor(code / 588);
          const choChars = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
          return choChars[cho];
        }
        return char;
      }).join('');
    }
    if (pattern === 'middle') {
      // 가운데 문자 마스킹 (3자: 중간, 4자: 중간 2자)
      if (name.length === 2) return `${name[0]}*`;
      if (name.length === 3) return `${name[0]}*${name[2]}`;
      if (name.length === 4) return `${name[0]}**${name[3]}`;
    }
    if (pattern === 'all') {
      return '*'.repeat(name.length);
    }
  }
  
  // 영문/기타: 첫 글자만 표시
  if (pattern === 'middle') {
    return name[0] + '*'.repeat(name.length - 1);
  }
  
  return '*'.repeat(name.length);
}

/**
 * 복사용 원본 데이터 가져오기 (마스킹 모드에서는 마스킹된 값 반환)
 * @param {string} original - 원본 값
 * @param {Function} maskFn - 마스킹 함수
 * @param {boolean} isMaskedMode - 마스킹 모드 여부
 * @returns {string} 복사될 값
 */
export function getCopyValue(original, maskFn, isMaskedMode = true) {
  return isMaskedMode ? maskFn(original) : original;
}

/**
 * tel:/sms: 링크용 href 생성 (마스킹 모드에서는 비활성화)
 * @param {string} type - 'tel' 또는 'sms'
 * @param {string} phone - 전화번호
 * @param {boolean} isMaskedMode - 마스킹 모드 여부
 * @returns {string|null} href 값 또는 null (비활성화 시)
 */
export function getContactHref(type, phone, isMaskedMode = true) {
  if (isMaskedMode) return null;
  const digits = phone.replace(/\D/g, '');
  return `${type}:${digits}`;
}