export type MainMenuStore = {
    collapsed: boolean;
};

export type MenuItem = {
    href: string;
    title: string;
};

export type MenuItemProps = {
    item: MenuItem;
};
