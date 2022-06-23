# ABC Book Fan Club &#x1F4D8;
A book fan club, ABC Book, allows its members to borrow books from the club. Due to increasing membership, the club management needs a web console for easier management.

&nbsp;

In the project directory, you can run:

### `npm install`
### `docker-compose up`

Runs the app in the development mode.\
Open docker desktop and ensure mongo_db is running on `port:27017` and express backend is running on `port:3001`

The server will reload if you make edits.

&nbsp;

## System Requirements
1. NodeJS
1. MongoDB

&nbsp;

## Environment variables (Example)
```
PORT=3001
DB_USERNAME=mongo_user
DB_PASSWORD=mongo_password
DB_HOST=mongo_db
SUPER_ADMIN_EMAIL=super@admin.com
SUPER_ADMIN_PASSWORD=password
```

&nbsp;

## &#x1F34E;  Features
1. Full CRUD of users and books
1. Login Authorisation
1. User and Book Role-restriction management 


&nbsp;

## Backend (EXPRESS)
Package Name | Description
--- | ---
nodemon | Automatically restarting the node application when file changes in the directory are detected
dotenv | Loads environment variables from a `.env` file
express | Minimalist web framework for node
mongodb | MongoDB driver for Node.js
mongoose | MongoDB object modeling tool designed to work in an asynchronous environment
bcryptjs | A library to help hash passwords.
cors | middleware that can be used to enable CORS with various options
joi | Object schema validation

&nbsp;

## Routes (Books Controller)

Type | Controller | Route | Allow |Description
--- | --- | --- | --- | ---
**GET** | /books | /  | ALL | retrieves all books from db.
**GET** | /books | /:id | ALL | finds and retrieves a single book from db.
**POST** | /books | / | ADMIN, EDITOR | create a new book.
**PUT** | /books | /:id | ADMIN, EDITOR | edit the details of an existing book.
**PUT** | /books | /borrow/:id | ALL | changes the book availabiliy to false and records the current user's Id
**DELETE** | /books | /:id | ADMIN , EDITOR | removes a single book in the db, if available.


&nbsp;

## Routes (Users Controller)

Type | Controller | Route | Allow |Description
--- | --- | --- | --- | ---
**GET** | /user | /  | ADMIN, EDITOR | retrieves all the current users in the app.
**GET** | /user | /:id | ADMIN, EDITOR | finds and retrieves a single user.
**POST** | /user | / | ADMIN | create a new user account.
**PUT** | /user | /:id | ADMIN | edit details of an existing user.
**DELETE** | /user | /:id | ADMIN | removes a single user in the db.

&nbsp;

## Routes (Auth Controller)

Type | Controller | Route | Allow |Description
--- | --- | --- | --- | ---
**POST** | /login | / | ALL | checks login credentials and returns jwt token upon successful login.

&nbsp;

## Improvements
Due to time constrains, several of the following should be implemented and improved upon as features/best practices
1. Analytics
1. Data Validation
1. Unit testing



&nbsp;

## &#x1F534; Warning
This application is a work in progress and the early stages of development. 
> Not for commercial use. Mavericks Consulting Pte Ltd ®