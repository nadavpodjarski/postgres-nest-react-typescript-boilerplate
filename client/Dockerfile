FROM node:12-alpine as build

RUN mkdir /app/client
WORKDIR /app/client
COPY package.json /app/client/package.json
RUN npm install --only=prod
COPY . /app/client/
RUN npm run build

FROM nginx:1.16.0-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/client/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]