import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

describe('Header Component', () => {
  test('renders logo and input correctly', () => {
    render(<Header onSearch={() => {}} />);

    const logoImg = screen.getByAltText('Logo');
    expect(logoImg).toBeInTheDocument();

    const input = screen.getByPlaceholderText("You're looking for something?");
    expect(input).toBeInTheDocument();
  });

  test('calls onSearch with the correct value when input changes', () => {
    const mockOnSearch = jest.fn();
    render(<Header onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText("You're looking for something?");

    fireEvent.change(input, { target: { value: 'React' } });

    expect(mockOnSearch).toHaveBeenCalledWith('React');
  });

  test('updates input value correctly on change', () => {
    render(<Header onSearch={() => {}} />);

    const input = screen.getByPlaceholderText("You're looking for something?");
    
    fireEvent.change(input, { target: { value: 'React Testing' } });

    expect(input).toHaveValue('React Testing');
  });
});
