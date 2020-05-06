import styled from 'styled-components'
import React from 'react'
import DateTimePicker from 'react-datetime-picker'

const StyledInput = styled.input`
  width: 100%;
  background-color: transparent;
  outline: none;
  color: inherit;
  padding: 1mm;
  border: 1px solid transparent;

  &:not([readonly]) {
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`

const EditableField = ({ readOnly = true, value = '', setter, fieldSyncTime }) => {
  const [v, setV] = React.useState(value) // inner state
  const onChange = e => {
    setV(e.target.value)
    setter(e.target.value) // export to outer state
  }
  React.useEffect(
    () => {
      setV(value) // sync with external data
    }, [value]
  )
  React.useEffect(
    () => {
      setV(value) // overwrite inner state
    }, [fieldSyncTime]
  )
  return <StyledInput readOnly={readOnly} value={v} onChange={onChange} />
}

const StyledSelection = styled.select`
  width: 100%;
  height: 1.8em;
  background-color: transparent;
  outline: none;
  color: inherit;
  border: 1px solid transparent;
  padding: 1mm;

  &:not([disabled]) {
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  &:disabled {
    appearance: none;
    text-indent: 1px;
    text-overflow: '';
  }
`
const SelectableField = ({ readOnly = true, value, setter, options = [], fieldSyncTime }) => {
  const [v, setV] = React.useState(value) // inner state
  React.useEffect(
      () => {
        setV(value) // overwrite inner state
      }, [fieldSyncTime]
    )
  const onChange = e => {
    setV(e.target.value)
    setter(e.target.value === 'true') // sync with outer
  }
  return (
    <StyledSelection disabled={readOnly} value={v} onChange={onChange}>
      {
          options.map(
            option => (
              <option key={option.key} value={option.value}>{option.key}</option>
            )
          )
        }
    </StyledSelection>
  )
}

const StyledDateTimePicker = styled(DateTimePicker)`
  background-color: transparent !important;
  color: inherit;

  input,
  span {
    border: none;
    color: #555;
  }

  .react-datetime-picker__wrapper {
    padding: 0 1mm;
    color: inherit;
    border: 1px solid ${props => props.disabled ? 'transparent' : 'initial'} !important;
  }
`

const EditableDate = ({ value = new Date(), fieldSyncTime, setter, readOnly, langKey }) => {
  const [v, setV] = React.useState(value) // inner state
  React.useEffect(
    () => {
      setV(value) // overwrite inner state
    }, [fieldSyncTime]
  )
  const onChange = e => {
    setV(e)
    setter(e.getTime()) // sync with outer
  }
  return (
    <StyledDateTimePicker
      onChange={onChange}
      value={v}
      disabled={readOnly}
      // style props:
      calendarIcon={null}
      clearIcon={null}
      disableClock
      locale={'zh-TW'}
      format={langKey === 'zhtw' ? 'y年MM月dd日 HH:mm' : 'y/MM/dd HH:mm'}
      showLeadingZeros
    />
  )
}

export { EditableField, SelectableField, EditableDate }
