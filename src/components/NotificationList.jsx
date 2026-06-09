import NotificationCard from "./NotificationCard";

function NotificationList({ notifications }) {

  if (notifications.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center">
        No notifications found
      </div>
    );
  }

  return (
    <div>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
        />
      ))}
    </div>
  );
}

export default NotificationList;