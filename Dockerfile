FROM node:lts-alpine

WORKDIR /usr/src/app

COPY ["package-lock.json", "package.json", "tsconfig.json", "./"]

RUN npm install

CMD npm run start