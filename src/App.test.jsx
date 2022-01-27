import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from './App';

const staffData = [
  {
    name: 'Minerva McGonagall',
    alternate_names: [],
    species: 'human',
    gender: 'female',
    house: 'Gryffindor',
    dateOfBirth: '04-10-1925',
    yearOfBirth: 1925,
    wizard: true,
    ancestry: '',
    eyeColour: '',
    hairColour: 'black',
    wand: {
      wood: '',
      core: '',
      length: '',
    },
    patronus: 'tabby cat',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: 'Dame Maggie Smith',
    alternate_actors: [],
    alive: true,
    image: 'http://hp-api.herokuapp.com/images/mcgonagall.jpg',
  },
  {
    name: 'Severus Snape',
    alternate_names: ['Half-Blood Prince'],
    species: 'human',
    gender: 'male',
    house: 'Slytherin',
    dateOfBirth: '09-01-1960',
    yearOfBirth: 1960,
    wizard: true,
    ancestry: 'half-blood',
    eyeColour: 'black',
    hairColour: 'black',
    wand: {
      wood: '',
      core: '',
      length: '',
    },
    patronus: 'doe',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: 'Alan Rickman',
    alternate_actors: [],
    alive: false,
    image: 'http://hp-api.herokuapp.com/images/snape.jpg',
  },
  {
    name: 'Rubeus Hagrid',
    alternate_names: [],
    species: 'half-giant',
    gender: 'male',
    house: 'Gryffindor',
    dateOfBirth: '06-12-1928',
    yearOfBirth: 1928,
    wizard: true,
    ancestry: 'half-blood',
    eyeColour: 'black',
    hairColour: 'black',
    wand: {
      wood: 'oak',
      core: '',
      length: 16,
    },
    patronus: '',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: 'Robbie Coltrane',
    alternate_actors: [],
    alive: true,
    image: 'http://hp-api.herokuapp.com/images/hagrid.png',
  },
  {
    name: 'Remus Lupin',
    alternate_names: ['Professor Lupin', 'Moony', 'Remus John Lupin'],
    species: 'werewolf',
    gender: 'male',
    house: 'Gryffindor',
    dateOfBirth: '10-03-1960',
    yearOfBirth: 1960,
    wizard: true,
    ancestry: 'half-blood',
    eyeColour: 'green',
    hairColour: 'brown',
    wand: {
      wood: 'cypress',
      core: 'unicorn tail-hair',
      length: 10.25,
    },
    patronus: 'wolf',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: 'David Thewlis',
    alternate_actors: [],
    alive: false,
    image: 'http://hp-api.herokuapp.com/images/lupin.jpg',
  },
  {
    name: 'Horace Slughorn',
    alternate_names: [],
    species: 'human',
    gender: 'male',
    house: 'Slytherin',
    dateOfBirth: '',
    yearOfBirth: '',
    wizard: true,
    ancestry: 'pure-blood',
    eyeColour: 'green',
    hairColour: 'blonde',
    wand: {
      wood: 'cedar',
      core: 'dragon heartstring',
      length: 10.25,
    },
    patronus: '',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: 'Jim Broadbent',
    alternate_actors: [],
    alive: true,
    image: 'http://hp-api.herokuapp.com/images/slughorn.JPG',
  },
  {
    name: 'Dolores Umbridge',
    alternate_names: [],
    species: 'human',
    gender: 'female',
    house: 'Slytherin',
    dateOfBirth: '',
    yearOfBirth: '',
    wizard: true,
    ancestry: 'half-blood',
    eyeColour: 'brown',
    hairColour: 'grey',
    wand: {
      wood: 'birch',
      core: 'dragon heartstring',
      length: 8,
    },
    patronus: 'persian cat',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: 'Imelda Staunton',
    alternate_actors: [],
    alive: true,
    image: 'http://hp-api.herokuapp.com/images/umbridge.jpg',
  },
  {
    name: 'Mrs Norris',
    alternate_names: [],
    species: 'cat',
    gender: 'female',
    house: '',
    dateOfBirth: '',
    yearOfBirth: '',
    wizard: false,
    ancestry: '',
    eyeColour: 'yellow',
    hairColour: 'brown',
    wand: {
      wood: '',
      core: '',
      length: '',
    },
    patronus: '',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: 'Maxime, Alanis and Tommy the cats',
    alternate_actors: [],
    alive: true,
    image: 'http://hp-api.herokuapp.com/images/norris.JPG',
  },
  {
    name: 'Argus Filch',
    alternate_names: [],
    species: 'human',
    gender: 'male',
    house: '',
    dateOfBirth: '',
    yearOfBirth: '',
    wizard: false,
    ancestry: 'squib',
    eyeColour: '',
    hairColour: 'grey',
    wand: {
      wood: '',
      core: '',
      length: '',
    },
    patronus: '',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: 'David Bradley',
    alternate_actors: [],
    alive: true,
    image: 'http://hp-api.herokuapp.com/images/filch.jpg',
  },
  {
    name: 'Albus Dumbledore',
    alternate_names: [],
    species: 'human',
    gender: 'male',
    house: 'Gryffindor',
    dateOfBirth: '',
    yearOfBirth: 0,
    wizard: true,
    ancestry: 'half-blood',
    eyeColour: 'blue',
    hairColour: 'silver',
    wand: {
      wood: '',
      core: '',
      length: '',
    },
    patronus: '',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: 'Richard Harris',
    alternate_actors: ['Michael Gambon'],
    alive: false,
    image: '',
  },
  {
    name: 'Madam Pomfrey',
    alternate_names: ['Poppy Pomfrey'],
    species: 'human',
    gender: 'female',
    house: '',
    dateOfBirth: '',
    yearOfBirth: '',
    wizard: true,
    ancestry: '',
    eyeColour: '',
    hairColour: '',
    wand: {
      wood: '',
      core: '',
      length: '',
    },
    patronus: '',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: 'Gemma Jones',
    alternate_actors: [],
    alive: true,
    image: '',
  },
  {
    name: 'Quirinus Quirrel',
    alternate_names: ['Professor Quirrel'],
    species: 'human',
    gender: 'male',
    house: '',
    dateOfBirth: '',
    yearOfBirth: '',
    wizard: true,
    ancestry: '',
    eyeColour: '',
    hairColour: '',
    wand: {
      wood: '',
      core: '',
      length: '',
    },
    patronus: '',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: 'Ian Hart',
    alternate_actors: [],
    alive: false,
    image: '',
  },
  {
    name: 'Pomona Sprout',
    alternate_names: ['Professor Sprout'],
    species: 'human',
    gender: 'female',
    house: 'Hufflepuff',
    dateOfBirth: '',
    yearOfBirth: '',
    wizard: true,
    ancestry: '',
    eyeColour: '',
    hairColour: '',
    wand: {
      wood: '',
      core: '',
      length: '',
    },
    patronus: '',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: 'Miriam Margolyes',
    alternate_actors: [],
    alive: true,
    image: '',
  },
  {
    name: 'Cuthbert Binns',
    alternate_names: ['Professor Binns'],
    species: 'ghost',
    gender: 'male',
    house: '',
    dateOfBirth: '',
    yearOfBirth: '',
    wizard: true,
    ancestry: '',
    eyeColour: '',
    hairColour: '',
    wand: {
      wood: '',
      core: '',
      length: '',
    },
    patronus: '',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: '',
    alternate_actors: [],
    alive: false,
    image: '',
  },
  {
    name: 'Filius Flitwick',
    alternate_names: ['Professor Flitwick'],
    species: 'human',
    gender: 'male',
    house: 'Ravenclaw',
    dateOfBirth: '',
    yearOfBirth: '',
    wizard: true,
    ancestry: '',
    eyeColour: '',
    hairColour: '',
    wand: {
      wood: '',
      core: '',
      length: '',
    },
    patronus: '',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: 'Warwick Davis',
    alternate_actors: [],
    alive: true,
    image: '',
  },
  {
    name: 'Madam Hooch',
    alternate_names: ['Rolanda Hooch'],
    species: 'human',
    gender: 'female',
    house: '',
    dateOfBirth: '',
    yearOfBirth: '',
    wizard: true,
    ancestry: '',
    eyeColour: 'yellow',
    hairColour: 'grey',
    wand: {
      wood: '',
      core: '',
      length: '',
    },
    patronus: '',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: 'Zoë Wanamaker',
    alternate_actors: [],
    alive: true,
    image: '',
  },
  {
    name: 'Firenze',
    alternate_names: ['Professor Firenze'],
    species: 'centaur',
    gender: 'male',
    house: '',
    dateOfBirth: '',
    yearOfBirth: '',
    wizard: false,
    ancestry: '',
    eyeColour: 'blue',
    hairColour: 'blond',
    wand: {
      wood: '',
      core: '',
      length: '',
    },
    patronus: '',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: 'Ray Fearon',
    alternate_actors: [],
    alive: true,
    image: '',
  },
  {
    name: 'Gilderoy Lockhart',
    alternate_names: ['Professor Lockhart'],
    species: 'human',
    gender: 'male',
    house: '',
    dateOfBirth: '',
    yearOfBirth: '',
    wizard: true,
    ancestry: 'half-blood',
    eyeColour: 'blue',
    hairColour: 'blond',
    wand: {
      wood: 'cherry',
      core: 'dragon heartstring',
      length: 9,
    },
    patronus: '',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: 'Kenneth Branagh',
    alternate_actors: [],
    alive: true,
    image: '',
  },
  {
    name: 'Madame Pince',
    alternate_names: ['Irma Pince'],
    species: 'human',
    gender: 'female',
    house: '',
    dateOfBirth: '',
    yearOfBirth: '',
    wizard: true,
    ancestry: '',
    eyeColour: '',
    hairColour: '',
    wand: {
      wood: '',
      core: '',
      length: '',
    },
    patronus: '',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: 'Sally Mortemore',
    alternate_actors: [],
    alive: true,
    image: '',
  },
  {
    name: 'Sybill Trelawney',
    alternate_names: ['Sybill Patricia Trelawney', 'Professor Trelawney'],
    species: 'human',
    gender: 'female',
    house: '',
    dateOfBirth: '',
    yearOfBirth: '',
    wizard: true,
    ancestry: '',
    eyeColour: '',
    hairColour: '',
    wand: {
      wood: '',
      core: '',
      length: '',
    },
    patronus: '',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: 'Emma Thompson',
    alternate_actors: [],
    alive: true,
    image: '',
  },
  {
    name: 'Septima Vector',
    alternate_names: ['Professor Vector'],
    species: 'human',
    gender: 'female',
    house: '',
    dateOfBirth: '',
    yearOfBirth: '',
    wizard: true,
    ancestry: '',
    eyeColour: '',
    hairColour: '',
    wand: {
      wood: '',
      core: '',
      length: '',
    },
    patronus: '',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: '',
    alternate_actors: [],
    alive: true,
    image: '',
  },
  {
    name: 'Aurora Sinistra',
    alternate_names: ['Professor Sinistra'],
    species: 'human',
    gender: 'female',
    house: '',
    dateOfBirth: '',
    yearOfBirth: '',
    wizard: true,
    ancestry: '',
    eyeColour: '',
    hairColour: '',
    wand: {
      wood: '',
      core: '',
      length: '',
    },
    patronus: '',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: '',
    alternate_actors: [],
    alive: true,
    image: '',
  },
  {
    name: 'Alastor Moody',
    alternate_names: ['Professor Moody', 'Mad-Eye'],
    species: 'human',
    gender: 'male',
    house: '',
    dateOfBirth: '',
    yearOfBirth: '',
    wizard: true,
    ancestry: 'pure-blood',
    eyeColour: 'dark',
    hairColour: 'grey',
    wand: {
      wood: '',
      core: '',
      length: '',
    },
    patronus: '',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: 'Brendan Gleeson',
    alternate_actors: [],
    alive: false,
    image: '',
  },
  {
    name: 'Wilhelmina Grubbly-Plank',
    alternate_names: ['Professor Grubbly-Plank'],
    species: 'human',
    gender: 'female',
    house: '',
    dateOfBirth: '',
    yearOfBirth: '',
    wizard: true,
    ancestry: '',
    eyeColour: '',
    hairColour: 'grey',
    wand: {
      wood: '',
      core: '',
      length: '',
    },
    patronus: '',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: 'Apple Brook',
    alternate_actors: [],
    alive: true,
    image: '',
  },
  {
    name: 'Galatea Merrythought',
    alternate_names: [],
    species: 'human',
    gender: 'female',
    house: '',
    dateOfBirth: '',
    yearOfBirth: '',
    wizard: true,
    ancestry: '',
    eyeColour: '',
    hairColour: '',
    wand: {
      wood: '',
      core: '',
      length: '',
    },
    patronus: '',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: '',
    alternate_actors: [],
    alive: false,
    image: '',
  },
  {
    name: 'Charity Burbage',
    alternate_names: [],
    species: 'human',
    gender: 'female',
    house: '',
    dateOfBirth: '',
    yearOfBirth: '',
    wizard: true,
    ancestry: '',
    eyeColour: '',
    hairColour: '',
    wand: {
      wood: '',
      core: '',
      length: '',
    },
    patronus: '',
    hogwartsStudent: false,
    hogwartsStaff: true,
    actor: 'Carolyn Pickles',
    alternate_actors: [],
    alive: false,
    image: '',
  },
];

