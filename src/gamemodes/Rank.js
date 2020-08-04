const FFA = require('./FFA');

/** @param {Cell} cell */
function checkRealPlayer(cell) {
    return cell.type === 0 && cell.owner && cell.owner.router.type === 'connection';
}

/** @param {Cell} cell */
function checkLastCell(cell) {
    return cell.owner && cell.owner.ownedCells.length === 1;
}

/** @param {Cell} a @param {Cell} b */
function checkRank(a, b) {
    return 1 <= a.rank && a.rank <= b.rank;
}


class Rank extends FFA {
    constructor(handle) {
        super(handle);
    }
    static get name() {
        return 'Rank';
    }
    static get type() {
        return 0;
    }

    /**
     * @param {Cell} a @param {Cell} b
     */
    canEat(a, b) {
        const fitRank = checkRank(a, b);
        const realPlayers = checkRealPlayer(a) && checkRealPlayer(b);
        const lastCell = checkLastCell(b);
        if (realPlayers && fitRank && lastCell) a.owner.cellRank += 1;
        if (realPlayers && !fitRank) return false;
        return true;
    }

    /**
     * @param {Player} player
     * @param {string} name
     * @param {string} skin
     */
    onPlayerSpawnRequest(player, name, skin) {
        player.cellRank = 1;
        return super.onPlayerSpawnRequest(player, name, skin);
    }
}

module.exports = Rank;

const World = require('../worlds/World');
const Player = require('../worlds/Player');
const Cell = require('../cells/Cell');
