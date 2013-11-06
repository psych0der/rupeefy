/* onclick listener */

chrome.browserAction.onClicked.addListener(function(tab){

/* using google calculator for currency conversion : should be free for long time ; ! subject to change */

$.ajax('https://www.google.com/finance/converter?a=1&from=USD&to=INR').done(function(data){       	
           chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  			chrome.tabs.sendMessage(tabs[0].id, {data: data});
			}); 
        }
    );
});