const server = setupServer(
  rest.get('https://hp-api.herokuapp.com/api/characters/staff', (req, res, ctx) => {
    return res(ctx.json(staffData));
  })
);

beforeAll(() => server.listen());

afterAll(() => server.close());

test('the filter is one the page', async () => {
  render(<App />);

  // await waitForElementToBeRemoved(() => screen.getByText('Loading Characters...'), {
  //   timeout: 5000,
  // });

  const filter = await screen.findByRole('combobox');
  userEvent.selectOptions(filter, 'Hufflepuff');

  expect(screen.getByRole('option', { name: /hufflepuff/i }).selected).toBe(true);
});

test.only('we can filter characters correctly', async () => {
  const huffleData = [
    {
      name: 'Cedric Diggory',
      alternate_names: [],
      species: 'human',
      gender: 'male',
      house: 'Hufflepuff',
      dateOfBirth: '',
      yearOfBirth: 1977,
      wizard: true,
      ancestry: '',
      eyeColour: 'grey',
      hairColour: 'brown',
      wand: {
        wood: 'ash',
        core: 'unicorn hair',
        length: 12.25,
      },
      patronus: '',
      hogwartsStudent: true,
      hogwartsStaff: false,
      actor: 'Robert Pattinson',
      alternate_actors: [],
      alive: false,
      image: 'http://hp-api.herokuapp.com/images/cedric.png',
    },
    {
      name: 'Fat Friar',
      alternate_names: [],
      species: 'ghost',
      gender: 'male',
      house: 'Hufflepuff',
      dateOfBirth: '',
      yearOfBirth: '',
      wizard: true,
      ancestry: '',
      eyeColour: '',
      hairColour: '',
      wand: {
        wood: '',
        core: '',
        length: '',
      },
      patronus: '',
      hogwartsStudent: false,
      hogwartsStaff: false,
      actor: 'Simon Fisher-Becker',
      alternate_actors: [],
      alive: false,
      image: '',
    },
    {
      name: 'Hannah Abbott',
      alternate_names: [],
      species: 'human',
      gender: 'female',
      house: 'Hufflepuff',
      dateOfBirth: '',
      yearOfBirth: '',
      wizard: true,
      ancestry: 'half-blood',
      eyeColour: '',
      hairColour: 'blonde',
      wand: {
        wood: '',
        core: '',
        length: '',
      },
      patronus: '',
      hogwartsStudent: true,
      hogwartsStaff: false,
      actor: 'Charlotte Skeoch',
      alternate_actors: ['Louisa Warren'],
      alive: true,
      image: '',
    },
    {
      name: 'Susan Bones',
      alternate_names: [],
      species: 'human',
      gender: 'female',
      house: 'Hufflepuff',
      dateOfBirth: '',
      yearOfBirth: '',
      wizard: true,
      ancestry: '',
      eyeColour: '',
      hairColour: '',
      wand: {
        wood: '',
        core: '',
        length: '',
      },
      patronus: '',
      hogwartsStudent: true,
      hogwartsStaff: false,
      actor: 'Eleanor Columbus',
      alternate_actors: ['Emma Jayne-Corboz'],
      alive: true,
      image: '',
    },
    {
      name: 'Justin Finch-Fletchley',
      alternate_names: [],
      species: 'human',
      gender: 'male',
      house: 'Hufflepuff',
      dateOfBirth: '',
      yearOfBirth: '',
      wizard: true,
      ancestry: 'muggleborn',
      eyeColour: '',
      hairColour: '',
      wand: {
        wood: '',
        core: '',
        length: '',
      },
      patronus: '',
      hogwartsStudent: true,
      hogwartsStaff: false,
      actor: 'Edward Randell',
      alternate_actors: [],
      alive: true,
      image: '',
    },
    {
      name: 'Pomona Sprout',
      alternate_names: ['Professor Sprout'],
      species: 'human',
      gender: 'female',
      house: 'Hufflepuff',
      dateOfBirth: '',
      yearOfBirth: '',
      wizard: true,
      ancestry: '',
      eyeColour: '',
      hairColour: '',
      wand: {
        wood: '',
        core: '',
        length: '',
      },
      patronus: '',
      hogwartsStudent: false,
      hogwartsStaff: true,
      actor: 'Miriam Margolyes',
      alternate_actors: [],
      alive: true,
      image: '',
    },
    {
      name: 'Ernie Macmillan',
      alternate_names: ['Ernest Macmillan'],
      species: 'human',
      gender: 'male',
      house: 'Hufflepuff',
      dateOfBirth: '',
      yearOfBirth: '',
      wizard: true,
      ancestry: '',
      eyeColour: '',
      hairColour: 'blond',
      wand: {
        wood: '',
        core: '',
        length: '',
      },
      patronus: 'boar',
      hogwartsStudent: true,
      hogwartsStaff: false,
      actor: 'Louis Doyle',
      alternate_actors: [],
      alive: true,
      image: '',
    },
    {
      name: 'Eleanor Branstone',
      alternate_names: [],
      species: 'human',
      gender: 'female',
      house: 'Hufflepuff',
      dateOfBirth: '',
      yearOfBirth: '',
      wizard: true,
      ancestry: '',
      eyeColour: '',
      hairColour: '',
      wand: {
        wood: '',
        core: '',
        length: '',
      },
      patronus: '',
      hogwartsStudent: true,
      hogwartsStaff: false,
      actor: '',
      alternate_actors: [],
      alive: true,
      image: '',
    },
    {
      name: 'Owen Cauldwell',
      alternate_names: [],
      species: 'human',
      gender: 'male',
      house: 'Hufflepuff',
      dateOfBirth: '',
      yearOfBirth: '',
      wizard: true,
      ancestry: '',
      eyeColour: '',
      hairColour: '',
      wand: {
        wood: '',
        core: '',
        length: '',
      },
      patronus: '',
      hogwartsStudent: true,
      hogwartsStaff: false,
      actor: '',
      alternate_actors: [],
      alive: true,
      image: '',
    },
    {
      name: 'Laura Madley',
      alternate_names: [],
      species: 'human',
      gender: 'female',
      house: 'Hufflepuff',
      dateOfBirth: '',
      yearOfBirth: '',
      wizard: true,
      ancestry: '',
      eyeColour: '',
      hairColour: '',
      wand: {
        wood: '',
        core: '',
        length: '',
      },
      patronus: '',
      hogwartsStudent: true,
      hogwartsStaff: false,
      actor: '',
      alternate_actors: [],
      alive: true,
      image: '',
    },
    {
      name: 'Kevin Whitby',
      alternate_names: [],
      species: 'human',
      gender: 'male',
      house: 'Hufflepuff',
      dateOfBirth: '',
      yearOfBirth: '',
      wizard: true,
      ancestry: '',
      eyeColour: '',
      hairColour: '',
      wand: {
        wood: '',
        core: '',
        length: '',
      },
      patronus: '',
      hogwartsStudent: true,
      hogwartsStaff: false,
      actor: '',
      alternate_actors: [],
      alive: true,
      image: '',
    },
    {
      name: 'Summers',
      alternate_names: [],
      species: 'human',
      gender: 'male',
      house: 'Hufflepuff',
      dateOfBirth: '',
      yearOfBirth: '',
      wizard: true,
      ancestry: '',
      eyeColour: '',
      hairColour: '',
      wand: {
        wood: '',
        core: '',
        length: '',
      },
      patronus: '',
      hogwartsStudent: true,
      hogwartsStaff: false,
      actor: '',
      alternate_actors: [],
      alive: true,
      image: '',
    },
    {
      name: 'Nymphadora Tonks',
      alternate_names: ['Dora', 'Nymphadora Lupin'],
      species: 'human',
      gender: 'female',
      house: 'Hufflepuff',
      dateOfBirth: '',
      yearOfBirth: '',
      wizard: true,
      ancestry: '',
      eyeColour: '',
      hairColour: 'brown',
      wand: {
        wood: '',
        core: '',
        length: '',
      },
      patronus: '',
      hogwartsStudent: false,
      hogwartsStaff: false,
      actor: 'Natalia Tena',
      alternate_actors: [],
      alive: false,
      image: '',
    },
    {
      name: 'Rose Zeller',
      alternate_names: [],
      species: 'human',
      gender: 'female',
      house: 'Hufflepuff',
      dateOfBirth: '',
      yearOfBirth: '',
      wizard: true,
      ancestry: '',
      eyeColour: '',
      hairColour: '',
      wand: {
        wood: '',
        core: '',
        length: '',
      },
      patronus: '',
      hogwartsStudent: true,
      hogwartsStaff: false,
      actor: '',
      alternate_actors: [],
      alive: true,
      image: '',
    },
    {
      name: 'Summerby',
      alternate_names: [],
      species: 'human',
      gender: 'male',
      house: 'Hufflepuff',
      dateOfBirth: '',
      yearOfBirth: '',
      wizard: true,
      ancestry: '',
      eyeColour: '',
      hairColour: '',
      wand: {
        wood: '',
        core: '',
        length: '',
      },
      patronus: '',
      hogwartsStudent: true,
      hogwartsStaff: false,
      actor: '',
      alternate_actors: [],
      alive: true,
      image: '',
    },
    {
      name: 'Leanne',
      alternate_names: [],
      species: 'human',
      gender: 'female',
      house: 'Hufflepuff',
      dateOfBirth: '',
      yearOfBirth: '',
      wizard: true,
      ancestry: '',
      eyeColour: '',
      hairColour: '',
      wand: {
        wood: '',
        core: '',
        length: '',
      },
      patronus: '',
      hogwartsStudent: true,
      hogwartsStaff: false,
      actor: 'Isabella Laughland',
      alternate_actors: [],
      alive: true,
      image: '',
    },
    {
      name: 'Cadwallader',
      alternate_names: [],
      species: 'human',
      gender: 'male',
      house: 'Hufflepuff',
      dateOfBirth: '',
      yearOfBirth: '',
      wizard: true,
      ancestry: '',
      eyeColour: '',
      hairColour: '',
      wand: {
        wood: '',
        core: '',
        length: '',
      },
      patronus: '',
      hogwartsStudent: true,
      hogwartsStaff: false,
      actor: '',
      alternate_actors: [],
      alive: true,
      image: '',
    },
    {
      name: 'Ted Lupin',
      alternate_names: ['Edward Remus Teddy Lupin'],
      species: 'human',
      gender: 'male',
      house: 'Hufflepuff',
      dateOfBirth: '',
      yearOfBirth: '',
      wizard: true,
      ancestry: 'half-blood',
      eyeColour: '',
      hairColour: '',
      wand: {
        wood: '',
        core: '',
        length: '',
      },
      patronus: '',
      hogwartsStudent: false,
      hogwartsStaff: false,
      actor: 'Luke Newberry',
      alternate_actors: [],
      alive: true,
      image: '',
    },
  ];

  server.use(
    rest.get('https://hp-api.herokuapp.com/api/characters/house/hufflepuff', (req, res, ctx) => {
      return res(ctx.json(huffleData));
    })
  );
  render(<App />);

  const filter = await screen.findByRole('combobox');
  userEvent.selectOptions(filter, 'Hufflepuff');

  expect(screen.getByRole('option', { name: /hufflepuff/i }).selected).toBe(true);

  const button = screen.getByRole('button', { name: /submit/i });

  await waitForElementToBeRemoved(() => screen.getByText('Loading Characters...'));

  userEvent.click(button);
  screen.debug();
  const charList = await screen.findAllByRole('listitem');

  expect(charList).toHaveLength(18);
});
