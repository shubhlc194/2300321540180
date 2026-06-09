const TYPE_CONFIG = {
  Likes: {
    label: "Likes",
    badgeBg: "#fce7f3",
    badgeColor: "#9d174d",
    iconBg: "#fdf2f8",
    iconColor: "#be185d",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  Comments: {
    label: "Comments",
    badgeBg: "#e0e7ff",
    badgeColor: "#3730a3",
    iconBg: "#eef2ff",
    iconColor: "#4338ca",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  Posts: {
    label: "Posts",
    badgeBg: "#dcfce7",
    badgeColor: "#166534",
    iconBg: "#f0fdf4",
    iconColor: "#15803d",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6z" />
      </svg>
    ),
  },
};

function getPriorityBarColor(priority) {
  if (priority >= 95) return "#6366f1";
  if (priority >= 90) return "#d97706";
  if (priority >= 80) return "#10b981";
  return "#cbd5e1";
}

function getPriorityChipStyle(priority) {
  if (priority >= 95) return { background: "#eef2ff", color: "#4338ca" };
  if (priority >= 90) return { background: "#fffbeb", color: "#92400e" };
  return { background: "#f1f5f9", color: "#64748b" };
}

function NotificationItem({ notification }) {
  const { type, message, priority, isRead, timestamp } = notification;
  const tc = TYPE_CONFIG[type] || TYPE_CONFIG["Posts"];
  const chipStyle = getPriorityChipStyle(priority);

  return (
    <div className={`notif-item ${!isRead ? "notif-item--unread" : ""}`}>
      <div
        className="notif-item__bar"
        style={{ background: getPriorityBarColor(priority) }}
        aria-hidden="true"
      />
      <div className="notif-item__inner">
        <div
          className="notif-item__icon"
          style={{ background: tc.iconBg, color: tc.iconColor }}
        >
          {tc.icon}
        </div>

        <div className="notif-item__body">
          <div className="notif-item__meta">
            <span
              className="notif-item__type"
              style={{ background: tc.badgeBg, color: tc.badgeColor }}
            >
              {tc.label}
            </span>
            {!isRead && (
              <span className="notif-item__unread-dot" aria-label="Unread" />
            )}
          </div>
          <p className={`notif-item__message ${!isRead ? "notif-item__message--bold" : ""}`}>
            {message}
          </p>
        </div>

        <div className="notif-item__right">
          <span className="notif-item__time">{timestamp}</span>
          <span className="notif-item__chip" style={chipStyle}>
            {priority}
          </span>
        </div>
      </div>
    </div>
  );
}

function NotificationList({ notifications }) {
  if (notifications.length === 0) {
    return (
      <div className="notif-empty">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
        <p>No notifications match your filters</p>
      </div>
    );
  }

  return (
    <div className="notif-list">
      {notifications.map((n) => (
        <NotificationItem key={n.id} notification={n} />
      ))}
    </div>
  );
}

export default NotificationList;