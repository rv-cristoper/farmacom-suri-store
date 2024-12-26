import {
  ChevronDown,
  Home,
  LayoutList,
  Menu,
  ChevronUp,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  ListStart,
  ChevronsUpDown,
} from "lucide-react";

interface IProps {
  className?: string;
  size?: number;
}

const iconProps = (props: IProps) => ({
  size: props.size ?? 20,
  color: "currentColor",
  className: props.className
})

export const MenuIcon = (props: IProps) => <Menu {...iconProps(props)} />
export const HomeIcon = (props: IProps) => <Home  {...iconProps(props)} />
export const LayoutListIcon = (props: IProps) => <LayoutList  {...iconProps(props)} />
export const ChevronDownIcon = (props: IProps) => <ChevronDown  {...iconProps(props)} />
export const ChevronUpIcon = (props: IProps) => <ChevronUp  {...iconProps(props)} />
export const ChevronFirstIcon = (props: IProps) => <ChevronFirst  {...iconProps(props)} />
export const ChevronLastIcon = (props: IProps) => <ChevronLast  {...iconProps(props)} />
export const ChevronLeftIcon = (props: IProps) => <ChevronLeft  {...iconProps(props)} />
export const ChevronRightIcon = (props: IProps) => <ChevronRight  {...iconProps(props)} />
export const EllipsisIcon = (props: IProps) => <Ellipsis  {...iconProps(props)} />
export const ListStartIcon = (props: IProps) => <ListStart  {...iconProps(props)} />
export const ChevronsUpDownIcon = (props: IProps) => <ChevronsUpDown  {...iconProps(props)} />