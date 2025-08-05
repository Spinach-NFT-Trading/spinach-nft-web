export const bankCodePattern = '[0-9]{3}';

export const bankAccountPattern = '\\w+';

// ObjectId
export const userIdPattern = '^[a-f\\d]{24}$';

export const usernamePattern = '[a-zA-Z0-9]{6,}';

export const passwordPattern = '.{6,}';

// \u4E00-\u9FFF for CJK characters
export const namePattern = '[\u4E00-\u9FFF\\w]+';

export const phonePattern = '09[0-9]{8}';

export const lineIdPattern = '[a-zA-Z0-9]+';

// TRC20 address
export const walletPattern = 'T[A-Za-z1-9]{33}';
