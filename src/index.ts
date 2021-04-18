import { Server, File } from './typings/types';
import { Events, DefaultOptions } from './utils/constants';
import CubedCraft from 'cubed-api';
import { EventEmitter } from 'events';
import Util from './utils/utils';

/**
 * 
 */
export class Session extends EventEmitter { 

	username: string;
	password: string;

	session: string;
	server: number;
	options: typeof DefaultOptions;

	/**
	 * 
	 * @param {SessionOptions} [options=this.options] the session options
	 */
	constructor(options: {}) {
		super();

		this.options = Util.mergeDefault(DefaultOptions, options);

		this.on('select', () => {
			if (this.options.listenConsole) this.listenConsole();
		})
	}

	/**
	 * Starts the listening process for the server console
	 */
	private async listenConsole() {
		CubedCraft.console.onMessage(this.session, (m: string) => this.emit(Events.CONSOLE, m));
	}

	/**
	 * Gets all the servers the current session can view.
	 * @returns {Promise<Server[]>} The servers that the logged in account can view
	 * @example
	 * Session.getServers().then(servers => console.log(servers))
	 */
	public async getServers() : Promise<Server[]> {
		const servers: Server[] = await CubedCraft.getServers(this.session);
		return servers;
	}

	/**
	 * Selects a server using the server code
	 * @param serverCode The code of the server the session should select
	 * @returns {Promise<void>}
	 * @example
	 * Session.selectServer(1234)
	 */
	public async selectServer(serverCode: number) : Promise<void> {
		await CubedCraft.selectServer(this.session, serverCode);
		this.server = serverCode;
		this.emit(Events.SELECT, serverCode);
	}

	/**
	 * 
	 * @param {string} [path] The path to the folder you wish to get the contents of
	 * @returns {Promise<File>} An array of the files
	 * @example
	 * Session.getFolder('/plugins/skript/scripts')
	 */
	public async getFolder(path: string) {
		if (!this.session) throw new Error('There is no session active. Login first doing any action.');
		if (!this.server) throw new Error('There is no server selected! Select one first!');
		
		const contents: File[] = await CubedCraft.files.getFolder(this.session, path);
		return contents;
	}

	/**
	 * Logs the user in, establishing a connection to the server
	 * @param {string} [username=this.token] Username of the account to log in with
	 * @param {string} [password=this.password] Password of the account to log in with
	 * @returns {Promise<string>} The session token returned from the server
	 * @example
	 * Session.login('myusername', 'mypassword')
	 */
	public async login(username: string, password: string) : Promise<string> {
		const session = await CubedCraft.login(username, password);
		this.session = session;
	
		this.emit(Events.LOGIN, session);
		return session;
	}


}