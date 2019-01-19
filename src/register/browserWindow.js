const {setWindowId} = require('../utils/frameOperate');

module.exports = function ({setFrameTree, removeChild}) {
    return {
        frameWindow: {
            setChildren: setFrameTree,
            setWindowId,
            removeChild
        }
    }
}