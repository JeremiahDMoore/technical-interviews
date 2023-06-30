// Conway's Game of Life
//Wiki: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

//Rules:
//Any live cell with fewer than two live neighbours dies, as if by underpopulation.
//Any live cell with two or three live neighbours lives on to the next generation.
//Any live cell with more than three live neighbours dies, as if by overpopulation.
//Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

//Question:
//Given a board at time t1, return the board at the next time interval, t2.

//Notes:
//You can define the board however you like.
//The board can be any rectangular dimension, m by n.
//The board’s dimensions remain the same throughout the game.

//Solution:
// In the `gameOfLife` function, it starts by creating a deep clone of the input board, so it can keep track of the state of the board
//at the start of the turn (before any changes are made). Then it checks each cell in turn. For each live cell (1), it checks if it 
//has less than 2 or more than 3 live neighbors and dies if it does. For each dead cell (0), it checks if it has exactly 3 live 
//neighbors and becomes alive if it does.

// The `getLiveNeighbors` function calculates the number of live neighbors for a cell by checking all surrounding cells.

// Define the initial configuration of the Game of Life board, dead cells = 0, living cells = 1
let board = [
  [0,1,0,0,0],
  [0,0,1,0,0],
  [0,1,1,0,0],
  [0,0,0,0,0],
  [0,0,1,0,0]
];

// Print out the original state of the board to the console for comparison after function runs
console.log("Original board:");
console.log(board);

// This is the main function that advances the game by one turn
function gameOfLife(board) {
  // Create a deep copy of the board to keep track of the original state, so we dont mutate the board as it is updated cell by cell
  let clone = JSON.parse(JSON.stringify(board));

  // Iterate over each cell in the board
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      // Calculate the number of live neighbors for the current cell
      let liveNeighbors = getLiveNeighbors(clone, i, j);

      // If the current cell is alive
      if (clone[i][j] === 1) {
        // If it has less than 2 live neighbors or more than 3, it dies
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          board[i][j] = 0;
        }
      } else { // If the current cell is dead
        // If it has exactly 3 live neighbors, it becomes a live cell
        if (liveNeighbors === 3) {
          board[i][j] = 1;
        }
      }
    }
  }

  // Print out the new state of the board
  console.log("New board:");
  console.log(board);
}

// This helper function calculates the number of live neighbors for a given cell
function getLiveNeighbors(board, i, j) {
  let count = 0;

  // Iterate over all the cells in the neighborhood of the current cell
  for (let x = Math.max(i - 1, 0); x <= Math.min(i + 1, board.length - 1); x++) {
    for (let y = Math.max(j - 1, 0); y <= Math.min(j + 1, board[0].length - 1); y++) {
      // If the neighbor cell is not the same as the current cell
      if (x !== i || y !== j) {
        // Add the value of the neighbor cell to the count
        // (0 for dead cells, 1 for live cells)
        count += board[x][y];
      }
    }
  }
  // Return the total count of live neighbors
  return count;
}

// Kick off the game
gameOfLife(board);


