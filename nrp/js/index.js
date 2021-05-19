window.addEventListener('load',preload)

async function preload(){
    document.head.insertAdjacentHTML("beforeend",`<link rel="stylesheet" href="https://firebasestorage.googleapis.com/v0/b/norobotplay.appspot.com/o/css%2FNoRobot.css?alt=media&token=9b90fb1c-e1df-4065-9e02-dfb28ed334eb">`)
    var iButton = new Image("auto","30px")
    var iName = new Image("auto","30px")
    let box = createElement('div')
    let button = createElement("button")
    let content = createElement('div')
    let contentButton = createElement('div')
    let contentP = createElement('p')
    let inputHidden = createElement('input')


    iButton.src="https://firebasestorage.googleapis.com/v0/b/norobotplay.appspot.com/o/svg%2Fspinner.svg?alt=media&token=466b6517-8cce-42e1-8add-1e1b9742b86b" 
    iName.src="https://firebasestorage.googleapis.com/v0/b/norobotplay.appspot.com/o/svg%2Fname.svg?alt=media&token=34b389d2-fa47-420a-9e69-d47eca9bbcc9"
    iButton.setAttribute("id","nrpi")
    
    button.setAttribute("id","nrpvv")
    button.setAttribute("type","button")
    button.setAttribute("onclick","nrp_cv()")
    button.setAttribute("disabled","")
    contentButton.setAttribute("id","nrpvt")
    contentP.innerHTML(`<a href="">Terms</a> | <a href="">Privacity</a>`)
    content.appendChild(iName)
    content.appendChild(contentP)
    button.appendChild(iButton)
    button.appendChild(contentButton)
    box.appendChild(button)
    box.appendChild(content)
    box.appendChild(inputHidden)
    document.getElementById('nrp').appendChild(box)
    // document.getElementById('nrp').innerHTML=`
    //                     <button type="button" id="nrpvv" onclick="nrp_cv()" disabled>
    //                         <img src="https://firebasestorage.googleapis.com/v0/b/norobotplay.appspot.com/o/svg%2Fspinner.svg?alt=media&token=466b6517-8cce-42e1-8add-1e1b9742b86b" height="30px" id="nrpi">
    //                         <div id="nrpvt" >
    //                             Esperando..
    //                         </div>
    //                     </button>
    //                     <div>
    //                         <img src="https://firebasestorage.googleapis.com/v0/b/norobotplay.appspot.com/o/svg%2Fname.svg?alt=media&token=34b389d2-fa47-420a-9e69-d47eca9bbcc9" height="30px"/>
    //                         <p><a href="">Terms</a> | <a href="">Privacity</a></p>
    //                     </div>
    //                     <input type="hidden" value="false" id="nrpvrf" name="nrpvrf">
    //                     `
    document.getElementById('nrpi').style.animation = "rotate 2s infinite linear"
    await fetch('https://norobotplay-default-rtdb.firebaseio.com/llavesPermitidas.json')
	.then((response)=>response.json())
	.then((data)=>{
		let isConnected = false
		for(let i = 1; i <= data['contador']; i++){
			if(document.getElementById('nrp').getAttribute("nrp-key") == data[i]){
				document.getElementById('nrpi').src="https://firebasestorage.googleapis.com/v0/b/norobotplay.appspot.com/o/svg%2Fnocheck-icon.svg?alt=media&token=2f47961f-159c-49cf-aac9-049cfcf02213"
				document.getElementById('nrpi').style.animation = "none"
				document.getElementById('nrpvt').innerHTML='Verificar<br/>No soy un robot'
				document.getElementById('nrpvv').removeAttribute('disabled')
				isConnected = true
			}
		}
		if(isConnected == false){
			document.getElementById('nrpi').setAttribute('src','https://firebasestorage.googleapis.com/v0/b/norobotplay.appspot.com/o/svg%2Ferror-check-icon.svg?alt=media&token=27c77c92-811e-4690-bd76-c10e79dd9337')
			document.getElementById('nrpvt').innerHTML='Llave NRP<br/>No registrada'
			document.getElementById('nrpi').style.animation = "none"
            return;
		}
	})
	.catch((err) => console.log(err))
    var datos
    var valorSeleccionado = [0,0,0]
    var bName
    var nrprst
}





