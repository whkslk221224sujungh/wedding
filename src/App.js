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
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/snow.scss";

function Snow({ children }) {
  return <div id="snow">{children}</div>;
}

const Background = styled.div`
  background-color: #8f6749;
  background-image: url("/wedding/blizzard.png");
`;

function App() {
  const [percent, setPercent] = useState(0);
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
  return (
    <>
      <Background>
        {!(percent > 100) ? (
          <InitialPage percent={percent} />
        ) : (
          <ComponentsBlock>
            <Snow>
              <HeroAndHeroine />
              <InviteMessage />
              <Snap />
              <WeddingDate />
              <Location />
              <Contacts />
            </Snow>
          </ComponentsBlock>
        )}
      </Background>
    </>
  );
}

export default App;
