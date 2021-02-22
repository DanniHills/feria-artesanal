FROM node:latest

WORKDIR /feria-api

COPY ./package*.json ./

RUN npm install --silent

COPY ./ ./

EXPOSE 80

CMD [ "npm", "start" ]