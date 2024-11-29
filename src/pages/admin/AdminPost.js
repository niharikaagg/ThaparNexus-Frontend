// import React, { useState, useEffect } from "react";
// import Query from "../userpage/Query";
// import { TiMessage } from "react-icons/ti";
// import { AiOutlineEdit, AiOutlineDelete, AiOutlineSend } from "react-icons/ai";
// import axios from "axios";

// function AdminPost({
//   title,
//   details,
//   registrationLink,
//   year,
//   cgpa,
//   branchesEligible,
//   author,
//   queries,
//   postId,
//   currentPlacementTeamMemberId, // ID of the logged-in placement team member
//   onPostDelete, // Callback for deleting a post
// }) {
//   const [showQueries, setShowQueries] = useState(false);
//   const [queryList, setQueryList] = useState(queries || []);
//   const [replyText, setReplyText] = useState("");
//   const [error, setError] = useState("");
//   const [activeQueryId, setActiveQueryId] = useState(null); // Track the active query for which reply box should be shown

//   // Determine if the logged-in placement team member authored this post
//   const isAuthor = author._id === currentPlacementTeamMemberId;

//   // Function to delete the post
//   const handleDeletePost = async () => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:5000/api/v1/placement-team/posts/${postId}`
//       );
//       console.log(response.data.message);
//       if (onPostDelete) onPostDelete(postId); // Callback to remove post from view
//     } catch (error) {
//       console.error("Error deleting post:", error);
//     }
//   };

//   // Function to handle submitting a reply to a query
//   const handleSubmitReply = async (queryId) => {
//     if (!replyText.trim()) {
//       setError("Please enter a reply.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/v1/placement-team/posts/query/${queryId}/reply`,
//         { replyText }
//       );

//       setQueryList((prevQueries) =>
//         prevQueries.map((query) =>
//           query._id === queryId
//             ? { ...query, replies: [...query.replies, response.data.reply] }
//             : query
//         )
//       );

//       setReplyText(""); // Reset input after reply
//       setError(""); // Clear error message
//       setActiveQueryId(null); // Reset active query
//       console.log("Reply submitted successfully:", response.data);
//     } catch (error) {
//       setError("Failed to submit reply. Please try again.");
//       console.error("Error submitting reply:", error);
//     }
//   };

//   return (
//     <div className="bg-white p-4 rounded-md shadow-lg my-4">
//       {/* Author Section */}
//       <div className="flex items-center mb-4">
//         <img
//           src={author.profilePicture}
//           alt={author.name}
//           className="w-8 h-8 rounded-full object-cover mr-2"
//         />
//         <span className="font-semibold text-gray-800">{author.name}</span>
//       </div>

//       {/* Post Title */}
//       <h3 className="text-xl font-semibold text-gray-800">{title}</h3>

//       {/* Post Details */}
//       <p className="mt-2 text-gray-600">{details}</p>

//       {/* Registration Link */}
//       {registrationLink && (
//         <a
//           href={registrationLink}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="mt-4 text-blue-500 hover:underline"
//         >
//           Register Here
//         </a>
//       )}

//       {/* Post Information */}
//       <div className="mt-4 flex justify-between text-sm text-gray-500">
//         <div>
//           <span className="font-bold">Year: </span>
//           {year.join(", ")}
//         </div>
//         <div>
//           <span className="font-bold">
//             CGPA: <span className="font-normal">above</span>{" "}
//           </span>
//           {cgpa}
//         </div>
//         <div>
//           <span className="font-bold">Branch: </span>
//           {branchesEligible.join(", ")}
//         </div>
//       </div>

//       {/* Icons for Edit, Query, and Delete */}
//       <div className="mt-4 flex justify-between">
//         {/* Edit Post */}
//         <div
//           className={`flex items-center cursor-pointer ${
//             isAuthor ? "" : "text-gray-400 cursor-not-allowed"
//           }`}
//           onClick={isAuthor ? () => console.log("Edit post") : null}
//         >
//           <AiOutlineEdit className="text-xl" />
//           <span className="pl-2">Edit</span>
//         </div>

//         {/* Toggle Query View */}
//         <div
//           className="flex items-center cursor-pointer"
//           onClick={() => setShowQueries(!showQueries)}
//         >
//           <TiMessage className="text-xl" />
//           <span className="pl-2">Query</span>
//         </div>

//         {/* Delete Post */}
//         <div
//           className={`flex items-center cursor-pointer ${
//             isAuthor ? "" : "text-gray-400 cursor-not-allowed"
//           }`}
//           onClick={isAuthor ? handleDeletePost : null}
//         >
//           <AiOutlineDelete className="text-xl" />
//           <span className="pl-2">Delete</span>
//         </div>
//       </div>

//       {/* Queries Section */}
//       {showQueries && (
//         <div className="mt-4">
//           {queryList.length > 0 ? (
//             <>
//               <h4 className="text-lg font-semibold text-gray-800">Queries</h4>
//               {queryList.map((query) => (
//                 <div key={query._id} className="mt-2">
//                   <Query query={query} />

//                   {/* Toggle the visibility of reply box for each query */}
//                   <div className="mt-2">
//                     <button
//                       className="text-blue-500"
//                       onClick={() =>
//                         setActiveQueryId(
//                           activeQueryId === query._id ? null : query._id
//                         )
//                       }
//                     >
//                       Reply
//                     </button>

//                     {/* Show reply box only for the clicked query */}
//                     {activeQueryId === query._id && (
//                       <div className="mt-2 flex items-center border rounded-md border-gray-300">
//                         <textarea
//                           className="w-full p-2 h-10 border-none outline-none"
//                           rows="1"
//                           placeholder="Enter your reply..."
//                           value={replyText}
//                           onChange={(e) => setReplyText(e.target.value)}
//                         />
//                         <AiOutlineSend
//                           className="text-blue-500 text-xl cursor-pointer"
//                           onClick={() => handleSubmitReply(query._id)}
//                         />
//                       </div>
//                     )}
//                   </div>

