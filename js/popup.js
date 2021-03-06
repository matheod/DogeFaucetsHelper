FAUCETS = {
	'cryptotide.com':
	{
		url:'http://www.cryptotide.com/faucet.php?coin=DOGE',
		matchUrl:'^http://(?:www\.)?cryptotide\.com/faucet\.php',
		refillTime:
		{
			hours:24,
			minutes:0
		},
		enableDonation:true,
		quickAccess:'cryptotide',
		input:'#wallet',
		successUrl:'!ajax',
		successMessage:'You\'ve been queued to receive:'
	},
	'cryptospout.com':
	{
		url:'http://cryptospout.com/faucet.php?coin=DOGE',
		matchUrl:'^http://(?:www\.)?cryptospout\.com/faucet\.php',
		refillTime:
		{
			hours:24,
			minutes:0
		},
		enableDonation:true,
		quickAccess:'cryptospout',
		input:'#wallet',
		successUrl:'!ajax',
		successMessage:'You\'ve been queued to receive:'
	},
	'cyanrainbow.com':
	{
		url:'http://www.cyanrainbow.com',
		matchUrl:'^http://(?:www\.)?cyanrainbow\.com/(?:index\.php)?$',
		refillTime:
		{
			hours:9,
			minutes:0
		},
		enableDonation:false,
		quickAccess:'cyanrainbow',
		input:'input[name=address]',
		successUrl:'^http://(?:www\.)?cyanrainbow\.com/faucet$',
		successMessage:'Congrats! You have claimed'
	},
	'dogedroppings.com':
	{
		url:'http://dogedroppings.com/',
		matchUrl:'^http://dogedroppings\.com/(?:index\.php)?$',
		refillTime:
		{
			hours:24,
			minutes:0
		},
		enableDonation:true,
		quickAccess:'dogedroppings',
		input:'input[name=dogecoin_address]',
		successUrl:'^http://dogedroppings\.com/(?:index\.php)?$',
		successMessage:'Success! You have been awarded'
	},
	'dogefaucet.com':
	{
		url:'http://www.dogefaucet.com/',
		matchUrl:'^http://www\.dogefaucet\.com/(?:index\.php)?$',
		refillTime:
		{
			hours:12,
			minutes:0
		},
		enableDonation:true,
		quickAccess:'dogefaucet',
		input:'#inputDoge',
		successUrl:'^http://www\.dogefaucet\.com/what-now$',
		successMessage:'Wow, much fun !'
	},
	/*'freec0ins.com':
	{
		url:'http://freec0ins.com/',
		matchUrl:'^http://(?:www\.)?freec0ins\.com/(?:index\.php)?$',
		refillTime:
		{
			hours:12, /////////
			minutes:0
		},
		enableDonation:true, ////////////
		quickAccess:'freec0ins',
		input:'input[name=address]',
		successUrl:'^http://(?:www\.)?freec0ins\.com/index\.php\?next$',
		successMessage:'Wow, much fun !' /////////////////////
	},*/
	/*'freedoge.we-mine.it':
	{
		url:'http://freedoge.we-mine.it/',
		matchUrl:'^http://freedoge\.we-mine\.it/(?:index\.php)?$',
		refillTime:
		{
			hours:12, ///////////
			minutes:0
		},
		enableDonation:true, ///////////
		quickAccess:'wemineit',
		input:'input[name=address]',
		successUrl:'^http://www\.dogefaucet\.com/what-now$', ///////////
		successMessage:'Wow, much fun !' ///////////
	},*/
	'freefaucet.com.ar':
	{
		url:'http://doge.freefaucet.com.ar/',
		matchUrl:'^http://freefaucet\.com\.ar/(?:index\.php)?$',
		refillTime:
		{
			hours:24,
			minutes:0
		},
		enableDonation:true,
		quickAccess:'freefaucet',
		input:'#wallet-address',
		successUrl:'^http://freefaucet\.com\.ar/(?:index\.php)?$',
		successMessage:'You were added to the payroll list'
	},
	'indogewetrust.com':
	{
		url:'http://indogewetrust.com/',
		matchUrl:'^http://(?:www\.)?indogewetrust\.com/(?:index\.php)?$',
		refillTime:
		{
			hours:24, // not sure
			minutes:0
		},
		enableDonation:true,
		quickAccess:'indogewetrust',
		input:'#receive_address',
		successUrl:'^http://(?:www\.)?indogewetrust\.com/$',
		successMessage:'You have won'
	},
	'rickyfaucet.tk':
	{
		url:'http://rickyfaucet.tk/',
		matchUrl:'^http://(?:www\.)?rickyfaucet\.tk/(?:index\.php)?$',
		refillTime:
		{
			hours:24,
			minutes:0
		},
		enableDonation:true,
		quickAccess:'rickyfaucet',
		input:'input[name=address]',
		successUrl:'^http://(?:www\.)?rickyfaucet\.tk/(?:index\.php)?$',
		successMessage:'Succesfully requested more doge.'
	},
	'thebitcoinmaster.com':
	{
		url:'http://www.thebitcoinmaster.com/dogecoin/',
		matchUrl:'^http://www\.thebitcoinmaster\.com/dogecoin/(?:index\.php)?$',
		refillTime:
		{
			hours:0,
			minutes:1
		},
		enableDonation:false,
		quickAccess:'thebitcoinmaster',
		input:'#formulario input[name=address]',
		successUrl:'^http://www\.thebitcoinmaster\.com/dogecoin/check\.php$',
		successMessage:'Woof! Wow! Doge has sent you'
	},
	'wow.bitcoinproject.net':
	{
		url:'http://wow.bitcoinproject.net',
		matchUrl:'^http://wow\.bitcoinproject\.net/(?:index\.php)?$',
		refillTime:
		{
			hours:1,
			minutes:0
		},
		enableDonation:true,
		quickAccess:'wowbitcoinproject',
		input:'input[name=dogecoin_address]',
		successUrl:'^http://wow\.bitcoinproject\.net/(?:index\.php)?$',
		successMessage:'Success! You have been awarded'
	}
}

