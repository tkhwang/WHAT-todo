import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";

interface Props extends SvgProps {
  strokeWidth: number;
}

export default function AlertCircle({ strokeWidth, ...props }: Props) {
  return (
    <Svg
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox={"0 0 24 24"}
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      {...props}
    >
      <Circle cx={"12"} cy={"12"} r={"10"} stroke={"currentColor"} strokeWidth={"1.5"} />
      <Path
        d={"M11.992 15H12.001"}
        stroke={"currentColor"}
        strokeWidth={strokeWidth}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />
      <Path
        d={"M12 12L12 8"}
        stroke={"currentColor"}
        strokeWidth={strokeWidth}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />
    </Svg>
  );
}
