/* Intention: Adding this script should ensure your Dapp can use window.ethereum regardless of the browser.
    Typical Scenarios:
        - Page accessed via Brave or in a browser with MetaMask: window.ethereum will not be changed, ethvault poly-fill will not be loaded
        - Page accessed via browser without MetaMask: will redirect to myethvault.com/browse# + currentURL. And then the next scenario should apply
        - Page is in an iframe and query string contains ethvault=1: ethvault poly-fill will be loaded and will replace window.ethereum
                                                                    (this will still take place even in Brave or with MetaMask so that using the Dapp within MyEthVault.com uses the MyEthVault wallet on all browsers. With Brave or MetaMask if the page is not loaded within MyEthVault then the MetaMask or Brave wallet will work, as per the first scenario)
    Requirements:
        - In order to be compatible with myEthVault, see https://github.com/ethvault/integration-guide. GitHub pages and GitLab pages sites are compatible by default.
        - This use of document.write means that the ethvault's script will get loaded synchronously AFTER the closing script tag of this block
        So, do not try to use the ethvault provided window.ethereum until the next script block
        This is not an issue if you include this script (as opposed to copying and pasting it)
*/

function isEmbeddedInIFrame() { // https://github.com/ethvault/iframe-provider-polyfill/blob/master/src/index.ts
    return window && window.parent && window.self && window.parent !== window.self;
}

function queryStringIndicatesInEthVault() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('ethvault') == "1";
}

if (queryStringIndicatesInEthVault() && isEmbeddedInIFrame()) {
    // Most likely in an iframe in myethvault.com (or a similarly setup iframe), so load the ethvault iframe-provider-polyfill
    
    // The script added by document.write() below sets or replaces window.ethereum with one that to communicates with parent frame using ethvault's approach
    document.write('<script src="https://unpkg.com/@ethvault/iframe-provider-polyfill@0.1.5/dist/index.js" integrity="sha384-qx1eG3ocmrXxXBwEL+qnP7je980Depwy/J7keRHVnqfEFVXHJ0ruzYIsUX767NEH" crossorigin="anonymous"> <\/script>');
    var window_ethereum_info = "ethvault";
}
else { 
    if (window.ethereum) {
        //We have an injected window.ethereum provider (such as from Meta-Mask or Brave)
        var window_ethereum_info = "Injected";
    }
    else {
        // No window.ethereum readily available, redirect to myEthVault with this Dapp loaded.

        // Do not redirect to myEthVault if protocol is "file:"
        if (window.location.protocol == 'file:') {
            if (confirm('Injecting window.ethereum and myethvault do not work for file://...\nFor use with Brave or Metamask, try running a simple local http server\nClick OK to be redirected to a site explaining how.')) {
                window.location.href = "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server";
                alert("Loading...");
            }
            alert("Otherwise, you will need to host your site, possibly GitHub pages will work.\nClick OK to be redirected to their instructions.")
            window.location.href = "https://pages.github.com/"
        }

        // Redirect to myEthVault
        else { 
            let currentURL = window.location.href;
            window.location.href = "https://myethvault.com/browse#" + currentURL;
        }
    }
}