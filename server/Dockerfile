FROM node:12-alpine as build
WORKDIR /app
COPY . /app/

# prepare for build
RUN npm install --silent
RUN npm run build


# move build to new container
FROM node:12-alpine
WORKDIR /app

COPY --from=build /app/build /app/
COPY package.json /app/package.json
COPY ormconfig.json /app/ormconfig.json
COPY wait-for-it.sh /app/wait-for-it.sh

RUN npm install --silent
RUN apk add --no-cache bash


# expose port
EXPOSE 5500 