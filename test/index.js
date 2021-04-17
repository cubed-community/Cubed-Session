const { Session } = require('../dist/index');

(() => {
	const session = new Session();
	
	session.on('console', (msg) => console.log("Console message: " + msg));
	session.on('login', async () => {
		console.log(`Logged in successfully`);
		const servers = await session.getServers();
		const server = servers.find(c => c.name.toLowerCase() === "testingv1".toLowerCase());
		await session.selectServer(server.code);
		
		console.log(await session.getFolder('/plugins/Skript/scripts/'));



	});

	session.login('username', 'password')
})()