COLOR = {
	unread:[255, 0, 255, 255],
	read:[255, 255, 0, 150],
	wait:[255, 0, 0, 1]
}

chrome.browserAction.getBadgeBackgroundColor({}, function(color){
	if(color = COLOR.unread)
	{
		chrome.browserAction.setBadgeBackgroundColor({color:COLOR.read});
	}
});


document.addEventListener('DOMContentLoaded', function () {
	var faucetsList = '<option>So many choices</option>';
	for(faucet in FAUCETS)
	{
		faucetsList += '<option>'+faucet+'</option>';
	}
	document.getElementsByClassName('defaultFaucetsList')[0].innerHTML = faucetsList;
	document.getElementsByClassName('defaultFaucetsList')[0].addEventListener('change', function () {
		var form = document.getElementsByClassName('manageFaucet')[0];
		form.faucetUrl.value = FAUCETS[this.value].url;
		form.faucetMatchUrl.value = FAUCETS[this.value].matchUrl;
		form.faucetRefillTimeHours.value = FAUCETS[this.value].refillTime.hours;
		form.faucetRefillTimeMinuts.value = FAUCETS[this.value].refillTime.minutes;
		form.faucetEnableDonation.checked = FAUCETS[this.value].enableDonation;
		form.faucetQuickAccess.value = FAUCETS[this.value].quickAccess;
		form.faucetInput.value = FAUCETS[this.value].input;
		form.faucetSuccessUrl.value = FAUCETS[this.value].successUrl;
		form.faucetSuccessMessage.value = FAUCETS[this.value].successMessage;
	});
	document.getElementsByClassName('manageFaucet')[0].addEventListener('submit', function (e) {
		chrome.storage.sync.get('faucets', function(data){
			if(!data.faucets)
			{
				data.faucets = new Array();
			}
			var form = document.getElementsByClassName('manageFaucet')[0];
			var error = false;
			if(form.faucetWallet.value.length!=34 || form.faucetWallet.value[0]!="D")
			{
				error = true;
				form.faucetWallet.style.background = 'yellow';
				setTimeout(function(){form.faucetWallet.style.background = 'white';},1000);
			}
			if(form.faucetUrl.value=="")
			{
				error = true;
				form.faucetUrl.style.background = 'yellow';
				setTimeout(function(){form.faucetUrl.style.background = 'white';},1000);
			}
			if(isNaN(form.faucetRefillTimeHours.value) || isNaN(form.faucetRefillTimeMinuts.value))
			{
				error = true;
				form.faucetRefillTimeHours.style.background = 'yellow';
				form.faucetRefillTimeMinuts.style.background = 'yellow';
				setTimeout(function(){form.faucetRefillTimeHours.style.background = 'white';form.faucetRefillTimeMinuts.style.background = 'white';},1000);
			}
			if(form.faucetSuccessUrl.value=="")
			{
				error = true;
				form.faucetSuccessUrl.style.background = 'yellow';
				setTimeout(function(){form.faucetSuccessUrl.style.background = 'white';},1000);
			}
			if(!error)
			{
				if(getComputedStyle(form.getElementsByClassName('edit')[0]).display=='none')
				{
					data.faucets.push({
						wallet:			form.faucetWallet.value,
						last:			new Date().getTime(),
						next:			new Date().getTime()+form.faucetRefillTimeHours.value*3600000+form.faucetRefillTimeMinuts.value*60000,
						enabled:		true,
						uses:			0,
						url:			form.faucetUrl.value,
						matchUrl:		form.faucetMatchUrl.value,
						refillTime:
						{
							hours:		form.faucetRefillTimeHours.value,
							minutes:		form.faucetRefillTimeMinuts.value
						},
						enableDonation:	form.faucetEnableDonation.value,
						quickAccess:	form.faucetQuickAccess.value,
						input:		form.faucetInput.value,
						successUrl:		form.faucetSuccessUrl.value,
						successMessage:	form.faucetSuccessMessage.value
					});
				}
				else
				{	
					var id = form.faucetEdit.value;
					data.faucets[id].wallet = form.faucetWallet.value;
					data.faucets[id].next = data.faucets[id].last+form.faucetRefillTimeHours.value*3600000+form.faucetRefillTimeMinuts.value*60000;
					data.faucets[id].enabled = !form.faucetDisable.checked;
					data.faucets[id].url = form.faucetUrl.value;
					data.faucets[id].matchUrl = form.faucetMatchUrl.value;
					data.faucets[id].refillTime.hours = form.faucetRefillTimeHours.value;
					data.faucets[id].refillTime.minutes = form.faucetRefillTimeMinuts.value;
					data.faucets[id].enableDonation = form.faucetEnableDonation.value;
					data.faucets[id].quickAccess = form.faucetQuickAccess.value;
					data.faucets[id].input = form.faucetInput.value;
					data.faucets[id].successUrl = form.faucetSuccessUrl.value;
					data.faucets[id].successMessage = form.faucetSuccessMessage.value;
				}
				chrome.storage.sync.set({faucets:data.faucets},function(){
					location.reload();
				});
			}
		});
		e.preventDefault();
	});
	
	document.querySelector('.manageFaucet input[name=faucetDelete]').addEventListener('click', function () {
		if(confirm('Are you sure you want to delete this faucet ?'))
		{
			chrome.storage.sync.get('faucets', function(data){
				if(!data.faucets)
				{
					data.faucets = new Array();
				}
				var form = document.getElementsByClassName('manageFaucet')[0];
				var id = form.faucetEdit.value;
				data.faucets.splice(id,1);
				chrome.storage.sync.set({faucets:data.faucets},function(){
					location.reload();
				});
			});
		}
	});
	
	var menu = document.getElementsByClassName('menu')[0];
	menu.getElementsByClassName('faucet')[0].addEventListener('click', function () {
		if(getComputedStyle(document.getElementsByClassName('manageFaucet')[0]).display=='none')
		{
			var form = document.getElementsByClassName('manageFaucet')[0];
			form.getElementsByClassName('edit')[0].style.display = 'none';
			form.style.display = 'block';
			document.getElementsByClassName('faucetsTimers')[0].style.display = 'none';
			document.getElementsByClassName('faucetsStats')[0].style.display = 'none';
			form.faucetEdit.value = -1;
			form.defaultFaucetsList.selectedIndex = 0;
			form.faucetWallet.value = '';
			form.faucetDisable.checked = false;
			form.faucetUrl.value = '';
			form.faucetMatchUrl.value = '';
			form.faucetRefillTimeHours.value = '';
			form.faucetRefillTimeMinuts.value = '';
			form.faucetEnableDonation.value = false;
			form.faucetQuickAccess.value = '';
			form.faucetInput.value = '';
			form.faucetSuccessUrl.value = '';
			form.faucetSuccessMessage.value = '';
		}
		else
		{
			document.getElementsByClassName('manageFaucet')[0].style.display = 'none';
			document.getElementsByClassName('faucetsTimers')[0].style.display = 'table';
		}
	});
	menu.getElementsByClassName('stats')[0].addEventListener('click', function () {
		if(getComputedStyle(document.getElementsByClassName('faucetsStats')[0]).display=='none')
		{
			document.getElementsByClassName('faucetsStats')[0].style.display = 'table';
			document.getElementsByClassName('manageFaucet')[0].style.display = 'none';
			document.getElementsByClassName('faucetsTimers')[0].style.display = 'none';
			showStats();
		}
		else
		{
			document.getElementsByClassName('faucetsStats')[0].style.display = 'none';
			document.getElementsByClassName('faucetsTimers')[0].style.display = 'table';
		}
	});
	
	
	chrome.storage.sync.get('faucets', function(data){
		if(!data.faucets)
		{
			chrome.storage.sync.set({faucets:new Array()});
			data.faucets = new Array();
		}
		data.faucets.sort(sortFaucetsByTime);
		var faucetsTimers = "";
		for(var i = 0;i<data.faucets.length;i++)
		{
			if(data.faucets[i].enabled)
			{
				faucetsTimers += 	'<tr>	<td class="url"><a href="'+data.faucets[i].url+'" target="_blank">'+data.faucets[i].url+'</a></td>			'+
									'		<td class="time" data-time="'+data.faucets[i].next+'"></td>													'+
									'		<td class="edit" data-id="'+i+'"></td>	</tr>';
			}
		}
		document.getElementsByClassName('faucetsTimers')[0].innerHTML = faucetsTimers;
		updateTimers();
		setInterval(updateTimers,1000);
		
		var editButtons = document.getElementsByClassName('faucetsTimers')[0].getElementsByClassName('edit');
		for(var i = 0;i<editButtons.length;i++)
		{
			editButtons[i].addEventListener('click', editFaucet);
		}
	});
});

