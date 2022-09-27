
# Backend Task

### Objective
To create an expressJS application, which would be a REST API with the following specs -

● /user/login - User logins using a username and password

● /user/register - Create a user account using username / password

● /user/logout - Discard the JWT Token used for logging in to the system

● /tasks/createTask - Upload a new task to fetch latest tweets for the hashtag - #Bangalore

● /tasks/listTask - List out all the tasks which were executed successfully/scheduled to be queued, and
provide the metadata, such as how much time did it take to execute, status code, number of tweets
fetched. Ignore for tasks, which are not completed

● /tasks/completedTask - List out the tasks which are completed. Same as /tasks/listTask but shows only
completed tasks.


## Tech Stack


**Server:** Node, Express


## Run Locally

Clone the project

```bash
  git clone https://github.com/Supratim30/InfinityBox.git
```

Go to the project directory

```bash
  cd InfinityBox
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Running Tests

To run tests, use POSTMAN

- http://localhost:4001/user/register - will create an user in the database
- http://localhost:4001/user/login - will login with registered credentials
- http://localhost:4001/user/logout - discard the JWT Token
- http://localhost:4001/tasks/createTask - upload a new tasks
- http://localhost:4001/tasks/listTask - will list out all the tasks
- http://localhost:4001/tasks/completedTask - will give completed tasks


For authentication put key: "access-token" and value : {value from the login} in the header section
 
Create an .env file in the root and store the secret keys.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGOBD_URI`

`JWT_TOKEN`

`TWITTER_BEARER_TOKEN`


## Lessons Learned

What did you learn while building this project? What challenges did you face and how did you overcome them?

- API Development
- JWT Authentication
- Setting up MONGODB Atlas
- Auth Middleware

Unable to complete the setting up of Redis, as a result the Queue might not work. But overall it was a great learning experience.

# 


## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/supratim-majumder-53942a143/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/__s__tim)


## Feedback

If you have any feedback, please reach out to supratimmajumder30@gmail.com


