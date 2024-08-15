export function getUserImageSource(imagePath: string) {
  if (imagePath) return { uri: imagePath };

  return require("../assets/images/defaultUser.png");
}
