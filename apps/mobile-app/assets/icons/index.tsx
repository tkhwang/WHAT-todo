import { NumberProp, SvgProps } from "react-native-svg";

import InboxCheck from "./InboxCheck";
import Home from "./Home";
import ArrowLeft from "./ArrowLeft";
import AccountSetting from "./AccountSetting";
import Tag from "./Tag";

import { appTheme } from "@/constants/uiConsts";

const icons = {
  home: Home,
  inboxCheck: InboxCheck,
  arrowLeft: ArrowLeft,
  accountSetting: AccountSetting,
  tag: Tag,
};

type IconNames = keyof typeof icons;

interface Props extends SvgProps {
  name: IconNames;
  size: NumberProp;
  strokeWidth: number;
}

export default function Icon({ size, name, strokeWidth, ...props }: Props) {
  const IconComponent = icons[name];

  return (
    <IconComponent
      height={size ?? 24}
      width={size ?? 24}
      strokeWidth={strokeWidth ?? 1.9}
      color={appTheme.colors.textLight}
      {...props}
    />
  );
}
