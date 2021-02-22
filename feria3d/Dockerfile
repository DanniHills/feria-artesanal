FROM node:latest as builder

WORKDIR /feria3d

COPY ./package*.json ./

RUN npm install --silent

COPY ./ ./

RUN npm run --silent build
# ------------------------------------------------------
# Production Build
# ------------------------------------------------------
FROM nginx:1.16.0-alpine

COPY --from=builder /feria3d/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]