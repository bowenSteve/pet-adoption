import React, { useState, useEffect } from 'react';
import LoggedNav from './components/LoggedNav';
function CreatePet(){
    const [pets, setPets] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        breed: '',
        description: ''
    });

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        try {
            const response = await fetch('/api/pets'); // Replace with actual API endpoint
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/pets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to create pet');
            }
            setFormData({
                name: '',
                age: '',
                breed: '',
                description: ''
            });
            fetchPets();
        } catch (error) {
            console.error('Error creating pet:', error);
        }
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
            <h2>Pets</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="age">Age</label>
                    <input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="breed">Breed</label>
                    <input type="text" id="breed" name="breed" value={formData.breed} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} />
                </div>
                <button type="submit">
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
    );
};

export default CreatePet;
