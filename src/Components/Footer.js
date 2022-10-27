import React from 'react';
import styled from 'styled-components';

const Foot = styled.footer`
  display: flex;
  justify-content: center;
  margin-top: 200px;
  margin-bottom: 20px;
  font-size: 10px;
  border-top: 1px;
  padding-top: 20px;
  border-top-color: #777;
  border-top-style: solid;
  color: #777;
`;

function Footer() {
  return <Foot>Copylight (C) whksl.k & crystal.h All rights reserved.</Foot>;
}

export default Footer;
