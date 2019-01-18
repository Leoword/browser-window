const setWindowId = require('../utils/setWindowId');

module.exports = function ({setFrameTree}) {
    return {
        frameWindow: {
            setChildren: setFrameTree,
            setWindowId
        }
    }
}