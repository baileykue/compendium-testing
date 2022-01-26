import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test.skip('we can filter characters correctly', async () => {
  render(<App />);

  const filter = await screen.findByLabelText(/filter/i);
  const house = filter.children[3].textContent;
  userEvent.selectOptions(filter, house);

  const characters = await screen.findAllByText(house, { exact: false });
  const charHouses = characters.map((pokemon) => pokemon.textContent);

  const handleHouseCheck = (h) => h.toLowerCase().includes(house);

  const hasSameType = charHouses.every(handleHouseCheck);
  expect(hasSameType).toBe(true);
});
