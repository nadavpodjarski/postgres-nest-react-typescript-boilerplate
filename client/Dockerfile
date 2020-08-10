FROM node:12-alpine as build

WORKDIR /app
#copy files client to container
COPY . /app/

# prepare for build
RUN npm install --silent
RUN npm run build

# prepare nginx
FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
COPY --from=build app/build /usr/share/nginx/html 


# start nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]