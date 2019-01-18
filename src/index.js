const BrowserWindow = require('./element/browserWindow');
const FrameWindow = require('./element/frameWindow');
const {addEventListener} = require('./utils/polyfill');
const postMessage = require('./utils/postMessage');
const _ = require('underscore');

const tagList = require('./constants').TAGLIST.join(',');

if (top === self) {
    const browserWindow = new BrowserWindow();

    const mapping = require('./register/browserWindow')(browserWindow);

    // browserWindow.init();

    addEventListener(top, 'message', function (event) {
        const { namespace, type, argv } = window.JSON.parse(event.data);

        switch (namespace) {
            case 'agent':
                browserWindow[type](argv);

                break;
            case 'browserWindow':
                break;
            case 'frameWindow':
                mapping.frameWindow[type].call(browserWindow, argv, event);

                break;
            }
        });


} else {
    const frameWindow = new FrameWindow();

    const mapping = require('./register/frameWindow')(frameWindow)

    postMessage(parent, {
        namespace: 'frameWindow',
        type: 'setWindowId',
        argv: {
            windowId: frameWindow.symbol
        }
    });

    window.onload = function () {
        if (document.querySelectorAll(tagList).length === 0) {
            frameWindow.signIn();
        }
    }

    addEventListener(window, 'message', function (event) {
        const {namespace, type, argv} = window.JSON.parse(event.data);

        switch (namespace) {
            case 'browserWindow':
                break;
            case 'frameWindow':
                mapping.frameWindow[type].call(frameWindow, argv, event);

                break;
        }
    });
}

