# whatTodo

Todo from experts with supervisors

## Tech stacks

### Mobile : `apps/mobile-app`

- [expo SDK51](https://expo.dev/)
  - bare workflow
- UI
  - tailwind css
  - [rnr : React Native Reusables](https://rnr-docs.vercel.app/getting-started/introduction/)

### Web : `apps/web`

- [next.js](https://nextjs.org/)

### Backend : `apps/backend`

- [nest.js](https://nestjs.com/)
- [firebase](https://firebase.google.com/)
  -firebase admin

### `packages/models`

- API request/response types
- common types

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
