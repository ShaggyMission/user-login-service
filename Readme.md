# 🔐 User Login Service - Shaggy Mission

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" alt="Sequelize" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" 
  alt="MySQL" />

</div>

<div align="center">
  <h3>🚀 Secure Authentication Microservice for Pet Rescue Platform</h3>
  <p><em>Part of the Shaggy Mission ecosystem - Secure access for heroes saving street animals! 🐾</em></p>
</div>

---

## 🌟 Overview

The **User Login Service** is the authentication gateway for the Shaggy Mission platform that manages secure user access and session control. This service ensures that volunteers, adopters, veterinarians, and administrators can securely authenticate and access their rescue mission tools with proper role-based permissions.

## 🎯 What This Service Does

- **Secure User Authentication**: Validates user credentials using bcrypt password verification
- **JWT Token Generation**: Creates secure JSON Web Tokens with user information and role data
- **Role Integration**: Fetches user roles from Role Service to embed in authentication tokens
- **Cookie-Based Sessions**: Manages secure HTTP-only cookies for session persistence
- **Session Management**: Provides secure login and logout functionality
- **Cross-Service Communication**: Integrates with Role Service to retrieve user permissions

## 🛠️ Tech Stack

- **Runtime**: Node.js with Express.js framework
- **Authentication**: JWT (JSON Web Tokens) for secure session management
- **Security**: bcrypt for password verification
- **Database**: PostgreSQL with Sequelize ORM
- **Cookies**: HTTP-only cookies with security configurations
- **Service Communication**: Axios for inter-service requests
- **Middleware**: Cookie parser for session handling

## 📡 API Endpoints

### User Login Endpoint
**`POST /auth/login`**
- Authenticates users with email and password credentials
- Verifies password using bcrypt comparison
- Fetches user role from Role Service
- Generates JWT token with user data and role information
- Sets secure HTTP-only cookies for session management

```json
{
  "email": "john.doe@email.com",
  "password": "securePassword123"
}
```

### User Logout Endpoint
**`POST /auth/logout`**
- Terminates user sessions securely
- Clears authentication cookies
- Provides clean session termination

```json
{}
```

## 🔧 Core Functionality

### Authentication Process
The service handles the complete authentication workflow by validating user credentials, verifying email existence in the database, comparing provided passwords with stored bcrypt hashes, fetching user roles from the Role Service, generating JWT tokens with user information and permissions, and setting secure HTTP-only cookies for session persistence.

### Security Features
- **Password Security**: Uses bcrypt for secure password comparison
- **JWT Token Security**: Configurable expiration times and secret keys
- **HTTP-Only Cookies**: Prevents XSS attacks with secure cookie settings
- **Role-Based Access**: Integrates user roles into authentication tokens
- **Session Control**: Secure login and logout functionality

### Database Schema
The service accesses a Users table with fields for unique string ID, first name, last name, email (unique identifier), hashed password, and phone number. The service reads user data for authentication without modifying user records.

## 🌐 Service Integration

This microservice serves as the authentication hub for the entire Shaggy Mission platform, working closely with the Role Service (port 3003) to fetch user permissions and integrate them into authentication tokens. It enables secure access control across all platform components based on user roles in the pet rescue ecosystem.

## 🔒 Session Management

- **Token Generation**: JWT tokens include user ID, email, and role information
- **Cookie Security**: HTTP-only cookies with SameSite protection
- **Expiration Control**: Configurable token and cookie lifetimes
- **Clean Logout**: Proper session termination and cookie clearing

---

<div align="center">
  <p><strong>Built with ❤️ for street dogs and cats everywhere 🐕🐱</strong></p>
  <p><em>Every secure login helps protect our rescue mission data!</em></p>
</div>