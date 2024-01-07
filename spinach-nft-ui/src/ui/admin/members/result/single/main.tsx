import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {VerificationStatusUi} from '@spinach/next/components/shared/common/verified';
import {UserBalanceSummary} from '@spinach/next/types/mongo/balance';
import {AdminMemberMonetaryCell} from '@spinach/next/ui/admin/members/result/single/cell/monetary/main';
import {
  AdminMemberSingleControls,
  AdminMemberSingleControlsProps,
} from '@spinach/next/ui/admin/members/result/single/control';
import {AdminMemberPopup} from '@spinach/next/ui/admin/members/result/single/popup/main';
import {AdminMemberPopupState} from '@spinach/next/ui/admin/members/result/single/popup/type';
import {formatUserName} from '@spinach/next/utils/data/user';
import {formatInt} from '@spinach/next/utils/number';


type Props = Omit<AdminMemberSingleControlsProps, 'setPopup'> & {
  style: React.CSSProperties,
  balanceSummary: UserBalanceSummary | undefined,
};

export const AdminMemberSingleResult = ({
  style,
  balanceSummary,
  ...props
}: Props) => {
  const {member} = props;
  const {
    status,
    agent,
  } = member;

  const [
    popup,
    setPopup,
  ] = React.useState<AdminMemberPopupState>({
    type: 'info',
    show: false,
  });

  return (
    <Flex direction="row" noFullWidth style={style} className="border-b-slate-400 p-2 not-last:border-b">
      <AdminMemberPopup
        show={popup.show}
        type={popup.type}
        setShow={(show) => setPopup((original) => ({
          ...original,
          show,
        }))}
        member={member}
      />
      <Flex noFullWidth className="w-52 justify-center">
        {formatUserName(member)}
      </Flex>
      <Flex noFullWidth center className="w-20">
        <VerificationStatusUi status={status}/>
      </Flex>
      <Flex noFullWidth center className="w-12">
        {agent && <span className="info-highlight px-1.5 py-1 text-sm">代理</span>}
      </Flex>
      <AdminMemberMonetaryCell value={balanceSummary?.currentBalance}/>
      <AdminMemberMonetaryCell applySignStyle value={balanceSummary?.byTxnType['nftBuy']}/>
      <AdminMemberMonetaryCell applySignStyle value={balanceSummary?.byTxnType['nftSell']}/>
      <AdminMemberMonetaryCell applySignStyle value={balanceSummary?.byTxnType['deposit.twBank']}/>
      <AdminMemberMonetaryCell applySignStyle value={balanceSummary?.byTxnType['deposit.crypto']}/>
      <AdminMemberSingleControls
        setPopup={setPopup}
        {...props}
      />
    </Flex>
  );
};