function updateTimers()
{
	var faucetsTimers = document.getElementsByClassName('faucetsTimers')[0].getElementsByClassName('time');
	for(var i = 0;i<faucetsTimers.length;i++)
	{
		var timer = faucetsTimers[i].getAttribute('data-time')-new Date().getTime();
		if(timer>=0)
		{
			faucetsTimers[i].innerHTML = parseTime(timer);
		}
		else
		{
			faucetsTimers[i].innerHTML = "-"+parseTime(-timer);
			faucetsTimers[i].className  = "time late";
		}
	}
}

function editFaucet()
{
	var id = this.getAttribute('data-id');
	chrome.storage.sync.get('faucets', function(data){
		if(!data.faucets)
		{
			chrome.storage.sync.set({faucets:new Array()});
			data.faucets = new Array();
		}
		var form = document.getElementsByClassName('manageFaucet')[0];
		form.style.display = 'block';
		document.getElementsByClassName('faucetsTimers')[0].style.display = 'none';
		document.getElementsByClassName('faucetsStats')[0].style.display = 'none';
		form.getElementsByClassName('edit')[0].style.display = 'inline';
		form.faucetEdit.value = id;
		form.faucetWallet.value = data.faucets[id].wallet;
		form.faucetDisable.checked = !data.faucets[id].enabled;
		form.faucetUrl.value = data.faucets[id].url;
		form.faucetMatchUrl.value = data.faucets[id].matchUrl;
		form.faucetRefillTimeHours.value = data.faucets[id].refillTime.hours;
		form.faucetRefillTimeMinuts.value = data.faucets[id].refillTime.minutes;
		form.faucetEnableDonation.value = data.faucets[id].enableDonation;
		form.faucetQuickAccess.value = data.faucets[id].quickAccess;
		form.faucetInput.value = data.faucets[id].input;
		form.faucetSuccessUrl.value = data.faucets[id].successUrl;
		form.faucetSuccessMessage.value = data.faucets[id].successMessage;
	});
}

