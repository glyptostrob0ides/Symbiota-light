$('html').hide();
$(document).ready(function() {
	$('html').show();
});

$(document).ready(function() {
	$('#tabs').tabs({ 
		active: tabIndex,
		beforeLoad: function( event, ui ) {
			$(ui.panel).html("<p>Loading...</p>");
		}
	});
});

function openMappingAid() {
	mapWindow=open("../tools/mappointaid.php?formname=editclmatadata&latname=ecllatcentroid&longname=ecllongcentroid","mapaid","resizable=0,width=800,height=700,left=20,top=20");
    if(mapWindow.opener == null) mapWindow.opener = self;
}

function openPointAid(latDef,lngDef) {
	var tid = document.pointaddform.pointtid.value;
	pointWindow=open("mappointaid.php?latcenter="+latDef+"&lngcenter="+lngDef+"&tid="+tid,"pointaid","resizable=0,width=800,height=700,left=20,top=20");
    if(pointWindow.opener == null) pointWindow.opener = self;
}

function validateMetadataForm(f){ 
	if(f.ecllatcentroid.value == "" && f.ecllongcentroid.value == ""){
		return true;
	}
	if(f.ecllatcentroid.value == ""){
		alert("If longitude has a value, latitude must also have a value");
		return false;
	} 
	if(f.ecllongcentroid.value == ""){
		alert("If latitude has a value, longitude must also have a value");
		return false;
	} 
	if(!isNumeric(f.ecllatcentroid.value)){
		alert("Latitude must be strictly numeric (decimal format: e.g. 34.2343)");
		return false;
	}
	if(Math.abs(f.ecllatcentroid.value) > 90){
		alert("Latitude values can not be greater than 90 or less than -90.");
		return false;
	} 
	if(!isNumeric(f.ecllongcentroid.value)){
		alert("Longitude must be strictly numeric (decimal format: e.g. -112.2343)");
		return false;
	}
	if(Math.abs(f.ecllongcentroid.value) > 180){
		alert("Longitude values can not be greater than 180 or less than -180.");
		return false;
	}
	if(f.ecllongcentroid.value > 1){
		alert("Is this checklist in the western hemisphere?\nIf so, decimal longitude should be a negative value (e.g. -112.2343)");
	} 
	if(!isNumeric(f.eclpointradiusmeters.value)){
		alert("Point radius must be a numeric value only");
		return false;
	}
	return true;
}

function togglePoint(f){
	var objDiv = document.getElementById('pointlldiv');
	if(objDiv){
		if(f.pointtid.value == ""){
			objDiv.style.display = "none";
		}
		else{
			objDiv.style.display = "block";
		}
	}
}

function verifyPointAddForm(f){
	if(f.pointtid.value == ""){
		alert("Please select a taxon");
		return false;
	}
	if(f.pointlat.value == "" || f.pointlng.value == ""){
		alert("Please enter coordinates");
		return false;
	}
	return true;
}

function isNumeric(sText){
   	var ValidChars = "0123456789-.";
   	var IsNumber = true;
   	var Char;
 
   	for (var i = 0; i < sText.length && IsNumber == true; i++){ 
	   Char = sText.charAt(i); 
		if (ValidChars.indexOf(Char) == -1){
			IsNumber = false;
			break;
      	}
   	}
	return IsNumber;
}