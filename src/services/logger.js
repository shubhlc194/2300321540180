const LOG_API =
  "http://20.244.56.144/evaluation-service/logs";

export const logEvent = async (
  level,
  pkg,
  message
) => {
  try {
    const token = localStorage.getItem("token");

    await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        stack: "frontend",
        level,
        package: pkg,
        message,
      }),
    });
  } catch (error) {
    console.error("Logging failed", error);
  }
};