import React from 'react'
import styled from 'styled-components'
import { GridContainer, GridItem } from './GridComponents'
import DateTimePicker from 'react-datetime-picker'

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  background-color: #fafafa;
  outline: none;
  padding: 10px;
  border: 1px solid #b4b4b4;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: PingFangTC;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #969696;


  &:read-only {
    border-color: transparent;
    background-color: transparent;
  }

  &:focus {
    border-color: #3122d2;
    box-shadow: 0 0 6px 0 rgba(49, 34, 210, 0.24);
  }

  pointer-events: ${props => props.readOnly ? 'none' : 'initial'}
`

const EditableField = React.forwardRef(({ readOnly = false, value = '', onChange }, ref) => {
  const [v, setV] = React.useState(value) // inner state
  const _onChange = e => {
    setV(e.target.value)
    onChange(e.target.value) // export to outer state
  }
  React.useEffect(
    () => {
      setV(value) // sync with external data
    }, [value]
  )
  React.useImperativeHandle(
    ref, () => ({
      setValue: value => {
        setV(value)
      }
    }), []
  )

  return (
    <StyledInput
      readOnly={readOnly}
      value={v}
      onChange={_onChange}
      placeholder='請輸入'
    />
  )
})

const Label = styled.label`
  font-family: PingFangTC;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000;
`
const StyledSelection = styled.div`
  min-width: 67px;
  width: 100%;
  height: 40px;
  position: relative;

  outline: none;

  &:hover {
    cursor: pointer;
  }

  pointer-events: ${props => props.readOnly ? 'none' : 'initial'}
`
const SelectionBox = styled.div`
  width: 100%;
  height: 100%;
  
  background-color: ${props => props.readOnly ? 'transparent' : '#fafafa'};
  padding: 10px;
  border: 1px solid ${props => {
    if (props.readOnly) {
      return 'rgba(0, 0, 0, 0)'
    }
    if (props.focus) {
      return '#3122d2'
    }
    return '#b4b4b4'
    }};
  border-radius: ${props => props.focus ? '4px 4px 0 0' : '4px'};
  box-sizing: border-box;
  outline: none;

  font-family: PingFangTC;
  font-size: 15px;
  font-weight: ${props => props.focus ? '500' : 'normal'};;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${props => props.focus ? '#000' : '#969696'};
  box-shadow: ${props => props.focus ? '0 0 6px 0 rgba(49, 34, 210, 0.24)' : 'none'};

  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);

    width: 0; 
    height: 0; 
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    ${props => {
      if (props.readOnly) {
        return
      }
      if (props.focus) {
        return 'border-bottom: 6px solid #969696;'
      }
      return 'border-top: 6px solid #969696;'
    }}
  }

  pointer-events: ${props => props.readOnly ? 'none' : 'initial'}
}
`
const OptionMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0%;
  width: 100%;
  max-height: 200px;
  overflow: scroll;
  box-sizing: border-box;

  border-radius: 0 0 4px 4px;
  box-shadow: 0 0 5px 0 rgba(49, 34, 210, 0.25);
  border: solid 1px #b4b4b4;
  background-color: #ffffff;

  z-index: 10;

  pointer-events: ${props => props.readOnly ? 'none' : 'initial'}
`
const Option = styled.div`
  width: 100%;
  height: 40px;
  background-color: #fafafa;
  outline: none;
  padding: 10px;
  border: solid 1px transparent;

  box-sizing: border-box;
  font-family: PingFangTC;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #969696;
  
  :hover {
    background-color: #e5e3f5;
    color: #3122d2;
    font-weight: 500;
  }

  pointer-events: ${props => props.readOnly ? 'none' : 'initial'}
`
const SelectableField = ({ readOnly = false, value = null, onChange, options = {}, placeholder = '請選擇' }) => {
  const [k, setK] = React.useState(value) // inner state
  const [showOptions, setShowOptions] = React.useState(false)
  React.useEffect(
    () => {
      setK(value)
    }, [value]
  )

  const onSelect = k => e => {
    setK(k)
    onChange(k) // sync with outer
    closeOptionMenu()
  }

  const toggleOptionMenu = () => setShowOptions(!showOptions)
  const closeOptionMenu = () => setShowOptions(false)

  return (
    <StyledSelection
      tabIndex={0}
      readOnly={readOnly}
      onBlur={closeOptionMenu}
    >
      <SelectionBox
        focus={showOptions}
        onClick={toggleOptionMenu}
        readOnly={readOnly}
      >
        {k === null ? placeholder : k}
      </SelectionBox>
      {
        showOptions && (
          <OptionMenu>{
            Object.keys(options).map(
              (key, i) => (
                <Option
                  key={key}
                  onClick={onSelect(key)}
                  readOnly={readOnly}
                >
                  {key}
                </Option>
              )
            )
          }
          </OptionMenu>
        )
      }
    </StyledSelection>
  )
}

