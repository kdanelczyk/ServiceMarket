# ServiceMarket
![7](https://github.com/user-attachments/assets/3480f432-438b-4275-8078-01d1634a7430)

ServiceMarket is a platform designed to facilitate the trade of one-time services across various industries. The service allows users to list their offerings or request services within specific categories. Registered users can both submit offers and respond to service requests. The platform enables users to interact with a tasks created by themselves, using various services built as microservices. 

## Project Structure

This project consists of four main microservices, each with its unique responsibilities:

### 1. **SenderService** (Spring Boot, Java)
   - **Responsibility**: 
     - Receives messages from RabbitMQ and processes them to send email notifications.
   
   - **Technologies**: Spring Boot, RabbitMQ, Email Sending (Java Mail)

### 2. **ServiceMarket** (Spring Boot, MongoDB)
   - **Responsibility**: 
     - Manages entities like `Category` and `Task`.
     - Categories are used to organize services into groups, and Tasks represent individual service requests or offers.
     - Includes a RabbitMQ component to send notifications to the `UserService` about new requests or tasks.
   
   - **Technologies**: Spring Boot, MongoDB, RabbitMQ

### 3. **UserService** (Spring Boot, PostgreSQL)
   - **Responsibility**: 
     - Handles the management of users, roles, and permissions.
     - Receives messages from RabbitMQ related to tasks and sends notifications to the `SenderService` to trigger emails.
   
   - **Technologies**: Spring Boot, PostgreSQL, RabbitMQ

### 4. **Frontend** (React.js)
   - **Responsibility**: 
     - Provides the user interface for the platform, allowing users to interact with the system, submit offers, and request services.
     - Communicates with backend microservices via REST APIs.

### 5. **RabbitMQ**
   - **Responsibility**: 
     - Acts as the message broker for communication between microservices.
     - Facilitates the transfer of data related to tasks and users between `ServiceMarket`, `UserService`, and `SenderService`.
     - Ensures that data flows securely and efficiently without direct dependencies between services.

## Role of RabbitMQ in the Project

RabbitMQ is integral to the communication between microservices in the ServiceMarket platform. Its role is crucial for:

- **Data Transfer**: RabbitMQ facilitates the transfer of important information about service offerings and requests between different microservices. This includes details about tasks (service offerings) created by users and the corresponding requests for these services.
  
- **User Communication**: User data (such as email addresses and phone numbers) is not directly exposed to the frontend application. Instead, RabbitMQ sends the necessary user data to the relevant services (like the `SenderService`) to trigger email notifications.
  
- **Decoupling Microservices**: RabbitMQ helps decouple microservices, allowing them to operate independently while still enabling communication. This ensures that each microservice can focus on its specific domain of functionality (e.g., handling tasks, managing users, or sending emails) without relying on synchronous calls to other services.
  
- **Efficiency**: By using RabbitMQ for asynchronous communication, the platform can handle large volumes of requests and messages more efficiently. Tasks like email notifications and updates about offers or requests are handled in the background, ensuring that the user experience is smooth and responsive.

## Data Models

### **Entities**

- **Category**: Represents a service category (e.g., Plumbing, Gardening, etc.) in which users can list their offerings or request services.
- **Task**: Represents a specific service request or offer. A task is linked to a `Category` and can either be a request or an offer from a user.
- **User**: Represents a registered user on the platform. Users have different roles, and their details (e.g., email address) are used to communicate task information via email.
- **Role**: Defines the permissions a user has on the platform (e.g., Admin, User, etc.).

### **DTOs (Data Transfer Objects)**

- **CategoryDTO**: Represents the category data for communication between services.
- **TaskDTO**: Represents the task data, including both request and offer details.
- **UserDTO**: Represents user details required for email notifications (e.g., name, email).
  
### **Mappers**

Mappers are used to convert between entities and DTOs. These mappings help in transferring data between the database and the API endpoints, as well as between the microservices.

### **Repository and Service Layer**

Each service is structured to follow the typical repository-service pattern:

- **Repositories**: Interact with the respective databases (MongoDB, PostgreSQL) to handle data persistence for entities like `Task`, `Category`, `User`, and `Role`.
- **Services**: Handle the business logic for tasks such as creating tasks, updating task statuses, sending email notifications, and managing users.

### **Controller Layer**

Each microservice has a REST controller layer that exposes the necessary endpoints for interacting with the frontend. These controllers receive HTTP requests and route them to the appropriate service methods.

## Authentication and Authorization

Authentication and authorization are critical for ensuring that only registered and authorized users can access the platform's functionality. Here's an outline of how it works:

- **Authentication**: Users are authenticated via JWT (JSON Web Tokens). The frontend passes the JWT token to the backend to verify the user's identity.
  
- **Authorization**: Roles are assigned to users, and certain endpoints require specific roles (e.g., only admin users can create new categories or manage users). The system checks the role of the authenticated user to ensure they have the necessary permissions.

## Technologies Used

- **Backend**: 
  - Spring Boot
  - RabbitMQ
  - MongoDB
  - PostgreSQL
  - JWT for authentication
  
- **Frontend**: React.js
- **Email Sending**: JavaMail (for sending email notifications via `SenderService`)

### **Screenshoots**
In the photo we see a logged in user checking the details of the offer:
![1](https://github.com/user-attachments/assets/2d346263-c6de-4791-9da0-6254e2136e8a)

List of tasks:
![2](https://github.com/user-attachments/assets/6c1c340d-15d4-430a-aa39-b48e857107ca)

Login panel:
![6](https://github.com/user-attachments/assets/15b40fb7-a85e-4ef8-a04b-96d23c178a55)

Selecting the category and type of task when creating it:
![3](https://github.com/user-attachments/assets/391b32bb-d1c7-460a-a45a-0b94661d0fea)

## Running the Project Locally

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/kdanelczyk/ServiceMarket.git
   ```

2. Build and run each microservice:
   - For `SenderService`: `./mvnw spring-boot:run`
   - For `ServiceMarket`: `./mvnw spring-boot:run`
   - For `UserService`: `./mvnw spring-boot:run`
   
3. Start the frontend by navigating to the `frontend` directory and running:
   ```bash
   npm install
   npm start
   ```

4. Ensure RabbitMQ is running. You can use Docker to spin up RabbitMQ:
   ```bash
   docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
   ```

5. Access the platform at `http://localhost:3000` for the frontend and use the backend APIs as needed.

## Containerization with Docker

Each microservice in the project is containerized using **Docker**. Docker images allow the services to run consistently across different environments.

### **Building Docker Images**
Each microservice has a `Dockerfile` to define its image. To build the images locally, navigate to the respective service directory and run:

```bash
docker build -t {service name} -f src/docker/Dockerfile .
```

### **Running with Docker Compose**
To orchestrate and run all microservices together, a `docker-compose.yml` file is included. It defines the services, their dependencies (databases, RabbitMQ), and networking.

To start the entire application using Docker Compose, run:

```bash
docker-compose up -d
```

This will:
- Start all microservices
- Set up RabbitMQ, MongoDB, and PostgreSQL
- Connect all services in a shared network

## Deployment in Kubernetes (GKE)

The project includes **Kubernetes deployment configurations** in the `kubernetes/` directory. These configurations ensure scalable and manageable deployment in a Kubernetes cluster.

First log in to gcloud:

```bash
gcloud init
```
After logging in and going through the configuration, we need to create docker images according to the gcr.io convention:

```bash
docker build -t gcr.io/{name of project in GKE}/{service name}:v1 -f src/docker/Dockerfile .
```

Now you need to push image:

```bash
docker push gcr.io/{name of project in GKE}/{service name}:v1
```

Each microservice has:
- A `{service name}-deployment.yaml` file to define how the service is deployed and to expose the service within the Kubernetes cluster.
Example deployment command for `ServiceMarket`:

```bash
kubectl apply -f {service name}-deployment.yaml
```

## Conclusion

ServiceMarket is a scalable, microservices-based platform that enables efficient service trading. With Docker and Kubernetes, the system is highly portable, scalable, and production-ready. 🚀
