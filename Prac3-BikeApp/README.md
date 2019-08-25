# CS5003 Assignment 03 - Code Submission

## Installation

```bash
# Install npm dependencies
npm install
```

### Launching the database

```bash
# Build local development database
npx knex migrate:latest --env development
npx knex seed:run --env development
# Build the staging database
npx knex migrate:latest --env staging
npx knex seed:run --env staging

# Go to src/client/src/Dashboard/Dashboard.js and change TEST_USER to a selected User in your database
```

## Running the Server

```bash
# Initiate the server
npm run server
```

## Launching the client

Resolve dependencies conflict cause by ``react-script`` by adding ``SKIP_PREFLIGHT_CHECK=true`` to your ``/src/client/.env``.

You will need to install the server dependencies and client build dependencies seperately.

```bash
# Switch into client directory and install dependencies
cd src/client && npm install

# GO BACK TO THE ROOT DIRECTORY and run the following
cd ../../ && npm run start
```

We encourage you to use the Developer Console when testing.

## Documentation

For proof of documentation, please see ``/docs/server/documentation``

## Marker's instructions

We generally try to make it easy for markers to work and mark our code. However, due to the complexity, we want to give you instructions in case you were not able to launch our client (which has been thoroughly tested in the lab machines).

* You may run into the folliwng error: ``System limit for number of file watchers reached``. This is a system-specific error. It means you hit the system's file watcher limit. Try closing down applications that rely on watcher (e.g. VSCode)

* When you first seed your database, you may run into a ``fetch`` error in the client. This is intentional. We did not implement a register mechanism (which we should have). You can overcome this by changing the TEST_USER variable in Dashboard. The default behaviour is that the database is hosted on ``ajw40@host.cs.st-andrews.ac.uk``, so our default provided user should work.

* If you run into a compilation error when clicking on sessions in geojson, it is likely because the GeoJson format is wrong. This is expected behaviour, since we did not catch the error (which requires us to validate the file as valid geojson).

## Features

* Can add goals
* Displays user-specifi information in sessions page
* Display average speed and most chosen biking type
* Displays a map
* Allows users to input new session and upload geojson data
* Shows completed and incomplete goals

## LICENSE
GNU GPLv2