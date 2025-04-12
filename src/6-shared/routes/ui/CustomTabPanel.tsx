import type { CustomTabPanelProps } from "../types";

export function CustomTabPanel(props: CustomTabPanelProps) {
    const { value, index, children } = props;

    return value === index ? children : null;
}
