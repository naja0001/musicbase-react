import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form } from "semantic-ui-react";

const endpoint = "http://localhost:3336";

const UpdateAlbums = () => {
  const [albums, setAlbums] = useState({
    name: "",
    genre: "",
    image: "",
  });
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const albumsId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setAlbums((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${endpoint}/albums/${albumsId}`, albums);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <Form>
      <h1> Update Albums</h1>
      <Form.Field>
        <label>Albums Title</label>
        <input
          type="text"
          placeholder="Albums Title"
          onChange={handleChange}
          name="title"
        />
      </Form.Field>
      <Form.Field>
        <label>Albums Release Date</label>
        <input
          type="date"
          placeholder="Albums Release Date"
          onChange={handleChange}
          name="releasedate"
        />
      </Form.Field>
      <Form.Field>
        <label>Albums Image</label>
        <input
          type="url"
          placeholder="URL of profile picture"
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

export default UpdateAlbums;
