This is a simple javascript script making use of myEthVault when appropriate to make `window.ethereum` available everywhere, including on mobile browsers. Relies on the awesome work by Moody Salem on myethvault.com

Include in your site by adding the following:

```html
<script src="https://coda-coda.github.io/window.ethereum-everywhere/versions/window.ethereum-everywhere-v2.1.0.js" integrity="sha384-3ZnBvBjQK3jnWnaKuTnduWUui4PMu48b/r8+eQaT/YRL8603l36/rp39+fEBSHYy" crossorigin="anonymous"></script>
```

The script also sets the variable `window_ethereum_info` to either `"ethvault"` or `"injected"` to reflect how `window.ethereum` was set.

# Intention

**Adding this script should ensure your Dapp can use window.ethereum regardless of the browser.**

# Typical Scenarios

- **Page accessed via Brave or in a browser with MetaMask**: window.ethereum will not be changed, ethvault poly-fill will not be loaded
- **Page accessed via browser without MetaMask**: will redirect to myethvault.com/browse# + currentURL. And then the next scenario should apply
- **Page is in an iframe and query string contains ethvault=1**: [ethvault poly-fill](https://github.com/ethvault/iframe-provider-polyfill) will be loaded and will replace window.ethereum
    - This will still take place even in Brave or with MetaMask so that using the Dapp within MyEthVault.com uses the MyEthVault wallet on all browsers. With Brave or MetaMask if the page is not loaded within MyEthVault then the MetaMask or Brave wallet will work, as per the first scenario.

# Requirements
- In order to be compatible with myEthVault, see https://github.com/ethvault/integration-guide. GitHub pages and GitLab pages sites are compatible by default.
- If you choose to copy and paste the javascript source into your page instead of linking to it, be aware that:
  - This use of document.write means that the ethvault's script will get loaded synchronously AFTER the closing script tag of the block. So, do not try to use the ethvault provided window.ethereum until the next script block. This is not an issue if you link to this script.