function showStats()
{
	if(document.getElementsByClassName('faucetsStats')[0].innerHTML=="")
	{
		chrome.storage.sync.get('faucets', function(data){
			if(!data.faucets)
			{
				chrome.storage.sync.set({faucets:new Array()});
				data.faucets = new Array();
			}
			data.faucets.sort(sortFaucetsByUses);
			if(data.faucets.length==0)
			{
				var faucetsStats = "<tr><td>No faucets added !</td></tr>";
			}
			else
			{
				var faucetsStats = "";
				for(var i = 0;i<data.faucets.length;i++)
				{
					var xhr = new XMLHttpRequest();
					xhr.open("GET", "http://dogechain.info/chain/Dogecoin/q/getreceivedbyaddress/"+data.faucets[i].wallet, true);
					xhr.onreadystatechange = (function(i,uses){return function() {
					  if (this.readyState == 4) {
						if(this.responseText == "" || isNaN(this.responseText))
						{
							document.getElementsByClassName("stats-total-"+i)[0].innerText = 'ERROR ('+this.responseText+')';
							document.getElementsByClassName("stats-average-"+i)[0].innerText = 'ERROR ('+this.responseText+')';
						}
						else
						{
							document.getElementsByClassName("stats-total-"+i)[0].innerText = this.responseText+'Ð';
							if(uses>0)
							{
								document.getElementsByClassName("stats-average-"+i)[0].innerText = (this.responseText/uses).toFixed(8)+'Ð';
							}
							else
							{
								document.getElementsByClassName("stats-average-"+i)[0].innerText = '0Ð';
							}
						}
					  }
					}})(i,data.faucets[i].uses);
					xhr.send();
					faucetsStats += 		'<tr>	<td class="url"><a href="'+data.faucets[i].url+'" target="_blank">'+data.faucets[i].url+'</a></td>			'+
											'		'+(data.faucets[i].enabled?'<td>':'<td class="disabled">disabled')+'</td>									'+
											'		<td class="edit" data-id="'+i+'"></td>	</tr>																'+
											'<tr><td colspan="3"><b>Total :</b> <code class="stats-total-'+i+'"></code></td>	</tr>'+
											'<tr><td colspan="3"><b>Average :</b> <code class="stats-average-'+i+'"></code></td>	</tr>'+
											'<tr class="bottom"><td colspan="3"><b>Uses :</b> <code>'+data.faucets[i].uses+'</code></td>	</tr>';
				}
			}
			document.getElementsByClassName('faucetsStats')[0].innerHTML = faucetsStats;
			
			var editButtons = document.getElementsByClassName('faucetsStats')[0].getElementsByClassName('edit');
			for(var i = 0;i<editButtons.length;i++)
			{
				editButtons[i].addEventListener('click', editFaucet);
			}
		});
	}
}

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
		if(hours<10){hours = "0"+hours;}
		var minutes = ms%60;
		if(minutes<10){minutes = "0"+minutes;}
		return hours+':'+minutes;
	}
}

function sortFaucetsByTime(a,b)
{
    if (a.next > b.next)
      return 1;
    if (a.next < b.next)
      return -1;
    return 0;
}
function sortFaucetsByUses(a,b)
{
    if (a.uses > b.uses)
      return -1;
    if (a.uses < b.uses)
      return 1;
    return 0;
}
