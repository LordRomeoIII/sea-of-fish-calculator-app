import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Button, Container, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function parseTime(timeSeconds) {
  let _seconds = timeSeconds % 60;
  let _minutes = Math.floor(timeSeconds / 60) % 60;
  let _hours = Math.floor(timeSeconds / 3600);

  let _parsedTime = ""

  if (_hours > 0) {
    _parsedTime += _hours + (_hours === 1 ? " hour " : " hours ")
  }

  if ((_minutes > 0) || (_hours !== 0)) {
    _parsedTime += _minutes + (_minutes === 1 ? " minute " : " minutes ")
  }

  if (_seconds > 0) {
    _parsedTime += _seconds + (_seconds === 1 ? " second " : " seconds ")
  }

  return _parsedTime ? _parsedTime : "0 seconds"
}

function InputCookable(props) {
  let {
    id,
    name,
    time,
    values,
    onUpdate,
    description
  } = props

  
  function inputChangeValidation(event) {
    let { value } = event.target
    let cleanValue = value.replace(/\D/g, '').replace(/^0+/, '')
    cleanValue = cleanValue ? +cleanValue : 0
    onUpdate({ ...values, [id]: cleanValue})
    
    // let numericRegex = /^\d+$/
    // if (value === '' || numericRegex.test(value)) {
    //   // setErrorMessage('')
    // } else {
    //   // setErrorMessage('MESSAGE')
    //   console.log("Invalid input.")
    // }
  }

  return (
    <Form.Group>
      <Form.Label>{ name }</Form.Label>
      <InputGroup>
        <Button
          variant='outline-danger'
          onClick={ () => onUpdate({ ...values, [id]: Math.max(0, values[id] - 5 )}) }
        >
          -5
        </Button>

        <Button
          variant='outline-danger'
          onClick={ () => onUpdate({ ...values, [id]: Math.max(0, values[id] - 1 )}) }
        >
          -1
        </Button>
        
        <Form.Control
          type='text'
          value={ values[id] }
          id={ id }
          className='text-center'
          name='cookable-items'
          time={ time }
          onChange={ inputChangeValidation }
        />

        <Button
          variant='outline-success'
          onClick={ () => onUpdate({ ...values, [id]: values[id] + 1 }) }
        >
          +1
        </Button>
        <Button
          variant='outline-success'
          onClick={ () => onUpdate({ ...values, [id]: values[id] + 5 }) }
        >
          +5
        </Button>

      </InputGroup>
      <Form.Text>
        { description }
      </Form.Text>
    </Form.Group>
  )
}

function App() {
  const [totalTime, setTotalTime] = useState(0)
  const [totalFish, setTotalFish] = useState(0)
  // TODO: Include time in this object instead of hacking it as a property on the inputs.
  const [inputsValue, setInputsValue] = useState({
    "regular-fish": 0,
    "trophy-fish": 0,
    "regular-meat": 0,
    "beast-meat": 0,
  })

  function resetCookableItems() {
    let newValues = {...inputsValue}
    for (const property in newValues) {
      newValues[property] = 0;
    }
    setInputsValue(newValues)
  }

  function updateTotalTime() {
    let _items = document.getElementsByName('cookable-items')
    
    let _totalTime = 0
    _items.forEach(element => {
      let _value = +element.value
      let _time = +element.getAttribute('time')
      _totalTime += _value * _time
    });
  
    setTotalTime(_totalTime)
  }

  useEffect(() => {
    function updateTotalFish() {
      setTotalFish(inputsValue['regular-fish'] + inputsValue['trophy-fish'])
    }

    updateTotalTime()
    updateTotalFish()
  }, [inputsValue])

  return (
    <Container className='p-3 main-container'>
      <Container className='p-4 mb-2 rounded-3 header'>
        <h1 className='display-1'>Sea of Fish Calculator</h1>
      </Container>
      <Container className='py-3 px-4 mb-2 rounded-3 output border-container'>
        <h3>Current total time: { parseTime(totalTime) } </h3>
        <h3 className='my-0'>Current total fish: { totalFish }</h3>
      </Container>
      <Container className='p-3 rounded-3 border-container'>
        <Form>
          <Row className='py-2'>
            <Col sm={6}>
              <InputCookable
                name="Regular Fish"
                id="regular-fish"
                time="40"
                values={ inputsValue }
                onUpdate={ setInputsValue }
                description="The most common size of fish."
              />
            </Col>
            <Col sm={6}>
              <InputCookable
                name="Trophy Fish"
                id="trophy-fish"
                time="90"
                values={ inputsValue }
                onUpdate={ setInputsValue }
                description="Bigger fish that takes longer to cook but sells for a higher price."
              />
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <InputCookable
                name="Animal Meat"
                id="regular-meat"
                time="60"
                values={ inputsValue }
                onUpdate={ setInputsValue }
                description="This includes meat from Pigs, Snakes, Chickens, and Sharks."
              />
            </Col>
            <Col sm={6}>
              <InputCookable
                name="Beast Meat"
                id="beast-meat"
                time="120"
                values={ inputsValue }
                onUpdate={ setInputsValue }
                description="This includes meat from Megalodons and the Kraken."
              />
            </Col>
          </Row>
        </Form>
      </Container>
      <div className="d-grid gap-2">
        <Button onClick={ resetCookableItems } className="my-3" variant="danger">Reset</Button>
      </div>
    </Container>
  );
}

export default App;
