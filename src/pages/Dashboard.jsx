import { useState, useEffect } from "react";
import { logEvent } from "../services/logger";
import { sortNotificationsByPriority } from "../services/priorityCalculator";

// ─── Data ────────────────────────────────────────────────────────────────────

const NOTIFICATIONS = [
  {
    id: "1",
    type: "Posts",
    message: "Amazon hiring for SDE Intern positions",
    priority: 100,
    isRead: false,
    timestamp: "2 min ago",
  },
  {
    id: "2",
    type: "Posts",
    message: "Microsoft placement drive announced",
    priority: 98,
    isRead: false,
    timestamp: "5 min ago",
  },
  {
    id: "3",
    type: "Comments",
    message: "Rahul commented on your project submission",
    priority: 92,
    isRead: false,
    timestamp: "8 min ago",
  },
  {
    id: "4",
    type: "Likes",
    message: "Ananya liked your portfolio post",
    priority: 90,
    isRead: true,
    timestamp: "10 min ago",
  },
  {
    id: "5",
    type: "Posts",
    message: "Google Summer Internship applications open",
    priority: 99,
    isRead: false,
    timestamp: "12 min ago",
  },
  {
    id: "6",
    type: "Comments",
    message: "Priya commented on your coding challenge",
    priority: 88,
    isRead: true,
    timestamp: "15 min ago",
  },
  {
    id: "7",
    type: "Likes",
    message: "Vivek liked your achievement post",
    priority: 85,
    isRead: true,
    timestamp: "20 min ago",
  },
  {
    id: "8",
    type: "Posts",
    message: "TCS Ninja registration started",
    priority: 96,
    isRead: false,
    timestamp: "25 min ago",
  },
  {
    id: "9",
    type: "Comments",
    message: "Sneha replied to your discussion thread",
    priority: 87,
    isRead: false,
    timestamp: "30 min ago",
  },
  {
    id: "10",
    type: "Likes",
    message: "Aman liked your placement update",
    priority: 84,
    isRead: true,
    timestamp: "35 min ago",
  },

  {
    id: "11",
    type: "Posts",
    message: "Adobe hiring for Frontend Developer roles",
    priority: 95,
    isRead: false,
    timestamp: "40 min ago",
  },
  {
    id: "12",
    type: "Comments",
    message: "Karan commented on your resume post",
    priority: 89,
    isRead: false,
    timestamp: "45 min ago",
  },
  {
    id: "13",
    type: "Likes",
    message: "Ritika liked your coding streak update",
    priority: 82,
    isRead: true,
    timestamp: "50 min ago",
  },
  {
    id: "14",
    type: "Posts",
    message: "Infosys off-campus drive announced",
    priority: 94,
    isRead: false,
    timestamp: "55 min ago",
  },
  {
    id: "15",
    type: "Comments",
    message: "Shreya commented on your dashboard design",
    priority: 86,
    isRead: false,
    timestamp: "1 hr ago",
  },

  {
    id: "16",
    type: "Likes",
    message: "Nikhil liked your React project",
    priority: 81,
    isRead: true,
    timestamp: "1 hr ago",
  },
  {
    id: "17",
    type: "Posts",
    message: "Accenture hiring freshers for 2027 batch",
    priority: 97,
    isRead: false,
    timestamp: "1 hr ago",
  },
  {
    id: "18",
    type: "Comments",
    message: "Megha commented on your GitHub repository",
    priority: 88,
    isRead: false,
    timestamp: "1 hr ago",
  },
  {
    id: "19",
    type: "Likes",
    message: "Arjun liked your DSA milestone post",
    priority: 83,
    isRead: true,
    timestamp: "1 hr ago",
  },
  {
    id: "20",
    type: "Posts",
    message: "Wipro Elite NTH registration open",
    priority: 93,
    isRead: false,
    timestamp: "2 hrs ago",
  },

  {
    id: "21",
    type: "Comments",
    message: "A user commented on your placement journey",
    priority: 87,
    isRead: false,
    timestamp: "2 hrs ago",
  },
  {
    id: "22",
    type: "Likes",
    message: "Your portfolio received a new like",
    priority: 80,
    isRead: true,
    timestamp: "2 hrs ago",
  },
  {
    id: "23",
    type: "Posts",
    message: "Flipkart Grid challenge registrations open",
    priority: 96,
    isRead: false,
    timestamp: "2 hrs ago",
  },
  {
    id: "24",
    type: "Comments",
    message: "Recruiter commented on your application",
    priority: 91,
    isRead: false,
    timestamp: "2 hrs ago",
  },
  {
    id: "25",
    type: "Likes",
    message: "Your project showcase received appreciation",
    priority: 84,
    isRead: true,
    timestamp: "3 hrs ago",
  },

  {
    id: "26",
    type: "Posts",
    message: "Paytm internship applications now live",
    priority: 95,
    isRead: false,
    timestamp: "3 hrs ago",
  },
  {
    id: "27",
    type: "Comments",
    message: "Discussion updated on coding forum",
    priority: 88,
    isRead: false,
    timestamp: "3 hrs ago",
  },
  {
    id: "28",
    type: "Likes",
    message: "Your achievement post gained traction",
    priority: 82,
    isRead: true,
    timestamp: "4 hrs ago",
  },
  {
    id: "29",
    type: "Posts",
    message: "Zoho hiring drive announced",
    priority: 94,
    isRead: false,
    timestamp: "4 hrs ago",
  },
  {
    id: "30",
    type: "Comments",
    message: "Community feedback received on your article",
    priority: 86,
    isRead: true,
    timestamp: "4 hrs ago",
  },

  {
    id: "31",
    type: "Likes",
    message: "Someone appreciated your UI design",
    priority: 80,
    isRead: true,
    timestamp: "5 hrs ago",
  },
  {
    id: "32",
    type: "Posts",
    message: "Cognizant hiring notification released",
    priority: 92,
    isRead: false,
    timestamp: "5 hrs ago",
  },
  {
    id: "33",
    type: "Comments",
    message: "New review added to your submission",
    priority: 87,
    isRead: false,
    timestamp: "5 hrs ago",
  },
  {
    id: "34",
    type: "Likes",
    message: "Your GitHub project received a star",
    priority: 83,
    isRead: true,
    timestamp: "6 hrs ago",
  },
  {
    id: "35",
    type: "Posts",
    message: "Capgemini placement drive announced",
    priority: 91,
    isRead: false,
    timestamp: "6 hrs ago",
  },

  {
    id: "36",
    type: "Comments",
    message: "Mentor commented on your progress",
    priority: 88,
    isRead: false,
    timestamp: "6 hrs ago",
  },
  {
    id: "37",
    type: "Likes",
    message: "Your article reached 100 likes",
    priority: 81,
    isRead: true,
    timestamp: "7 hrs ago",
  },
  {
    id: "38",
    type: "Posts",
    message: "Oracle internship applications started",
    priority: 95,
    isRead: false,
    timestamp: "7 hrs ago",
  },
  {
    id: "39",
    type: "Comments",
    message: "Project discussion received new feedback",
    priority: 87,
    isRead: false,
    timestamp: "7 hrs ago",
  },
  {
    id: "40",
    type: "Likes",
    message: "Someone bookmarked your profile",
    priority: 82,
    isRead: true,
    timestamp: "8 hrs ago",
  },

  {
    id: "41",
    type: "Posts",
    message: "Samsung hiring fresh graduates",
    priority: 94,
    isRead: false,
    timestamp: "8 hrs ago",
  },
  {
    id: "42",
    type: "Comments",
    message: "New suggestion added to your roadmap",
    priority: 86,
    isRead: true,
    timestamp: "8 hrs ago",
  },
  {
    id: "43",
    type: "Likes",
    message: "Your dashboard project was appreciated",
    priority: 84,
    isRead: true,
    timestamp: "9 hrs ago",
  },
  {
    id: "44",
    type: "Posts",
    message: "IBM placement registrations open",
    priority: 93,
    isRead: false,
    timestamp: "9 hrs ago",
  },
  {
    id: "45",
    type: "Comments",
    message: "New recruiter interaction received",
    priority: 90,
    isRead: false,
    timestamp: "10 hrs ago",
  },

  {
    id: "46",
    type: "Likes",
    message: "Your coding profile gained followers",
    priority: 80,
    isRead: true,
    timestamp: "10 hrs ago",
  },
  {
    id: "47",
    type: "Posts",
    message: "Deloitte hiring notification released",
    priority: 92,
    isRead: false,
    timestamp: "11 hrs ago",
  },
  {
    id: "48",
    type: "Comments",
    message: "Your query received a new answer",
    priority: 88,
    isRead: false,
    timestamp: "11 hrs ago",
  },
  {
    id: "49",
    type: "Likes",
    message: "Someone endorsed your skills",
    priority: 83,
    isRead: true,
    timestamp: "12 hrs ago",
  },
  {
    id: "50",
    type: "Posts",
    message: "Tech Mahindra recruitment drive announced",
    priority: 91,
    isRead: false,
    timestamp: "12 hrs ago",
  },
];

