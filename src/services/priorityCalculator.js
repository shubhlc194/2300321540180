export const sortNotificationsByPriority = (
  notifications
) => {
  return [...notifications].sort(
    (a, b) => b.priority - a.priority
  );
};