# Notification Dashboard

A React-based Notification Dashboard developed for the Affordmed Frontend Track Assessment.

## Features

* Display notifications in a clean dashboard interface
* Search notifications by keyword
* Filter notifications by type
* Priority-based notification sorting
* Top 15 notifications display
* Notification statistics

  * Total Notifications
  * High Priority Notifications
  * Average Priority
* Responsive user interface
* Logging Middleware Integration
* Empty State Handling

## Tech Stack

* React
* Vite
* JavaScript
* Tailwind CSS

## Project Structure

```text
src/
├── api/
│   └── notificationApi.js
│
├── services/
│   ├── priorityCalculator.js
│   └── logger.js
│
├── components/
│   ├── NotificationCard.jsx
│   ├── NotificationList.jsx
│   └── FilterBar.jsx
│
├── pages/
│   └── Dashboard.jsx
│
├── App.jsx
└── main.jsx
```

## Priority Logic

Notifications are sorted based on their priority score in descending order.

Example:

* Priority 100
* Priority 99
* Priority 95
* Priority 92

Only the top 15 notifications are displayed.

## Search Functionality

Users can search notifications using keywords.

Example:

* Amazon
* Google
* Placement
* Internship

## Filter Functionality

Supported notification types:

* Posts
* Comments
* Likes

## Logging Middleware

A reusable logging utility has been implemented in:

```text
src/services/logger.js
```

The middleware is designed to send logs to the provided evaluation logging API.

Example:

```javascript
logEvent(
  "info",
  "page",
  "Dashboard loaded"
);
```

## Build

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Create production build:

```bash
npm run build
```

## Build Status

Production build completed successfully.

## Author

Shubham Chaudhary

Roll Number: 2300321540180

GitHub: shubhlc194
