# Multiple API Travel app

Air Travel is a travel based web app that allows the user to search for a trip. The search feature is
dependent on multiple API's. Geonames gets the coordinates then send that data to weather bit to get
the weather. From there an image request is made and pulls a image of that location. Once the location
is diplayed a countdown time is started that shows you how many days, hours, minutes, seconds are left
till you depart. The user can also add a tip and remove their trip.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

Node Js
IDE of your choice
Clone or download this repository
You will need to create a .env file on the same level as your package.json
You will need you to create you own .env file and get your own api keys from

* [Geonames](http://www.geonames.org/)
* [Weatherbit](https://www.weatherbit.io/account/create)
* [Pixabay](https://pixabay.com/api/docs/)

### Installing

A step by step series of examples that tell you how to get a development env running

Once the project has been cloned or downloaded

use npm install --force to install all required packages

## Running the tests

use npm run test to run jest

## Deployment

npm run prod-build is used for production

npm run dev-build is used for development

## Built With

* [Geonames](http://www.geonames.org/) - API
* [Weatherbit](https://www.weatherbit.io/account/create) - API
* [Pixabay](https://pixabay.com/api/docs/) - API
* [Webpack](https://webpack.js.org/) - Dependency Management
* [Express](https://expressjs.com/) - The web framework used
* [Node](https://nodejs.org/en/) - The web framework used
* [babel](https://babeljs.io/) - Compiler

## Authors

* **Nick Castle** - *Initial work*

## Acknowledgments

* Udacity
