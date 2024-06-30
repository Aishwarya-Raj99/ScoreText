ScoreText


Overview:
The Text Scoring App is a web application designed to receive a string of text, score it using two pre-trained machine learning models (Vectara and Toxicity), 
log the results to a database, and display the results in a web UI. The application is built with FastAPI, SQLite, and Docker for containerization.


 Features:

1. REST API: Receives text input and returns scores from Vectara and Toxicity models.
2. Machine Learning Integration: Utilizes pre-trained models from Hugging Face.
3. Database Logging: Logs text inputs and scores into an SQLite database.
4. Web UI: Displays the history of text inputs and scores with graphical visualization.
5. Docker Containerization: Supports easy deployment using Docker.

 Architecture



 Components

1. FastAPI: Web framework for building APIs.
2. SQLAlchemy: ORM for database interactions.
3. Hugging Face Transformers: Pre-trained NLP models.
4. SQLite: Lightweight database for logging data.
5. Docker: Containerization tool.

 Data Flow

1. User Input: Text submitted through the API endpoint.
2. Model Scoring: Text processed by Vectara and Toxicity models.
3. Database Logging: Input text and scores logged into the database.
4. Web UI: Scores and input history displayed on a web page.


Build Instructions

Prerequisites

- Python 3.9 or higher
- Docker 
- Virtual Environment (venv) module

 Steps:

1. Clone the Repository or Extract the Zip File:

    git clone <repository-url>   or    extract the zip file to desired location.
    
    cd path/to/extracted-folder

2. Set Up the Virtual Environment:

•	Open the terminal, 
o	create a virtual environment using the command:

    python -m venv venv
      
o	Activate the Virtual Environment:
    
  On Windows-

     venv\Scripts\activate
        
        
  On macOS/Linux:
      
      source venv/bin/activate
        

3. Install Dependencies

•	In terminal, write the command

     pip install -r requirements.txt
    

4. Run the Application using the command
   
       uvicorn main:app --reload
    

5. Access the Application

    - Web UI: http://localhost:8000(http://localhost:8000)
    

Build and Run with Docker 

•	Build Docker Image (In terminal):
    
    docker build -t text-scoring-app .
      

•	Run Docker Container:

    docker run -p 80:80 text-scoring-app
      

   Access the Dockerized Application:
    
      Web UI: http://localhost/(http://localhost/)
      API Endpoint: Use Postman or curl to test the /score/ endpoint.



 Quality Metrics

 Functional Metrics

1. Response Time
    - Definition: Time taken from receiving a request to sending the response.
    - Measurement: Tools like Postman or JMeter.
    - Target: < 500 ms for text scoring requests.

2. Accuracy of Scores
    - Definition: Accuracy of Vectara and Toxicity scores compared to expected outcomes.
    - Measurement: Validate model outputs using predefined test cases.
    - Target: > 90% accuracy on test cases.

 Non-Functional Metrics

1. Scalability
    - Definition: Ability to handle increased load.
    - Measurement: Load testing tools like Locust.
    - Target: Support up to 1000 requests per second without significant performance degradation.

2. Reliability
    - Definition: Ability to run continuously without failure.
    - Measurement: Monitor uptime with services like UptimeRobot.
    - Target: 99.9% uptime.

3. Security
    - Definition: Protection from unauthorized access and vulnerabilities.
    - Measurement: Security audits using tools like OWASP ZAP.
    - Target: No critical vulnerabilities.

4. Usability
    - Definition: Ease of interaction with the application.
    - Measurement: User testing sessions and feedback.
    - Target: User satisfaction score of 8/10 or higher.

5. Maintainability
    - Definition: Ease of maintenance and updates.
    - Measurement: Track time taken to implement updates and fix bugs.
    - Target: Average resolution time for issues < 24 hours.


 Scope of the Project

 In Scope

1. REST API Development
    - Endpoint creation with FastAPI.
    - Request handling and validation.
  
2. Machine Learning Integration
    - Loading and integrating Vectara and Toxicity models.
    - Text scoring and accuracy.

3. Database Management
    - SQLite setup and schema design.
    - Data persistence for text inputs and scores.

4. Web UI Development
    - User-friendly web interface.
    - Data display and graphical representation.

5. Containerization and Deployment
    - Docker setup for easy deployment.
    - Container management and environment setup.

6. Quality Assurance
    - Unit and integration testing.
    - Quality metrics definition and measurement.

7. Documentation and Presentation
    - Comprehensive build instructions.
    - Detailed architectural and technical documentation.
    - Project presentation preparation.
