const LOG_API =
  "http://20.244.56.144/evaluation-service/logs";

export const logEvent = async (
  level,
  pkg,
  message
) => {
  try {
    const token =
      localStorage.getItem("token");

    if (!token) {
      console.warn(
        "Token not found. Skipping log."
      );
      return;
    }

    const response = await fetch(
      LOG_API,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          stack: "frontend",
          level,
          package: pkg,
          message,
        }),
      }
    );

    if (!response.ok) {
      console.error(
        `Log API failed: ${response.status}`
      );
      return;
    }

    const data =
      await response.json();

    console.log(
      "Log created:",
      data
    );
  } catch (error) {
    console.error(
      "Logging failed:",
      error
    );
  }
};