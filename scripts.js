const gameboard = (() => {
    // Tracks whether a game has been won
    let hasWinner = false;

    // Current Player methods
    let currentPlayer = 'X';
    const swapCurrentPlayer = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    const tiles = new Array(9).fill('');

    function hasWon() {
        if (tiles[0] != '' && (
            (tiles[0] === tiles[1] && tiles[0] === tiles[2]) || // Horizontal
            (tiles[0] === tiles[4] && tiles[0] === tiles[8]) || // Diagonal
            (tiles[0] === tiles[3] && tiles[0] === tiles[6]) // Vertical
        )) {
            return tiles[0];
        }

        if (tiles[1] != '' &&
            (tiles[1] === tiles[4] && tiles[1] === tiles[7]) // Vertical
        ) {
            return tiles[1];
        }

        if (tiles[2] != '' && (
            (tiles[2] === tiles[5] && tiles[2] === tiles[8]) || // Vertical
            (tiles[2] === tiles[4] && tiles[2] === tiles[6]) // Diagonal
        )) {
            return tiles[2];
        }

        if (tiles[3] != '' && (
            tiles[3] === tiles[4] && tiles[3] === tiles[5] // Horizontal
        )) {
            return tiles[3];
        }

        if (tiles[6] != '' && (
            tiles[6] === tiles[7] && tiles[6] === tiles[8] // Horizontal
        )) {
            return tiles[6];
        }

        return null;
    }

    function setTile(index) {
        // Game is over if someone has won
        if (hasWinner) {
            console.log('Game is over')
            return;
        }

        const tile = tiles[index];

        // Cannot fill a tile that already has a value
        if (tile !== '') {
            console.log(`Tile ${index} already has a value present.`);
            return;
        }

        // Update tiles and display
        tiles[index] = currentPlayer;
        displayController.setTile(index, currentPlayer);

        // Check if there is a winner
        const winner = hasWon();
        if (winner === null) {
            // Update the current player, if no one has won yet
            swapCurrentPlayer();
        } else {
            console.log(`${winner} is the new winner!`)
            hasWinner = true;
        }
    }

    function clearTiles() {
        // reset winner
        hasWinner = false;

        // reset board and display tiles
        tiles.fill('');
        displayController.clearTiles();

        console.log('The board is reset.');
    }

    return { clearTiles, setTile };
})();

const displayController = (() => {
    // Tiles setup
    const tiles = [];
    for (let i = 0; i < 9; i++) {
        const index = i;
        const tile = document.querySelector(`#_${i}`);
        tile.textContent = '';
        tile.addEventListener('click', () => {
            gameboard.setTile(index);
        });

        tiles.push(tile);
    }

    function setTile(index, value) {
        const tile = tiles[index];

        // Update the tile
        tile.textContent = value;
    }

    function clearTiles() {
        for (const tile of tiles) {
            tile.textContent = '';
        }
    }

    return { setTile, clearTiles };
})();
