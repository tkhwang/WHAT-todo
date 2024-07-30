# whatTodo

Todo from experts with supervisors

## Tech stacks

### Mobile

- [react native expo](https://expo.dev/) : v51
- UI
  - tailwind css
  - [rnr : React Native Reusables](https://rnr-docs.vercel.app/getting-started/introduction/)

### Backend

- [nest.js](https://nestjs.com/)
- [firebase](https://firebase.google.com/)
  -firebase admin

## EAS Build

### iOS

```bash
# eas build --platform ios --profile production
 yarn run eas:prebuild:ios
```

### Android

```bash
# eas build --platform android --profile preview
 yarn run eas:prebuild:android
```

## EAS Submit

```bash
eas submit
```
