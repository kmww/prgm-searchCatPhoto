import { request } from "../apis/api.js";
import Header from "./Header.js";
import SuggestKeywords from "./SuggestKeywords.js";

export default function App({ $target }) {
  this.state = {
    keywords: [],
  };

  this.setState = (nextState) => {
    if (this.state !== nextState) {
      this.state = nextState;
      suggestKeywords.setState(this.state.keywords);
    }
  };

  const header = new Header({
    $target,
    onKeywordInput: async (keyword) => {
      if (keyword.trim().length > 1) {
        const keywords = await request(`/keywords?q=${keyword}`);

        this.setState({
          ...this.state,
          keywords,
        });
      }
    },
  });

  const suggestKeywords = new SuggestKeywords({
    $target,
    initialState: this.state.keywords,
  });
}
