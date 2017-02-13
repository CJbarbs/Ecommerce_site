## Coderfactory Academy Term 3 Project
# E-Commerce website clone
### A Web application to demonstrate the use of various tools and libraries in Node.js
##Live - https://ecommerce-imkxvinqmn.now.sh

## Problem
Coderfactory students have been tasked with the creation of a web solution which would be suitable for a real world customer. While it was a group undertaking this application here was my solo endeavour to make something from scratch.

## Solution
I decided to go with an E-Commerce application which would allow the user to signup, browse products and make changes/edits to their profile.

Planned future improvements is having a social network login and integrating stripe payment system.

## Setup on a local machine
* Clone Repository
* Navigate into application folder
* An .env file will need to be created, navigate to the `config/secret.js` file to see the naming conventions used, for those who are unsure how to use env for environment variables refer to: https://github.com/motdotla/dotenv
* Faker.js will need to be referred to in order to generate fake product listings https://github.com/marak/Faker.js/ unless you wish to edit this project I would recommend using the live version.
* Run `npm install --save`
* After dependencies have been installed the application will be ready to run
* First Elastic search will need to be run, open up the application folder in a separate terminal window and run the command `elasticsearch`
* In the other terminal window the local server will be created run by simply using `nodemon`
* Navigate to localhost:3000 in your preferred browser of choice, note that Safari seems to have some issues with the layout as the site was mostly designed and tested with google chrome
* Create an account and you can begin to search products

### Technologies Stack
## Front-end
* EJS (templating engine)
## Back-end
* Node.js
* express
* MongoDB


## Embedded Javascript (EJS) usage
### Profile Page
![EJS] (http://i.imgur.com/7xdAlCM.png "EJS User profile page example")

User information is passed and rendered within the `<%= =%>` logic can be added but not rendered using `<% %>` syntax.

## Fake Data usage faker.js
### Products
![faker.js] (http://i.imgur.com/gugRmsc.png "Fake Product information")

Faker.js was used to populate product data, although it isn't the most elegant solution as the pictures do not match the product titles but it at least lets you work with some data without having to manually enter in every item.

## Creating the fake data
![fakerapi] (http://i.imgur.com/LdmvUmb.png "Code used to create 30 new products")

Located in the "api" folder is the code that was used with faker.js to create the fake data, I decided to comment everything so for future reference it is very clear how this was done. A `for loop` was initialized to loop over the code 30 times, when the terminal command was made to run the api and given a category name, 30 instances of a product belonging to that category was made.

## Database hosting mLab
![mLab] (http://i.imgur.com/N5zOGBk.png "mLab database hosting")

The data for the products, users and categories are held on mLab through an AWS server. Users and products can be deleted here.

## Data stored in mLab
![mLabdata] (http://i.imgur.com/YHG9AxW.png "mLab Product Data")

##Future improvements
Bugs persist in the search functionality and a cart system still needs to be added, I found overall the project was challenging but interesting and fun. I'd like to come back a add in a stripe payment system and social media logins, plus I'd like to improve the layout of the website as a whole.
