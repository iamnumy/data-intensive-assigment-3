Data-Intensive System Project

This project demonstrates a data-intensive system using MongoDB, Node.js, Express.js, and React.js. It highlights concepts of data fragmentation and replication in a multi-database architecture.
📁 Project Structure

    Backend: API built with Node.js and Express.js, connecting to three separate MongoDB databases.
    Frontend: React.js application styled with Material-UI for a modern and responsive UI.

✨ Features

    Multi-Database Configuration: Three MongoDB databases managing location-specific data.
    Data Fragmentation & Replication:
        Fragmented Data: Different data types (like Products, Orders, Reviews) are distributed across databases.
        Replicated Data: Specific entities, such as Suppliers, exist only in particular databases to illustrate fragmentation.
    Dynamic Data Fetching: Users can switch between locations and data types for real-time updates.

🚀 Getting Started
Prerequisites

    Node.js installed on your local machine.
    MongoDB setup locally or use a service like MongoDB Atlas.

Here's an improved and structured README file suitable for your GitHub project:
Data-Intensive System Project

This project demonstrates a data-intensive system using MongoDB, Node.js, Express.js, and React.js. It highlights concepts of data fragmentation and replication in a multi-database architecture.
📁 Project Structure

    Backend: API built with Node.js and Express.js, connecting to three separate MongoDB databases.
    Frontend: React.js application styled with Material-UI for a modern and responsive UI.

✨ Features

    Multi-Database Configuration: Three MongoDB databases managing location-specific data.
    Data Fragmentation & Replication:
        Fragmented Data: Different data types (like Products, Orders, Reviews) are distributed across databases.
        Replicated Data: Specific entities, such as Suppliers, exist only in particular databases to illustrate fragmentation.
    Dynamic Data Fetching: Users can switch between locations and data types for real-time updates.

🚀 Getting Started
Prerequisites

    Node.js installed on your local machine.
    MongoDB setup locally or use a service like MongoDB Atlas.

Installation

    Clone the Repository:

git clone https://github.com/iamnumy/data-intensive-assigment-3.git
cd data-intensive-assigment-3

Setup Backend:

    Navigate to the backend directory:

cd backend

Install dependencies:

npm install

Create a .env file in the backend directory with your MongoDB URIs:

MONGO_URI_DB1=mongodb://localhost:27017/dbHelsinki
MONGO_URI_DB2=mongodb://localhost:27017/dbLahti
MONGO_URI_DB3=mongodb://localhost:27017/dbTampere
PORT=5000

Start the backend server:

    node server.js

Setup Frontend:

    Navigate to the frontend directory:

cd ../frontend

Install dependencies:

npm install

Start the React app:

        npm start

💻 Usage

    Open your browser and visit http://localhost:3000.
    Use the dropdown to select a location (Helsinki, Lahti, Tampere).
    Use the tabs to view different data types: Products, Orders, Reviews, or Suppliers.
    Data is dynamically fetched from the corresponding database based on your selection.

🛠 Technologies Used

    Frontend: React.js, Material-UI
    Backend: Node.js, Express.js
    Database: MongoDB

📊 Data Structure & Concepts

    Data Fragmentation: Data is split across databases, e.g., Products in Helsinki, Lahti, and Tampere.
    Data Replication: Only relevant data is replicated, such as specific Suppliers in Tampere.
