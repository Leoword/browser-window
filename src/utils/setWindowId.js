const tagList = require('../constants').TAGLIST.join(',');
const fillArray = require('./fillArray');
const _ = require('underscore');

module.exports = function ({windowId}, {source}) {
    const frameLength = document.querySelectorAll(tagList).length;

    _.each(fillArray(new Array(frameLength), 0), function (item, index) {
        if ( document.querySelectorAll(tagList)[index].contentWindow === source) {
            document.querySelectorAll(tagList)[index].setAttribute('window-id', windowId);
        }
    });
}