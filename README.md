# Danny Taylor - personal portfolio

This README serves as the documentation for the staging version of Danny Taylor's personal portfolio. The staging version is automatically [published](www.staging.dannytaylor.io) using GitHub Pages.

This project uses SASS for styling and can be run locally with live reloading for a seamless development experience. Follow the instructions below to get started.

## Prerequisites

Before you begin, ensure you have [Node.js](https://nodejs.org/) installed on your system. This will include npm, which is needed to install the project dependencies.

## Setup

First, clone the repository and navigate into the project directory,then install the necessary dependencies:

`npm install`

## Running the SASS Compiler

This project uses SASS for styling. To compile SASS to CSS and watch for changes run the following command in a terminal:

`npm run sass`

This will watch your SASS files for any changes and automatically compile them to CSS.

## Running the Project with Live-Server

To see your changes in real-time, you can use live-server, a simple development server with live reload capability.

If you haven't installed live-server globally, you can do so by running:

`npm install -g live-server`

Then, to start the server and open your project in the browser, run:

`live-server`

This will automatically open your default web browser and serve your project. Any changes to HTML, CSS, or JavaScript files will trigger a live reload of the page.