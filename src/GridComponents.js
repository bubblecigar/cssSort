import styled from 'styled-components'
import React from 'react'

const Page = styled.div`
  font-size: 15px;
  color: #555;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  padding: 1cm;
  page-break-inside: avoid;

  .printButton {
    &:hover {
      cursor: pointer;
    }
  }

  div::-webkit-scrollbar {
    appearance: none;
    height: 2mm;
  }

  div::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }

  @media print {
    font-size: 12px;

    .rowStripe {
      background-color: transparent !important;
    }

    .printButton {
      visibility: hidden;
    }

    div::-webkit-scrollbar {
      appearance: none;
    }

    div::-webkit-scrollbar-thumb {
      background-color: transparent;
      box-shadow: none;
    }
  }
`
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => props.gridTemplateColumns};
  grid-template-rows: ${props => props.gridTemplateRows};

  @media print {
    grid-template-columns: ${props => props.gridTemplateColumnsForPrint || props.gridTemplateColumns};
    grid-template-rows: ${props => props.gridTemplateRowsForPrint || props.gridTemplateRows};
  }
`
const at = ({ x, y, spanX = 1, spanY = 1 }) => ({
  gridColumn: `${x} / span ${spanX}`,
  gridRow: `${y} / span ${spanY}`
})
const GridItemStyle = styled.div`
  display: flex;
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'center'};
  white-space: nowrap;
  padding: 2mm;
`
const GridItem = ({ children, x, y, spanX, spanY, style = {} }) => (
  <GridItemStyle style={{ ...at({ x, y, spanX, spanY }), ...style }}>
    {children}
  </GridItemStyle>
)

export { Page, GridContainer, GridItem }
