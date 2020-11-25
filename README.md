# Eunomia Backend

`Eunomia` is a To-Do-Application for a shared appartment, so they can manage their tasks. This repositorie is the frontend part of the whole Program.

[![CI/CD](https://github.com/devtobias/eunomia-frontend/workflows/CI/CD/badge.svg)](https://codecov.io/gh/devtobias/eunomia-frontend)
[![Codecov](https://img.shields.io/codecov/c/github/devtobias/eunomia-frontend)](https://codecov.io/gh/devtobias/eunomia-frontend)
[![GitHub license](https://img.shields.io/github/license/devtobias/eunomia-frontend)](https://github.com/DevTobias/eunomia-frontend/blob/main/LICENSE)

## Table of content

* [Features](#features)
* [Requirements](#requirements)
* [Getting started](#getting-started)
* [License](#license)

## Features

## Requirements

- [ ] [Node](https://nodejs.org/en/)
- [ ] [NPM](https://www.npmjs.com/)

## Getting started

First of all make sure you install **all** the above **listed requirements** on your local system. After you installed everything, follow the upcoming installation steps.

### Installation

```bash
# Clone this git repository
git clone https://github.com/DevTobias/eunomia-backend.git

# Move to the project root directory
cd eunomia-backend

# Install the dependencies with npm package manager
npm install
```

### Necessary adjustments

Because of security reasons, the '.env' file is **missing**. The '.env' contains the needed `ATLAS_URI` Token to access your MongoDB Atlas database and a `SESSION_SECRET` for user authentification.

For the application to work, you have to add this file and add following code to it (note: you have to change the `<...>` to your values):

#### .env
```
ATLAS_URI=<ATLAS_URI from Cluster>
SESSION_SECRET=<Random/long string>
```

Now everything should be installed and is ready to start.

### Starting the application
```bash
# Run the local react server
npm start
```

## License

The Eunomia Backend is available under the MIT license, see the [LICENSE](https://github.com/DevTobias/eunomia-backend/blob/main/LICENSE) file for more information.
