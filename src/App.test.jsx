import { findByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('we can filter characters correctly', async () => {
  render(<App />);

  const filter = await screen.findByRole('combobox');
  userEvent.selectOptions(filter, 'Hufflepuff');

  expect(screen.getByRole('option', { name: /hufflepuff/i }).selected).toBe(true);

  const button = screen.getByRole('button', { name: /submit/i });
  userEvent.click(button);
  const charList = await screen.findAllByRole('listitem');

  expect(charList).toHaveLength(18);
});
