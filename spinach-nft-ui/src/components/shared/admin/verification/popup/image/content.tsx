import React from 'react';

import {ByteArray} from '@spinach/common/types/common/binary';
import {byteArrayToDataUri} from '@spinach/common/utils/data';

import {Loading} from '@spinach/next/components/icons/loading';
import {Flex} from '@spinach/next/components/layout/flex/common';
import {NextImageAutoHeight} from '@spinach/next/components/shared/common/image/autoHeight';


type Props = {
  data: ByteArray | null | undefined,
  name: string,
};

export const AdminVerificationImageContent = ({data, name}: Props) => {
  const [imageData, setImageData] = React.useState<string | null>();

  React.useEffect(() => {
    if (!data) {
      return;
    }

    byteArrayToDataUri(data).then(setImageData);
  }, [data]);

  if (!imageData) {
    return <Loading text={name}/>;
  }

  return (
    <Flex className="pr-2">
      <NextImageAutoHeight src={imageData} alt={name}/>
    </Flex>
  );
};
