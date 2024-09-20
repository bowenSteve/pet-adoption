import React, { useState, useEffect } from 'react';
import LoggedNav from './components/LoggedNav';
import Footer from './components/Footer';

function CreatePet() {
    const [pets, setPets] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        pet_type: '',
        breed: '',
        age: '',
        location: '',
        image_url: '',
        description: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    console.log(formData);

    function handlePets(e) {
        e.preventDefault();

        // Convert age to integer
        const dataToSubmit = {
            ...formData,
            age: parseInt(formData.age, 10)
        };

        const token = localStorage.getItem("token");

        fetch('http://127.0.0.1:5555/pets', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Add the authorization header
            },
            body: JSON.stringify(dataToSubmit),
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error('Failed to add pet');
        })
        .then(data => {
            console.log('Pet added successfully:', data);
            setFormData({
                name: '',
                pet_type: '',
                breed: '',
                age: '',
                location: '',
                image_url: '',
                description: ''
            });
            fetchPets();
            setSuccessMessage('Pet added successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        })
        .catch(error => {
            console.error('Error adding pet:', error);
        });
        
    }

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        try {
            const response = await fetch('/api/pets');
            if (!response.ok) {
                throw new Error('Failed to fetch pets');
            }
            const petsData = await response.json();
            setPets(petsData);
        } catch (error) {
            console.error('Error fetching pets:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/pets/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Failed to delete pet with ID ${id}`);
            }
            fetchPets();
        } catch (error) {
            console.error(`Error deleting pet with ID ${id}:`, error);
        }
    };

    return (
        <div>
            <LoggedNav />
            <div>
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
            <form onSubmit={handlePets} className="w-50 mx-auto">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="pet_type" className="form-label">Pet Type</label>
                    <input
                        type="text"
                        id="pet_type"
                        name="pet_type"
                        className="form-control"
                        value={formData.pet_type}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="breed" className="form-label">Breed</label>
                    <input
                        type="text"
                        id="breed"
                        name="breed"
                        className="form-control"
                        value={formData.breed}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        className="form-control"
                        value={formData.age}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        className="form-control"
                        value={formData.location}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="image_url" className="form-label">Image URL</label>
                    <input
                        type="text"
                        id="image_url"
                        name="image_url"
                        className="form-control"
                        value={formData.image_url}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn logout-btn">
                    Add Pet
                </button>
            </form>
            <ul>
                {pets.map((pet) => (
                    <li key={pet.id}>
                        <div>Name: {pet.name}</div>
                        <div>Age: {pet.age}</div>
                        <div>Breed: {pet.breed}</div>
                        <div>Description: {pet.description}</div>
                        <button onClick={() => handleDelete(pet.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default CreatePet;
