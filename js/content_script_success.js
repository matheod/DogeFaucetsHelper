if(typeof injectedSuccess == "undefined")
{
	injectedSuccess = true;
	chrome.storage.sync.get('faucets', function(data){
		if(!data.faucets)
		{
			chrome.storage.sync.set({faucets:new Array()});
			data.faucets = new Array();
		}

		if(typeof ajax == "undefined")
		{
			if(document.body.innerHTML.indexOf(data.faucets[faucet].successMessage)!==-1)
			{	
				onSuccess(data);
			}
		}
		else
		{
			checkSucces(data);
		}
	});
	function onSuccess(data)
	{
		var oldLink = document.head.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']");
		for(var i = 0;i<oldLink.length;i++)
		{
			oldLink[i].remove();
		}
		var link = document.createElement('link');
		link.rel = 'shortcut icon';
		link.href = chrome.runtime.getURL('images/coins.png');
		document.head.appendChild(link);
		chrome.storage.sync.get('faucets', function(data){ // get again in case of modification between success message
			if(!data.faucets)
			{
				chrome.storage.sync.set({faucets:new Array()});
				data.faucets = new Array();
			}
			data.faucets[faucet].uses++;
			data.faucets[faucet].last=new Date().getTime();
			data.faucets[faucet].next=new Date().getTime()+data.faucets[faucet].refillTime.hours*3600000+data.faucets[faucet].refillTime.minutes*60000;
			chrome.storage.sync.set({faucets:data.faucets});
		});
		
	}
	function checkSuccess(data)
	{
		if(document.body.innerHTML.indexOf(data.faucets[faucet].successMessage)!=-1)
		{
			onSuccess(data);
		}
		else
		{
			setTimeout(checkSuccess,1000,data);
		}
	}
}