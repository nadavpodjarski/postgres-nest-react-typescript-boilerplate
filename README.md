# Express.js React.js Typescript boilerplate

## Description

This is an express and react starter repo built with create-react-app and expres.js .

## Folder structure

Source code for Server and Client placed at src directory. **server** folder is for web services and **client** folder is for UI source codes in development mode. For production mode, client is bundled and set in to client directory under `build` folder and the server is bundled and set in to root directory under `build` folder.
Keep in mind that the server entry point is `<PROJECT-ROOT>/build/index.js` and it set to serve static files from the client build folder `<PROJECT-ROOT>/src/client/build/`.

## Getting Started

Make sure you have node installed in your machine.
To clone this repo to your local machine run the following command.

```
git clone https://github.com/nadavpodjarski/express-react-typescript-boilerplate.git <YOUR-PROJECT>
```

</br>

### Installing

To setup, go to the root directory of this project and run the following command,

```
npm run setup
```

This is will install all dependencies for server and client and will create a .env file in the root directory
</br>

### Development

To start development mode run the following command

```
npm run dev
```

This will start node express with nodemon and in parallel will start react development server.
Any code changes in server or client directories will be reflected after saving.
</br>

### Building

To build, go to the root directory of this project and run the following command

```
npm run build
```

Can also go with simple **build and run** with the following command

```
npm run start
```
