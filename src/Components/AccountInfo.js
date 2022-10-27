import React, { useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { getDisplayAccounts } from "../data/weddingData";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  to { opacity: 0; transform: translateX(-50%) translateY(10px); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 10000;
  animation: ${fadeIn} 0.3s ease;
  padding-bottom: env(safe-area-inset-bottom);
`;

const Modal = styled.div`
  width: 100%;
  max-width: var(--container-max);
  max-height: 85vh;
  background: var(--color-bg-primary);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${slideUp} 0.4s cubic-bezier(0.22, 1, 0.36, 1);
`;

const ModalHandle = styled.div`
  width: 40px;
  height: 4px;
  background: var(--color-border);
  border-radius: 2px;
  margin: var(--space-md) auto;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-xl) var(--space-lg);
  border-bottom: 1px solid var(--color-border);
`;

const ModalTitle = styled.h2`
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  font-weight: 400;
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-primary);
  margin: 0;
`;

const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);

  &:hover {
    background: var(--color-bg-secondary);
    color: var(--color-text-primary);
  }
`;

const ModalContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: var(--space-xl);
`;

const AccountList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
`;

const AccountCard = styled.article`
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
`;

const AccountHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--color-border);
`;

const AccountRelation = styled.span`
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-accent);
`;

const AccountName = styled.span`
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-weight: 400;
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-primary);
`;

const AccountDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
`;

const AccountRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
`;

const AccountLabel = styled.span`
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  white-space: nowrap;
`;

const AccountValue = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex: 1;
  justify-content: flex-end;
`;

const AccountNumber = styled.code`
  font-family: var(--font-mono);
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-text-primary);
  letter-spacing: var(--tracking-normal);
  background: var(--color-bg-secondary);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
`;

const CopyButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-full);
  background: var(--color-bg-secondary);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  flex-shrink: 0;

  &:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
    background: var(--color-bg-card);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const CopiedToast = styled.div`
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  padding: var(--space-md) var(--space-xl);
  background: var(--color-text-primary);
  color: #fff;
  border-radius: var(--radius-full);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 500;
  z-index: 10001;
  animation: ${fadeIn} 0.2s ease, ${fadeOut} 0.2s ease 1.8s forwards;
`;

function AccountInfo({ onClose, keyword, visible }) {
  const [copied, setCopied] = React.useState(null);
  const accounts = getDisplayAccounts(keyword);

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [visible]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = useCallback(async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(index);
    } catch (e) {
      // fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(index);
    }
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (visible) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [visible, handleKeyDown]);

  if (!visible) return null;

  return (
    <>
      <Overlay onClick={onClose} aria-hidden="true" />
      <Modal onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="account-modal-title">
        <ModalHandle />
        <ModalHeader>
          <ModalTitle id="account-modal-title">{keyword === 'groom' ? '신랑측' : '신부측'} 계좌번호</ModalTitle>
          <CloseButton onClick={onClose} aria-label="닫기">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </CloseButton>
        </ModalHeader>
        <ModalContent>
          <AccountList>
            {accounts.map((account, idx) => (
              <AccountCard key={idx}>
                <AccountHeader>
                  <div>
                    <AccountRelation>{account.relation}</AccountRelation>
                    <AccountName>{account.name}</AccountName>
                  </div>
                </AccountHeader>
                <AccountDetails>
                  <AccountRow>
                    <AccountLabel>은행</AccountLabel>
                    <AccountValue>
                      <span style={{ color: 'var(--color-text-primary)' }}>{account.bank}</span>
                    </AccountValue>
                  </AccountRow>
                  <AccountRow>
                    <AccountLabel>계좌번호</AccountLabel>
                    <AccountValue>
                      <AccountNumber>{account.accountNumber}</AccountNumber>
                      <CopyButton
                        onClick={() => handleCopy(account.accountNumber, idx)}
                        aria-label={copied === idx ? '복사 완료' : '계좌번호 복사'}
                      >
                        {copied === idx ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8C7A6B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                        )}
                      </CopyButton>
                    </AccountValue>
                  </AccountRow>
                </AccountDetails>
              </AccountCard>
            ))}
          </AccountList>
        </ModalContent>
      </Modal>
      {copied !== null && (
        <CopiedToast>복사되었습니다</CopiedToast>
      )}
    </>
  );
}

export default AccountInfo;
