var surveillance;
var text;
var camQty;
var ipInput = document.getElementsByClassName("ip");
var analogInput = document.getElementsByClassName("analog");


// NvrConfig class to process IP recorder calculation)
class NvrConfig {
    constructor(qty) {
        this.initializeIP(qty);
    }

    initializeIP(qty) {
        this.camQty = qty;
        this.nvr8ch = 0;
        this.nvr16ch = 0;
        this.nvr32ch = 0;
        this.nvr64ch = 0;
        this.poe16ch = 0;
        this.poe24ch = 0;
    }

    calculateIP() {
        this.initializeIP(this.camQty);
        console.log("IP Camera Quantity: " + this.camQty);
        if (this.camQty <= 8) {
            this.nvr8ch = 1;
        } else if (this.camQty <= 16) {
            this.nvr16ch = 1;
        } else if (this.camQty <= 32) {
            this.nvr32ch = 1;
            if (this.camQty <= 24) {
                this.poe24ch = 1;
            } else {
                this.poe16ch = 2;
            }
        } else {
            this.nvr64ch = 1;
            if (this.camQty <= 40) {
                this.poe16ch = 1;
                this.poe24ch = 1;
            } else if (this.camQty <= 48) {
                this.poe24ch = 2;
            } else {
                this.poe16ch = 1;
                this.poe24ch = 2;
            }
        }
        this.writeToHtml();
    }

    writeToHtml() {
        document.getElementById("nvr8ch").value = this.nvr8ch;
        document.getElementById("nvr16ch").value = this.nvr16ch;
        document.getElementById("nvr32ch").value = this.nvr32ch;
        document.getElementById("nvr64ch").value = this.nvr64ch;
        document.getElementById("poe16ch").value = this.poe16ch;
        document.getElementById("poe24ch").value = this.poe24ch;
    }

}



// var dvr8ch = document.getElementById("dvr8ch");
// var dvr16ch = document.getElementById("dvr16ch");
// var dvr32ch = document.getElementById("dvr32ch");
// var pb9ch = document.getElementById("pb9ch");
// var pb18ch = document.getElementById("pb18ch");

var mon22in = document.getElementById("mon22in");
var mon40in = document.getElementById("mon40in");
var hdmiExt = document.getElementById("hdmiExt");


function selectSurveillance() {
    surveillance = document.getElementById("surveillance");
    text = document.getElementById("camSelection");
    camQty = parseInt(document.getElementById("camQty").value);
    console.log(camQty);
    ipInput = document.getElementsByClassName("ip");    //a group of input for ip devices
    // console.log(ipInput);
    analogInput = document.getElementsByClassName("analog");    //a group of input for analog devices
    // console.log(analogInput);

    // console.log(surveillance.value);
    if (surveillance.value == "IP Camera") {
        text.innerHTML = "Quoting IP System";
        disableInput(analogInput);
        enableInput(ipInput);
    } else if (surveillance.value == "Analog Camera") {
        text.innerHTML = "Quoting Analog System";
        disableInput(ipInput);
        enableInput(analogInput);
    } else {
        disableInput(ipInput);
        disableInput(analogInput);
    }
}

function calculateRecorder() {
    camQty = parseInt(document.getElementById("camQty").value);
    // console.log("calculateRecorder() called, camera quantity: " + camQty);
    surveillance = document.getElementById("surveillance");
    // console.log(surveillance.value);
    if (surveillance.value == "IP Camera") {
        var nvrConfig = new NvrConfig(camQty);
        nvrConfig.calculateIP();
        // calculateIP(camQty);
    } else if (surveillance.value == "Analog Camera") {
        calculateAnalog(camQty);
    }

}


function disableInput(inputGroup) {
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


