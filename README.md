# Data-Intensive System Project

This project demonstrates a data-intensive system using **MongoDB**, **Node.js**, **Express.js**, and **React.js**. It highlights the concepts of **data fragmentation** and **replication** in a multi-database architecture.

---

## 📁 Project Structure

- **Backend**: API built with Node.js and Express.js, connecting to three separate MongoDB databases.
- **Frontend**: React.js application styled with Material-UI for a modern and responsive UI.

---

## ✨ Features

- **Multi-Database Configuration**: 
  - Three MongoDB databases manage location-specific data.
- **Data Fragmentation & Replication**:
  - **Fragmented Data**: Different data types (e.g., Products, Orders, Reviews) are distributed across databases.
  - **Replicated Data**: Specific entities, such as Suppliers, are selectively replicated to illustrate fragmentation.
- **Dynamic Data Fetching**:
  - Users can switch between locations and data types for real-time updates.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** installed on your local machine.
- **MongoDB** setup locally or use a service like MongoDB Atlas.

---

## ⚙️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/iamnumy/data-intensive-assigment-3.git
cd data-intensive-assigment-3

### 2. Setup Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend

### 2. Install the required dependencies:
 ```bash
npm install

### 3.Create a .env file in the backend directory and add your MongoDB URIs and server port configuration:
  ```bash
MONGO_URI_DB1=mongodb://localhost:27017/dbHelsinki
MONGO_URI_DB2=mongodb://localhost:27017/dbLahti
MONGO_URI_DB3=mongodb://localhost:27017/dbTampere
PORT=5000

### 4. Start the backend server:
  ```bash
node server.js


### 3. Setup Frontend

### 1.Navigate to the frontend directory:
   ```bash
    cd ../frontend
    npm install
    npm start






