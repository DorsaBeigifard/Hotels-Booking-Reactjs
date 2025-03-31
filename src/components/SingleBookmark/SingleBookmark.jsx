import { useEffect, useState } from "react";
import { useBookmarks } from "../context/BookmarksListProvider";
import { useNavigate, useParams } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import Loader from "../Loader/Loader";

function SingleBookmark() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookmark, currentBookmark, isLoading, updateBookmark } =
    useBookmarks();

  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    getBookmark(id);
  }, [id]);

  useEffect(() => {
    if (currentBookmark) {
      setNote(currentBookmark.note || "");
    }
  }, [currentBookmark]);

  if (isLoading || !currentBookmark) return <Loader />;

  const handleSaveNote = (e) => {
    e.preventDefault();
    updateBookmark(id, { ...currentBookmark, note });
    setIsEditing(false);
  };

  return (
    <div className="">
      <button
        className="btn btn--back mb-4"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        &larr; Back
      </button>

      <h2 className="font-semibold text-xl">{currentBookmark.cityName}</h2>
      <p className="space-x-2 text-gray-600">
        <ReactCountryFlag
          svg
          countryCode={currentBookmark.countryCode}
          className="text-lg"
        />
        <span>
          {currentBookmark.cityName} - {currentBookmark.country}
        </span>
      </p>

      <div className="mt-6 border-t pt-4 border-gray-200">
        <span className="font-medium">Personal Notes: </span>
        <form action="">
          {isEditing ? (
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-2 border border-gray-300 rounded-xl w-full min-h-[5rem] p-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          ) : (
            <p className="mt-2 border border-gray-300 rounded-xl min-h-[5rem] p-2 text-sm">
              {note || "No personal notes saved."}
            </p>
          )}
        </form>
        <div className="mt-2">
          {isEditing ? (
            <button
              type="submit"
              onClick={handleSaveNote}
              className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleBookmark;
