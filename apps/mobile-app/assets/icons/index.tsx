import { SvgProps } from "react-native-svg";

import InboxCheck from "./InboxCheck";
import Home from "./Home";
import ArrowLeft from "./ArrowLeft";
import AccountSetting from "./AccountSetting";

import { appTheme } from "@/constants/uiConsts";

const icons = {
  home: Home,
  inboxCheck: InboxCheck,
  arrowLeft: ArrowLeft,
  accountSetting: AccountSetting,
};

type IconNames = keyof typeof icons;

interface Props extends SvgProps {
  name: IconNames;
  size?: number;
}

export default function Icon({ name, ...props }: Props) {
  const IconComponent = icons[name];

  return (
    <IconComponent
      height={props.size ?? 24}
      width={props.size ?? 24}
      strokeWidth={props.strokeWidth ?? 1.9}
      color={appTheme.colors.textLight}
    />
  );
}
