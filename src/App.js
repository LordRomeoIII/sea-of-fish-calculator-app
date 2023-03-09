import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Button, Container, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

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

function updateTotalTime() {
  let _items = document.getElementsByName('cookable-items')

  let _totalTime = 0
  _items.forEach(element => {
    let _value = +element.value
    let _time = +element.getAttribute('time')
    _totalTime += _value * _time
  });

  return _totalTime
}

function resetCookableItems() {
  let _items = document.getElementsByName('cookable-items')

  _items.forEach(element => {
    element.value = 0
  });
}

function InputCookable(props) {
  function modifyInput(id, increment) {
    let _inputElement = document.getElementById(id)
    let _currentValue = +_inputElement.value
    _inputElement.value = Math.max(_currentValue + increment, 0)
  }

  return (
    <Form.Group>
      <Form.Label>{props.name}</Form.Label>
      <InputGroup>
        <Button
          variant='outline-danger'
          onClick={() => {
            modifyInput(props.id, -5)
            props.onChange(updateTotalTime())
          }}>-5</Button>

        <Button
          variant='outline-danger'
          onClick={() => {
            modifyInput(props.id, -1)
            props.onChange(updateTotalTime())
          }}>-1</Button>

        <Form.Control
          type='text'
          defaultValue='0'
          id={props.id}
          className='text-center'
          name='cookable-items'
          time={props.time}
          onChange={() => props.onChange(updateTotalTime())}
        />

        <Button
          variant='outline-success'
          onClick={() => {
            modifyInput(props.id, 1)
            props.onChange(updateTotalTime())
          }}>+1</Button>

        <Button
          variant='outline-success'
          onClick={() => {
            modifyInput(props.id, 5)
            props.onChange(updateTotalTime())
          }}>+5</Button>

      </InputGroup>
      <Form.Text>
        { props.description }
      </Form.Text>
    </Form.Group>
  )
}

function App() {
  const [totalTime, setTotalTime] = useState(0)
  return (
    <Container className='p-3'>
      <Container className='p-5 mb-4 text-bg-dark rounded-3'>
        <h1 className='header'>Sea of Fish Calculator</h1>
      </Container>
      <Container>
        <h2>Current total time: { parseTime(totalTime) }</h2>
        <Form>
          <Row className='py-2'>
            <Col sm={6}>
              <InputCookable
                name="Regular Fish"
                id="regular-fish"
                time="40"
                onChange={ setTotalTime }
                description="The most common size of fish."
              />
            </Col>
            <Col sm={6}>
              <InputCookable
                name="Trophy Fish"
                id="trophy-fish"
                time="90"
                onChange={ setTotalTime }
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
                onChange={ setTotalTime }
                description="This includes meat from Pigs, Snakes, Chickens, and Sharks."
              />
            </Col>
            <Col sm={6}>
              <InputCookable
                name="Beast Meat"
                id="beast-meat"
                time="120"
                onChange={ setTotalTime }
                description="This includes meat from Megalodons and the Kraken."
              />
            </Col>
          </Row>
          <div className="d-grid gap-2">
            <Button onClick={() => { resetCookableItems(); setTotalTime(0) }} className="my-3" variant="danger">Reset</Button>
          </div>
        </Form>
      </Container>
    </Container>
  );
}

export default App;
