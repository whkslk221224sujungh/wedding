import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InitialPage from "./Components/InitialPage";
import ComponentsBlock from "./Components/ComponentsBlock";
import HeroAndHeroine from "./Components/HeroAndHeroine";
import InviteMessage from "./Components/InviteMessage";
import Snap from "./Components/Snap";
import WeddingDate from "./Components/WeddingDate";
import Location from "./Components/Location";
import Contacts from "./Components/Contacts";
import Footer from "./Components/Footer";
import TransferringMessage from "./Components/TransferringMessage";
import AccountInfo from "./Components/AccountInfo";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/snow.scss";

function Snow({ children }) {
  return <div id="snow">{children}</div>;
}

const Background = styled.div`
  background-color: black;
  background-image: url("/wedding/blizzard.png");
`;

function App() {
  const [percent, setPercent] = useState(0);
  const [accountBlock, setAccountBlock] = useState(false);
  const [keyword, setKeyword] = useState("Bride");

  useEffect(() => {
    if (!(percent > 100)) {
      const fn = setInterval(() => {
        const operand =
          100 - percent < 5
            ? 100 - percent || 3
            : Math.floor(Math.random() * 5);
        setPercent(percent + operand);
      }, 20);
      return () => clearInterval(fn);
    }
  }, [percent]);

  const onClickBridegroomAccount = () => {
    document.body.style.overflow = "hidden";
    setAccountBlock(true);
    setKeyword("Bridegroom");
  };

  const onClickBrideAccount = () => {
    document.body.style.overflow = "hidden";
    setAccountBlock(true);
    setKeyword("Bride");
  };

  const onClose = () => {
    document.body.style.overflow = "scroll";
    setAccountBlock(false);
  };

  return (
    <>
      <Background>
        {!(percent > 100) ? (
          <>
          <InitialPage percent={percent} />
          <img src="snap//06.jpg" alt="preload" height={"0px"} />
          </>
        ) : (
          <ComponentsBlock>
            <Snow>
              <HeroAndHeroine />
              <InviteMessage />
              <Snap />
              <WeddingDate />
              <Location />
              <Contacts />
              <TransferringMessage
                onClickBrideAccount={onClickBrideAccount}
                onClickBridegroomAccount={onClickBridegroomAccount}
              />
              <AccountInfo
                onClose={onClose}
                keyword={keyword}
                visible={accountBlock}
              />
              <Footer />
            </Snow>
          </ComponentsBlock>
        )}
      </Background>
    </>
  );
}

export default App;
