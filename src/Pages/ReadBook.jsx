import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Comment from '../Components/Comment'
import axios from "axios";

export default function ReadBook() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const bookId = state?.bookId;
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState();
  const [image, setImage] = useState(null);
  const [source, setSource] = useState(null)
  const [author, setAuthor] = useState(null)
  const [genre, setGenre] = useState([])
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("");
  const [inputRating, setInputRating] = useState(0);
  const [refreshComments, setRefreshComments] = useState(false);

  // the page was redirecting to descroption page whenever i refresh .... here's the solution
  const [viewMode, setViewMode] = useState(
    localStorage.getItem("viewMode") === "true"
  );

  // whenever it changes, save to localStorage
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
      return ;
    }
    if(inputRating === 0) {
      alert("Atleast one star is required..");
      return ;
    }
    
    try {
      await axios.post(
        `http://localhost:4000/book/review/add/${bookId}`,
        { comment: review , rating: inputRating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReview("");
      setInputRating(0);
      setRefreshComments(prev => !prev);
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
    <div>
      <header className="bg-[#f3e9dd] border-gray-200 flex  px-4 lg:px-6 py-2.5">
        <img 
          src="https://icon-library.com/images/back-arrow-icon-png/back-arrow-icon-png-20.jpg" 
          alt="back"
          className="w-8 cursor-pointer"
          onClick={() => navigate("/explore")}
        />
        <p className="flex ml-5 text-2xl font-bold text-[#384a63] justify-center items-center text-center">{title}</p>
      </header>

      {/* main section */}
      <div className="min-h-[90vh] flex justify-center items-center">
        <div className="flex min-h-[70vh] items-center flex-col md:flex-row w-[90vw] max-w-2xl md:max-w-8xl sm:max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-[#d4bfa1] p-5 gap-4">
          {/* image */}
          <div className="flex flex-col items-center w-full md:w-1/2">
            <img 
              src={image}
              alt={title}
              className="rounded-xl w-[20vw] flex justify-center"
            />
            <p className="text-center text-3xl font-bold text-[#384a63] mt-2">{title}</p>
            <p className="text-center text-md font-bold text-[#6381ab]">By {author}</p>
          </div>
          
          {/* review or description */}
          <div className="flex flex-col w-full md:w-1/2 bg-[#E6B17E] rounded-xl p-5">
            <div className="flex gap-3 mt-2"> {/* buttons */}
              <p
                className={`${viewMode === false ? "underline underline-offset-8" : null} border-black px-3 py-3 text-[#384a63] cursor-pointer rounded-xl`}
                onClick={() => setViewMode(false)}
              >
                Description
              </p>
              <p 
                className={`${viewMode === true ? "underline underline-offset-8" : null} border-black px-3 py-3 text-[#384a63] cursor-pointer rounded-xl`}
                onClick={() => setViewMode(true)}
              >
                Review</p>
            </div>
            <hr />
            <div className="overflow-y-auto lg:max-h-[65vh] lg:min-h-[55vh]"> {/* view container */}
                { viewMode === false ? 
                  <div className="flex flex-col">
                    <p className="text-black text-md mt-4">{description}</p>
                    <p className="text-black text-md mt-4">Author : {author}.</p>
                    <p className="text-black text-md">Genre : {genre.join(", ")}.</p>
                    <p className="text-black text-md">Rating: {rating} 🌠</p>

                    <div className="mt-10">
                      <a href={source} target="_blank" className="bg-blue-500 border-black px-4 py-3 text-white hover:bg-blue-300 rounded-xl">
                        Buy Now
                      </a>
                    </div>
                  </div>
                  :
                  <div>
                    <div className="flex items-center gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`cursor-pointer text-2xl ${
                            inputRating >= star ? "text-yellow-300" : "text-gray-400"
                          }`}
                          onClick={() => setInputRating(star)}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Write your thoughts..."
                        className="px-3 py-2 text-md border-none rounded-2xl mt-5 w-full"
                        spellCheck={false}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                      />
                      <button onClick={handleReview}>
                        <img 
                          src="https://img.icons8.com/?size=100&id=IISmtYu065Oa&format=png&color=000000" 
                          alt=""
                          className="w-10 mt-5"
                        />
                      </button>
                    </div>
                    <div className="">
                      <Comment bookId={bookId} refresh={refreshComments}/>
                    </div>
                  </div>
                }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
