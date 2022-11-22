import Keyword from "./Keyword.js";

export default function Header({ $target }) {
  const $header = document.createElement("header");
  $header.className = "Header";

  $target.appendChild($header);

  const $title = document.createElement("h1");
  $title.innerHTML = `🐈고양이 사진 검색기🔎`;
  $header.appendChild($title);

  const keyword = new Keyword({
    $target: $header,
  });
}
