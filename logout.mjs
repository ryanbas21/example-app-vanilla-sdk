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
    return forgerock.FRUser.logout().then(() => {
      window.location.replace('https://ryan.example.com:1234/');
    })
  }

const urlSearchParams = new URLSearchParams(location.search);
const params = Object.fromEntries(urlSearchParams.entries());

document.getElementById('user-info').innerHTML = params.user 

const logout = document.getElementById('logout')
logout.addEventListener('click', logoutHandler);
