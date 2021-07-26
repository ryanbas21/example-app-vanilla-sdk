/*
 * Setup initial FR Config
 */
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

/*
 * Error Utils
 */
const FATAL = 'FATAL';
function handleFatalError(err) {
  console.log(err);
  return err;
}

/* 
 * Event setup and cleanup on form
 */
window.addEventListener("load", () => {
  const form = document.getElementById('my-form');
  nextStep();

  // const nameCallback = step.getCallbackOfType('NameCallback');
  // const passwordCallback = step.getCallbackOfType('PasswordCallback');
  // nameCallback.setName(document.querySelector('input[type=text]').value);
  // passwordCallback.setPassword(document.querySelector('input[type=password]').value);

  form.addEventListener('submit', interceptForm);
});

window.addEventListener('unload', () => {
  const form = document.getElementById('my-form');
  form.removeEventListener('submit', interceptForm, false);
});

/*
 * Basic integration into FR sdk to handle passing "next step" to custom handler
 */
function nextStep(step) {
  console.log('step: ', step);
  // Get the next step using the FRAuth API
  debugger;
  forgerock.FRAuth.next(step).then(handleStep).catch(handleFatalError);
}

function interceptForm (e) {
  e.preventDefault();

  // look at step and connect callbacks
  const step = nextStep();
  console.log('interceptForm step value', step);

  return false;
}

const handlers = {
  UsernamePassword: (step) => {
    document.querySelector('.btn').addEventListener('click', (e) => {
      e.preventDefault();
      const nameCallback = step.getCallbackOfType('NameCallback');
      const passwordCallback = step.getCallbackOfType('PasswordCallback');
      nameCallback.setName(document.querySelector('input[type=text]').value);
      passwordCallback.setPassword(document.querySelector('input[type=password]').value);
      nextStep(step);
    });
  },
  Error: (step) => {
    document.querySelector('#Error').innerHTML = step.payload.message + ' ' + step.payload.reason;
  },
  [FATAL]: (_step) => { }
};


const getStage = (step) => {
  // Check if the step contains callbacks for capturing username and password
  debugger;
  const usernameCallbacks = step.getCallbacksOfType('NameCallback');
  const passwordCallbacks = step.getCallbacksOfType('PasswordCallback');
  
  debugger;
  if (usernameCallbacks.length && passwordCallbacks.length) {
    return "UsernamePassword";
  }

  return undefined;
};





function handleStep (step) {
    if (!step.type) return;

    switch (step.type) {
        case 'LoginSuccess':
	    //after login get tokens
	    const tokens = forgerock.TokenManager.getTokens({ forceRenew: true });
	    const user = forgerock.UserManager.getCurrentUser();
	    
	    window.location.replace('https://ryan.example.com:1234/success.html');
	    document.getElementById('tokens').innerHTML = JSON.stringify({ tokens, user })
	    return;
	    

        case 'LoginFailure':
            handlers['Error'](step);
            return;

        default:
            const stage = getStage(step) || FATAL;
            return stage === FATAL 
	      ? handlers[FATAL](step) 
	      : handlers[stage](step);
    }
}
