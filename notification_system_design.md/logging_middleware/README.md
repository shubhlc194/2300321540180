# Logging Middleware

This module provides centralized logging functionality for the Notification Dashboard application.

## Features

* Supports multiple log levels:

  * debug
  * info
  * warn
  * error
  * fatal

* Sends logs to the evaluation logging API.

## Usage

```javascript
logEvent(
  "info",
  "page",
  "Dashboard loaded"
);
```

## Implementation

The logging utility is implemented in:

```text
src/services/logger.js
```

All major application events are logged through this reusable utility.
