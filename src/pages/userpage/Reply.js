import React from "react";

const Reply = ({ reply }) => {
  return (
    <div>
      <div className="ml-8 mt-2 flex items-center text-sm text-gray-600">
        <img
          src={reply.author.profilePicture}
          alt={reply.author.name}
          className="w-6 h-6 rounded-full object-cover mr-2"
        />
        <span className="font-semibold">{reply.author.name}</span>
        <span className="ml-2">{reply.replyText}</span>
      </div>
    </div>
  );
};

export default Reply;
