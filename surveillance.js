var surveillance;
var text;
var camQty = 1;
var ipInput;
var analogInput;

var nvr8ch = document.getElementById("nvr8ch");
var nvr16ch = document.getElementById("nvr16ch");
var nvr32ch = document.getElementById("nvr32ch");
var nvr64ch = document.getElementById("nvr64ch");
var poe16ch = document.getElementById("poe16ch");
var poe24ch = document.getElementById("poe24ch");

var dvr8ch = document.getElementById("dvr8ch");
var dvr16ch = document.getElementById("dvr16ch");
var dvr32ch = document.getElementById("dvr32ch");
var pb9ch = document.getElementById("pb9ch");
var pb18ch = document.getElementById("pb18ch");

var mon22in = document.getElementById("mon22in");
var mon40in = document.getElementById("mon40in");
var hdmiExt = document.getElementById("hdmiExt");


function selectSurveillance(){
    surveillance = document.getElementById("surveillance");
    text = document.getElementById("camSelection");
    camQty = document.getElementsByClassName("camQty");
    ipInput = document.getElementsByClassName("ip");
    analogInput = document.getElementsByClassName("analog");

    // console.log(surveillance.value);
    if (surveillance.value == "IP Camera") {
        text.innerHTML = "Quoting IP System";
        disableInput(analogInput);
        enableInput(ipInput);
        calculateIP(camQty);

    } else {
        text.innerHTML = "Quoting Analog System";
        disableInput(ipInput);
        enableInput(analogInput);
        calculateAnalog(camQty);
    
    }
}

function calculateIP(qty) {
    if (qty <= 8){
        nvr8ch = 1;
        nvr16ch = 0;
        nvr32ch = 0;
        nvr64ch = 0;
        poe16ch = 0;
        poe24ch = 0;
    } else if (qty <= 16) {
        nvr8ch = 0;
        nvr16ch = 1;
        nvr32ch = 0;
        nvr64ch = 0;
        poe16ch = 0;
        poe24ch = 0;
    } else if (qty <= 32) {
        nvr8ch = 0;
        nvr16ch = 0;
        nvr32ch = 1;
        nvr64ch = 0;
        if (qty <= 24){
            poe16ch = 0;
            poe24ch = 1;
        } else {
            poe16ch = 2;
            poe24ch = 0;
        }
    } else if(qty <= 64) {
            nvr8ch = 0;
            nvr16ch = 0;
            nvr32ch = 0;
            nvr64ch = 1;
            if (qty <= 24){
                poe16ch = 0;
                poe24ch = 1;
            } else {
                poe16ch = 2;
                poe24ch = 0;
            }

    }

}

function calculateAnalog(qty) {

}

function disableInput(inputGroup){
    for (var i = 0; i < inputGroup.length; i++) {
        inputGroup[i].value = 0;
        inputGroup[i].disabled = true;
    }
}

function enableInput(inputGroup) {
    for (var i = 0; i < inputGroup.length; i++) {
        inputGroup[i].value = 0;
        inputGroup[i].disabled = false;
    }
}


