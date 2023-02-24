const colorsElement = document.querySelector("#colors");
const infoElement = document.querySelector("#info");

function setColors(colors) {
  colors.forEach((color) => {
    const optionElement = document.createElement("option");
    optionElement.setAttribute("value", color.name);
    optionElement.textContent = color.name;
    colorsElement.append(optionElement);

    /* onClick event sur <option> n'est pas supporté par Chrome */
    optionElement.addEventListener("click", () => {
      infoElement.innerHTML = `<pre>${JSON.stringify(color, null, 2)}</pre>`;
      console.log("Coucou");
    });

    /* Ne fonctionne pas correctement */
    // colorsElement.addEventListener("change", () => {
    //   infoElement.innerHTML = `<pre>${JSON.stringify(color, null, 2)}</pre>`;
    //   console.log("Coucou");
    // });
  });
}

async function getColors() {
  const response = await fetch("/api/colors");
  const colors = await response.json();
  setColors(colors);
}

getColors();
