import { useTranslation } from "react-i18next";

import Icon from "@/assets/icons";

import RadioSelect from "../Radio/RadioSelect";

interface Props {
  userType: "user" | "supervisor";
  setUserType: (userType: "user" | "supervisor") => void;
}

export default function UserTypeSwitch({ userType, setUserType }: Props) {
  const { t } = useTranslation();

  return (
    <RadioSelect
      switchState={userType}
      // @ts-expect-error : type error : string vs const union
      setSwitchState={setUserType}
      switchStateNativeId={"userType"}
      // truthy
      truthyStateText={"user"}
      truthyDisplayText={t("sendTodo.user.type.user")}
      TruthyIcon={<Icon name={"user"} size={26} strokeWidth={1.6} />}
      // falsy
      falseStateText={"supervisor"}
      falseDisplayText={t("sendTodo.user.type.supervisor")}
      FalsyIcon={<Icon name={"policeCap"} size={26} strokeWidth={1.6} />}
    />
  );
}
