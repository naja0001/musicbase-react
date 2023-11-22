import axios from "axios";
import { useState } from "react";
import { Form } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";

const CreateArtist = () => {
  const [artist, setArtist] = useState({
    name: "",
    genre: "",
    birthdate: "",
    gender: "",
    image: "",
  });

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const endpoint = "http://localhost:3336";

  const handleChange = (e) => {
    setArtist((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${endpoint}/artists`, artist);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <Form>
      <h1> Create New Artist</h1>
      <Form.Field>
        <label>Artist Name</label>
        <input placeholder="Artist Name" onChange={handleChange} name="name" />
      </Form.Field>
      <Form.Field>
        <label>Genre</label>
        <input
          placeholder="Artist genre"
          onChange={handleChange}
          name="genre"
        />
      </Form.Field>
      <Form.Field>
        <label>Birthdate</label>
        <input
          type="date"
          placeholder="Artist Birthdate"
          onChange={handleChange}
          name="birthdate"
        />
      </Form.Field>
      <Form.Field>
        <label>Gender</label>
        <select name="gender" onChange={handleChange}>
          <option value=""></option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </Form.Field>
      <Form.Field>
        <label>Image</label>
        <input
          type="url"
          placeholder="Profile URL picture"
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

export default CreateArtist;
