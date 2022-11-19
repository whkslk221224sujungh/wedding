import React from "react";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";

const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
`;

const AccountInfoBlcok = styled.div`
  position: relative;
  max-width: 450px;
  width: 90%;
  padding: 1.5rem;
  background: white;
  box-sizing: border-box;
  line-height: 22px;
  color: #777;
`;

const Base = styled.div`
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ebebeb;
`;

const CopyButton = styled.button`
  position: absolute;
  right: 0;
  outline: none;
  border: none;
  margin-right: 20px;
  border-radius: 15px;
  font-size: 15px;
  text-align: center;
  background: #98a3f4;
  color: white;
`;

const Color = styled.span`
  color: #333;
`;

const CloseButton = styled.button`
  margin-top: 30px;
  display: block;
  background-color: #2d2df0;
  border: none;
  color: white;
  width: 100%;
  height: 45px;
`;

function IndividualAccountInfo({ relation, name, bank, accountNumber }) {
  return (
    <>
      <Color>{relation}</Color> 계좌
      <div>
        {bank} (예금주: {name})
      </div>
      <Base>
        {accountNumber}
        <CopyToClipboard text={accountNumber.replace(/-/g, "")}>
          <CopyButton>복사하기</CopyButton>
        </CopyToClipboard>
      </Base>
    </>
  );
}

function AccountInfo({ onClose, keyword, visible }) {
  if (!visible) return null;
  const infos = {
    Bridegroom: [
      {
        relation: "신랑",
        name: "김주환",
        bank: "새마을금고",
        accountNumber: "9003-2420-6906-2",
      },
      {
        relation: "신랑 혼주 (부)",
        name: "김동구",
        bank: "국민은행",
        accountNumber: "205701-04-191247",
      },
      {
        relation: "신랑 혼주 (모)",
        name: "신태자",
        bank: "국민은행",
        accountNumber: "502901-01-160747",
      },
    ],
    Bride: [
      {
        relation: "신부",
        name: "한수정",
        bank: "국민은행",
        accountNumber: "91073873883",
      },
      {
        relation: "신부 혼주 (부)",
        name: "한중희",
        bank: "국민은행",
        accountNumber: "006-21-0823-051",
      },
      {
        relation: "신부 혼주 (모)",
        name: "김현회",
        bank: "우리은행",
        accountNumber: "1002-515-914344",
      },
    ],
  };

  return (
    <DarkBackground>
      <AccountInfoBlcok>
        {infos[keyword].map((e) => (
          <IndividualAccountInfo {...e} />
        ))}
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </AccountInfoBlcok>
    </DarkBackground>
  );
}

export default AccountInfo;
