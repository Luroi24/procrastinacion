const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-nxt");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const hasPartner = document.getElementById("der_cony_no");
const allQuestions = document.querySelectorAll(".options");

let indexProc = 0;

for(i=0 ; i < allQuestions.length; i++){
	for(j=0 ; j < 5; j++){
		let txt =""
		let val=""
		const division = document.createElement("div");
		division.className = "form-check form-check-inline";
		allQuestions[i].appendChild(division);

		const divLabel = document.createElement("label");
		divLabel.className = "form-check-label my-2";
		divLabel.setAttribute("for",'OE'+(i+1)+'-'+(j+1));
		switch(j){
			case 0: txt = "Nunca";
					val = 0;
			break;
			case 1: txt = "Casi nunca";
					val = 1;
			break;
			case 2: txt = "A veces";
					val = 2;
			break;
			case 3: txt = "Casi siempre";
					val = 3;
			break;
			case 4: txt = "Siempre";
					val = 4;
			break;
		}
		const labeltext = document.createTextNode(txt);
		divLabel.appendChild(labeltext);

		const divInput = document.createElement("input");
		divInput.type = "radio";
		divInput.className = "form-check-input";
		divInput.setAttribute("id",'OE'+(i+1)+'-'+(j+1));
		divInput.setAttribute("name",'OE'+(i+1));
		divInput.setAttribute("required",'true');
		divInput.setAttribute("value",val);

		division.appendChild(divLabel);
		division.appendChild(divInput);
	}
}

let formStepsNum = 0;

nextBtns.forEach(btn =>{
	btn.addEventListener("click", () => {
		if(!checkVal()){
			formStepsNum++;
			if(formStepsNum == 2){
				activateRes();
			}
			updateFormsSteps();
			updateProgressBar();
		}
	});
});

prevBtns.forEach(btn =>{
	btn.addEventListener("click", () => {
		if(formStepsNum == 4 && hasPartner.checked == true){
			formStepsNum-=2;
		}else{
			formStepsNum--;
		}
		updateFormsSteps();
		updateProgressBar();
	});
});

function checkVal(){
	let errors = 0;
	indexProc = 0;
	const campos = document.querySelectorAll(".form-step-active .needs-validation");
	for( i=0 ; i < campos.length; i++){
		const options = campos[i].querySelectorAll("input");
		for( j = 0 ; j < options.length; j++){
			if(options[j].checked){
				campos[i].classList.remove("is-invalid");
				campos[i].classList.add("is-valid");
				indexProc+=Number(options[j].value);
				break;
			}
		}
		if(!campos[i].classList.contains("is-valid")){
			campos[i].classList.add("is-invalid");
			errors++;
		}
	}
	return errors;
}

function activateRes(){
	const indicator = (indexProc/105)*100;
	if(indicator >0 && indicator <= 20 ){
		document.getElementById("score-20").classList.remove("hidden");
	}
	else if(indicator > 20 && indicator <= 40){
		document.getElementById("score-40").classList.remove("hidden");
	}
	else if(indicator > 40 && indicator <= 60){
		document.getElementById("score-60").classList.remove("hidden");
	}
	else if(indicator > 60 && indicator <= 80){
		document.getElementById("score-80").classList.remove("hidden");
	}
	else{
		document.getElementById("score-100").classList.remove("hidden");
	}
}

function updateFormsSteps(){
	formSteps.forEach(formStep =>{
		formStep.classList.contains("form-step-active") &&
		formStep.classList.remove("form-step-active");
	});
		formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressBar(){
	progressSteps.forEach((progressSteps,idx)=>{
		if(idx <= formStepsNum){
			progressSteps.classList.add("progress-step-active");
		}
		else{
			progressSteps.classList.remove("progress-step-active");
		}
	});
	
	const progressActive = document.querySelectorAll(".progress-step-active");
	progress.style.width = ((progressActive.length - 1)/(progressSteps.length - 1)*100 + "%");
}

document.getElementsByTagName("form")[0].onkeypress = function(e) {
    var key = e.charCode || e.keyCode || 0;     
    if (key == 13) {
      e.preventDefault();
    }
  }