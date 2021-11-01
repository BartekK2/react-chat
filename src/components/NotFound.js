import React from 'react';
import { Redirect } from 'react-router-dom';

const NotFound = () => (
  <div>
    <h1>404 - Not Found!</h1>
      <Redirect to="/" />
    </div>
);

export default NotFound;