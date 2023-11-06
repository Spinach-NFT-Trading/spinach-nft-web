import {describe, expect, it} from '@jest/globals';

import {isIdNumberValid} from '@spinach/server/utils/id';


describe('ID number validation', () => {
  it('validates', () => {
    expect(isIdNumberValid('A123456789')).toBeTruthy();
    expect(isIdNumberValid('B123456780')).toBeTruthy();
    expect(isIdNumberValid('A123456788')).toBeFalsy();
  });
});
