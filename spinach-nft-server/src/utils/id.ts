import {toSum} from '@spinach/common/utils/array';

import {idNumberValue} from '@spinach/server/const/id';


const idNumberWeights = [8, 7, 6, 5, 4, 3, 2, 1, 1];

export const isIdNumberValid = (idNumber: string): boolean => {
  const value = idNumberValue[idNumber[0]];

  if (!value) {
    return false;
  }

  const weightedDigits = toSum([...idNumber.slice(1)].map((char, idx) => parseInt(char) * idNumberWeights[idx]));

  return (value + weightedDigits) % 10 === 0;
};
