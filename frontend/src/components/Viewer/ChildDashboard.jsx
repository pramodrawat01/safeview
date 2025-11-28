import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ChildDashboard = () => {
  const [allVideos, setAllVideos] = useState([]);
  const [show, setShow] = useState(false);

  const [selectPlaylist, setSelectPlaylist] = useState(null);

  const [playlist, setPlaylist] = useState([]);

  const [name, setName] = useState("");

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/auth/logout", {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        console.log(data.message);
        toast.success(data.message)
        localStorage.clear('Role')
        navigate("/login");
      }
    } catch (error) {
      console.log("error in logout", error);
    }
  };

  const getVideos = async () => {
    const res = await fetch("http://localhost:3000/api/v1/kid/get_videos", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    // console.log(data, "this is videos data")

    if (res.status === 400) {
      return toast.error(data.message);
    }

    if (res.status === 200) {
      // console.log(data.message)
      // console.log(data.videos)

      setAllVideos(data.videos);
    }
  };

  useEffect(() => {
    getVideos();
    handleGetPlaylists();
  }, []);

  const handleGetPlaylists = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/v1/playlist/get_playlists",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.status === 500) {
        return toast.error(data.message);
      }

      if (res.status === 404) {
        return toast.error(data.message);
      }

      if (res.status === 200) {
        //  toast.success(data.message)
        //  console.log(data.message , "all playlist got ")
        //  console.log(data.playlists)

        setPlaylist(data.playlists);
      }
    } catch (error) {}
  };

  const handleCreatePlaylist = async () => {
    console.log(name, "playlist name");
    try {
      const res = await fetch(
        "http://localhost:3000/api/v1/playlist/create_playlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name }),
        }
      );
      const data = await res.json();

      if (res.status === 500) {
        return toast.error(data.message);
      }

      if (res.status === 201) {
        toast.success(data.message);
        setShow(!show);
        handleGetPlaylists();
      }
    } catch (error) {}
  };

  const deletePlaylist = async (playlistId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/playlist/delete_playlist/${playlistId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.status === 500) {
        return toast.error(data.message);
      }

      if (res.status === 404) {
        return toast.error(data.message);
      }

      if (res.status === 200) {
        toast.success(data.message);
        handleGetPlaylists();
      }
    } catch (error) {
      console.log(error.message, "failed to delete playlist");
    }
  };

  const handleAddToPlaylist = async (playlistId, videoId) => {
    console.log(playlistId, videoId);

    try {
      const res = await fetch(
        "http://localhost:3000/api/v1/playlist/add_to_playlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
          credentials: "include",
          body: JSON.stringify({ playlistId, videoId }),
        }
      );

      const data = await res.json();

      if (res.status === 500) {
        return toast.error(data.message);
      }

      if (res.status === 404) {
        return toast.error(data.message);
      }

      if(res.status === 401){
        return toast.error(data.message)
      }
      if (res.status === 200) {
        console.log(data.message);

        handleGetPlaylists();
      }
    } catch (error) {}
  };
  return (
   


    <div className="min-h-screen bg-white text-black p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">ChildDashboard</h1>
        <button
          onClick={() => handleLogout()}
          className="border border-black px-4 py-1 rounded hover:bg-black hover:text-white transition"
        >
          logout
        </button>
      </div>

      <div className="mb-10">
        <button
          onClick={() => setShow(!show)}
          className="border border-black px-3 py-1 rounded hover:bg-black hover:text-white transition"
        >
          create new playlist
        </button>

        {show && (
          <div className="mt-3 flex gap-2">
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="enter playlist name here"
              className="border p-2 rounded outline-none focus:border-black"
            />
            <button
              onClick={() => handleCreatePlaylist()}
              className="border border-black px-4 py-1 rounded hover:bg-black hover:text-white transition"
            >
              create
            </button>
          </div>
        )}
      </div>

      <div className="mb-12">
        {playlist && playlist.length > 0 ? (
          <div className="space-y-6">
            {playlist?.map((p) => (
              <div key={p._id} className="border p-4 rounded">
                <h4 className="font-semibold mb-2">
                  playlist name : {p.name}
                  <button
                    onClick={() => deletePlaylist(p._id)}
                    className="ml-4 border border-black px-2 py-1 text-sm rounded hover:bg-black hover:text-white transition"
                  >
                    delete playlist
                  </button>
                </h4>

                {p?.videos && p?.videos.length > 0 ? (
                  <div className="grid grid-cols-3 gap-4">
                    {p.videos.map((v) => (
                      <div key={v._id} className="border rounded p-2">
                        <a href={v.url} target="_blank" rel="noreferrer">
                          <img
                            src={v.thumbnail}
                            className="w-full rounded"
                            alt={v.title}
                          />
                        </a>
                        <p className="text-sm mt-1">{v.title}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">no video added yet…</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">no playlists created yet…</p>
        )}
      </div>

      <div>
        <p className="font-bold text-lg mb-3">Allowed videos</p>

        {allVideos.length > 0 ? (
          <div className="grid grid-cols-4 gap-4">
            {allVideos.map((video) => (
              <div key={video._id} className="border p-3 rounded">
                <a href={video.url} target="_blank" rel="noreferrer">
                  <img
                    src={video.thumbnail}
                    className="w-full rounded"
                    alt={video.title}
                  />
                </a>

                <p className="font-medium text-sm mt-1">{video.title}</p>
                <p className="text-gray-600 text-xs">{video.category}</p>

                <button
                  onClick={() =>
                    setSelectPlaylist(
                      selectPlaylist === video._id ? null : video._id
                    )
                  }
                  className="border border-black px-3 py-1 mt-2 text-sm rounded hover:bg-black hover:text-white transition"
                >
                  Add to Playlist
                </button>

                {
                  selectPlaylist === video._id && (
                    <ul className="mt-2 border rounded bg-white text-sm">
                      {
                        playlist && playlist.length > 0
                        ?
                        playlist?.map((p) => (
                        <li
                          key={p._id}
                          onClick={() => handleAddToPlaylist(p._id, video._id)}
                          className="px-3 py-1 border-b last:border-none hover:bg-black hover:text-white cursor-pointer transition"
                        >
                          {p.name}
                        </li>
                      )
                      )
                      : 
                      <p>no playlist yet..</p>
                      }
                    </ul>
                  )
                }
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ChildDashboard;