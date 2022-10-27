import React from "react";
import styled from "styled-components";

const Block = styled.div`
  min-width: 200px;
  max-width: 780px;
  position: center;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto;

  display: flex;
  flex-direction: column;
`;

function ComponentsBlock({ children }) {
  return <Block>{children}</Block>;
}

export default ComponentsBlock;
