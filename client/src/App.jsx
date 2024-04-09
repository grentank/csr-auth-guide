import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Container>
      <Row>
        <h1>Hello</h1>
      </Row>
      <div>asddasdas</div>
      <div>
        <Outlet />
      </div>
    </Container>
  );
}

export default App;
