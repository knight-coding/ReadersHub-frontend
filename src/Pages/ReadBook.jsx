import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Comment from "../Components/Comment";
import axios from "axios";
import conf from "../conf/conf";

export default function ReadBook() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const bookId = state?.bookId;

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState();
  const [image, setImage] = useState(null);
  const [source, setSource] = useState(null);
  const [author, setAuthor] = useState(null);
  const [genre, setGenre] = useState([]);
  const [rating, setRating] = useState(0);

  const [review, setReview] = useState("");
  const [inputRating, setInputRating] = useState(0);
  const [refreshComments, setRefreshComments] = useState(false);

  const API = conf.backendUrl;

  // view toggle
  const [viewMode, setViewMode] = useState(
    localStorage.getItem("viewMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  const handleReview = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("You must be logged in to add a review");
      navigate("/login");
      return;
    }
    if (!review.trim()) {
      alert("Comment is required");
      return;
    }
    if (inputRating === 0) {
      alert("At least one star is required.");
      return;
    }

    try {
      await axios.post(
        `${API}/book/review/add/${bookId}`,
        { comment: review, rating: inputRating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReview("");
      setInputRating(0);
      setRefreshComments((prev) => !prev);
    } catch (err) {
      console.error("Failed to post review", err);
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      if (!bookId) {
        navigate("/explore");
        return;
      }
      try {
        const res = await fetch(`http://localhost:4000/store/${bookId}`);
        const data = await res.json();
        setAuthor(data.author);
        setDescription(data.description);
        setImage(data.coverImage);
        setTitle(data.title);
        setSource(data.source);
        setGenre(data.genre);
        setRating(data.rating);
      } catch (err) {
        console.error("Failed to fetch book by ID:", err);
      }
    };

    fetchBook();
  }, [bookId, navigate, viewMode]);

  return (
    <div className="bg-[#fdf9f4] min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#f3e9dd] border-b border-gray-300 flex items-center px-4 py-3 shadow-sm sticky top-0 z-10">
        <img
          src="https://icon-library.com/images/back-arrow-icon-png/back-arrow-icon-png-20.jpg"
          alt="back"
          className="w-8 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => navigate("/explore")}
        />
        <p className="flex-grow text-center text-xl md:text-2xl font-bold text-[#384a63]">
          {title}
        </p>
      </header>

      {/* Main section */}
      <div className="flex justify-center items-center flex-1 p-4">
        <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-2xl shadow-xl border border-[#e3d3bf] overflow-hidden">
          {/* Left - Book info */}
          <div className="flex flex-col items-center w-full md:w-1/2 bg-[#fdf3e7] p-6">
            <img
              src={image}
              alt={title}
              className="rounded-xl w-40 md:w-60 shadow-md"
            />
            <p className="text-center text-2xl font-bold text-[#384a63] mt-4">
              {title}
            </p>
            <p className="text-center text-md font-semibold text-[#6381ab]">
              By {author}
            </p>
          </div>

          {/* Right - Tabs (Desc/Review) */}
          <div className="flex flex-col w-full md:w-1/2 bg-[#E6B17E] p-6">
            {/* Tab buttons */}
            <div className="flex gap-6 border-b border-[#c49365] mb-4">
              <button
                className={`pb-2 font-medium ${
                  !viewMode
                    ? "text-[#384a63] border-b-4 border-[#384a63]"
                    : "text-gray-600"
                }`}
                onClick={() => setViewMode(false)}
              >
                Description
              </button>
              <button
                className={`pb-2 font-medium ${
                  viewMode
                    ? "text-[#384a63] border-b-4 border-[#384a63]"
                    : "text-gray-600"
                }`}
                onClick={() => setViewMode(true)}
              >
                Reviews
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[65vh] pr-2">
              {!viewMode ? (
                <div className="space-y-4 text-gray-800">
                  <p className="leading-relaxed">{description}</p>
                  <p className="font-medium">Author: {author}</p>
                  <p className="font-medium">
                    Genre: {genre && genre.length > 0 ? genre.join(", ") : "N/A"}
                  </p>

                  {source && (
                    <a
                      href={source}
                      target="_blank"
                      className="inline-block mt-6 px-6 py-3 rounded-xl bg-[#384a63] text-white font-semibold hover:bg-[#50678b] transition"
                    >
                      Buy Now
                    </a>
                  )}
                </div>
              ) : (
                <div>
                  {/* Rating input */}
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`cursor-pointer text-2xl ${
                          inputRating >= star
                            ? "text-yellow-400"
                            : "text-gray-400"
                        }`}
                        onClick={() => setInputRating(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Review input */}
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      placeholder="Write your review..."
                      className="flex-grow px-3 py-2 text-md rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#384a63]"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    />
                    <button
                      onClick={handleReview}
                      className="bg-[#384a63] hover:bg-[#50678b] text-white px-4 rounded-xl transition"
                    >
                      Send
                    </button>
                  </div>

                  {/* Comments */}
                  <Comment bookId={bookId} refresh={refreshComments} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
