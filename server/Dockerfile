FROM node:12-alpine as builder
RUN mkdir -p /app/server
WORKDIR /app/server
COPY package*.json /app/server/
RUN npm install
COPY . /app/server/
RUN npm run build

FROM node:12-alpine
RUN mkdir -p /app/server
WORKDIR /app/server
COPY --from=builder /app/server/build /app/server/
COPY package.json /app/server/package.json
RUN npm install --only=prod

EXPOSE 5000 
USER node
CMD ["node", "index.js"]