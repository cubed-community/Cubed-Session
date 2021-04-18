declare module 'cubed-api'

interface SessionOptions {
  listenConsole?: boolean
}

interface SessionEvents {
	login: [session: string];
	console: [message: string];
}

/// <reference types="node" />
import { Server, File } from './typings/types';
import { DefaultOptions } from './utils/constants';
import { EventEmitter } from 'events';
/**
 *
 */
export declare class Session extends EventEmitter {
    username: string;
    password: string;
    session: string;
    options: typeof DefaultOptions;
    /**
     *
     * @param {SessionOptions} [options=this.options] the session options
     */
    constructor(options: {});
    /**
     * Starts the listening process for the server console
     */
    private listenConsole;
    /**
     * Gets all the servers the current session can view.
     * @returns {Promise<Server[]>} The servers that the logged in account can view
     * @example
     * Session.getServers().then(servers => console.log(servers))
     */
    getServers(): Promise<Server[]>;
    /**
     * Selects a server using the server code
     * @param serverCode The code of the server the session should select
     * @returns {Promise<void>}
     * @example
     * Session.selectServer(1234)
     */
    selectServer(serverCode: number): Promise<void>;
    /**
     *
     * @param {string} [path] The path to the folder you wish to get the contents of
     * @returns {Promise<File>} An array of the files
     */
    getFolder(path: string): Promise<File[]>;
    /**
     * Logs the user in, establishing a connection to the server
     * @param {string} [username=this.token] Username of the account to log in with
     * @param {string} [password=this.password] Password of the account to log in with
     * @returns {Promise<string>} The session token returned from the server
     * @example
     * Session.login('myusername', 'mypassword')
     */
    login(username: string, password: string): Promise<string>;
}
