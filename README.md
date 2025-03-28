# Contact List App! 

I made this project to demonstrate the skils of buildings a PERN stack application. 

## Project Objective:

This project utilizes a backend server, created with Express.js. Making calls to an API, displaying the data to the frontend.

## Technologies used

React 
Express.js
Node.js
PostgreSQL
VSCode 
Tailwind CSS

## Installation Instructions

2. Clone this repository.
3. Open the cloned repository in a code editor.


### Environment setup: 

cd server and run 

`````````
npm install
`````````

cd client and run 

`````````
npm install
`````````

### PostgreSQL setup: 
In your terminal log-in to PostgreSQL 
1. create a database called mycontacts 

`````````
CREATE DATABASE mycontacts 
`````````
2. to find your username and host enter 
`````````
\conninfo
`````````


### Database setup: 
At the path server/sample.env
1. copy the database information from sample.env 
2. create a new .env file and paste the information from the sample there 
3. enter your own database information into this file


### How to run:

Creating database tables 
1. cd into the folder server 
2. run the following command in your terminal at the server folder level to create the project database tables 

`````````
psql -U your_user -d your_database -f dumpfile.sql
`````````

For Backend
1. cd into the folder server  
2. In the terminal type ````````` node server.js`````````

To confirm the backend is connection navigate to the URL 
`````````localhost:3000`````````

To confirm the databases are connected navigate to the URL to check the different tables 

`````````localhost:3000/contacts`````````


For Frontend
1. cd into the folder client
2. In the terminal type ````````` npm run dev `````````


## Future Implementation: 

[ ] enchance CSS features 
[ ] include icons for starsign information
[ ] connect to an API to display horoscope information




## Project Preview: 
![contact-list-app](https://github.com/user-attachments/assets/8b079988-af40-48f4-b41e-5c7efabc1394)



