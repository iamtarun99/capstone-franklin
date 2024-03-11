import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * loads and decorates the footer
 * @param {Element} block The author block element
 */
export default async function decorate(block) {
  const ul = document.createElement("ul");
  [...block.children].forEach((row) => {
    const li = document.createElement("li");
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector("picture"))
        div.className = "author-image";
      else if (div.querySelector("a")){
        div.className = "social-media";

        [...div.children].forEach(p =>{
            let link =  p.firstElementChild;
            const icon = document.createElement('span');
            icon.classList.add(`${link.textContent.toLowerCase()}-icon`);
            link.textContent = '';
            link.append(icon);
            p.replaceWith(link);
        })
      }
      else div.className = "author-details";
    });
    ul.append(li);
  });
  ul.querySelectorAll("img").forEach((img) =>
    img
      .closest("picture")
      .replaceWith(
        createOptimizedPicture(img.src, img.alt, false, [{ width: "350" }])
      )
  );
  block.textContent = "";
  block.append(ul);
}
