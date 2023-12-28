export type ReactStateUpdaterFromOriginal<T> = (getUpdated: (original: T) => T) => void;
