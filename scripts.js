let hasWinner = false;

const displayController = (() => {
    let currentPlayer = 'X';

    // Tiles setup
    const tiles = [];
    for (let i = 0; i < 9; i++) {
        const index = i;
        const tile = document.querySelector(`#_${i}`);
        tile.textContent = '';
        tile.addEventListener('click', () => {
            // End game if someone has won
            if (hasWinner) {
                console.log('Game is over')
                return;
            }

            let result = setTile(index);

            if (result !== null) {
                console.log(`${result} is the new winner!`)
                hasWinner = true;
            }
        });

        tiles.push(tile);
    }

    function hasWon() {
        if (tiles[0].textContent != '' && (
            (tiles[0].textContent === tiles[1].textContent && tiles[0].textContent === tiles[2].textContent) || // Horizontal
            (tiles[0].textContent === tiles[4].textContent && tiles[0].textContent === tiles[8].textContent) || // Diagonal
            (tiles[0].textContent === tiles[3].textContent && tiles[0].textContent === tiles[6].textContent) // Vertical
        )) {
            return tiles[0].textContent;
        }

        if (tiles[1].textContent != '' &&
            (tiles[1].textContent === tiles[4].textContent && tiles[1].textContent === tiles[7].textContent) // Vertical
        ) {
            return tiles[1].textContent;
        }

        if (tiles[2].textContent != '' && (
            (tiles[2].textContent === tiles[5].textContent && tiles[2].textContent === tiles[8].textContent) || // Vertical
            (tiles[2].textContent === tiles[4].textContent && tiles[2].textContent === tiles[6].textContent) // Diagonal
        )) {
            return tiles[2].textContent;
        }

        if (tiles[3].textContent != '' && (
            tiles[3].textContent === tiles[4].textContent && tiles[3].textContent === tiles[5].textContent // Horizontal
        )) {
            return tiles[3].textContent;
        }

        if (tiles[6].textContent != '' && (
            tiles[6].textContent === tiles[7].textContent && tiles[6].textContent === tiles[8].textContent // Horizontal
        )) {
            return tiles[6].textContent;
        }

        return null;
    }

    function setTile(index) {
        const tile = tiles[index];
        if (tile.textContent != '') {
            console.log(`Tile ${index} already has a value present.`);
            return null;
        }

        // Update the tile
        tile.textContent = currentPlayer;

        const winner = hasWon();

        if (winner === null) {
            // Update the current player, if no one has won yet
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }

        return winner;
    }

    function clearTiles() {
        for (const tile of tiles) {
            tile.textContent = '';
        }

        hasWinner = false;

        console.log('The board is reset.');
    }

    return { clearTiles };
})();
