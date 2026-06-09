# Stage 1 - Notification System Design

## Overview

The objective of this system is to display the most important notifications to users by assigning a priority score and ranking notifications accordingly. The frontend consumes notification data from the provided Notification API, calculates priority, sorts notifications in descending order, and displays only the top notifications to improve user experience.

---

## System Architecture

### Components

1. Notification API

   * Provides notification data.
   * Returns notification type, message, and timestamp.

2. Priority Calculator

   * Calculates the importance of each notification.
   * Uses notification type and recency.

3. Notification Processor

   * Sorts notifications by priority.
   * Selects the Top 15 notifications.

4. Frontend Dashboard

   * Displays notifications.
   * Supports filtering and searching.

5. Logging Middleware

   * Captures important application events.
   * Sends logs to the evaluation logging API.

---

## API Contract

### Endpoint

GET /evaluation-service/notifications

### Response Structure

```json
{
  "notifications": [
    {
      "id": "123",
      "type": "Placement",
      "message": "Amazon hiring for SDE roles",
      "timestamp": "2026-01-20T12:00:00Z"
    }
  ]
}
```

---

## Priority Calculation Strategy

Each notification is assigned a priority score.

### Type Weight

| Type      | Base Score |
| --------- | ---------- |
| Placement | 100        |
| Result    | 90         |
| Event     | 80         |

### Recency Weight

Recent notifications receive higher priority.

| Age        | Additional Score |
| ---------- | ---------------- |
| < 1 hour   | +20              |
| < 24 hours | +10              |
| Older      | +0               |

### Final Priority Formula

Priority Score = Type Weight + Recency Weight

Example:

Placement notification received 30 minutes ago

Priority = 100 + 20 = 120

Result notification received 5 hours ago

Priority = 90 + 10 = 100

---

## Sorting Strategy

All notifications are sorted in descending order of priority.

Example:

Priority 120

Priority 110

Priority 100

Priority 95

Priority 80

The notification with the highest score appears first.

---

## Top 15 Selection

After sorting, only the first 15 notifications are displayed.

Implementation:

```javascript
const topNotifications =
  sortedNotifications.slice(0, 15);
```

This reduces visual clutter and ensures users only see the most relevant notifications.

---

## Search and Filtering

Users can:

* Search notifications using keywords.
* Filter notifications by type.

Supported notification types:

* Event
* Result
* Placement

---

## Logging Middleware

The system integrates a reusable logging utility.

Logged Events:

* Dashboard Loaded
* Search Updated
* Filter Changed
* Notification Fetch Success
* Notification Fetch Failure

Example:

```javascript
logEvent(
  "info",
  "page",
  "Dashboard loaded"
);
```

---

## Scalability Considerations

1. Priority calculation is isolated into a separate service.
2. Sorting logic is reusable.
3. API layer is independent from UI components.
4. Logging is centralized.
5. Component-based architecture allows future feature expansion.

---

## Conclusion

The proposed design ensures that users receive the most relevant notifications first through a priority-based ranking mechanism. The architecture is modular, scalable, maintainable, and suitable for production-scale notification systems.
