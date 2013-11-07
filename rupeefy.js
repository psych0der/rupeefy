
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
   var regex = new RegExp("(\\$)((?:</?[a-z\\s=\"]*?>)+)*(?:(\\d+\\,?)+)((?:</?[a-z\\s=\"]*?>)+)*\.?((?:</?[a-z\s=\"]*?>)+)*(\\d+)*","g");

   
  
   
   /* converting dollar to rupee for div text nodes , forms, selects , table rows , list 
      Shuld cover maximum websites
   */

   var select = document.getElementsByTagName('select');
   for(var i =0; i < select.length ; i++)
   {
   		rupeefy(select[i]);
   }


   var tr = document.getElementsByTagName('tr');
   for(var i =0; i < tr.length ; i++)
   {
   		rupeefy(tr[i]);
   }

   var li = document.getElementsByTagName('li');
   for(var i =0; i < li.length ; i++)
   {
   		rupeefy(li[i]);
   }

   var sp = document.getElementsByTagName('span');
   for(var i =0; i < sp.length ; i++)
   {
   		rupeefy(sp[i]);
   }

   var div = document.getElementsByTagName('div');
   for(var i =0; i < div.length ; i++)
   {
   		if(div[i].childNodes.length==1 && div[i].childNodes[0].nodeType == 3)
   		{
   			rupeefy(div[i].childNodes[0],1);
   			
   		}
   }



   function rupeefy(element,textNode){

   	textNode = textNode || 0;

   	if(!textNode)
   	{	
	   	element.innerHTML = element.innerHTML.replace(regex,function(match,p1,p2,p3,p4,p5,p6,offset, string){
	   	
	      p3 = p3.replace(',','');
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

	   	  	return '₹'+p2+String(whole)+p4+'.'+p5+String(dec);
	   });

   }

   else{

   		element.textContent = element.textContent.replace(regex,function(match,p1,p2,p3,p4,p5,p6,offset, string){
	   	
	   
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

	   	  	return '₹'+p2+String(whole)+p4+'.'+p5+String(dec);
	   });


   }
 
}

});


