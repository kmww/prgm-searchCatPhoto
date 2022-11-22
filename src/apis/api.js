import { API_KEY } from "../../constants.js";

const API_END_POINT = API_KEY;

export const request = async (url) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`);

    if (!res.ok) {
      throw new Error("API 호출에 실패했습니다.");
    }

    return await res.json();
  } catch (error) {
    alert(error.message);
  }
};
