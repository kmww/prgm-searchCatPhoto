export default function SuggestKeywords({ $target, initialState, onKeywordSelect }) {
  const $suggest = document.createElement("div");
  $suggest.className = "Keywords";
  $target.appendChild($suggest);

  this.state = initialState;

  this.setState = (nextState) => {
    if (this.state !== nextState) {
      this.state = { ...this.state, ...nextState };
      this.render();
    }
  };

  this.render = () => {
    const { keywords, cursor } = this.state;
    $suggest.innerHTML = `
    <ul>
      ${keywords
        .map(
          (keyword, i) => `
        <li class="${cursor === i ? "active" : ""}">${keyword}</li>
      `
        )
        .join("")}
    </ul>
    `;

    $suggest.style.display = keywords.length > 0 ? "block" : "none";
  };

  this.render();

  $suggest.addEventListener("click", (e) => {
    const $li = e.target.closest("li");

    if ($li) {
      onKeywordSelect($li.textContent);
    }
  });

  window.addEventListener("keydown", (e) => {
    if ($suggest.style.display !== "none") {
      const { key } = e;
      const { keywords, cursor } = this.state;
      // 1. arrow up
      if (key === "ArrowUp") {
        const nextCursor = cursor - 1;
        this.setState({
          ...this.state,
          cursor: nextCursor < 0 ? keywords.length - 1 : nextCursor,
        });
      }
      // 2. arrow down
      else if (key === "ArrowDown") {
        const nextCursor = cursor + 1;
        this.setState({
          ...this.state,
          cursor: nextCursor > keywords.length - 1 ? 0 : nextCursor,
        });
      }
      // 3. enter
      else if (key === "Enter") {
        onKeywordSelect(keywords[cursor]);
      }

      // switch(key) {
      //   case 'ArrowUp':
      //   case 'ArrowDown':
      //   case 'Enter':
      // }
    }
  });
}
