import { useEffect, useState } from "react"
import Confetti from 'react-confetti'
import Tile from './Tile';
import { nanoid } from "nanoid";

export default function () {
    const [tiles, setTiles] = useState(initTiles());
    const [currentPlayer, setCurrentPlayer] = useState('O');
    const [tictactoe, setTictactoe] = useState(false);
    const [winningCondition, setWinningCondition] = useState('');

    useEffect(() => {
        const eightSets = getAllEightSets();

        if (checkTictactoe(eightSets.hor1)) {
            setTictactoe(true);
            setWinningCondition('hor1');
        } else if (checkTictactoe(eightSets.hor2)) {
            setTictactoe(true);
            setWinningCondition('hor2');
        } else if (checkTictactoe(eightSets.hor3)) {
            setTictactoe(true);
            setWinningCondition('hor3');
        } else if (checkTictactoe(eightSets.ver1)) {
            setTictactoe(true);
            setWinningCondition('ver1');
        } else if (checkTictactoe(eightSets.ver2)) {
            setTictactoe(true);
            setWinningCondition('ver2');
        } else if (checkTictactoe(eightSets.ver3)) {
            setTictactoe(true);
            setWinningCondition('ver3');
        } else if (checkTictactoe(eightSets.dia1)) {
            setTictactoe(true);
            setWinningCondition('dia1');
        } else if (checkTictactoe(eightSets.dia2)) {
            setTictactoe(true);
            setWinningCondition('dia2');
        } else if (currentPlayer === 'X' && !tiles.every(tile => tile.isPlayed)) {
            computerMove();
        }

    }, [tiles]);


    function initTiles() {
        const tiles = [];

        for (let i = 0; i < 9; i++) {
            tiles.push({ tileNumber: i, isPlayed: false, playedBy: '' })
        }

        return tiles;
    }

    function getAllEightSets() {
        return {
            hor1: tiles.slice(0, 3),
            hor2: tiles.slice(3, 6),
            hor3: tiles.slice(6, 9),
            ver1: [tiles[0], tiles[3], tiles[6]],
            ver2: [tiles[1], tiles[4], tiles[7]],
            ver3: [tiles[2], tiles[5], tiles[8]],
            dia1: [tiles[0], tiles[4], tiles[8]],
            dia2: [tiles[2], tiles[4], tiles[6]],
        }
    }


    function checkTictactoe(tiles) {
        const firstTile = tiles[0];
        return tiles.every(tile => tile.playedBy === firstTile.playedBy && tile.isPlayed);
    }

    function playTile(tileNumber, player) {
        if (tiles[tileNumber].isPlayed || tictactoe) {
            return;
        }
        setTiles(prevTiles => prevTiles.map(tile => tile.tileNumber == tileNumber ? { ...tile, isPlayed: true, playedBy: player } : tile))
        setCurrentPlayer(player === 'X' ? 'O' : 'X');
    }

    function randomTile() {
        let randomTile = '';
        do {
            randomTile = Math.floor(Math.random() * 9);
        } while (tiles[randomTile].isPlayed);

        return randomTile;
    }

    function blockOrWinningTile() {
        const eightSets = getAllEightSets();
        let playerWinningTile = '';
        let computerWinningTile = '';

        for (const set in eightSets) {
            const playedTiles = eightSets[set].filter(tile => tile.isPlayed);
            const unplayedTiles = eightSets[set].filter(tile => !tile.isPlayed);
            if (unplayedTiles.length == 1) {
                if (playedTiles.every(tile => tile.playedBy === 'X')) {
                    computerWinningTile = unplayedTiles[0].tileNumber;
                    return computerWinningTile;
                } else if (playedTiles.every(tile => tile.playedBy === 'O')) {
                    playerWinningTile = unplayedTiles[0].tileNumber;
                }
            }
        }

        if (playerWinningTile !== '') {
            return playerWinningTile;
        }

        return -1;
    }

    function easyAI() {
        return randomTile();
    }

    function mediumAI() {
        const mediumMove = blockOrWinningTile();
        if (mediumMove === -1) {
            console.log('random')
            return randomTile();
        }

        return mediumMove;
    }

    function computerMove() {
        playTile(mediumAI(), 'X');
    }

    const tileElements = tiles.map(tile => <Tile key={nanoid()} tile={tile} clickTile={() => playTile(tile.tileNumber, 'O')} />)

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className='--tic-tac-toe text-white'>
                {tileElements}
                <div className={winningCondition}></div>
            </div>
            {tictactoe && <Confetti />}
        </div>
    )
}
