FROM node:erbium-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

CMD [ "node", "src/index.js" ]