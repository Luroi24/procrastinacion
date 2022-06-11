const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-nxt");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const hasPartner = document.getElementById("der_cony_no");

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
	let errors = 0;
	let campos = document.querySelectorAll(".form-step-active .needs-validation");
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

/* Funciones de cálculo automático */

function calcularEdad() {
  	const date = new Date(document.getElementById('kid_birthday').value).getTime();
  	const now = new Date().getTime();
  	var age = Math.floor((now - date ) / (1000 * 60 * 60 * 24 * 365));
    (document.getElementById('kid_age')).value = age;  
}

/* Image related JS */

const inpFile = document.querySelectorAll(".inpFile");
const previewContainer = document.querySelectorAll(".image-preview");

inpFile.forEach(inpFile=>{
	inpFile.addEventListener("change", function(){
	   const file = this.files[0];
	   const clsImg = this.nextElementSibling.firstElementChild;
	   const clsTxt = this.nextElementSibling.firstElementChild.nextElementSibling;
		if(file){
			const reader = new FileReader();
			clsTxt.style.display="none";
			clsImg.style.display = "block";

			reader.addEventListener("load",function(){
				clsImg.setAttribute("src",this.result);
			});
			reader.readAsDataURL(file);
	}else{
			clsTxt.style.display=null;
			clsImg.style.display = null;
			clsImg.setAttribute("src","")
		}
	});
});