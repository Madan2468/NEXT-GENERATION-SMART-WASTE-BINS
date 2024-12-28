# NEXT-GENERATION SMART W ASTE BINS: IOT-BASED
W ASTE MONITORING AND COLLECTION OPTIMIZATION

## **Overview**
This project addresses critical challenges in urban waste management caused by inefficient collection systems. Problems such as overflowing bins, high operational costs, and environmental hazards are tackled using IoT principles and optimization algorithms. 

By developing a scalable system for waste collection, this project aims to:
- **Improve Collection Efficiency**: Ensures timely waste pickup and eliminates overflow scenarios.  
- **Reduce Fuel Consumption**: Optimizes collection routes to save resources.  
- **Prevent Environmental Hazards**: Encourages sustainable waste disposal practices.  

### **System Architecture Overview**  

The system is designed with three core layers:  

1. **Frontend**:  
   - **Technology**: React.js, Vite, ShadCN, OpenStreetMap APIs, Socket.IO  
   - **Purpose**: Provide an interactive interface for users to monitor and manage waste bins.  
   - **Features**:  
     - Real-time visualization of bin statuses using charts and maps.  
     - Route optimization displayed on an interactive map.  
     - Historical data trends and collection logs.  
   - **Implementation**:  
     - WebSocket integration for real-time updates.  
     - Secure token-based authentication using JWT.  

2. **Backend**:  
   - **Technology**: Node.js, Express.js, Socket.IO, Google OR-Tools  
   - **Purpose**: Process data, handle logic, and facilitate communication.  
   - **Features**:  
     - Manage bin statuses and optimize collection routes.  
     - Provide REST APIs for fetching data and real-time notifications.  
     - Use CVRP algorithms for efficient route optimization.  

3. **Database**:  
   - **Technology**: MongoDB  
   - **Purpose**: Store bin statuses, user data, and collection history.  
   - **Features**:  
     - Collections for bins, users, and routes.  
     - Indexed queries for efficient data retrieval.  
     - Archive older data for analytics and trend analysis.  

---

### **Key Features**  
1. **Real-Time Monitoring**: Dynamic updates for bin statuses using hardcoded simulations.  
2. **Route Optimization**: CVRP algorithms for efficient waste collection.  
3. **Secure Access**: Role-based authentication for administrators and collectors.  
4. **Interactive Dashboard**: Visualized data trends and alerts for anomalies.  
5. **Alert System**: Notifications for overflows and route updates.  

---

### **Technologies Used**  
- **Frontend**: React.js, Vite, ShadCN, OpenStreetMap APIs, Socket.IO  
- **Backend**: Node.js, Express.js, Google OR-Tools  
- **Database**: MongoDB  

---

### **Methodology**  
- **Monitoring**: Simulated bin data replaces IoT inputs for validation.  
- **Data Processing**: Backend logic prioritizes bins and computes optimized routes.  
- **User Interaction**: Real-time data displayed through an interactive frontend.  
- **Authentication**: JWT ensures secure and role-based access control.  

--- 

## **Features and UI Highlights**
### **1. Login/Signup System**
A secure and user-friendly authentication system for access control.  
<img width="1245" alt="Login/Signup Page" src="https://github.com/user-attachments/assets/440fd980-2a41-4498-9f9f-385ecd1c16f0" />

---

### **2. Dashboard**  
A centralized control panel to monitor and manage the waste collection system effectively.  
<img width="1245" alt="Dashboard" src="https://github.com/user-attachments/assets/0af6157d-a9de-453c-8a2f-5ad30a202596" />

---

### **3. Create New Bins**  
Easily add new bins to the system and configure their properties.  
<img width="1245" alt="Create New Bins" src="https://github.com/user-attachments/assets/424782db-0104-4764-9631-dd87120af34e" />

---

### **4. View Total Bins**  
Visualize and monitor all bins in real time for better decision-making.  
<img width="1245" alt="View Total Bins" src="https://github.com/user-attachments/assets/873c3aae-05f0-45d1-95f2-816f64549c6f" />

---

### **5. Update Bin Information**  
Update bin data, including status and location, with ease.  
<img width="1245" alt="Update Bins" src="https://github.com/user-attachments/assets/63f70222-5594-47ad-b32c-3a56b91e29ce" />

---

### **6. Route Optimization**  
Leverage intelligent algorithms to optimize waste collection routes, minimizing fuel consumption and time.  
<img width="1245" alt="Route Optimization" src="https://github.com/user-attachments/assets/b519e275-01a1-4271-b2fa-a7d96cc3b5da" />

---

## **Project Documentation**  
- **Summary**: [Download Summary](https://github.com/user-attachments/files/18231882/summary.swacbin.pdf)  
- **Full Report**: [Download Report](https://github.com/user-attachments/files/18231884/MINOR.SWACBIN.Report.pdf)

---

## **How to Run the Project**
1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/smart-waste-management.git
   ```
2. Navigate to the project directory:  
   ```bash
   cd smart-waste-management
   ```
3. Install dependencies for both backend and frontend:  
   ```bash
   npm install
   ```
4. Start the development servers:  
   - **Backend**:  
     ```bash
     nodemon server.js
     ```
   - **Frontend**:  
     ```bash
     npm run dev
     ```
5. Access the application in your browser at `http://localhost:3000`.

---

## **Future Scope**
This project lays the groundwork for integrating IoT hardware like sensors, microcontrollers, and real-time mapping tools. Future enhancements include:
- Integration with physical sensors for live data.
- Advanced route optimization using AI and ML models.
- Expansion to support city-wide waste management systems.
