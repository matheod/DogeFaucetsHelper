if(typeof injected == "undefined")
{
	injected = true;
	chrome.storage.sync.get('faucets', function(data){
		if(!data.faucets)
		{
			chrome.storage.sync.set({faucets:new Array()});
			data.faucets = new Array();
		}
		if(document.querySelector(data.faucets[faucet].input))
		{
			document.querySelector(data.faucets[faucet].input).value = data.faucets[faucet].wallet;
		}
	});
}