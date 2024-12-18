FROM node:16-alpine

ENV NODE_ENV=production

WORKDIR /backend

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD [ "node" ,"index.js" ]