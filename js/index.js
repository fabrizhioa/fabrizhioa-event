var datos
var valorSeleccionado = [0,0]



function clicked_norobot(){
	if(document.getElementById('shadow-box') == null){
		let shadow_box = document.createElement("div")
		shadow_box.setAttribute('id','shadow-box')
		shadow_box.insertAdjacentHTML("beforeend",`
			 <div id="main-cajon">
    	 		<h4>Resuelve la imagen: en el orden amarillo azul(izquierda) rojo y verde(derecha)</h4>
    	 		<div id="cajon">
    				<div class="seleccion" id="box0" onclick="clicked_number_change('box0')"></div>
    				<div class="seleccion" id="box1" onclick="clicked_number_change('box1')"></div>
    				<div class="seleccion" id="box2" onclick="clicked_number_change('box2')"></div>
    				<div class="seleccion" id="box3" onclick="clicked_number_change('box3')"></div>	
   		 			</div>
    	 		<button type="button" onclick="send_verify()">Send</button>
      		</div>`)
		document.body.appendChild(shadow_box)
	}
	

	fetch('https://norobotplay-default-rtdb.firebaseio.com/tipos/OrderBy/ord01.json')
		.then((response)=>response.json())
		.then((data) => {
			datos=data
			let valoresUsados = [0,0,0,0]
			for (var i = 0; i < 4; i++) {
				let valor
				let isValorUsado
				let nombreElemento = 'box'+i
				let nombreValue

				do{
					valor = Math.floor(Math.random() * 4 ) + 1
			    	isValorUsado = valoresUsados[0] == valor || valoresUsados[1] == valor || valoresUsados[2] == valor || valoresUsados[3] == valor
				}while(isValorUsado)

				valoresUsados[i] = valor
				nombreValue = 'value0'+valor

				document.getElementById(nombreElemento).style.backgroundColor = data[nombreValue]
			}
		})
		.catch((err) => {
      		console.log('error al solicitar datos')
      		console.log(err)
      		return null
    	})
}


function clicked_number_change(id) {
	if(this.valorSeleccionado[0] == '' && this.valorSeleccionado[1] == ''){
		this.valorSeleccionado[0] = id
		this.valorSeleccionado[1] = document.getElementById(id).style.backgroundColor
	}else{
		document.getElementById(this.valorSeleccionado[0]).style.backgroundColor = document.getElementById(id).style.backgroundColor
		document.getElementById(id).style.backgroundColor = this.valorSeleccionado[1]
		this.valorSeleccionado[0] = ''
		this.valorSeleccionado[1] = ''
	}
}

function send_verify(){
	let send_result = document.getElementById('box0').style.backgroundColor + document.getElementById('box1').style.backgroundColor + document.getElementById('box2').style.backgroundColor + document.getElementById('box3').style.backgroundColor
	isVerify = send_result == datos['result']
	if(isVerify){
		alert('NoRobot verificado')
		document.getElementById("shadow-box").remove()
	}else{
		alert('NoRobot no verificado, por favor vuelva a intentarlo')
		clicked_norobot()
	}
}

document.getElementById('NoRobotPlay').addEventListener('click',clicked_norobot)
