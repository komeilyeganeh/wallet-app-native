export type SelectBoxPropsType = {
    data: {key: number | string; label: string}[];
    onChange: (item: any) => void;
    value: any;
    label: string;
    disabled?: boolean;
}