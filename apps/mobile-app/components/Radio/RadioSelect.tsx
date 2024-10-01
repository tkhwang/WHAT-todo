import { View } from "react-native";
import { ReactNode } from "react";

import { RadioGroup, RadioGroupItemWithLabel } from "../ui/radio-group";

interface Props {
  switchState: string;
  setSwitchState: (value: string) => void;
  truthyStateText: string;
  truthyDisplayText: string;
  TruthyIcon: ReactNode;
  falseStateText: string;
  falseDisplayText: string;
  FalsyIcon: ReactNode;
}

export default function RadioSelect({
  switchState,
  setSwitchState,
  truthyStateText,
  truthyDisplayText,
  TruthyIcon,
  falseStateText,
  falseDisplayText,
  FalsyIcon,
}: Props) {
  function onLabelPress(label: string) {
    return () => {
      setSwitchState(label);
    };
  }

  return (
    <View className={"items-center justify-center flex-1 p-6"}>
      <RadioGroup
        value={switchState}
        onValueChange={(label) => {
          setSwitchState(label);
        }}
        className={"gap-3 flex flex-row"}
      >
        <RadioGroupItemWithLabel
          value={truthyStateText}
          displayValue={truthyDisplayText}
          onLabelPress={onLabelPress(truthyStateText)}
          Icon={TruthyIcon}
        />
        <RadioGroupItemWithLabel
          value={falseStateText}
          displayValue={falseDisplayText}
          onLabelPress={onLabelPress(falseStateText)}
          Icon={FalsyIcon}
        />
      </RadioGroup>
    </View>
  );
}
