import { NumberProp, SvgProps } from "react-native-svg";
import { AlertCircle, ArrowRight, CalendarMinus, Delete } from "lucide-react-native";

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
import Add from "./Add";
import CalendarCheckOut from "./CalendarCheckOut";
import CalendarUndated from "./CalendarUndated";
import CalendarDownload from "./CalendarDownload";
import AddCircle from "./AddCircle";
import NoteEdit from "./NoteEdit";
import PlusSign from "./PlusSign";
import Task from "./Task";
import LeftToRightListBullet from "./LeftToRightListBullet";
import CancelCircle from "./CanelCircle";
import NoteRemove from "./NoteRemove";
import Passport from "./Passport";
import MailAtSign from "./MailAtSign";
import AiChemistry from "./AiChemistry";
import { TaskDone } from "./TaskDone";

const icons = {
  accountSetting: AccountSetting,
  add: Add,
  addCircle: AddCircle,
  aiChemistry: AiChemistry,
  alertCircle: AlertCircle,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  calendar: Calendar,
  calendarCheckOut: CalendarCheckOut,
  calendarDownload: CalendarDownload,
  calendarUndated: CalendarUndated,
  calendarMinus: CalendarMinus,
  cancelCircle: CancelCircle,
  checkList: CheckList,
  checkmarkSquare: CheckmarkSquare,
  delete: Delete,
  home: Home,
  leftToRightListBullet: LeftToRightListBullet,
  logout: Logout,
  mailAtSign: MailAtSign,
  noteEdit: NoteEdit,
  noteRemove: NoteRemove,
  passport: Passport,
  plusSign: PlusSign,
  inboxCheck: InboxCheck,
  policeCap: PoliceCap,
  tag: Tag,
  taskDone: TaskDone,
  task: Task,
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
