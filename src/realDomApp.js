/** @jsx h */
function h(type, props, ...children) {
  return { type, props, children };
}

function createElement(node) {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }
  const $el = document.createElement(node.type);
  node.children.map(createElement).forEach($el.appendChild.bind($el));
  return $el;
}

const a = (
  <div>
    <div>현재 시각</div>
    <div id="time">{new Date().toLocaleTimeString()}</div>
  </div>
);

const $root = document.getElementById("root");
const $reload = document.getElementById("reload");

$root.appendChild(createElement(a));

setInterval(() => {

  const b = (
    <div>
      <div>현재 시각</div>
      <div id="time">{new Date().toLocaleTimeString()}</div>
    </div>
  );
  
  $root.innerHTML = "";
  $root.appendChild(createElement(b));
}, 1000);
