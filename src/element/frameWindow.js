const {addEventListener, removeEventListener} = require('../utils/polyfill');
const postMessage = require('../utils/postMessage');
const tagList = require('../constants').TAGLIST.join(',');

const _ = require('underscore');

module.exports = function FrameWindow() {
    this.symbol = generateSymbol();
    this.children = null;
    
    this.signIn = function () {
        postMessage(parent, {
            namespace: 'frameWindow',
            type: 'setChildren',
            argv: {
                symbol: this.symbol,
                children: this.children
            }
        });
    }

    this.setChildren = function ({symbol, children}) {
        if (!this.children) {
            this.children = {};
        }
        
        this.children[symbol] = {
            parent: this.symbol, children
        }

        if (document.querySelectorAll(tagList).length === _.keys(this.children).length) {
            this.signIn();
        }
    }
}

function generateSymbol() {
    return Math.random().toString(36).substr(2);
}