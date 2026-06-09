import { useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";
import NotificationList from "../components/NotificationList";
import { logEvent } from "../services/logger";
import { fetchNotifications }
  from "../api/notificationApi";
import {
  sortNotificationsByPriority,
} from "../services/priorityCalculator";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
const [notifications, setNotifications] =
  useState([]);
  useEffect(() => {
  const loadNotifications =
    async () => {
      try {
        const data =
          await fetchNotifications();

        console.log(data);

        setNotifications(
          data.notifications || []
        );
      } catch (error) {
        console.error(error);
      }
    };

  loadNotifications();
}, []);
  useEffect(() => {
    logEvent(
      "info",
      "page",
      "Dashboard loaded"
    );
  }, []);

  const notifications = [
    {
      id: "1",
      type: "Likes",
      message: "Alice liked your post",
      priority: 95,
      isRead: false,
      timestamp: "2 min ago",
    },
    {
      id: "2",
      type: "Comments",
      message: "Bob commented on your post",
      priority: 85,
      isRead: true,
      timestamp: "10 min ago",
    },
    {
      id: "3",
      type: "Posts",
      message: "New placement drive announced",
      priority: 100,
      isRead: false,
      timestamp: "1 hr ago",
    },
  ];

  const filteredNotifications = notifications.filter(
    (notification) => {
      const matchesSearch =
        notification.message
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesType =
        selectedType === "" ||
        notification.type === selectedType;

      return matchesSearch && matchesType;
    }
  );
const sortedNotifications =
  sortNotificationsByPriority(
    filteredNotifications
  );
  const topNotifications =
  sortedNotifications.slice(0, 15);

  const highPriority =
  topNotifications.filter(
    (item) => item.priority >= 90
  ).length;

  const avgPriority =
  topNotifications.length === 0
    ? 0
    : Math.round(
        topNotifications.reduce(
          (sum, item) =>
            sum + item.priority,
          0
        ) / topNotifications.length
      );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Notification Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">Total</h3>
          <p className="text-2xl font-bold">
            {notifications.length}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">
            High Priority
          </h3>
          <p className="text-2xl font-bold text-red-500">
            {highPriority}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">
            Average Priority
          </h3>
          <p className="text-2xl font-bold">
            {avgPriority}
          </p>
        </div>
      </div>

      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <NotificationList
  notifications={topNotifications}
/>
    </div>
  );
}

export default Dashboard;