const StyledDateTimePicker = styled(DateTimePicker)`
  background-color: transparent !important;
  color: inherit;

  width: 100%;
  height: 40px;
  outline: none;
 

  box-sizing: border-box;
  font-family: PingFangTC;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #969696;

  input,
  span {
    border: none;
    color: #969696;
  }

  .react-datetime-picker__wrapper {
    padding: 0 10px;
    color: inherit;
    border: 1px solid ${props => props.disabled ? 'transparent' : '#b4b4b4'} !important;
    border-radius: 4px;
    background-color: ${props => props.disabled ? 'transparent' : '#fafafa'};
  }
`

const EditableDate = ({ value = new Date(), onChange, readOnly, langKey }) => {
  const [v, setV] = React.useState(value) // inner state
  React.useEffect(
    () => {
      setV(value) // sync with outer
    }, [value]
  )
  const _onChange = e => {
    setV(e)
    onChange(e) // sync with outer
  }
  return (
    <StyledDateTimePicker
      onChange={_onChange}
      value={v}
      disabled={readOnly}
      // style props:
      calendarIcon={null}
      clearIcon={null}
      disableClock
      locale='zh-TW'
      format='y/MM/dd'
      showLeadingZeros
    />
  )
}

const genderOptions = {
  公: 'male',
  母: 'female'
}

const ligatedStateOptions = {
  已結紮: true,
  未結紮: false
}

const speciesOptions = {
  鼠: 'rat', 牛: 'cow', 虎: 'tiger', 兔: 'rabbit', 龍: 'dragon', 蛇: 'snake', 馬: 'horse', 羊: 'sheep'
}

const ageYearOptions = new Array(100).fill(0).reduce(
  (acc, cur, i) => ({ ...acc, [i]: i }), {}
)
const ageMonthOptions = new Array(12).fill(0).reduce(
  (acc, cur, i) => ({ ...acc, [i]: i }), {}
)

