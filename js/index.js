var datos
var valorSeleccionado = [0,0,0]
var bName
document.head.insertAdjacentHTML("beforeend",`<link rel="stylesheet" href="./css/NoRobot.css">`)

var btnVerify = document.getElementById('NoRobotPlay')
btnVerify.insertAdjacentHTML("beforeend",`
		<button type="button" id="NoRobotPlay-btn" onclick="clicked_norobot()">
			<img src="./assets/svg/nocheck-icon.svg" height="30px" id="icon">
			<div id="verifyText" >
				Verificar NoRobot
			</div>
		</button>
		<div>
			<img src="./assets/svg/name.svg" height="30px"/>
			<p><a href="">Terms</a> | <a href="">Privacity</a></p>
		</div>
	`)

async function clicked_norobot(){
	document.getElementById('icon').setAttribute('src','./assets/svg/spinner.svg')
	document.getElementById('icon').style.animation = "rotate 2s infinite linear"

	if(document.getElementById('shadow-box') == null){
		let shadow_box = document.createElement("div")
		shadow_box.setAttribute('id','shadow-box')
		shadow_box.insertAdjacentHTML("beforeend",`
			<div id="main-cajon">
    	 		<h4>Ordena la imagen</h4>
    	 		<div id="cajon">
    				<div class="seleccion" id="box0" onclick="clicked_number_change('box0')"></div>
    				<div class="seleccion" id="box1" onclick="clicked_number_change('box1')"></div>
    				<div class="seleccion" id="box2" onclick="clicked_number_change('box2')"></div>
    				<div class="seleccion" id="box3" onclick="clicked_number_change('box3')"></div>	
   		 		</div>
   		 		<div id="cajon-btn">
    	 			<button type="button" id="btnVerificar" onclick="send_verify()">Send</button>
    	 		</div>
      		</div>`)
		document.body.appendChild(shadow_box)
	}
	await fetch('https://norobotplay-default-rtdb.firebaseio.com/tipos/OrderBy.json')
		.then((response)=>response.json())
		.then((data) => {
			datos=data
			let valoresUsados = [0,0,0,0]
			let posiciones = ['0px 0px','125px 0px','0 125px','125px 125px']
			let count = data['count']
			let bNum = Math.floor(Math.random() * count)+1

			if(bNum < 10){
				bName = 'ord0'+bNum
			}else{
				bName = 'ord'+bNum
			}

			for (var i = 0; i < 4; i++) {
				let valor
				let isValorUsado
				let nombreElemento = 'box'+i
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
		})
		.catch((err) => {
      		console.log('error al solicitar datos')
      		console.log(err)
      		return null
    	})

	
}


function clicked_number_change(id) {
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
		//Devolver tamaño de primer click
		document.getElementById(this.valorSeleccionado[0]).style.boxShadow = "0px 0px 0px blue inset"
		//Limpiar valores utilizados
		this.valorSeleccionado[0] = ''
		this.valorSeleccionado[1] = ''
		this.valorSeleccionado[2] = ''
	}
}

function send_verify(){
	let send_result = document.getElementById('box0').getAttribute('dnrp-value') + document.getElementById('box1').getAttribute('dnrp-value') +document.getElementById('box2').getAttribute('dnrp-value') +document.getElementById('box3').getAttribute('dnrp-value') 
	isVerify = send_result == datos[bName]['result']
	if(isVerify){
		alert('NoRobot verificado')
		document.getElementById("shadow-box").remove()
		datos = ''
		valorSeleccionado = [0,0,0]
		bName = ''
		document.getElementById('icon').setAttribute('src','./assets/svg/check-icon.svg')
		document.getElementById('icon').style.animation = "none"
		document.getElementById('NoRobotPlay-btn').setAttribute('disabled',"true")
		document.getElementById('verifyText').innerHTML = "Verificado Correctamente"
	}else{
		alert('NoRobot no verificado, por favor vuelva a intentarlo')

		clicked_norobot()
	}
}

