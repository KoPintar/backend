FROM node:buster-slim

WORKDIR /kopintar-app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000:3000

CMD ["npm", "run", "start"]