//                   {error && (
//                     <p className="text-red-500 text-sm mt-2">{error}</p>
//                   )}
//                 </div>
//               ))}
//             </>
//           ) : (
//             <p className="text-gray-500">No queries</p> // Display message if no queries
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminPost;

import React, { useState, useEffect } from "react";
import Query from "../userpage/Query";
import { TiMessage } from "react-icons/ti";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineSend } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function AdminPost({
  title,
  details,
  registrationLink,
  year,
  cgpa,
  branchesEligible,
  author,
  queries,
  postId,
  currentPlacementTeamMemberId, // ID of the logged-in placement team member
  onPostDelete, // Callback for deleting a post
}) {
  const [showQueries, setShowQueries] = useState(false);
  const [queryList, setQueryList] = useState(queries || []);
  const [replyText, setReplyText] = useState("");
  const [error, setError] = useState("");
  const [activeQueryId, setActiveQueryId] = useState(null); // Track the active query for which reply box should be shown

  const navigate = useNavigate(); // Initialize navigate hook

  // Determine if the logged-in placement team member authored this post
  const isAuthor = author._id === currentPlacementTeamMemberId;

  // Function to delete the post
  const handleDeletePost = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/placement-team/posts/${postId}`
      );
      console.log(response.data.message);
      if (onPostDelete) onPostDelete(postId); // Callback to remove post from view
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Function to handle submitting a reply to a query
  const handleSubmitReply = async (queryId) => {
    if (!replyText.trim()) {
      setError("Please enter a reply.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/placement-team/posts/query/${queryId}/reply`,
        { replyText }
      );

      setQueryList((prevQueries) =>
        prevQueries.map((query) =>
          query._id === queryId
            ? { ...query, replies: [...query.replies, response.data.reply] }
            : query
        )
      );

      setReplyText(""); // Reset input after reply
      setError(""); // Clear error message
      setActiveQueryId(null); // Reset active query
      console.log("Reply submitted successfully:", response.data);
    } catch (error) {
      setError("Failed to submit reply. Please try again.");
      console.error("Error submitting reply:", error);
    }
  };

  // Function to handle edit post click
  const handleEditPost = () => {
    // Navigate to the edit post page using postId
    navigate(`/edit-post/${postId}`);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-lg my-4">
      {/* Author Section */}
      <div className="flex items-center mb-4">
        <img
          src={author.profilePicture}
          alt={author.name}
          className="w-8 h-8 rounded-full object-cover mr-2"
        />
        <span className="font-semibold text-gray-800">{author.name}</span>
      </div>

      {/* Post Title */}
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>

      {/* Post Details */}
      <p className="mt-2 text-gray-600">{details}</p>

      {/* Registration Link */}
      {registrationLink && (
        <a
          href={registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-blue-500 hover:underline"
        >
          Register Here
        </a>
      )}

      {/* Post Information */}
      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <div>
          <span className="font-bold">Year: </span>
          {year.join(", ")}
        </div>
        <div>
          <span className="font-bold">
            CGPA: <span className="font-normal">above</span>{" "}
          </span>
          {cgpa}
        </div>
        <div>
          <span className="font-bold">Branch: </span>
          {branchesEligible.join(", ")}
        </div>
      </div>

      {/* Icons for Edit, Query, and Delete */}
      <div className="mt-4 flex justify-between">
        {/* Edit Post */}
        <div
          className={`flex items-center cursor-pointer ${
            isAuthor ? "" : "text-gray-400 cursor-not-allowed"
          }`}
          onClick={isAuthor ? handleEditPost : null} // Handle edit on click
        >
          <AiOutlineEdit className="text-xl" />
          <span className="pl-2">Edit</span>
        </div>

        {/* Toggle Query View */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setShowQueries(!showQueries)}
        >
          <TiMessage className="text-xl" />
          <span className="pl-2">Query</span>
        </div>

        {/* Delete Post */}
        <div
          className={`flex items-center cursor-pointer ${
            isAuthor ? "" : "text-gray-400 cursor-not-allowed"
          }`}
          onClick={isAuthor ? handleDeletePost : null}
        >
          <AiOutlineDelete className="text-xl" />
          <span className="pl-2">Delete</span>
        </div>
      </div>

      {/* Queries Section */}
      {showQueries && (
        <div className="mt-4">
          {queryList.length > 0 ? (
            <>
              <h4 className="text-lg font-semibold text-gray-800">Queries</h4>
              {queryList.map((query) => (
                <div key={query._id} className="mt-2">
                  <Query query={query} />

                  {/* Toggle the visibility of reply box for each query */}
                  <div className="mt-2">
                    <button
                      className="text-blue-500"
                      onClick={() =>
                        setActiveQueryId(
                          activeQueryId === query._id ? null : query._id
                        )
                      }
                    >
                      Reply
                    </button>

                    {/* Show reply box only for the clicked query */}
                    {activeQueryId === query._id && (
                      <div className="mt-2 flex items-center border rounded-md border-gray-300">
                        <textarea
                          className="w-full p-2 h-10 border-none outline-none"
                          rows="1"
                          placeholder="Enter your reply..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                        <AiOutlineSend
                          className="text-blue-500 text-xl cursor-pointer"
                          onClick={() => handleSubmitReply(query._id)}
                        />
                      </div>
                    )}
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                </div>
              ))}
            </>
          ) : (
            <p className="text-gray-500">No queries</p> // Display message if no queries
          )}
        </div>
      )}
    </div>
  );
}

export default AdminPost;
