let params = new URLSearchParams(location.search);

if(params.get('nrpvrf') != null){
	if(params.get('nrpvrf') === "true"){
		alert("Verificación exitosa")
	}else{
		alert("Verificación erronea")
	}	
}