##  Finance Data Processing and Access Control Backend
A role-based backend system for managing financial records, analytics, and budget insights. Built to demonstrate backend architectire , API design and business logic implementation.

## objective
This project is designed to simulate a finance dashboard where users interat with financial data based on their roles.

It focuses on:
 - clean backend design.
 - Role-based access control.
 - Data processing and analytics.
 - Scalable and maintainable code.

# Tech Stack
 - Node.js
 - Express.js
 - MongoDB
 - REST API
 - Thunder Client / Postman (for testing)

# User Roles and Permissions
 - Admin - full access.
 - Analyst - view records + insights.
 - viewer - view dashboard and budgets alerts.

# Features

### User Management
- Create, update, delete users
- Assign roles (admin, analyst, viewer)
- Role-based access control
### Financial Records
- Add income / expense records
- Update and delete records
- Filter records (category, type, date)
- Soft delete support

### Dashboard Summary
- Total income
- Total expense
- Net balance
- Category-wise breakdown

### Analysis
- Highest spending category
- Most frequent category
- Monthly trends
- Transaction analytics

### Budget System (Smart Feature)
- Set budget per category
- Detect overspending
- Generate alerts
- Provide smart tips

### Additional Features
- Recent activity tracking
- Monthly trends
- Input validation & error handling

### Access Control
Role-based middleware is implemented to restrict access:

- Viewer --> Read-only access
- Analyst -->  Read + analytics
- Admin --> Full control


## API Endpoints

### Users
- `POST /users` --> Create user
- `GET /users` --> Get users
- `PUT /users/:id` --> Update user
- `DELETE /users/:id` --> Delete user



###  Records
- `POST /records` -->  Create record
- `GET /records` -->  Get records
- `PUT /records/:id` -->  Update record
- `DELETE /records/:id` --> Delete record



### Dashboard
- `GET /summary` --> Financial summary
- `GET /insights` --> Analytics insights



### Budget
- `POST /budget` --> Set budget
- `GET /budget/alerts` -->  Budget alerts + tips


### Additional
-  `GET/insights`  --> analysis of monthly daywise trends
- `GET /insights/recent` --> Recent activity
- `GET /insights/trends` --> Monthly trends



## Testing
Use Thunder Client


## Setup Instructions

# Clone repo
git clone -  https://github.com/PradnyaJadhav289/Finance-Backend.git

# Install dependencies
npm install

# Run server
npm start