const TYPE_CONFIG = {
  Likes: {
    badge: "bg-pink-100 text-pink-800",
    iconWrap: "bg-pink-50 text-pink-600",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  Comments: {
    badge: "bg-indigo-100 text-indigo-800",
    iconWrap: "bg-indigo-50 text-indigo-600",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  Posts: {
    badge: "bg-emerald-100 text-emerald-800",
    iconWrap: "bg-emerald-50 text-emerald-600",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6z" />
      </svg>
    ),
  },
};

// ─── Priority helpers ────────────────────────────────────────────────────────

function getPriorityBar(priority) {
  if (priority >= 95) return "bg-indigo-500";
  if (priority >= 90) return "bg-amber-500";
  if (priority >= 80) return "bg-emerald-500";
  return "bg-slate-300";
}

function getPriorityChip(priority) {
  if (priority >= 95) return "bg-indigo-50 text-indigo-700";
  if (priority >= 90) return "bg-amber-50 text-amber-800";
  return "bg-slate-100 text-slate-500";
}

// ─── StatCard ────────────────────────────────────────────────────────────────

function StatCard({ label, value, valueColor = "text-slate-900" }) {
  return (
    <div className="bg-white border border-slate-200/70 rounded-xl p-4">
      <p className="text-[11px] font-semibold tracking-widest uppercase text-slate-400 mb-1.5">
        {label}
      </p>
      <p className={`text-[28px] font-semibold tracking-tight tabular-nums leading-none ${valueColor}`}>
        {value}
      </p>
    </div>
  );
}

// ─── FilterBar ───────────────────────────────────────────────────────────────

function FilterBar({ searchTerm, setSearchTerm, selectedType, setSelectedType, count }) {
  return (
    <div className="bg-white border border-slate-200/70 rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 mb-3">
      <svg className="text-slate-400 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>

      <input
        type="text"
        placeholder="Search notifications…"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 text-[13px] bg-slate-50 text-slate-800 border border-slate-200/70 rounded-lg px-2.5 py-1.5 outline-none focus:border-indigo-400 placeholder:text-slate-400 transition-colors"
      />

      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="w-36 text-[13px] bg-slate-50 text-slate-800 border border-slate-200/70 rounded-lg px-2.5 py-1.5 outline-none focus:border-indigo-400 cursor-pointer transition-colors"
      >
        <option value="">All types</option>
        <option value="Likes">Likes</option>
        <option value="Comments">Comments</option>
        <option value="Posts">Posts</option>
      </select>

      <span className="text-[12px] text-slate-400 whitespace-nowrap ml-auto">
        {count} shown
      </span>
    </div>
  );
}

// ─── NotificationItem ────────────────────────────────────────────────────────

function NotificationItem({ notification }) {
  const { type, message, priority, isRead, timestamp } = notification;
  const tc = TYPE_CONFIG[type] || TYPE_CONFIG["Posts"];

  return (
    <div className="bg-white border border-slate-200/70 rounded-xl flex items-stretch overflow-hidden hover:border-slate-300 hover:shadow-sm transition-all duration-150">
      {/* priority stripe */}
      <div className={`w-[3px] shrink-0 rounded-l-xl ${getPriorityBar(priority)}`} aria-hidden="true" />

      <div className="flex items-center gap-3 flex-1 px-3.5 py-3">
        {/* icon */}
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${tc.iconWrap}`}>
          {tc.icon}
        </div>

        {/* body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full ${tc.badge}`}>
              {type}
            </span>
            {!isRead && (
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" aria-label="Unread" />
            )}
          </div>
          <p className={`text-[13px] leading-snug truncate ${isRead ? "text-slate-500 font-normal" : "text-slate-900 font-medium"}`}>
            {message}
          </p>
        </div>

        {/* right meta */}
        <div className="flex flex-col items-end gap-1 ml-2 shrink-0">
          <span className="text-[11px] text-slate-400">{timestamp}</span>
          <span className={`text-[10px] font-semibold tabular-nums px-1.5 py-0.5 rounded ${getPriorityChip(priority)}`}>
            {priority}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── NotificationList ────────────────────────────────────────────────────────

function NotificationList({ notifications }) {
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2.5 py-12 text-slate-400">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
        <p className="text-[13px]">No notifications match your filters</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      {notifications.map((n) => (
        <NotificationItem key={n.id} notification={n} />
      ))}
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    logEvent("info", "page", "Dashboard loaded");
  }, []);

  const filtered = NOTIFICATIONS.filter((n) => {
    const matchesSearch = n.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "" || n.type === selectedType;
    return matchesSearch && matchesType;
  });

  const topNotifications = sortNotificationsByPriority(filtered).slice(0, 15);

  const highPriority = topNotifications.filter((n) => n.priority >= 90).length;
  const avgPriority =
    topNotifications.length === 0
      ? 0
      : Math.round(
          topNotifications.reduce((sum, n) => sum + n.priority, 0) /
            topNotifications.length
        );

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-2xl mx-auto">

        {/* topbar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <h1 className="text-[17px] font-semibold tracking-tight text-slate-900">
              Notifications
            </h1>
            <span className="bg-indigo-500 text-white text-[10px] font-semibold tracking-widest px-2 py-0.5 rounded-full">
              LIVE
            </span>
          </div>
          <span className="text-[12px] text-slate-400">
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>

        {/* stats */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          <StatCard label="Total" value={topNotifications.length} valueColor="text-indigo-500" />
          <StatCard label="High Priority" value={highPriority} valueColor="text-amber-600" />
          <StatCard label="Avg Priority" value={avgPriority} />
        </div>

        {/* filter */}
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          count={topNotifications.length}
        />

        {/* list */}
        <NotificationList notifications={topNotifications} />
      </div>
    </div>
  );
}

export default Dashboard;