import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InitialPage from "./Components/InitialPage";
import ComponentsBlock from "./Components/ComponentsBlock";
import "./snow.scss";

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
            <Snow></Snow>
          </ComponentsBlock>
        )}
      </Background>
    </>
  );
}

export default App;
