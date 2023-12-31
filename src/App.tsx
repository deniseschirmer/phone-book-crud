// src/App.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { FaAddressBook } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RiPhoneFill } from "react-icons/ri";

const API_URL = "http://localhost:5000/api/entries";

interface Entry {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

const App: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post<Entry>(API_URL, formData)
      .then((response) => {
        setEntries([...entries, response.data]);
        setFormData({ firstName: "", lastName: "", phoneNumber: "" });
      })
      .catch((error) => console.error("Error creating entry:", error));
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => getEntries())
      .catch((error) => console.error("Error deleting entry:", error));
  };

  useEffect(() => {
    getEntries();
  }, []);

  const getEntries = () => {
    axios
      .get<Entry[]>(API_URL)
      .then((response) => {
        setEntries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching contact list:", error);
      });
  };

  return (
    <div className="phone-book-app">
      <div className="phone-book-header">
        <FaAddressBook size={35} />
        <h1 className="phone-book-title">Phone Book App</h1>
      </div>
      <div className="phone-book-sub-header">
        <h2 className="text-2xl">Contacts</h2>
        <button
          className="contact-btn"
          onClick={() => console.log("Add Contact Clicked")}
        >
          + Add Contact
        </button>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="search-input">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Search for contact by last name..."
            required
          />
          <button type="submit" className="search-icon">
            <IoSearch />
          </button>
        </div>
      </form>

      <ul className="phone-book-list">
        {entries.map((entry) => (
          <li key={entry.id}>
            <div>
              <strong>
                {entry.firstName} {entry.lastName}
              </strong>

              <p className="phone-number">
                <RiPhoneFill />
                {entry.phoneNumber}
              </p>
            </div>
            <button onClick={() => handleDelete(entry.id)}>
              <RiDeleteBin5Fill />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
