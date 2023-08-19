import {NftInfoModel} from '@spinach/common/types/data/nft';


const eeveeIds = [135, 196, 700, 136, 470, 134, 471, 197, 133];

export const generateNft = (): NftInfoModel => {
  const eeveeIdx = Math.floor(Math.random() * 100000 % eeveeIds.length);
  const eeveeId = eeveeIds[eeveeIdx];

  return {
    // eslint-disable-next-line max-len
    image: `https://raw.githubusercontent.com/RaenonX-PokemonSleep/pokemon-sleep-ui/main/public/images/pokemon/portrait/${eeveeId}.png`,
  };
};

export const generateSalePrice = () => {
  return 10000;
};
