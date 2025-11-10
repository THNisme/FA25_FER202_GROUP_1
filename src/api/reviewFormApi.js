import axios from "axios";

const API_URL = "http://localhost:5000/events";

export const getReviewsByEventId = async (eventId) => {
  const response = await axios.get(`${API_URL}/${eventId}`);
  return response.data.reviews || [];
};

export const addReviewToEvent = async (eventId, reviewData) => {
  const eventRes = await axios.get(`${API_URL}/${eventId}`);
  const event = eventRes.data;

  const nextId =
    event.reviews && event.reviews.length > 0
      ? Math.max(...event.reviews.map((r) => r.id)) + 1
      : 1;

  const newReview = {
    id: nextId,
    ...reviewData,
    date: new Date().toISOString(),
  };

  const updatedEvent = {
    ...event,
    reviews: [...(event.reviews || []), newReview],
  };

  const res = await axios.put(`${API_URL}/${eventId}`, updatedEvent);
  return res.data;
};
