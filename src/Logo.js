import React from 'react'
import styled from 'styled-components'

const LogoStyle = styled.div`
  text-transform: uppercase;
  height: 37px;
  line-height: 37px;
  display: inline-flex;

`

const Letter = styled.div`
  color: #3122d2;
  font-size: 49px;
  font-weight: 800;

  &:nth-child(2) {
    color: #50e3c2;
    font-size: 52px;
    position: relative;
  }
`

const Decoration = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: #50e3c2;

  &:nth-of-type(1) {
    left: 0;
    bottom: 100%;
  }
  &:nth-of-type(2) {
    bottom: calc(100% + 4px);
    left: 50%;
    transform: translateX(-50%);
    width: 9px;
    height: 9px;
  }
  &:nth-of-type(3) {
    right: 0;
    bottom: 100%;
  }
`

const Logo = ({
  primaryColor = '#3122d2',
  secondaryColor = '#50e3c2'
}) => (
  <LogoStyle
    primaryColor={primaryColor}
    secondaryColor={secondaryColor}
  >
    <Letter>
        s
    </Letter>
    <Letter>
        o
      <Decoration />
      <Decoration />
      <Decoration />
    </Letter>
    <Letter>
        u
    </Letter>
    <Letter>
        l
    </Letter>
    <Letter>
        v
    </Letter>
    <Letter>
        e
    </Letter>
    <Letter>
        t
    </Letter>
  </LogoStyle>
)

export default Logo
