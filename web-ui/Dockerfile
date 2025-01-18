FROM node:18-alpine AS build

WORKDIR /app

COPY . .
RUN npm install

RUN npm run build

FROM nginx:1.25.3 AS final

RUN rm -rf /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx

WORKDIR /etc/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
