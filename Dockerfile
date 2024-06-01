FROM node:buster-slim

WORKDIR /kopintar-app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000:4000

CMD ["npm", "run", "start"]
