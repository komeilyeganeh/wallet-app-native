export type BillCardType = {
    id: number;
    href: string;
    title: string;
    subTitle: string;
    image: React.JSX.Element;
}

export type BillCardTypeProps = Omit<BillCardType, "id">;