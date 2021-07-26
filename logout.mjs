console.log('loaded')

forgerock.Config.set({
    clientId: 'test-app-1',
    redirectUri: 'https://ryan.example.com:1234/_callback',
    scope: 'openid',
    serverConfig: {
      baseUrl: 'https://openam-ryan-bas.forgeblocks.com/am/',
      timeout: 5000
    },
    realmPath: 'alpha',
    tree: 'sdkAuthenticationTree', //sdkAuthenticationTree
});

const logoutHandler = (e) => {
    e.preventDefault(); 
    console.log('here');
    return forgerock.SessionManager.logout().then(v => {
      console.log('in then', v);
      if (v.ok === true)
	window.location.replace('https://ryan.example.com:1234/');
    })
  }

const logout = document.getElementById('logout')
logout.addEventListener('click', logoutHandler);
