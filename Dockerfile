FROM node:20.10.0-alpine as build

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
COPY packages/models ./packages/models
COPY apps/backend ./apps/backend

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /usr/src/app/packages/models
RUN yarn

WORKDIR /usr/src/app/apps/backend
RUN yarn build

FROM node:20.10.0-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

COPY --from=build /usr/src/app/packages/models/package.json /usr/src/app/packages/models/package.json
COPY --from=build /usr/src/app/packages/models/dist /usr/src/app/packages/models/dist
COPY --from=build /usr/src/app/apps/backend/package.json /usr/src/app/apps/backend/package.json
COPY --from=build /usr/src/app/apps/backend/dist /usr/src/app/apps/backend/dist

ENV NODE_ENV production

RUN npm install -g typescript
RUN yarn install --ignore-scripts --pure-lockfile --non-interactive --production

EXPOSE 8080

WORKDIR /usr/src/app/apps/backend

CMD ["yarn", "start:prod"]
