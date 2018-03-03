import { formatDate } from './date';

describe('formatDate', () => {
  it('should replace yyyy with year', () => {
    expect(
      formatDate(new Date(1520039858288), 'random stuff yyyy something else')
    ).toBe('random stuff 2018 something else');
  });
});
