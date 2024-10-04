# Pawfect Match Web Application

The Pawfect Match Pet Adoption Application is a web-based platform designed to facilitate the adoption of pets. It connects potential pet owners with a user-friendly interface for managing users, pets, and adoption records. 



## Project Description

The Pawfect Match Pet Adoption Application is designed to streamline the process of adopting pets, providing a robust platform for managing users, pets and adoption records. With a focus on usability and data integrity, it ensures a smooth and efficient experience for all users involved in the pet adoption process.

## Project Features

### User Management
- Creation of new users.
- Retrieval of a list of users.

### Pet Management
- Creation of new pets.
- Retrieval of a list of pets.
- Updating pet information.
- Deletion of pets.


### Adoption Management
- Recording pet adoptions, linking users and pets with an adoption date.


## Project Functionalities

### User Management Functionalities
- **Create User**: Allows the creation of a new user through a form.
- **Read Users**: Fetches and displays a list of all users.

### Pet Management Functionalities
- **Create Pet**: Allows the creation of a new pet through a form.
- **Read Pets**: Fetches and displays a list of all pets.
- **Update Pet**: Allows updating pet information through a form.
- **Delete Pet**: Allows deletion of a pet from the database.

### Adoption Management Functionalities
- **Adopt Pet**: Allows recording an adoption by selecting a user, a pet, and specifying the adoption date through a form.

### Navigation Functionalities
- **Navigation**: Provides easy navigation between Home, Users, Pets and Adoption pages.

### Validation Functionalities
- **User Input Validations**:
  - **Name**: Ensures the name field is required.
  - **Email**: Ensures the email field is required and in proper email format.
  - **Password**: Ensures the password is present
- **Pet Input Validations**:
  - **Name**: Ensures the name field is required.
  - **Age**: Ensures the age field is required and numeric.
- **Adoption Input Validations**:
  - **Adoption Date**: Ensures the adoption date is required and in proper date format.


 ## Installation

To get a local copy up and running, follow these steps.


1. Clone the repository:
   ```sh
   git clone   https://github.com/bowenSteve/pet-adoption

### Backend Installation

1. Navigate to the backend directory:
   ```sh
   cd server

2. Download the dependencies:

   ```sh
   pipenv install

3. Activate the virtual environment:

   ```sh
   pipenv shell


4. Run the Flask app:
   
   ```sh
   python app.py


### Frontend Installation

1. Navigate to the frontend directory:

      ```sh
    cd client


2. Install the dependencies:

      ```sh
    npm install

3. Start the React app:

     ```sh

    npm start


