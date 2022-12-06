# README


## Steps to Run on local 
 Run a command  "serverless offline start"

   │   GET  | http://localhost:3000/dev/pricing/{id}                            │
   
   │   POST | http://localhost:3000/dev/checkout                                │
   
   │   POST | http://localhost:3000/dev/pricing                                 │
   
   │   GET  | http://localhost:3000/dev/getCart/{id}                            │



## Steps deploy  
 Run a command  "serverless deploy"

endpoints:
   │   GET  | https://ygmw5rq37e.execute-api.ap-southeast-2.amazonaws.com/dev/pricing/{id}                           │
   
   │   POST | https://ygmw5rq37e.execute-api.ap-southeast-2.amazonaws.com/dev/checkout                                     │
   
   │   POST | https://ygmw5rq37e.execute-api.ap-southeast-2.amazonaws.com/dev/pricing                                      │
   
   │   GET  | https://ygmw5rq37e.execute-api.ap-southeast-2.amazonaws.com/dev/getCart/{id}                             │


## functions:

  getAdPrice: Get advertisement price for a business

  createCart: Create a cart for a business 

  createAdPrice: Create advertisement price for a business

  getCart: Get a cart for a business
                                                                            

## Steps to run test 
 Run a command  " npm run test"
                                                                            
## Additional

Set up the AWS CLI

> aws configure

Project setup

# Install serverless package globally
> npm install -g serverless

#Initialize a new serverless project

> serverless create --template aws-nodejs-typescript --path aws-serverless-typescript-api

> npm install

## Project structure

Models: Define schema and connect it to our database

Service: Contains  business handler functions

Functions: Contains Lambda functions