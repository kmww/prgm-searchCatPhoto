import { request } from "../apis/api.js";
import Header from "./Header.js";

export default function App({ $target }) {
  this.state = {
    keywords: [],
  };

  const header = new Header({
    $target,
    onKeywordInput: async (keyword) => {
      if (keyword.trim().length > 1) {
        const keywords = await request(`/keywords?q=${keyword}`);

        console.log(keywords);
      }
    },
  });
}
