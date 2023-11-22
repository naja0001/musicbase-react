import axios from "axios";
import { useState } from "react";
import { Form } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";

const CreateTracks = () => {
  const [track, setTrack] = useState({
    title: "",
    length: "",
    releasedate: "",
  });

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const endpoint = "http://localhost:3336";

  const handleChange = (e) => {
    setTrack((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${endpoint}/tracks`, track);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <Form>
      <h1> Create New Tracks</h1>
      <Form.Field>
        <label>Track Title</label>
        <input placeholder="Track Title" onChange={handleChange} name="title" />
      </Form.Field>
      <Form.Field>
        <label>Length</label>
        <input
          placeholder="Track Length"
          onChange={handleChange}
          name="length"
        />
      </Form.Field>
      <Form.Field>
        <label>Tracks release date</label>
        <input
          type="date"
          placeholder="Tracks release date"
          onChange={handleChange}
          name=" releasedate"
        />
      </Form.Field>
      <button onClick={handleClick}>Submit Track</button>
      {error && "Something went wrong!"}
      <Link to="/">See all Tracks</Link>
    </Form>
  );
};

export default CreateTracks;
