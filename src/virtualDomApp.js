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

function isDifferent(node1, node2) {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === "string" && node1 !== node2) ||
    node1.type !== node2.type
  );
}

function updateElement($parent, newNode, oldNode, index = 0) {
  if (!oldNode) {
    $parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    $parent.removeChild($parent.childNodes[index]);
  } else if (isDifferent(newNode, oldNode)) {
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
  } else if (newNode.type) {
    const length = Math.max(newNode.children.length, oldNode.children.length);
    for (let i = 0; i < length; i++) {
      updateElement($parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
    }
  }
}

const a = (
  <div>
    <div>현재 시각</div>
    <div id="time">{new Date().toLocaleTimeString()}</div>
  </div>
);

const $root = document.getElementById("root");
const $reload = document.getElementById("reload");

updateElement($root, a);
setInterval(
  () => {
    const b = (
      <div>
        <div>현재 시각</div>
        <div id="time">{new Date().toLocaleTimeString()}</div>
      </div>
    );
    updateElement($root, b, a);
  },
  1000
);
