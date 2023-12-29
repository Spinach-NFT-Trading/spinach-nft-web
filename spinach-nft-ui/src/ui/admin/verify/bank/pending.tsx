import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {Grid} from '@spinach/next/components/layout/grid';
import {AdminVerificationDataCell} from '@spinach/next/components/shared/admin/verification/cell';
import {AdminVerificationCollapsible} from '@spinach/next/components/shared/admin/verification/main';
import {ResponseOfUnverifiedBankDetails} from '@spinach/next/types/userData/lazyLoaded';
import {formatBankDetails} from '@spinach/next/utils/data/user';


type Props = {
  data: ResponseOfUnverifiedBankDetails,
};

export const AdminVerifyBankPending = ({data}: Props) => {
  const {userDataMap, details} = data;
  const [bankDetails, setBankDetails] = React.useState(details);

  return (
    <Grid className="grid-cols-1 gap-2 xl:grid-cols-2 3xl:grid-cols-3">
      {bankDetails.map((details) => (
        <AdminVerificationCollapsible
          key={details.uuid}
          data={details}
          onVerified={() => setBankDetails((original) => (
            original.filter(({uuid}) => uuid !== details.uuid)
          ))}
          getConfirmPayload={({uuid}, pass) => ({
            type: 'admin.verify.bank',
            data: {
              targetUuid: uuid,
              pass,
            },
          })}
          getImageData={(data) => data?.adminImageOfBankDetails?.data}
          getImageRequestPayload={({uuid}) => [
            {
              opts: {
                type: 'adminImageOfBankDetails',
                opts: {uuid},
              },
              imageName: '銀行存摺封面圖',
            },
          ]}
          getTitle={formatBankDetails}
          getInfo={({
            userId,
            code,
            account,
          }) => (
            <Flex className="gap-1">
              <AdminVerificationDataCell title="持有人姓名" info={userDataMap[userId]?.name}/>
              <AdminVerificationDataCell title="銀行代碼" info={code}/>
              <AdminVerificationDataCell title="銀行帳號" info={account}/>
            </Flex>
          )}
        />
      ))}
    </Grid>
  );
};
