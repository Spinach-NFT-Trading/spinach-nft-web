type FormatFloatOptionalOpts = {
  num: number,
  decimals: number,
};

export const formatFloatOptional = ({num, decimals}: FormatFloatOptionalOpts) => {
  const multiplier = 10 ** decimals;

  // https://stackoverflow.com/a/11832950
  return Math.round((num + Number.EPSILON) * multiplier) / multiplier;
};
