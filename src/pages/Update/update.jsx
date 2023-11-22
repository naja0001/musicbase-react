import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form } from "semantic-ui-react";

const endpoint = "http://localhost:3336";

const Update = () => {
  const [artist, setArtist] = useState({
    name: "",
    genre: "",
    image: "",
  });
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const artistId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setArtist((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${endpoint}/artists/${artistId}`, artist);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <Form>
      <h1> Update {artist.name}</h1>
      <Form.Field>
        <label>Artist Name</label>
        <input
          type="text"
          placeholder="Artist Name"
          onChange={handleChange}
          name="name"
        />
      </Form.Field>
      <Form.Field>
        <label>Birthdate</label>
        <input
          type="date"
          placeholder="Artist Birthdate"
          onChange={handleChange}
          name="Birthdate"
        />
      </Form.Field>
      <Form.Field>
        <label>Gender</label>
        <select name="Gender" onChange={handleChange}>
          <option value=""></option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </Form.Field>
      <Form.Field>
        <label>Genre</label>
        <input
          type="text"
          placeholder="Artist genre"
          onChange={handleChange}
          name="genre"
        />
      </Form.Field>
      <Form.Field>
        <label>Image</label>
        <input
          type="url"
          placeholder="URL of profile picture"
          onChange={handleChange}
          name="image"
        />
      </Form.Field>
      <button onClick={handleClick}>Submit Artist</button>
      {error && "Something went wrong!"}
      <Link to="/">See all Artist</Link>
    </Form>
  );
};

export default Update;
