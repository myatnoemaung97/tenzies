export default function Tile({tile, clickTile}) {
    return (
        <button  onClick={clickTile} className="--tile"><span className="--avatar">{tile.isPlayed && tile.playedBy}</span></button>
    )
}