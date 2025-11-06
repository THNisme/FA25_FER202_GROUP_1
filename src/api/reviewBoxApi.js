const BASE_URL = "http://localhost:5000/events";

/**
 * Lấy danh sách review theo ID sự kiện
 */
export const getReviewsByEvent = async (eventId) => {
  try {
    if (!eventId) return [];

    const res = await fetch(`${BASE_URL}/${eventId}`);
    if (!res.ok) {
      console.error("Không lấy được event", res.status);
      return [];
    }

    const event = await res.json();
    return Array.isArray(event.reviews) ? event.reviews : [];
  } catch (err) {
    console.error("API Get Reviews Error:", err);
    return [];
  }
};
