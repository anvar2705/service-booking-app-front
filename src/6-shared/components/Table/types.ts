export type TableData<T = unknown> = {
    items: T[];
    total: number;
    offset: number;
};
