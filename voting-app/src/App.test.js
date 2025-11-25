import { render, screen } from '@testing-library/react';
import App from './App';

test('renders movie list app', () => {
  render(<App />);
  const headerElement = screen.getByText(/Список фильмов для просмотра/i);
  expect(headerElement).toBeInTheDocument();
});
