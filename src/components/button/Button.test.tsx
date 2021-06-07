import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Test', () => {
  it('able to click button', () => {
    const { getByText } = render(<Button onClick={() => console.log('test')}>test</Button>);

    const buttonObject = getByText('test');
    expect(buttonObject).toBeEnabled();

    fireEvent.click(buttonObject);
  });
});
