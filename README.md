# Coure TaskManager Assessment
This is a Task Manager web application using Angular. The application allows users to create, view, update, and delete tasks. Each task includes a title, description, due date, priority, and status (e.g., pending, in progress, completed). And users are aw well able to filter tasks based on priority and status.

## Development/Local server

To start a local development server, run the following commands:

This installs all the necessary dependencies for the project to run
```bash
npm install
```

This starts up a local server of the project
```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building the project

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

