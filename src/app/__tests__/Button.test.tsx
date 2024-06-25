import Button from '@/shared/Button';
import { fireEvent, render, screen } from '@testing-library/react';

test('renders without props', () => {
  render(<Button text='Test' disabled={false} submit={false} focus={false} />);
  expect(screen.getByText('Test')).toBeInstanceOf(HTMLButtonElement);
  expect(screen.getByText('Test')).toHaveProperty('disabled', false);
  expect(screen.getByText('Test')).toHaveProperty('type', 'button');
  expect(screen.getByRole('button').className).toContain('btn');
  expect(screen.getByRole('button').className).not.toContain('btn_disabled');
});

test('renders with props', () => {
  render(<Button text='Test' disabled={true} submit={true} focus={true} />);
  expect(screen.getByText('Test')).toBeInstanceOf(HTMLButtonElement);
  expect(screen.getByText('Test')).toHaveProperty('disabled', true);
  expect(screen.getByText('Test')).toHaveProperty('type', 'submit');
  expect(screen.getByRole('button').className).toContain('btn');
  expect(screen.getByRole('button').className).toContain('btn_disabled');
});

test('calls event handler', () => {
  const callback = jest.fn();
  render(<Button text='Test' callback={callback} />);
  fireEvent(
    screen.getByRole('button'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    })
  );
  expect(callback).toHaveBeenCalledTimes(1);
});
