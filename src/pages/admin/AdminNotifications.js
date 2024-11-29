import React from "react";

const AdminNotifications = ({ notification, onClick }) => {
  const isRead = notification.read;
  const bgColorClass = isRead ? "bg-gray-100" : "bg-blue-50";
  const borderColorClass = isRead ? "border-gray-200" : "border-blue-200";

  // Determine the notification message based on type and user role
  let notificationMessage = "";
  //   if (notification.notificationType === "reply") {
  //     notificationMessage = `${
  //       notification.relatedPlacementTeamMember?.name || "Someone"
  //     } replied to your query "${
  //       notification.relatedQuery?.queryText || ""
  //     }" on the post "${notification.relatedPost?.title || ""}" - "${
  //       notification.relatedReply?.replyText || ""
  //     }"`;
  //   } else if (notification.notificationType === "reminder") {
  //     notificationMessage = `Reminder: "${
  //       notification.relatedReminder?.eventName || ""
  //     }" on the post "${
  //       notification.relatedReminder?.relatedPost?.title || ""
  //     }" at ${new Date(
  //       notification.relatedReminder?.eventDate || ""
  //     ).toLocaleTimeString()}.`;
  //   } else if (notification.notificationType === "query") {
  notificationMessage = `${
    notification.relatedStudent?.name || "Someone"
  } asked a query on your post "${notification.relatedPost?.title || ""}": "${
    notification.relatedQuery?.queryText || ""
  }".`;

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

export default AdminNotifications;
