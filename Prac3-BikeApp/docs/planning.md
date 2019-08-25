# Planning

## Workflow

* Clarify knowledge disparity [COMPLETED]
* Setting up development environment
	- All developers must ensure their their .gitconfig is properly set up
	- Ensure that all developers have SSH Tunnel set up
* Set up version control
* Clarify git workflow
* Consolidate technology stack
* Write user stories
* Design application architecture
* Application wireframing
* Set up database server
* Design API
* Write unit tests
* Bug Fixeses
* Optimisation
* Report write-up [ONGOING]
* Final submission

## Developer allocation

* Andrew (Full-stack)
* Lucy (Back-end)
* Bernados (Front-end)
* Yulia (Front-end)
* Kaylee (Front-end)

## Technology Stack

### Candidate frameworks

* D3.js
* Chart.js
* React.js
* Leaflet.js
* Concurrently

### Server-side

* JWTs
* Knex
* Koa-logger
* Koa-router
* Koa-res
* Koa.js
* MariaDb (mariadb)
* Nodemon
* Objection.js (ORM)
* Object-password (Password Hasing)
* Passport.js
* SwaggerUI

Servers required: 2

### Client-side
* Jest

Servers required: 1

## Babel

This project enforces ES6+ style. There are two workarounds to this problem:

- Use ``.mjs`` file extension. When executing node scripts, run ``node --experimental-modules [FILE]``.

- Since our scripts are targeted for browser use, we could integrate ``babel`` into our build scripts, thereby foregoing the need to add ``--experimental-modules`` flag and allow us to retain ``.js`` extension in our files.

## Core Requirements

- Use an external JS library [COMPLETED]
- Build an API
- Utilise a database [COMPLETED]
- Utilise an algorithm
- Utilise external API
- Create a functioning user-interface

## Functional Requirements

- Enable users to upload a file (of any type)
- Enable users to enter specific details about their cycling activities
- Be able to parse XML/GPX data

## Required Features

* Design user-login
* Able to log user data (basic minimum is time and distance)

Users
  * First name
  * Last name
  * Weight
  * Height
  * Password
  * Frequency (calculated)

Sessions
  * Miles-per-hour (calculated)
  * Distance
  * Starting point
  * Ending point
  * Type of ride
  * Calories burned (calculated)

* Allow users to compare personal records against other cyclists
* Users can set personal goals

## Potential Features

* Weather forecasting (priority)
* Recommending suitable routes that other users have cycled based on the statistics for both users (priority)
* Show cycling path on Map
* Able to share route on social media
  * Route grading based on height profile
* Tailored information to dietary plan
* Calendar interface
* Display the contours/steepness of path
* Allow users to plan route
* Invite-A-Friend

## Client-side

The general calculations should be done on the client-side. However, expensive calculations should be done on the server-side. Other calculations such as chart rendering should be done in the front-end.

Possible calculations include:
* Parsing datetime
* Estimated calories burned
