Text Score

Overview:

This app is a web application designed to receive a string of text, score it using two pre-trained machine learning models (Vectara and Toxicity), log the results to a database, and display the results in a web UI. The application is built with FastAPI, SQLite, and Docker for containerization.

Features:

1. REST API: Receives text input and returns scores from Vectara and Toxicity models.
2. Machine Learning Integration: Utilizes pre-trained models from Hugging Face.
3. Database Logging: Logs text inputs and scores into an SQLite database.
4. Web UI: Displays the history of text inputs and scores with graphical visualization.
5. Docker Containerization: Supports easy deployment using Docker.

Components:

1. FastAPI: Web framework for building APIs.
2. SQLAlchemy: ORM for database interactions.
3. Hugging Face Transformers: Pre-trained NLP models.
4. SQLite: Lightweight database for logging data.
5. Docker: Containerization tool.

Data Flow:

1. User Input: Text submitted through the API endpoint.
2. Model Scoring: Text processed by Vectara and Toxicity models.
3. Database Logging: Input text and scores logged into the database.
4. Web UI: Scores and input history displayed on a web page.


Build Instructions

Prerequisites:

- Python 3.9 or higher
- Docker 
- Virtual Environment (venv) module

 Steps:

1. Clone the Repository or Extract the Zip File:

    git clone <repository-url>   or    extract the zip file to desired location.
    
    cd path/to/extracted-folder

2. Set Up the Virtual Environment:

•	Open the terminal, create a virtual environment using the command:

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

    - Web UI: http://localhost:8000
    

Build and Run with Docker 

•	Build Docker Image (In terminal):
    
    docker build -t my-image .
      

•	Run Docker Container:

    docker run -p 80:80 my-image
      

   Access the Dockerized Application:
    
      Web UI: http://localhost/
      

 Quality Metrics

1. Response Time
    - Definition: Time taken from receiving a request to sending the response.
    - Measurement: Used Postman 
    - Target: Average time taken to generate score was less than 500 ms.

2. Accuracy of Scores
    - Definition: Accuracy of Vectara and Toxicity scores compared to expected outcomes.
    - Measurement: Compared the produced scores with the scores from HuggingFace website.
    - Target: Achieved more than 90% accuracy on test cases.




