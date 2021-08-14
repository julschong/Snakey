FROM node:alpine
COPY ./dist /app
COPY package*.json ./
RUN npm install
WORKDIR /app
EXPOSE 3003
CMD node index.js

