import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

interface Props extends SvgProps {
  strokeWidth: number;
}

export default function PlusSign({ strokeWidth, ...props }: Props) {
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
      <Path
        d={"M12 4V20M20 12H4"}
        stroke={"currentColor"}
        strokeWidth={strokeWidth}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />
    </Svg>
  );
}
