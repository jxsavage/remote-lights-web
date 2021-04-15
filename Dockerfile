FROM node:14.16.0-alpine as development

WORKDIR /app

# COPY ["package-lock.json", "package.json", "tsconfig.json", ".prettierrc.js", ".eslintrc.js", "server.js", ".env", "./"]

# RUN npm install


FROM development as production

COPY . .

RUN npm install

RUN npm run build

ENTRYPOINT [ "npm", "run" ]

CMD "server-prod"