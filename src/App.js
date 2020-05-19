import React from 'react'
import styled from 'styled-components'

import cssSort from './cssSort.js'
const Wrapper = styled.div`
`
const Table = styled.div`
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  display: flex;
  max-width: 800px;
  margin: 50px auto;
`
const Row = styled.div`
  box-sizing: border-box;
  padding: 14px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`
const ActivableRow = styled(Row)`
  &:hover {
    background-color: rgba(49, 34, 210, 0.1);
    cursor: pointer;
  }
  font-size: 18px;
`
const Item = styled.div`
  flex-basis: ${props => props.basis || 0};
  flex-grow: ${props => props.grow || 1};
`

function App () {
  const [value, setValue] = React.useState('')
  const onChange = e => setValue(e.target.value)
  const copy = e => {
    navigator.clipboard.writeText(e.target.textContent).then(
      r => {
        console.log('copied to clipBoard')
      }
    ).catch(
      e => {
        console.log('permission denied')
      }
    )
  }
  // console.log(cssSort(value))
  return (
    <Wrapper>
      <Table>
        <ActivableRow>
          <Input value={value} onChange={onChange} />
        </ActivableRow>
        <ActivableRow onClick={copy} style={{ whiteSpace: 'break-spaces' }}>
          {cssSort(value)}
        </ActivableRow>
      </Table>
    </Wrapper>
  )
}

const Input = styled.textarea`
  font-size: 18px;
  width: 100%;
  height: 300px;
  padding: 5px;
  outline: none;
  font-family: sans-serif;
`

export default App
