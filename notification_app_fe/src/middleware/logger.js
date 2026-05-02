export const logToServer = async (stack, level, pkg, message) => {
  const endpoint = "http://20.207.122.201/evaluation-service/logs";
  try {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stack, level, package: pkg, message })
    });
  } catch (error) {}
};
