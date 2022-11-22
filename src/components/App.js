import { request } from "../apis/api.js";
import { getItem, setItem } from "../utils/storage.js";
import debounce from "../utils/debounce.js";
import Header from "./Header.js";
import SuggestKeywords from "./SuggestKeywords.js";
import SearchResults from "./SearchResults.js";

export default function App({ $target }) {
  this.state = {
    keyword: "",
    keywords: [],
    catImages: [],
  };

  this.cache = getItem("keywords_cache", {});

  this.setState = (nextState) => {
    this.state = nextState;

    if (this.state.keyword !== nextState.keyword) {
      header.setState({
        keyword: this.state.keyword,
      });
    }

    suggestKeywords.setState({
      keywords: this.state.keywords,
    });

    // 결과값이 있는경우를 검색하고 없는것을 검색하면 rendering 안됨
    // searchResults를 [] 와 null 로 구분할것
    if (this.state.catImages.length > 0) {
      searchResults.setState(this.state.catImages);
    }
  };

  const header = new Header({
    $target,
    initialState: {
      keyword: this.state.keyword,
    },
    onKeywordInput: debounce(async (keyword) => {
      if (keyword.trim().length > 1) {
        let keywords = null;

        if (this.cache[keyword]) {
          keywords = this.cache[keyword];
        } else {
          keywords = await request(`/keywords?q=${keyword}`);
          this.cache[keyword] = keywords;
          setItem("keywords_cache", this.cache);
        }
        this.setState({
          ...this.state,
          keywords,
        });
      }
    }, 300),
    onEnter: () => {
      fetchCatsImage();
    },
  });

  const suggestKeywords = new SuggestKeywords({
    $target,
    initialState: {
      keywords: this.state.keywords,
      cursor: -1,
    },
    onKeywordSelect: (keyword) => {
      this.setState({
        ...this.state,
        keyword,
        keywords: [],
      });
      fetchCatsImage();
    },
  });

  const searchResults = new SearchResults({
    $target,
    initialState: this.state.catImages,
  });

  const fetchCatsImage = async () => {
    const { data } = await request(`/search?q=${this.state.keyword}`);

    this.setState({
      ...this.state,
      catImages: data,
      keywords: [],
    });
  };
}
