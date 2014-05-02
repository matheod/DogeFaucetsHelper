COLOR = {
	unread:[255, 0, 255, 255],
	read:[255, 255, 0, 150],
	wait:[255, 0, 0, 1]
}

var nextTimes;
var quickAccess;
var faucets;
var updateTimerTimeout;

chrome.storage.sync.get('faucets', function(data){

	setBadgeTimer(data);
	
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
		for(var i=0;i<faucets.length;i++)
		{
			if(new RegExp(faucets[i].matchUrl,'i').test(tab.url))
			{
				chrome.tabs.executeScript(tabId, {code:'var faucet='+i+';'});
				chrome.tabs.executeScript(tabId, {file: "js/content_script.js"});
				if(faucets[i].successUrl == "!ajax")
				{
					chrome.tabs.executeScript(tabId, {code:'var ajax=true;'});
					chrome.tabs.executeScript(tabId, {file: "js/content_script_success.js"});
				}
			}
			if(new RegExp(faucets[i].successUrl,'i').test(tab.url))
			{
				chrome.tabs.executeScript(tabId, {code:'var faucet='+i+';'});
				chrome.tabs.executeScript(tabId, {file: "js/content_script_success.js"});
			}
		}
	});
	
});

function setBadgeTimer(data)
{
	if(!data.faucets)
	{
		chrome.storage.sync.set({faucets:new Array()});
		data.faucets = new Array();
	}
	faucets = data.faucets;
	nextTimes = new Array();
	quickAccess = new Array();
	chrome.browserAction.setBadgeBackgroundColor({color:COLOR.wait});
	for(var i=0;i<data.faucets.length;i++)
	{
		if(data.faucets[i].enabled)
		{
			if(new Date().getTime()<data.faucets[i].next)
			{
				nextTimes.push(data.faucets[i].next);
			}
			else
			{
				chrome.browserAction.setBadgeBackgroundColor({color:COLOR.unread});
			}
			if(data.faucets[i].quickAccess)
			{
				quickAccess.push({url:data.faucets[i].url,quickAccess:data.faucets[i].quickAccess});
			}
		}
	}
	if(nextTimes.length>0);
	{
		nextTimes.sort();
		clearTimeout(updateTimerTimeout);
		updateTimer();
	}
}

function updateTimer()
{
	var timer = nextTimes[0]-new Date().getTime();
	if(timer>=1200000) // 2x one minut, because if timer = 1min and 1s updateTimer will only be triggered at 0min and 1s
	{
		updateTimerTimeout = setTimeout(updateTimer,60000);
		chrome.browserAction.setBadgeText({text:parseTime(timer)});
	}
	else if(timer>=0)
	{
		updateTimerTimeout = setTimeout(updateTimer,1000);
		chrome.browserAction.setBadgeText({text:parseTime(timer)});
	}
	else
	{
		chrome.browserAction.setBadgeBackgroundColor({color:COLOR.unread});
		nextTimes.shift();
		if(nextTimes.length>0)
		{
			updateTimer();
		}
		else
		{
			chrome.browserAction.setBadgeText({text:''});
		}
	}
}



/*

{
	wallet:'DXXXX',
	last:0,
	enabled:true,
	uses:0,
	url:'http://www.dogefaucet.com/',
	refillTime:
	{
		hours:12,
		minutes:0
	},
	enableDonation:true,
	quickAccess:'dogefaucet',
	successUrl:'http://www.dogefaucet.com/what-now',
	successMessage:'Wow, much fun !'
}

*/

// chrome.browserAction.setBadgeText({text:'3:23'});
// chrome.browserAction.setBadgeBackgroundColor({color:COLOR.wait})

chrome.omnibox.setDefaultSuggestion({description:"Write Quick Access keyword to open the faucet of your choice"});

chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
	for(var i = 0;i<quickAccess.length;i++)
	{
		if(quickAccess[i].quickAccess.toLowerCase().substr(0,text.length)==text.toLowerCase())
		{
			suggest({
				content:quickAccess[i].url,
				description:"<match>"+quickAccess[i].quickAccess.substr(0,text.length)+"</match>"+quickAccess[i].quickAccess.substr(text.length)+" - <url>"+quickAccess[i].url+"</url>"
			});
		}
	}
});

chrome.omnibox.onInputEntered.addListener(function(url) {
	if(url.substr(0,4).toLowerCase()=="http")
	{
		window.open(url);
	}
	else
	{
		for(var i = 0;i<quickAccess.length;i++)
		{
			if(quickAccess[i].quickAccess.toLowerCase()==url.toLowerCase())
			{
				window.open(quickAcces[i].url);
			}
		}
	}
});
  
chrome.storage.onChanged.addListener(function(changes,areaName){
	if(areaName=="sync" && changes.faucets)
	{
		var data = {};
		data.faucets = changes.faucets.newValue;
		setBadgeTimer(data);
	}
});

function parseTime(ms)
{	
	if(ms<60000)
	{
		var seconds = parseInt(ms/1000);
		if(seconds<10){seconds = "0"+seconds;}
		return seconds+"s";
	}
	else
	{
		ms = parseInt(ms/60000);
		var hours = parseInt(ms/60);
		var minutes = ms%60;
		if(hours<10)
		{
			if(minutes<10){minutes = "0"+minutes;}
			return hours+':'+minutes;
		}
		else
		{
			if(minutes>=30)
			{
				hours++;
			}
			return hours+"h";
		}
	}
}
