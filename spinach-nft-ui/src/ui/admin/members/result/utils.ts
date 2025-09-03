import {CommonUserPermissionFlags} from '@spinach/next/types/auth';


type IsCommissionReadableOpts = {
  type: 'agent' | 'member',
  permissionFlags: CommonUserPermissionFlags,
};

export const isCommissionReadable = ({
  type,
  permissionFlags,
}: IsCommissionReadableOpts) => {
  const {isAdmin, isAgent, isMod} = permissionFlags;

  if (type === 'agent') {
    return isAdmin || isAgent || isMod;
  }

  if (type === 'member') {
    return true;
  }

  throw new Error(`Unhandled commission type for readable: ${type satisfies never}`);
};

type IsCommissionWritableOpts = {
  type: 'agent' | 'member',
  permissionFlags: CommonUserPermissionFlags,
};

export const isCommissionWritable = ({
  type,
  permissionFlags,
}: IsCommissionWritableOpts) => {
  const {isAdmin} = permissionFlags;

  if (type === 'agent') {
    return isAdmin;
  }

  if (type === 'member') {
    return false;
  }

  throw new Error(`Unhandled commission type for writable: ${type satisfies never}`);
};
