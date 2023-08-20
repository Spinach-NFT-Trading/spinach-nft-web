export type DeepPartial<T> = T extends object ? {[P in keyof T]?: DeepPartial<T[P]>} : T;

export type DeepPartialExceptKey<T> = T extends object ? {[P in keyof T]: DeepPartial<T[P]> | undefined} : T;
