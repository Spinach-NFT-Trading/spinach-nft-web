import {FastifyRequest} from 'fastify';


export type GetAuthorizationTokenOpts = {
  request: FastifyRequest,
};

export type AuthorizationTokenResult = {
  token: string,
} | {
  token: null,
};

export const getAuthorizationToken = ({
  request,
}: GetAuthorizationTokenOpts): AuthorizationTokenResult => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return {token: null};
  }

  // Support both "Bearer <token>" and raw token formats
  const token = authHeader.startsWith('Bearer ') ?
    authHeader.substring(7) :
    authHeader;

  return {token};
};

