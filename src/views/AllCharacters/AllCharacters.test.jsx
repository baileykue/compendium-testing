import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import AllCharacters from './AllCharacters';

test('header and dropdown renders in a loading state', async () => {
  render(<AllCharacters />);

  const header = screen.getByRole('heading', {
    name: /welcome to hogwarts/i,
  });
  const crest = screen.getByAltText(/hogwarts crest/i);
  const filter = screen.getByLabelText(/filter/i);
  const loading = screen.getByText(/loading characters/i);

  expect(loading).toBeInTheDocument();
  expect(filter.children.length).toEqual(5);
  expect(header).toBeInTheDocument();
  expect(crest).toBeInTheDocument();
  await waitForElementToBeRemoved(loading);
});

test('list of characters renders ', async () => {
  render(<AllCharacters />);

  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const charList = await screen.findAllByRole('listitem');
  expect(charList).toHaveLength(25);
});
