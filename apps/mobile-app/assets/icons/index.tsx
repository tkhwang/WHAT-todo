import { NumberProp, SvgProps } from "react-native-svg";

import { appTheme } from "@/constants/uiConsts";

import InboxCheck from "./InboxCheck";
import Home from "./Home";
import ArrowLeft from "./ArrowLeft";
import AccountSetting from "./AccountSetting";
import Tag from "./Tag";
import User from "./User";
import CheckmarkSquare from "./CheckmarkSquare";
import PoliceCap from "./PoliceCap";
import Logout from "./Logout";
import Calendar from "./Calendar";
import CheckList from "./CheckList";

const icons = {
  accountSetting: AccountSetting,
  arrowLeft: ArrowLeft,
  calendar: Calendar,
  checkList: CheckList,
  checkmarkSquare: CheckmarkSquare,
  home: Home,
  logout: Logout,
  inboxCheck: InboxCheck,
  policeCap: PoliceCap,
  tag: Tag,
  user: User,
};

type IconNames = keyof typeof icons;

interface Props extends SvgProps {
  name: IconNames;
  size?: NumberProp;
  strokeWidth?: number;
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
