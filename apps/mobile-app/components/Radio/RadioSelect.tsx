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
    <View className={"w-full items-center justify-start flex flex-1 px-4 py-2"}>
      <RadioGroup
        value={switchState}
        onValueChange={(label) => {
          setSwitchState(label);
        }}
        className={"gap-4 flex flex-row"}
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
