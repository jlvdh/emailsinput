import { create } from '../src';
import createElement from '../src/createElement';

const input = createElement('input', {
  attributes: { type: 'email', id: 'emailsinput' },
});
const container = createElement('div');
container.appendChild(input);
document.body.appendChild(container);

describe('emailsinput', () => {
  it('matches snapshot', () => {
    const input = document.getElementById('emailsinput');
    create(input);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot when one email is entered', () => {
    // const input = document.querySelector('input')
    (input as HTMLInputElement).value = 'jvdham@gmail.com';

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot when multiple emails are entered', () => {
    // const input = document.querySelector('input')
    (input as HTMLInputElement).value =
      'jvdham@gmail.com,invalid.email,someother@mail.com';

    expect(container).toMatchSnapshot();
  });
});
