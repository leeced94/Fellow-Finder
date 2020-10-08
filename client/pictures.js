const BASE = '/client/images';
export const names = [
  'Will',
  'Phil',
  'Kyle',
  'Sara',
  'Keiran',
  'Jeho',
  'Wayne',
  'Midori',
  'Alonso',
  'Will Hack',
  'Sully',
  'Matt',
];

const pictures = names.map((person) => `${BASE}/${person}.jpg`);

export default pictures;
