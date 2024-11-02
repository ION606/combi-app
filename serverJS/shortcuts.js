import { session, globalShortcut } from "electron";
import { changeZoom } from "../JS/display.js";
import { getCurrentTab, getCurrentWindow } from "./tabs_server.js";
import { logger } from "./imports.js";


/**
 * @param {Electron.Event} e
 * @param {Electron.BrowserWindow} window
 */
export default async function setUpShortcuts(uid) {
    globalShortcut.register('Control+Shift+I', () => {
        console.log("A", getCurrentWindow().currentView);
        getCurrentWindow().currentView.webContents.toggleDevTools();
        // getCurrentWindow().isFocused() ? getCurrentTab()?.toggleDevTools() : null
    });
    globalShortcut.register('Control+H', () => getCurrentTab()?.webContents.executeJavaScript('window.electronAPI.displayHistory()'));

    // zoom
    globalShortcut.register('Control+=', () => changeZoom(getCurrentTab(), true));
    globalShortcut.register('Control+-', () => changeZoom(getCurrentTab(), false));
    globalShortcut.register('Control+Plus', () => changeZoom(getCurrentTab(), false, true));
    

    globalShortcut.register('Control+T', () => window.webContents.executeJavaScript('window.tabAPI.addTab()'))

    // window.webContents.on('did-navigate', async (_, url, code, stat) => {
    //     if (isValidURL(url)?.hostname === 'lite.duckduckgo.com') return;

    //     const title = await window.webContents.executeJavaScript('document.title');
    // });
}