type SendApiPostOpts = {
  path: string,
  data: any,
};

export const sendApiPost = async <TResponse>({path, data}: SendApiPostOpts): Promise<TResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}${path}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  );

  return response.json();
};
