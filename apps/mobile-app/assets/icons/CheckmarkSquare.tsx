import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

interface Props extends SvgProps {
  strokeWidth: number;
}

export default function CheckmarkSquare({ strokeWidth, ...props }: Props) {
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
        d={
          "M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
        }
        stroke={"currentColor"}
        strokeWidth={strokeWidth}
      />
      <Path
        d={"M8 13.75C8 13.75 9.6 14.6625 10.4 16C10.4 16 12.8 10.75 16 9"}
        stroke={"currentColor"}
        strokeWidth={strokeWidth}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />
    </Svg>
  );
}
