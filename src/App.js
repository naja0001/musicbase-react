import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateArtist from "./pages/Post/PostArtists";
import CreateAlbum from "./pages/Post/PostAlbums";
import CreateTrack from "./pages/Post/PostTracks";
import Artists from "./pages/Get/GetAll";
import Update from "./pages/Update/update";
import UpdateAlbum from "./pages/Update/updateAlbums";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Artists />} />
          <Route path="/Post" element={<CreateArtist />} />
          <Route path="/PostAlbum" element={<CreateAlbum />} />
          <Route path="/PostTrack" element={<CreateTrack />} />
          <Route path="/Update/:id" element={<Update />} />
          <Route path="/UpdateAlbum/:id" element={<UpdateAlbum />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
