export const selectOptions = [
    { label: 'A-Z', value: 'asc' },
    { label: 'Z-A', value: 'desc' },
] as const;

export type SortDirection = (typeof selectOptions)[number]['value'];
