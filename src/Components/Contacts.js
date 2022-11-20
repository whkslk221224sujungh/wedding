import React from "react";
import styled from "styled-components";

const Template = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 40px;
  padding-left: 20px;
  padding-right: 20px;
`;

const Pair = styled.div`
  padding-right: ${(props) => props.isLeft && "10%"};
  padding-left: ${(props) => !props.isLeft && "10%"};
`;

const AroundDiv = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: space-around;
`;

const MarginTopDiv = styled.div`
  margin-top: 20px;
`;

const MarginLeftDiv = styled.div`
  margin-left: 5px;
  font-weight: bold;
`;

const NameSpan = styled.span`
  font-weight: bold;
`;

function CallAndMessage({ number }) {
  return (
    <AroundDiv>
      <a href={`tel:${number}`}>
        <img src="/wedding/call.png" alt="call" height={"30px"} />
      </a>
      <a href={`sms:${number}`}>
        <img src="/wedding/message.png" alt="sms" height={"30px"} />
      </a>
    </AroundDiv>
  );
}

function ContactsPoint({ relation, name, number }) {
  return (
    <>
      <MarginTopDiv />
      <span>
        {`${relation} `}
        <NameSpan>{`${name}`}</NameSpan>
      </span>
      <CallAndMessage number={`${number}`} />
    </>
  );
}

const Bridegroom = () => {
  return <ContactsPoint relation="신랑" name="김주환" number="01027651159" />;
};

const Bride = () => {
  return <ContactsPoint relation="신부" name="한수정" number="01073003889" />;
};

const ParentsOfBridegroom = () => {
  return (
    <>
      <MarginLeftDiv>신랑측 혼주</MarginLeftDiv>
      <ContactsPoint relation="아버지" name="김동구" number="01047032523" />
      <ContactsPoint relation="어머니" name="신태자" number="01031735352" />
    </>
  );
};

const ParentsOfBride = () => {
  return (
    <>
      <MarginLeftDiv>신부측 혼주</MarginLeftDiv>
      <ContactsPoint relation="아버지" name="한중희" number="01096513883" />
      <ContactsPoint relation="어머니" name="김현회" number="01067313883" />
    </>
  );
};

function Contacts() {
  return (
    <div data-aos="fade-up" data-aos-duration="1500" data-aos-easing="ease-out">
      <Template>
        <Pair isLeft>{Bridegroom()}</Pair>
        <Pair>{Bride()}</Pair>
      </Template>
      <Template>혼주에게 연락하기</Template>
      <Template>
        <Pair isLeft>{ParentsOfBridegroom()}</Pair>
        <Pair>{ParentsOfBride()}</Pair>
      </Template>
    </div>
  );
}

export default Contacts;
