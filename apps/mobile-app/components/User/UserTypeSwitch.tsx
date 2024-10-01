import { useTranslation } from "react-i18next";

import Icon from "@/assets/icons";

import RadioSwitch from "../Switch/RadioSwitch";

interface Props {
  isUserTypeUser: boolean;
  toggleUserType: () => void;
}

export default function UserTypeSwitch({ isUserTypeUser, toggleUserType }: Props) {
  const { t } = useTranslation();

  return (
    <RadioSwitch
      switchState={isUserTypeUser}
      // toggleSwitchState={() => setUserType(userType === "user" ? "supervisor" : "user")}
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
