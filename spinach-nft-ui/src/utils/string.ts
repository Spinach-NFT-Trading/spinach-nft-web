export const hashStringToSha256 = async (str: string): Promise<string> => {
  const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray
    .map((bytes) => bytes.toString(16).padStart(2, '0'))
    .join('');
};
