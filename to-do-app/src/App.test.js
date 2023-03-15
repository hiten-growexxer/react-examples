import {  render } from '@testing-library/react';
import React from 'react'
import App from './App';

describe('check working', () => {
  it('Should render <App>', () => {
    render(<App/>);
  });
});
