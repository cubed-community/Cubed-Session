declare module 'cubed-api'

interface SessionOptions {
  listenConsole?: boolean
}

interface SessionEvents {
	login: [session: string];
	
}