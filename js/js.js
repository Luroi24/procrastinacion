const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-nxt");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const hasPartner = document.getElementById("der_cony_no");
const allQuestions = document.querySelectorAll(".options");

for(i=0 ; i < allQuestions.length; i++){
	for(j=0 ; j < 5; j++){
		let txt =""
		const division = document.createElement("div");
		division.className = "form-check form-check-inline";
		allQuestions[i].appendChild(division);

		const divLabel = document.createElement("label");
		divLabel.className = "form-check-label my-2";
		divLabel.setAttribute("for",'OE'+(i+1)+'-'+(j+1));
		switch(j){
			case 0: txt = "Nunca";
			break;
			case 1: txt = "Casi nunca";
			break;
			case 2: txt = "A veces";
			break;
			case 3: txt = "Casi siempre";
			break;
			case 4: txt = "Siempre";
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

		division.appendChild(divLabel);
		division.appendChild(divInput);
	}
}

let formStepsNum = 0;

nextBtns.forEach(btn =>{
	btn.addEventListener("click", () => {
		if(!checkVal()){
			formStepsNum++;
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
	let errors = 0, flag = 0;
	const campos = document.querySelectorAll(".form-step-active .needs-validation");
	for( i=0 ; i < campos.length; i++){
		const options = campos[i].querySelectorAll("input");
		for( j = 0 ; j < options.length; j++){
			if(options[j].checked){
				campos[i].classList.remove("is-invalid");
				campos[i].classList.add("is-valid");
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