async function nrp_cv(){
	document.getElementById('nrpi').setAttribute('src','https://firebasestorage.googleapis.com/v0/b/norobotplay.appspot.com/o/svg%2Fspinner.svg?alt=media&token=466b6517-8cce-42e1-8add-1e1b9742b86b')
	document.getElementById('nrpi').style.animation = "rotate 2s infinite linear"
	document.getElementById('nrpvt').innerHTML = 'Esperando..'


	

	await fetch('https://norobotplay-default-rtdb.firebaseio.com/tipos/OrderBy.json')
		.then((response)=>response.json())
		.then((data) => {
			datos=data

			let bNum = Math.floor(Math.random() * data['count'])+1

			if(bNum < 10){
				bName = 'ord0'+bNum
			}else{
				bName = 'ord'+bNum
			}
		})
		.catch((err) => {
			document.getElementById('nrpi').setAttribute('src','https://firebasestorage.googleapis.com/v0/b/norobotplay.appspot.com/o/svg%2Ferror-check-icon.svg?alt=media&token=27c77c92-811e-4690-bd76-c10e79dd9337')
			document.getElementById('nrpi').style.animation = "none"
      		document.getElementById('nrpvt').innerHTML = 'Error de conexion'
      		console.log(err)
      		return null
    	})

    let valoresUsados = [0,0,0,0]
	let posiciones = ['0px 0px','125px 0px','0 125px','125px 125px']
	let count = datos['count']

	if(document.getElementById('nrpsb') == null){
		let shadow_box = document.createElement("div")
		shadow_box.setAttribute('id','nrpsb')
		shadow_box.innerHTML= `
			<div id="nrpm">
    	 		<h4>Ordena la imagen</h4>
    	 		<div id="nrpc">
    				<div class="nrpslt" id="nrpc0" onclick="nrp_cnc('nrpc0')"></div>
    				<div class="nrpslt" id="nrpc1" onclick="nrp_cnc('nrpc1')"></div>
    				<div class="nrpslt" id="nrpc2" onclick="nrp_cnc('nrpc2')"></div>
    				<div class="nrpslt" id="nrpc3" onclick="nrp_cnc('nrpc3')"></div>	
   		 		</div>
   		 		<div>
   		 			<a href="${datos[bName]['link']}" id="nrplnk">Visitar: ${datos[bName]['link']} <img src="https://firebasestorage.googleapis.com/v0/b/norobotplay.appspot.com/o/svg%2Fexternal-link-alt.svg?alt=media&token=70142e5d-1001-49e9-bd99-cd4fb5bc477b" height="8px"></a>
   		 		</div>
   		 		<div id="nrpcb">
    	 			<button type="button" id="nrpbv" onclick="nrp_sv()">Verificar</button>
    	 		</div>

      		</div>`
		document.body.appendChild(shadow_box)
	}

	for (var i = 0; i < 4; i++) {
		let valor
		let isValorUsado
		let nombreElemento = 'nrpc'+i
		let nombreValue
		let elemento = document.getElementById(nombreElemento)
		let nam

		do{
			valor = Math.floor(Math.random() * 4 ) + 1
			   isValorUsado = valoresUsados[0] == valor || valoresUsados[1] == valor || valoresUsados[2] == valor || valoresUsados[3] == valor
		}while(isValorUsado)

		valoresUsados[i] = valor
		nombreValue = 'value0'+valor

		elemento.setAttribute('dnrp-value',datos[bName][nombreValue])
		elemento.style.backgroundImage = "url('"+datos[bName]['banner']+"')"
		elemento.style.backgroundPosition = posiciones[valor-1]
		elemento.style.backgroundSize = "250px 250px"
	}

	
}


function nrp_cnc(id) {
	if(this.valorSeleccionado[0] == '' && this.valorSeleccionado[1] == '' && this.valorSeleccionado[2] == ''){
		this.valorSeleccionado[0] = id
		this.valorSeleccionado[1] = document.getElementById(id).style.backgroundPosition
		this.valorSeleccionado[2] = document.getElementById(id).getAttribute('dnrp-value')
		document.getElementById(id).style.boxShadow = "125px 125px 1px rgba(0,0,255,0.3) inset"
	}else{
		//Passos para pasar el valor de el segundo click al primer click
		document.getElementById(this.valorSeleccionado[0]).style.backgroundPosition = document.getElementById(id).style.backgroundPosition
		document.getElementById(this.valorSeleccionado[0]).setAttribute('dnrp-value', document.getElementById(id).getAttribute('dnrp-value'))
		//Pasos para pasar el valor del primer click al segundo click
		document.getElementById(id).style.backgroundPosition = this.valorSeleccionado[1]
		document.getElementById(id).setAttribute('dnrp-value', this.valorSeleccionado[2])
		//Devolver tamaÃ±o de primer click
		document.getElementById(this.valorSeleccionado[0]).style.boxShadow = "0px 0px 0px blue inset"
		//Limpiar valores utilizados
		this.valorSeleccionado[0] = ''
		this.valorSeleccionado[1] = ''
		this.valorSeleccionado[2] = ''
	}
}

function nrp_sv(){
	let send_result = document.getElementById('nrpc0').getAttribute('dnrp-value') + document.getElementById('nrpc1').getAttribute('dnrp-value') +document.getElementById('nrpc2').getAttribute('dnrp-value') +document.getElementById('nrpc3').getAttribute('dnrp-value') 
	isVerify = send_result == datos[bName]['result']
	if(isVerify){
		document.getElementById('nrpi').setAttribute('src','https://firebasestorage.googleapis.com/v0/b/norobotplay.appspot.com/o/svg%2Fcheck-icon.svg?alt=media&token=0ccc04ae-2310-41c3-9e70-643eeb578c74')
		document.getElementById('nrpi').style.animation = "none"
		document.getElementById('nrpvv').setAttribute('disabled','')
		document.getElementById('nrpvt').innerHTML = "Verificado Correctamente"
        document.getElementById('nrpvrf').setAttribute("value","true")
	}else{
		document.getElementById('nrpi').setAttribute('src','https://firebasestorage.googleapis.com/v0/b/norobotplay.appspot.com/o/svg%2Ferror-check-icon.svg?alt=media&token=27c77c92-811e-4690-bd76-c10e79dd9337')
		document.getElementById('nrpi').style.animation = "none"
		document.getElementById('nrpvt').innerHTML = "Eres un robot?<br> Vuelve a intentar"

	}
	document.getElementById("nrpsb").remove()
	datos = ''
	valorSeleccionado = [0,0,0]
	bName = ''
}