'use client';
import React from 'react';

import {Flex} from '@spinach/next/components/layout/flex/common';
import {FlexLink} from '@spinach/next/components/layout/flex/link';
import {localStorageKeyOfNftPositionsMatched} from '@spinach/next/const/localStorage';
import {getMatchedNftExchangeRequests} from '@spinach/next/controller/nft/request/match';
import {LanguageSwitch} from '@spinach/next/ui/base/navbar/languageSwitch/main';
import {UserAuthButton} from '@spinach/next/ui/base/navbar/user/auth';
import {UserProfileButton} from '@spinach/next/ui/base/navbar/user/profile';
import {UserControlCommonProps} from '@spinach/next/ui/base/navbar/user/type';
import {hashStringToSha256} from '@spinach/next/utils/string';


export const UserControlClient = (props: UserControlCommonProps) => {
  const {session} = props;

  const [positionsMatched, setPositionsMatched] = React.useState(false);

  const checkPositionsMatched = async () => {
    const executorUserId = session?.user.id;
    if (!executorUserId) {
      return;
    }

    const matchedRequests = await getMatchedNftExchangeRequests({executorUserId});
    const hasMatchedRequests = !!matchedRequests.length;
    setPositionsMatched(hasMatchedRequests);

    if (!hasMatchedRequests) {
      return;
    }

    const matchedRequestsHash = await hashStringToSha256(
      matchedRequests.map(({requestUuid}) => requestUuid).sort().join(''),
    );

    const notifiedHash = localStorage.getItem(localStorageKeyOfNftPositionsMatched);
    if (notifiedHash === matchedRequestsHash) {
      return;
    }

    localStorage.setItem(localStorageKeyOfNftPositionsMatched, matchedRequestsHash);
    await new Audio('/se/matched.mp3').play();
  };

  React.useEffect(() => {
    void checkPositionsMatched();

    const intervalId = setInterval(checkPositionsMatched, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Flex noFullWidth direction="row" className="shrink-0 gap-2">
      {
        positionsMatched &&
        <FlexLink href="/account/nft/exchange" center className="bg-blink p-2">
          有持倉售出
        </FlexLink>
      }
      <UserProfileButton {...props}/>
      <LanguageSwitch/>
      <UserAuthButton {...props}/>
    </Flex>
  );
};
