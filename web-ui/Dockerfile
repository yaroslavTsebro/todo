FROM node:18-alpine AS build

WORKDIR /app

COPY . .
RUN npm install

ARG BUILD_ENV=prod
RUN npm run build:$BUILD_ENV

FROM nginx:1.25.3 AS final

RUN rm -rf /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx

WORKDIR /etc/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
