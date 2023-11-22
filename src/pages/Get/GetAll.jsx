import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchIcon from "./search.svg";

const endpoint = "http://localhost:3336";

const Artists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAllArtists = async () => {
      try {
        const res = await axios.get(`${endpoint}/albums`);
        setAlbums(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllArtists();
  }, []);

  console.log(albums);

  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchAllAlbums = async () => {
      try {
        const res = await axios.get(`${endpoint}/artists`);
        setArtists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllAlbums();
  }, []);

  console.log(artists);

  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchAllTracks = async () => {
      try {
        const res = await axios.get(`${endpoint}/tracks`);
        setTracks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTracks();
  }, []);

  console.log(tracks);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${endpoint}/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async () => {
    const searchTermLowerCase = searchTerm.toLowerCase();

    if (searchTermLowerCase === "") {
      // If search term is empty, reset to the original unfiltered data
      try {
        const resArtists = await axios.get(`${endpoint}/artists`);
        const resAlbums = await axios.get(`${endpoint}/albums`);
        const resTracks = await axios.get(`${endpoint}/tracks`);

        setArtists(resArtists.data); // Access the data property
        setAlbums(resAlbums.data);
        setTracks(resTracks.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      // Otherwise, perform the search
      const filteredArtists = artists.filter((artist) =>
        artist.name.toLowerCase().includes(searchTermLowerCase)
      );

      const filteredAlbums = albums.filter((album) =>
        album.title.toLowerCase().includes(searchTermLowerCase)
      );

      const filteredTracks = tracks.filter((track) =>
        track.title.toLowerCase().includes(searchTermLowerCase)
      );

      // Combine the results of the three filtered arrays
      const combinedResults = [
        ...filteredArtists,
        ...filteredAlbums,
        ...filteredTracks,
      ];

      // Update state with the filtered results
      setArtists(filteredArtists);
      setAlbums(filteredAlbums);
      setTracks(filteredTracks);

      console.log("Search results:", combinedResults);
    }
  };

  return (
    <div className="Artists">
      <h1>Musicbase</h1>
      <div className="buttons">
        <button className="button-6">
          <Link to="/Post" style={{ color: "inherit", textDecoration: "none" }}>
            Create new Artist
          </Link>
        </button>
        <button className="button-6">
          <Link
            to="/PostAlbum"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Create new Album
          </Link>
        </button>
        <button className="button-6">
          <Link
            to="/PostTrack"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Create new Track
          </Link>
        </button>
      </div>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for artist, albums and tracks"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            handleSearch();
          }}
        />
      </div>

      <h2>Artists</h2>
      <div className="container">
        {artists.map((artist) => (
          <div key={artist.id} className="artist">
            <div>
              <p>{artist.name}</p>
            </div>
            <div>
              <img
                src={
                  artist.image && artist.image !== "N/A"
                    ? artist.image
                    : "https://via.placeholder.com/400"
                }
                alt={artist.gender}
              />
            </div>

            <div>
              <button
                className="delete"
                onClick={() => handleDelete(artist.id)}
              >
                Delete
              </button>
              <button className="update">
                <Link
                  to={`/Update/${artist.id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Update
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
      <h2>Albums</h2>
      <div className="container">
        {albums.map((albums) => (
          <div key={albums.id} className="artist">
            <div>
              <p>{albums.title}</p>
            </div>
            <div>
              <img
                src={
                  albums.image && albums.image !== "N/A"
                    ? albums.image
                    : "https://via.placeholder.com/400"
                }
                alt={albums.release_date}
              />
            </div>

            <div>
              <button
                className="delete"
                onClick={() => handleDelete(albums.id)}
              >
                Delete
              </button>
              <button className="update">
                <Link
                  to={`/UpdateAlbum/${albums.id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Update
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
      <h2>Tracks</h2>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Length</th>
              <th>Release Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track) => (
              <tr key={track.id} className="tracks">
                <td>{track.title}</td>
                <td>{track.length}</td>
                <td>{track.release_date}</td>
                <td>
                  <button
                    className="delete"
                    onClick={() => handleDelete(track.id)}
                  >
                    Delete
                  </button>
                  <button className="update">
                    <Link
                      to={`/UpdateAlbums/${track.id}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      Update
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Artists;