const PacsPatientForm = ({ readOnly = false, onChange }) => {
  const [patientId, setPatientId] = React.useState('')
  const [caseId] = React.useState('系統自動產生')
  const [name, setName] = React.useState('')
  const [species, setSpecies] = React.useState(null)
  const [breed, setBreed] = React.useState('')
  const [gender, setGender] = React.useState(null)
  const [ligatedState, setLigatedState] = React.useState(null)
  const [birthdate, setBirthdate] = React.useState(new Date())
  const [ageYear, setAgeYear] = React.useState(null)
  const [ageMonth, setAgeMonth] = React.useState(null)
  const [submitter, setSubmitter] = React.useState('')

  React.useEffect(
    () => {
      const birth = new Date(birthdate)
      const now = new Date()
      const year = now.getFullYear() - birth.getFullYear()
      const month = now.getMonth() - birth.getMonth()
      const ageYear = month < 0 ? year - 1 : year
      const ageMonth = month < 0 ? month % 12 + 12 : month

      setAgeYear(ageYear)
      setAgeMonth(ageMonth)
    }, [birthdate]
  )

  React.useEffect(
    () => {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth()
      const birthdate = new Date(year - ageYear, month - ageMonth)
      setBirthdate(birthdate)
    }, [ageYear, ageMonth]
  )

  const form = React.useMemo(
    () => ({
      patientId,
      caseId,
      name,
      species,
      breed,
      gender,
      ligatedState,
      birthdate,
      ageYear,
      ageMonth,
      submitter
    }),
    [patientId,
      caseId,
      name,
      species,
      breed,
      gender,
      ligatedState,
      birthdate,
      ageYear,
      ageMonth,
      submitter]
  )

  React.useEffect(
    () => {
      if (onChange) {
        onChange(form)
      }
    }
  )

  return (
    <GridContainer
      gridTemplateColumns='1fr 1fr 1fr 1fr'
      gridTemplateRows='repeat(6, auto)'
    >
      <GridItem x={1} y={1} spanX={2} spanY={1}>
        <Label>病歷號碼</Label>
      </GridItem>
      <GridItem x={1} y={2} spanX={2} spanY={1}>
        <EditableField readOnly={readOnly} value={patientId} onChange={setPatientId} />
      </GridItem>

      <GridItem x={3} y={1} spanX={2} spanY={1}>
        <Label>案件編號</Label>
      </GridItem>
      <GridItem x={3} y={2} spanX={2} spanY={1}>
        <EditableField readOnly value={caseId} />
      </GridItem>

      <GridItem x={1} y={3} spanX={1} spanY={1}>
        <Label>動物名字</Label>
      </GridItem>
      <GridItem x={1} y={4} spanX={1} spanY={1}>
        <EditableField readOnly={readOnly} value={name} onChange={setName} />
      </GridItem>

      <GridItem x={2} y={3} spanX={1} spanY={1}>
        <Label>物種</Label>
      </GridItem>
      <GridItem x={2} y={4} spanX={1} spanY={1}>
        <SelectableField
          readOnly={readOnly}
          value={species}
          options={speciesOptions}
          onChange={key => setSpecies(key)}
        />
      </GridItem>

      <GridItem x={3} y={3} spanX={1} spanY={1}>
        <Label>品種</Label>
      </GridItem>
      <GridItem x={3} y={4} spanX={1} spanY={1}>
        <EditableField readOnly={readOnly} value={breed} onChange={setBreed} />
      </GridItem>

      <GridItem x={4} y={3} spanX={1} spanY={1}>
        <Label>性別</Label>
      </GridItem>
      <GridItem x={4} y={4} spanX={1} spanY={1}>
        <SelectableField
          readOnly={readOnly}
          value={gender}
          options={genderOptions}
          onChange={key => setGender(key)}
        />
      </GridItem>

      <GridItem x={1} y={5} spanX={1} spanY={1}>
        <Label>結紮狀態</Label>
      </GridItem>
      <GridItem x={1} y={6} spanX={1} spanY={1}>
        <SelectableField
          readOnly={readOnly}
          value={ligatedState}
          options={ligatedStateOptions}
          onChange={key => setLigatedState(key)}
        />
      </GridItem>

      <GridItem x={2} y={5} spanX={1} spanY={1}>
        <Label>生日</Label>
      </GridItem>
      <GridItem x={2} y={6} spanX={1} spanY={1}>
        <EditableDate
          readOnly={readOnly}
          value={birthdate}
          onChange={setBirthdate}
        />
      </GridItem>

      <GridItem x={3} y={5} spanX={1} spanY={1}>
        <Label>年齡</Label>
      </GridItem>
      <GridItem x={3} y={6} spanX={1} spanY={1}>
        <SelectableField
          readOnly={readOnly}
          value={ageYear}
          options={ageYearOptions}
          placeholder='-'
          onChange={key => setAgeYear(key)}
        />
        <span style={{
          marginLeft: '8px',
          marginRight: '24px'
        }}
        >歲
        </span>
        <SelectableField
          readOnly={readOnly}
          value={ageMonth}
          options={ageMonthOptions}
          placeholder='-'
          onChange={key => setAgeMonth(key)}
        />
        <span style={{
          marginLeft: '8px',
          marginRight: '24px'
        }}
        >月
        </span>
      </GridItem>

      <GridItem x={4} y={5} spanX={1} spanY={1}>
        <Label>送件醫師</Label>
      </GridItem>
      <GridItem x={4} y={6} spanX={1} spanY={1}>
        <EditableField readOnly={readOnly} value={submitter} onChange={setSubmitter} />
      </GridItem>
    </GridContainer>
  )
}

export default PacsPatientForm
