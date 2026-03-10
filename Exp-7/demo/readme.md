# Spring Boot Student Management API

## 📌 Overview

This project is a **Spring Boot REST API** that performs basic **CRUD operations** on a `Student` entity using **Spring Boot, Spring Data JPA, and MySQL**.

It demonstrates how to build a backend service that connects to a database and exposes REST endpoints.

---

# 🛠 Technologies Used

* Java 17
* Spring Boot
* Spring Data JPA
* MySQL
* Maven
* REST API
* Hibernate ORM

---

# 📁 Project Structure

```
com.sample.demo
│
├── controller
│      StudentController.java
│
├── service
│      StudentService.java
│
├── repository
│      StudentRepository.java
│
├── model
│      Student.java
│
└── DemoApplication.java
```

---

# ⚙️ Configuration

Database configuration is defined in:

```
src/main/resources/application.properties
```

### MySQL Configuration

```
spring.datasource.url=jdbc:mysql://localhost:3306/spring_hibernate_db
spring.datasource.username=root
spring.datasource.password=12345678
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

### Hibernate Configuration

```
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

### Server Configuration

```
server.port=8080
```

---

# 🗄 Database

Create a MySQL database before running the application.

```sql
CREATE DATABASE spring_hibernate_db;
```

Spring Boot will automatically create the **student table** using Hibernate.

---

# 📦 Student Entity

The `Student` model represents a student record.

Fields:

| Field  | Type   |
| ------ | ------ |
| id     | int    |
| name   | String |
| course | String |

---

# 🚀 API Endpoints

## 1️⃣ Get All Students

```
GET /api/students
```

Example:

```
http://localhost:8080/api/students
```

---

## 2️⃣ Get Student by ID

```
GET /api/students/{id}
```

Example:

```
http://localhost:8080/api/students/1
```

---

## 3️⃣ Add New Student

```
POST /api/students
```

Request Body:

```json
{
  "id": 1,
  "name": "Yatin",
  "course": "Computer Science"
}
```

---

# ▶️ How to Run the Project

### Step 1 — Clone the repository

```
git clone <repository-url>
```

### Step 2 — Open the project in VS Code or IntelliJ

### Step 3 — Install dependencies

```
mvn clean install
```

### Step 4 — Run the application

```
mvn spring-boot:run
```

or run the `DemoApplication.java` file.

### Step 5 — Test APIs using Thunder Client or Postman

---

# 📸 Screenshots

## Application Running in Terminal

![Application Running](s1.png)

This screenshot shows the Spring Boot application successfully starting and running on **port 8080**.

---

## API Testing in Thunder Client

![API Test Success](s2.png)

This screenshot shows a successful **GET request to `/api/students`** tested using Thunder Client in VS Code.

---

# 📊 Architecture

```
Client
   │
   ▼
Controller (REST API)
   │
   ▼
Service Layer (Business Logic)
   │
   ▼
Repository Layer (JPA)
   │
   ▼
MySQL Database
```

---

# 📚 Concepts Demonstrated

* Spring Boot Application Setup
* REST API Development
* Controller Layer
* Service Layer
* Repository Layer
* Spring Data JPA
* Hibernate ORM
* MySQL Integration

---

# 📌 Learning Outcome

After completing this experiment, you will understand:

* How to create a **Spring Boot REST API**
* How to connect **Spring Boot with MySQL**
* How **JPA repositories** work
* How **MVC architecture** is implemented in Spring Boot

---
