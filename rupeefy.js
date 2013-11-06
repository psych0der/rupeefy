chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
   /* stripping first line form html response*/
   var doc = request.data.replace("\n","");
   var result =  html = $.parseHTML(doc);

   /* capturing value from google calculator */
   var str =  result[9].childNodes[1].childNodes[9].innerHTML;
   
   /* fetching float value from response */
   str = str.substring(str.indexOf('>')+1);
   str = str.substring(0,str.indexOf(' '));
   var scale = parseFloat(str);
   
   
   /* regex for capturing dollar amount from tags */
   var regex = new RegExp("(\\$)((?:</?[a-z\\s=\"]*?>)+)*(\\d+)((?:</?[a-z\\s=\"]*?>)+)*\.?((?:</?[a-z\s=\"]*?>)+)*(\\d+)*","g");
   document.body.innerHTML = document.body.innerHTML.replace(regex,function(match,p1,p2,p3,p4,p5,p6,offset, string){
   	
   
   	var whole = parseInt(p3);
   	whole*= scale;

   	var num = p3+'.'+p6;
   	num = parseFloat(num);
   	num *=scale;

   	var whole = parseInt(num);

   	dec = num - whole;
   	dec= parseInt(dec*100);

   	/* fallbacks for unavailability of elements */
   	if(!p2)
   		p2 = "";

   	if(!p4)
   		p4 = "";

   	if(!p5)
   		p5 = "";

   	  	return 'Rs.'+p2+String(whole)+p4+'.'+p5+String(dec);
   });
 
  });


