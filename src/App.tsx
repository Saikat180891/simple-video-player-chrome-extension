import { useState } from "react";
import { uniqueId } from "lodash";
import "./App.css";

interface IPlaylistItem {
  name: string;
  url: string;
  id: string;
}

function App() {
  const [playlist, setPlaylist] = useState<IPlaylistItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<IPlaylistItem | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPlaylist((prev) => [
        ...prev,
        { name: file.name, url, id: uniqueId() },
      ]);
    }
  };

  const clearAll = () => {
    setPlaylist([]);
    setSelectedItem(null);
  };

  return (
    <div className="wrapper">
      <ul className="playlist">
        {playlist.map((item) => (
          <li
            className={`playlist-item ${
              item.id === selectedItem?.id ? "playlist-item-selected" : ""
            }`}
            key={item.id}
            onClick={() => setSelectedItem(item)}
          >
            {item.name}
          </li>
        ))}
        <li className="playlist-item playlist-item-upload">
          <p>Upload here</p>
          <input
            className="file-input"
            type="file"
            style={{ fontSize: "50px" }}
            onChange={handleUpload}
          />
        </li>
      </ul>
      <div className="player-wrapper">
        <div className="player">
          {selectedItem && (
            <video
              controls
              src={selectedItem.url}
              onEnded={() => {
                const idx = playlist.findIndex(
                  (item) => item.url === selectedItem.url
                );
                if (idx < playlist.length - 1) {
                  setSelectedItem(playlist[idx + 1]);
                }
              }}
            />
          )}
        </div>
        <div>
          <button onClick={clearAll}>Clear all</button>
        </div>
      </div>
    </div>
  );
}

export default App;
