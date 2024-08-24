import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

interface Props extends SvgProps {
  strokeWidth: number;
}

export default function CalendarCheckOut({ strokeWidth, ...props }: Props) {
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
        d={"M18 2V4M6 2V4"}
        stroke={"currentColor"}
        strokeWidth={strokeWidth}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />
      <Path
        d={"M3 8H21"}
        stroke={"currentColor"}
        strokeWidth={strokeWidth}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />
      <Path
        d={
          "M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z"
        }
        stroke={"currentColor"}
        strokeWidth={strokeWidth}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />
      <Path
        d={"M15 15L9 15M15 15C15 15.7002 13.0057 17.0085 12.5 17.5M15 15C15 14.2998 13.0057 12.9915 12.5 12.5"}
        stroke={"currentColor"}
        strokeWidth={strokeWidth}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />
    </Svg>
  );
}
