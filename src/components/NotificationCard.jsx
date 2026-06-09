function NotificationCard({ notification }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 border mb-4">

      <div className="flex justify-between items-center mb-2">

        <div className="flex gap-2">

          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
            {notification.type}
          </span>

          {!notification.isRead && (
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
              NEW
            </span>
          )}

        </div>

        <span className="bg-red-100 text-red-600 px-2 py-1 rounded">
          {notification.priority}
        </span>

      </div>

      <p className="text-gray-800">
        {notification.message}
      </p>

      <p className="text-sm text-gray-500 mt-2">
        {notification.timestamp}
      </p>

    </div>
  );
}

export default NotificationCard;