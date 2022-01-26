import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import AllCharacters from './AllCharacters';

test('list of characters renders in a loading state', async () => {
  render(<AllCharacters />);

  const header = screen.getByRole('heading', {
    name: /welcome to hogwarts/i,
  });
  const crest = screen.getByAltText(/hogwarts crest/i);
  const loading = screen.getByText(/loading characters/i);

  expect(loading).toBeInTheDocument();
  expect(header).toBeInTheDocument();
  expect(crest).toBeInTheDocument();
  await waitForElementToBeRemoved(loading);
});
