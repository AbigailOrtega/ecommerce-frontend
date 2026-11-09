import { roundMoney } from './money';

describe('roundMoney', () => {
  it('drops floating-point noise from sums and differences', () => {
    expect(roundMoney(389.9 - 38.99)).toBe(350.91);
    expect(roundMoney(0.1 + 0.2)).toBe(0.3);
    expect(JSON.stringify({ amount: roundMoney(389.9 - 38.99) })).toBe('{"amount":350.91}');
  });

  it('rounds half a cent up', () => {
    expect(roundMoney(1.005)).toBe(1.01);
    expect(roundMoney(80.991)).toBe(80.99);
  });

  it('leaves exact amounts alone', () => {
    expect(roundMoney(249.5)).toBe(249.5);
    expect(roundMoney(0)).toBe(0);
  });
});
