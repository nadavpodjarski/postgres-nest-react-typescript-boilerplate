## Postgres - Express.js - React.js Boilerplate

### Introduction

This is a PREN-Stack Dockerized boilerplate.
A vanila infrastructure made to simplify the develpoment and deploying processes using pern stack and docker, docker-compose.

### Prerequisites

Make sure u have this installed on your machine.

- [x] **Docker** : https://docs.docker.com/engine/install/
- [x] **Docker-Compose** : https://docs.docker.com/compose/install/
- [x] **Node** : https://nodejs.org/en/

### File strcutre

```
project-name
    |
    |---/ client
            |
            |---/ public
            |---/ src
            |
            .env
            .dockerignore
            .gitignore
            Dockerfile
            Dockerfile.dev
            nginx.conf
            tsconfig.json
            package.json
    |
    |---/ database
            .env
            initdb.sql
            .gitignore
    |---/ server
            |
            |---/ config
            |---/src
            |
            .env
            .dockerignore
            .gitignore
            Dockerfile
            Dockerfile.dev
            nodemon.json
            package.json
            wait-for-it.sh
    |
    |
    docker-compose.yml
    docker-compose-dev.yml
    .prettierrc
    README.md
```

### Quick start

Clone this repo to your local machine

```
git clone https://github.com/nadavpodjarski/postgres-express-react-typescript-boilerplate.git <YOUR-PROJECT-NAME>
```

run the following command to check this demo

```
cd project-name/ && sudo docker-compose --file docker-compose-dev.yml up
```

**Replace project-name with your own**

## Client

Client has been created with create-react-app and located in ./project-name/client
In develpoment mode it will be run in a container built with ./client/Dockerfile.dev and will be exposed on port 3000.
In production mode a client build will be created and will run in a container built with ./client/Dockerfile the client build/static-files and will be served with nginx server and will be exposed on port 80.

Enviornment variables can be moved into running dockerfile itself under ENV or can be decalred in the docker compose file unde enviornemt property

**note that nginx server has a minimalistic configuration**

## Database

Postgres data-base is created with an official postgres image which can be found in docker hub https://hub.docker.com/_/postgres
the data-base will be initialized with ./database/initdb.sql script. feel free to change it to your own needs.

Enviornment variables will be located in ./database/.env
and will contain our database credentials :

        ```
        POSTGRES_USER=admin
        POSTGRES_PASSWORD=admin
        POSTGRES_DB=pern_db

        ```

Voluems of our database will be located in ./database/data

> Production volume is located in ./data/prod
> Development volume is located in ./data/dev

## Server

Server is located in ./projec-name/server using express.

- In development mode it will run in a container built with ./server/Dockerfile.dev.
  dev mode server will be exposed on port 5500 to the "outside" world and will use volumes for data persistent.
- In Production mode it will run in a container built with ./server/Dockerfile.
  prod mode server will ve exposed on port 5500 only to the docker composer internal services. as well using volumes for data persistent.

Enviornment variables will be located in ./server/.env
and will contain postgres credentials to establish connection to our databse.
with our wait-for-it.sh script the server image will run only after getting confirmation that postgres container is available.
by that we wont get connection failures due to wrong order of docker composing.

## Docker compose

### Development

To establish a development environment, simply run the following command from the project root folder.

```
sudo docker-compose --file docker-compose-dev.yml up
```

On save changes in client and server, cotainers will be automatically updated, no need to restart any servers.
</br>

### Production

To establish production environment, simply run the following command from the root folder.

```
sudo docker-compose up
```

This will creates build for both server and client, will serve client build with nginx server on port 80 and will communicate with server on port 5500 in the location /api, server will communicate with postgres oon port 5432.

## Demo

Demo is a simple Todolist using react as our front express as backend and postgres as our database
demo can be started in development mode and in production mode as well.

<img src="./demo1.png" style="box-shadow 0px 10px 10px rgba(0,0,0,0.3);" />

## Enjoy
