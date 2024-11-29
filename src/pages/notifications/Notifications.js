import React from "react";

const Notifications = ({ notification, onClick }) => {
  const isRead = notification.read;
  const bgColorClass = isRead ? "bg-gray-100" : "bg-blue-50";
  const borderColorClass = isRead ? "border-gray-200" : "border-blue-200";

  // Determine the notification message based on type and user role
  let notificationMessage = "";
  if (notification.notificationType === "reply") {
    notificationMessage = `${
      notification.relatedPlacementTeamMember?.name || "Someone"
    } replied to your query "${
      notification.relatedQuery?.queryText || ""
    }" on the post "${notification.relatedPost?.title || ""}" - "${
      notification.relatedReply?.replyText || ""
    }"`;
  }

  return (
    <div
      className={`p-3 rounded-md border ${bgColorClass} ${borderColorClass} cursor-pointer`}
      onClick={onClick}
    >
      <p className="text-sm text-gray-700">{notificationMessage}</p>
      <span className="text-xs text-gray-400 block mt-1">
        {new Date(notification.createdAt).toLocaleString()}
      </span>
    </div>
  );
};

export default Notifications;
