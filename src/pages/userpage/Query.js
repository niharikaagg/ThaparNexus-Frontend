import React from "react";
import Reply from "./Reply.js";

const Query = ({ query }) => {
  return (
    <div className="mt-4 border-t border-gray-300 pt-2">
      <div className="flex items-center">
        <img
          src={query.author.profilePicture}
          alt={query.author.name}
          className="w-8 h-8 rounded-full object-cover mr-2"
        />
        <span className="font-semibold text-gray-800">{query.author.name}</span>
      </div>
      <p className="ml-10 mt-1 text-gray-700">{query.queryText}</p>

      {/* Display each reply under the query */}
      {query.replies.map((reply) => (
        <Reply key={reply._id} reply={reply} />
      ))}
    </div>
  );
};

export default Query;
