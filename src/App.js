import React from 'react'
import PacsPatientForm from './PacsPatientForm'

function App () {
  const [readonly, setReadonly] = React.useState(false)
  return (
    <>
      <button onClick={() => { setReadonly(!readonly) }}>toggle readonly</button>
      <PacsPatientForm readOnly={readonly} />
    </>
  )
}

export default App
