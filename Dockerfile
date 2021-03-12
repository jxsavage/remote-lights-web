FROM node:14.16.0-alpine as development

WORKDIR /app

COPY ["package-lock.json", "package.json", "tsconfig.json", ".prettierrc.js", ".eslintrc.js", "server.js", ".env", "./"]

RUN npm install

ENTRYPOINT [ "npm", "run" ]

FROM development as production

COPY public public/

COPY src src/

RUN npm run build