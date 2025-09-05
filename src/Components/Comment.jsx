import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import conf from "../conf/conf";

function Comment({ bookId, refresh }) {
  const { user } = useContext(AuthContext);
  const loggedInUserId = user?.id;
  const API = conf.backendUrl;

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      if (!bookId) return;
      try {
        const res = await axios.get(`${API}/store/getReviews/${bookId}`);
        setComments(res.data);
      } catch (error) {
        console.log("Error in fetching comments:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [bookId, refresh]);

  const handleDelete = async (reviewId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${API}/book/review/remove/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments(prev => prev.filter(r => r._id !== reviewId));
    } catch (err) {
      console.error("Failed to delete review:", err.response?.data || err.message);
    }
  };

  return (
    <div className="mt-5">
      {loading ? (
        <p>Loading reviews...</p>
      ) : comments.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div>
          {comments.map(review => (
            <div key={review._id} className="border-b py-2">
              <div className="flex justify-between">
                <p className="font-bold">
                  {review.userId?.username || "Unknown"}:
                </p>
                {(review.userId?._id || review.userId) === loggedInUserId && (
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="text-red-500 mt-1"
                  >
                    Delete
                  </button>
                )}
              </div>
              <p>{review.comment}</p>
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star}>{review.rating >= star ? "★" : "☆"}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
