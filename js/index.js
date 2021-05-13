var datos
var valorSeleccionado = [0,0,0]
var bName

var btnVerify = document.getElementById('NoRobotPlay')
btnVerify.insertAdjacentHTML("beforeend",`
		<img src="./circle.svg" alt="insertar SVG con la etiqueta image" height="24px" id="icon">
		<div class="btnTxt" >
			Verificar NoRobot
		</div>
		<div>
			<img src="./check-circle.svg" height="32px"/>
			<div>NRP</div>
			<p><a href="">Terms</a> | <a href="">Privacity</a></p>
		</div>
		<style>
			@import url('./css/NoRobot.css')
		</style>
	`)
btnVerify.setAttribute('style', "font-family: Arial; ")

function clicked_norobot(){
	document.getElementById('icon').setAttribute('src','./spinner.svg')
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
    	 		<button type="button" id="btnVerificar" onclick="send_verify()">Send</button>
      		</div>`)
		document.body.appendChild(shadow_box)
	}
	

	fetch('https://norobotplay-default-rtdb.firebaseio.com/tipos/OrderBy.json')
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
		document.getElementById('icon').setAttribute('src','./check-circle.svg')
		document.getElementById('icon').style.animation = "none"
	}else{
		alert('NoRobot no verificado, por favor vuelva a intentarlo')

		clicked_norobot()
	}
}

function out_dnrp(){
	document.getElementById('icon').setAttribute('src','./circle.svg')
	document.getElementById('icon').style.animation = "no"
	document.getElementById("shadow-box").remove()
}

document.getElementById('NoRobotPlay').addEventListener('click',clicked_norobot)
