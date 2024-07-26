# whatTodo

Todo from experts with supervisors

## Tech stacks

### Mobile

- [react native expo](https://expo.dev/) : v51
- UI
  - tailwind css
  - [rnr : React Native Reusables](https://rnr-docs.vercel.app/getting-started/introduction/)

### Backend

- [supabase](https://supabase.com/)
  - authentication
- [nest.js](https://nestjs.com/)

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
