# Saar

HFC advanced emergency scenarios simulator.

# ATTENTION
This project is a sample of a bigger military system, and it requires very specific resources of data that doesn't exist anywhere outside military servers.
Any attempts running this project locally without access to the data sources will fail.
This project is here only as a code showcase.

## Getting Started

### server

1.  check into the server folder.
2.  run `npm i`.
3.  check that your .env file has the correct port and DB credentials.
4.  run `npm start`.

### client

1.  check into the client folder.
2.  run `npm i`.
3.  - run `npm run start:<environment>`.
    - **shortcut:** `npm start` for dev
    - **shortcut:** `npm run local` for local

## Build and Run tests

1.  run `npm run test`.
2.  run `npm run build:<environment>`.

## environments

- **local:** the client connect to the server locally.
- **dev:** the development evironment.
- **test:** testing and presentation environment.
- **prod:** production.

## Contributing

In every task, make sure to:

- Finish your entire task.
- Create and update tests accordingly.
- Format (using Prettier).
- Create unit tests (if relevant).
- That there are no warnings and errors in the console.
- Update the readme file if there are any relevant changes.
- Commit in small parts and in the following standard: **[Commit Message Guidelines](https://github.com/ubilabs/react-geosuggest/blob/master/CONVENTIONS.md)**.
- Double check that there is no problem with your code **before** opening a pull request, and **after** the merge too.

When you finished your task, open a Pull Request. One of the team member shall review your code, add comments, and when you finished correcting them all, he will approve your request.
For big or breaking changes, more than one member should go over your code.

## Resources

- **[Commit Message Guidelines](https://github.com/ubilabs/react-geosuggest/blob/master/CONVENTIONS.md)**
- **[Git-Flow Cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)**
- **[How To Write a README File](https://www.freecodecamp.org/news/how-to-write-a-good-readme-file/)**

### Resources - Client

- **[React Documentation](https://reactjs.org/docs/getting-started.html)**
- **[Material UI](https://mui.com/)**
- **[Leaflet](https://leafletjs.com/)**
- **[React-Leaflet](https://react-leaflet.js.org/)**
- **[env-cmd](https://github.com/toddbluhm/env-cmd#readme)**

### Resources - Server

- **[NodeJs Documentation](https://nodejs.org/en/docs/)**
- **[Express Documentation](https://expressjs.com/)**
- **[Typescript Documentation](https://www.typescriptlang.org/)**
- **[Typeorm Documentation](https://typeorm.io/)**
- **[Class-Validator Documentation](https://github.com/typestack/class-validator)**

### Resources - Other

- **[Jest Documentation](https://jestjs.io/)**
- **[Lodash Documentation](https://lodash.com/)**
