import React from 'react'
import styled from 'styled-components'
import { Page, GridContainer, GridItem } from './GridComponents'

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
  color: #000000;


  &:read-only {
    border-color: transparent;
    background-color: transparent;
  }

  &:focus {
    border-color: #3122d2;
    box-shadow: 0 0 6px 0 rgba(49, 34, 210, 0.24);
  }
`

const EditableField = React.forwardRef(({ readOnly = false, value = '', setter }, ref) => {
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
  React.useImperativeHandle(
    ref, () => ({
      setValue: value => {
        setV(value)
      }
    }), []
  )

  return <StyledInput readOnly={readOnly} value={v} onChange={onChange} />
})

const Label = styled.label`
  font-family: PingFangTC;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
`

function App () {
  return (
    <PacsPatientForm readOnly={false} />
  )
}

const PacsPatientForm = ({ readOnly = false }) => {
  const [patientId, setPatientId] = React.useState('')
  const [caseId, setCaseId] = React.useState('')
  const [name, setName] = React.useState('')
  const [species, setSpecies] = React.useState('')
  const [breed, setBreed] = React.useState('')
  const [gender, setGender] = React.useState('')
  const [ligatedState, setLigatedState] = React.useState('')
  const [birthdate, setBirthdate] = React.useState('')
  const [age, setAge] = React.useState('')
  const [submitter, setSubmitter] = React.useState('')

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
      age,
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
      age,
      submitter]
  )

  React.useEffect(
    () => {
      console.log('form:', form)
    }
  )

  return (
    <GridContainer
      gridTemplateColumns='1fr, 1fr, 1fr, 1fr'
      gridTemplateRows='repeat(6, auto)'
    >
      <GridItem x={1} y={1} spanX={2} spanY={1}>
        <Label>病歷號碼</Label>
      </GridItem>
      <GridItem x={1} y={2} spanX={2} spanY={1}>
        <EditableField readOnly={readOnly} value={patientId} setter={setPatientId} />
      </GridItem>

      <GridItem x={3} y={1} spanX={2} spanY={1}>
        <Label>案件編號</Label>
      </GridItem>
      <GridItem x={3} y={2} spanX={2} spanY={1}>
        <EditableField readOnly={readOnly} value={caseId} setter={setCaseId} />
      </GridItem>

      <GridItem x={1} y={3} spanX={1} spanY={1}>
        <Label>動物名字</Label>
      </GridItem>
      <GridItem x={1} y={4} spanX={1} spanY={1}>
        <EditableField readOnly={readOnly} value={name} setter={setName} />
      </GridItem>

      <GridItem x={2} y={3} spanX={1} spanY={1}>
        <Label>物種</Label>
      </GridItem>
      <GridItem x={2} y={4} spanX={1} spanY={1}>
        <EditableField readOnly={readOnly} value={species} setter={setSpecies} />
      </GridItem>

      <GridItem x={3} y={3} spanX={1} spanY={1}>
        <Label>品種</Label>
      </GridItem>
      <GridItem x={3} y={4} spanX={1} spanY={1}>
        <EditableField readOnly={readOnly} value={breed} setter={setBreed} />
      </GridItem>

      <GridItem x={4} y={3} spanX={1} spanY={1}>
        <Label>性別</Label>
      </GridItem>
      <GridItem x={4} y={4} spanX={1} spanY={1}>
        <EditableField readOnly={readOnly} value={gender} setter={setGender} />
      </GridItem>

      <GridItem x={1} y={5} spanX={1} spanY={1}>
        <Label>結紮狀態</Label>
      </GridItem>
      <GridItem x={1} y={6} spanX={1} spanY={1}>
        <EditableField readOnly={readOnly} value={ligatedState} setter={setLigatedState} />
      </GridItem>

      <GridItem x={2} y={5} spanX={1} spanY={1}>
        <Label>生日</Label>
      </GridItem>
      <GridItem x={2} y={6} spanX={1} spanY={1}>
        <EditableField readOnly={readOnly} value={birthdate} setter={setBirthdate} />
      </GridItem>

      <GridItem x={3} y={5} spanX={1} spanY={1}>
        <Label>年齡</Label>
      </GridItem>
      <GridItem x={3} y={6} spanX={1} spanY={1}>
        <EditableField readOnly={readOnly} value={age} setter={setAge} />
      </GridItem>

      <GridItem x={4} y={5} spanX={1} spanY={1}>
        <Label>送件醫師</Label>
      </GridItem>
      <GridItem x={4} y={6} spanX={1} spanY={1}>
        <EditableField readOnly={readOnly} value={submitter} setter={setSubmitter} />
      </GridItem>
    </GridContainer>
  )
}

export default App
