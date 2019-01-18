const setWindowId = require('../utils/setWindowId');

module.exports = function ({setChildren}) {
    return {
        frameWindow: {
            setChildren, setWindowId
        }
    }
}