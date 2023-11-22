import axios from "axios";
import { useState } from "react";
import { Form } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";

const CreateAlbum = () => {
  const [album, setalbum] = useState({
    title: "",
    releasedate: "",
    image: "",
  });

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const endpoint = "http://localhost:3336";

  const handleChange = (e) => {
    setalbum((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${endpoint}/albums`, album);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <Form>
      <h1> Create New Album</h1>
      <Form.Field>
        <label>Album Name</label>
        <input placeholder="Album Title" onChange={handleChange} name="Title" />
      </Form.Field>
      <Form.Field>
        <label>Albums release date</label>
        <input
          type="date"
          placeholder="Albums release date"
          onChange={handleChange}
          name="releasedate"
        />
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
      <button onClick={handleClick}>Submit Album</button>
      {error && "Something went wrong!"}
      <Link to="/">See all Albums</Link>
    </Form>
  );
};

export default CreateAlbum;
