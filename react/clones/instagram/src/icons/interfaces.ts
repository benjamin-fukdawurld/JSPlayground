export interface IconProps {
  className?: string;
  solid?: boolean;
  color?: string;
  fill?: string;
  stroke?: string;
}

export const IconDefaultProps = {
  className: "h-6 w-6",
  color: "currentColor",
  fill: "currentColor",
  stroke: "currentColor",
};
