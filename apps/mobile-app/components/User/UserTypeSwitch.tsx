import { useTranslation } from "react-i18next";
import { useState } from "react";

import Icon from "@/assets/icons";

import RadioSwitch from "../Switch/RadioSwitch";

export default function UserTypeSwitch() {
  const { t } = useTranslation();

  const [userType, setUserType] = useState<"user" | "supervisor">("user");

  return (
    <RadioSwitch
      switchState={userType === "user"}
      toggleSwitchState={() => setUserType(userType === "user" ? "supervisor" : "user")}
      switchStateNativeId={"userType"}
      // truthy
      truthyText={t("sendTodo.user.type.expert")}
      TruthyIcon={<Icon name={"aiChemistry"} size={26} strokeWidth={1.6} />}
      // falsy
      falseText={t("sendTodo.user.type.supervisor")}
      FalsyIcon={<Icon name={"policeCap"} size={26} strokeWidth={1.6} />}
    />
  );
}
