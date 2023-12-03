export const toUnique = <T>(arr: T[]): T[] => Array.from(new Set(arr));

export const toSum = (arr: number[]): number => arr.reduce((prev, curr) => prev + curr, 0);
