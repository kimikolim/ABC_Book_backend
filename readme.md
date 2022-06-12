# ABC Book Fan Club &#x1F4D8;
A book fan club, ABC Book, allows its members to borrow books from the club. Due to increasing membership, the club management needs a web console for easier management.

&nbsp;

## System Requirements
1. NodeJS
1. MongoDB

&nbsp;

## Environment variables (Example)
```
PORT=<your input>
USERNAME=<your input>
PASSWORD=<your input>
DB=<your input>
```

&nbsp;

## &#x1F34E;  Features
1. Full CRUD of user account and books
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
**GET** | /books | /  | ALL | enter description here.
**GET** | /books | /:id | ALL | enter description here.
**POST** | /books | / | ADMIN, EDITOR | enter description here.
**PUT** | /books | /:id | ADMIN, EDITOR | enter description here.
**PUT** | /books | /borrow/:id | ALL | enter description here.
**DELETE** | /books | /:id | ADMIN , EDITOR | enter description here.


&nbsp;

## Routes (Users Controller)

Type | Controller | Route | Allow |Description
--- | --- | --- | --- | ---
**GET** | /user | /  | ADMIN, EDITOR | enter description here.
**GET** | /user | /:id | ADMIN, EDITOR | enter description here.
**POST** | /user | / | ADMIN | enter description here.
**PUT** | /user | /:id | ADMIN | enter description here.
**DELETE** | /user | /:id | ADMIN | enter description here.

&nbsp;

## Routes (Auth Controller)

Type | Controller | Route | Allow |Description
--- | --- | --- | --- | ---
**POST** | /login | / | ALL | enter description here.

&nbsp;

## Future Improvements
1. Input 1
1. Input 2

&nbsp;

## &#x1F4D9; Challenges faced
1. Backend Data Architecture
1. Relational Models with MongoDB

&nbsp;

## &#x1F534; Warning
This application is a work in progress and the early stages of development. 
> Not for commercial use. Mavericks Consulting Pte Ltd ®