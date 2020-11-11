# React/Redux Launch Tracker

React.js app that lets the user track the schedule of both past and upcoming space
launches!
Use asynchronous requests to retrieve JSON launch data from the following public API:
https://launchlibrary.net/docs/1.2.1/api.html

The app consists of 2 screens: A “search” screen, and a “favorites” screen. The user
is able to switch between the 2 screens freely.

Search Screen:
The user is able to input start and end dates for the search.
Display the resulting schedule of launches in a list. Each list item contain the following:
● Launch Name
● Launch Window Start Time
● Rocket Name
● List of Space Agencies associated with the Rocket
● Launch Location Name / Country
● A Thumbnail Image of the Rocket (if available)

The user is able to quickly filter the results in the provided date range by:
● Rocket Agency Abbreviation
● Location Country Code

The user is able to add a particular launch to a list of “favorites”
Favorites Screen:
Display the launches the user added from the search screen.
Allow the user to remove launches from the list.

## Getting Started

To get started, first install all the necessary dependencies.

```
> npm install
```

Start the development server (changes will now update live in browser)

```
> npm run start
```

To view your project, go to: [http://localhost:3000/](http://localhost:3000/)

To make a production build of the a static SPA

```
> npm run build
```
