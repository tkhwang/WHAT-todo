import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export const hp = (percentage: number) => {
  return (deviceHeight * percentage) / 100;
};

export const wp = (percentage: number) => {
  return (deviceWidth * percentage) / 100;
};
