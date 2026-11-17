const PRIMARY_API = "https://api.abcz.workers.dev/api/fitlog";

const FALLBACK_API = "https://api.api-store.workers.dev/api/fitlog";

export const getWorkouts = async () => {
  try {
    const response = await fetch(PRIMARY_API);

    if (!response.ok) {
      throw new Error("Primary API failed");
    }

    return await response.json();
  } catch (error) {
    console.log("Trying fallback API...");

    const response = await fetch(FALLBACK_API);

    if (!response.ok) {
      throw new Error("Both APIs failed");
    }

    return await response.json();
  }
};