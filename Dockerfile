FROM node:lts-alpine as angular

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . . 
RUN npm run build --configuration=production

FROM nginx:alpine
VOLUME [ "/var/cache/nginx" ]
COPY  --from=angular app/dist/front-diagnostico /usr/share/nginx/html
COPY ./config/nginx.conf  /etc/nginx/conf.d/default.conf

#teste deploy