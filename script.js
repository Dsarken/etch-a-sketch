// Getting container id
const container = document.querySelector("#container");
const resize = document.querySelector("#resize");
const clear = document.querySelector("#clear");
let grid_size = 16; // Default grid size is set at 16

let mouseDown = 0;

window.addEventListener("mousedown", function (event) {
  mouseDown = 1;
  // event.preventDefault(); // Remove if causing issues
});

window.addEventListener("mouseup", function () {
  mouseDown = 0;
});

// Prompt user for grid size after clicking button
resize.addEventListener("click", function () {
  let new_grid_size = prompt("Enter a grid size from 1-100: ");
  if (new_grid_size === null) {
    grid_size = 16; // Resets to default grid size
    return;
  } else if (new_grid_size < 1 || new_grid_size > 100) {
    alert("Invalid grid size, grid size must be in the range of 1-100");
    new_grid_size = 16;
  }
  // Clear the old grid
  container.innerHTML = "";
  // Create a new grid with the updated size
  createSketchGrid(new_grid_size);
  grid_size = new_grid_size;
});

// To clear the drawing grid
clear.addEventListener("click", function () {
  clearGrid();
});

// Create a cell function
function createSketchGrid(size) {
  let cellPercentageSize = 100 / size;
  let cellPercentageMargin = 0;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.style.width = cellPercentageSize + "%";
    cell.style.height = cellPercentageSize + "%";
    cell.style.margin = cellPercentageMargin + "%";
    container.appendChild(cell);
  }

  // Add mouseover event listener to the container
  container.addEventListener("mouseover", function (event) {
    if (
      mouseDown == 1 &&
      event.target.parentNode === container &&
      !event.target.style.backgroundColor
    ) {
      event.target.style.backgroundColor = getRandomColor();
    }
  });
}

function clearGrid() {
  const cells = container.querySelectorAll("div");
  cells.forEach((cell) => {
    cell.style.backgroundColor = "";
  });
}

// Function to generate a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Create the grid
createSketchGrid(grid_size);
