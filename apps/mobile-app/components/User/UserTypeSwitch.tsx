import { useTranslation } from "react-i18next";

import Icon from "@/assets/icons";

import RadioSwitch from "../Switch/RadioSwitch";

interface Props {
  userType: "user" | "supervisor";
  toggleUserType: () => void;
}

export default function UserTypeSwitch({ userType, toggleUserType }: Props) {
  const { t } = useTranslation();

  return (
    <RadioSwitch
      switchState={userType === "user"}
      toggleSwitchState={toggleUserType}
      switchStateNativeId={"userType"}
      // truthy
      truthyText={t("sendTodo.user.type.user")}
      TruthyIcon={<Icon name={"user"} size={26} strokeWidth={1.6} />}
      // falsy
      falseText={t("sendTodo.user.type.supervisor")}
      FalsyIcon={<Icon name={"policeCap"} size={26} strokeWidth={1.6} />}
    />
  );
}
