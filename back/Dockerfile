FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install --quiet

COPY . .
RUN npm run build

FROM node:lts-alpine as production-stage

WORKDIR /app

COPY --from=build-stage /app/dist /app/dist

COPY package*.json ./
RUN npm install --quiet --only=prod

CMD ["npm","start"]