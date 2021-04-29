// NvrConfig class to process IP recorder calculation
class NvrConfig {
    constructor() {
        this.camQty = document.getElementById("camQty");
        this.nvr8ch = document.getElementById("nvr8ch");
        this.nvr16ch = document.getElementById("nvr16ch");
        this.nvr32ch = document.getElementById("nvr32ch");
        this.nvr64ch = document.getElementById("nvr64ch");
        this.poe16ch = document.getElementById("poe16ch");
        this.poe24ch = document.getElementById("poe24ch");
        this.initializeIP();
    }

    initializeIP() {
        this.nvr8ch.value = 0;
        this.nvr16ch.value = 0;
        this.nvr32ch.value = 0;
        this.nvr64ch.value = 0;
        this.poe16ch.value = 0;
        this.poe24ch.value = 0;

    }

    calculateIP() {
        this.initializeIP();
        // console.log("IP cameras: " + this.camQty.value);

        // console.log("IP Camera Quantity: " + this.camQty);
        if (this.camQty.value <= 8) {
            this.nvr8ch.value = 1;
        } else if (this.camQty.value <= 16) {
            this.nvr16ch.value = 1;
        } else if (this.camQty.value <= 32) {
            this.nvr32ch.value = 1;
            if (this.camQty.value <= 24) {
                this.poe24ch.value = 1;
            } else {
                this.poe16ch.value = 2;
            }
        } else {
            this.nvr64ch.value = 1;
            if (this.camQty.value <= 40) {
                this.poe16ch.value = 1;
                this.poe24ch.value = 1;
            } else if (this.camQty.value <= 48) {
                this.poe24ch.value = 2;
            } else {
                this.poe16ch.value = 1;
                this.poe24ch.value = 2;
            }
        }
        hd4tb.value = parseInt(this.nvr8ch.value);
        hd8tb.value = parseInt(this.nvr16ch.value) + parseInt(this.nvr32ch.value) * 2 + parseInt(this.nvr64ch.value) * 4;
    }

}

// DvrCifig class to process analog recorder calculation
class DvrConfig {
    constructor() {
        this.camQty = document.getElementById("camQty");
        this.dvr8ch = document.getElementById("dvr8ch");
        this.dvr16ch = document.getElementById("dvr16ch");
        this.dvr32ch = document.getElementById("dvr32ch");
        this.pb9ch = document.getElementById("pb9ch");
        this.pb18ch = document.getElementById("pb18ch");
        this.initializeAnalog();
    }

    initializeAnalog() {
        this.dvr8ch.value = 0;
        this.dvr16ch.value = 0;
        this.dvr32ch.value = 0;
        this.pb9ch.value = 0;
        this.pb18ch.value = 0;
    }

    calculateAnalog() {
        this.initializeAnalog();
        // console.log("analog cameras: " + this.camQty.value);
        if (this.camQty.value <= 8) {
            this.dvr8ch.value = 1;
            if (this.camQty.value <= 4) {
                this.pb9ch.value = 1;
            } else {
                this.pb18ch.value = 1;
            }
        } else if (this.camQty.value <= 16) {
            this.dvr16ch.value = 1;
            this.pb18ch.value = 1;
        } else {
            this.dvr32ch.value = 1;
            this.pb18ch.value = 2;
        }

        hd2tb.value = parseInt(this.dvr8ch.value);
        hd4tb.value = parseInt(this.dvr16ch.value);
        hd8tb.value = parseInt(this.dvr32ch.value);
    }

}

var surveillance;
var text;
var camQty = 1;
var ipInput;
var analogInput;
var nvrConfig = new NvrConfig();
var dvrConfig = new DvrConfig();

var hd2tb = document.getElementById("hd2tb");
var hd4tb = document.getElementById("hd4tb");
var hd8tb = document.getElementById("hd8tb");

var mon22in = document.getElementById("mon22in");
var mon40in = document.getElementById("mon40in");
var hdmiExt = document.getElementById("hdmiExt");

function selectSurveillance() {
    surveillance = document.getElementById("surveillance");
    text = document.getElementById("camSelection");
    // camQty = parseInt(document.getElementById("camQty").value);
    // console.log(camQty);
    ipInput = document.getElementsByClassName("ip");    //a group of input for ip devices
    // console.log(ipInput);
    analogInput = document.getElementsByClassName("analog");    //a group of input for analog devices
    // console.log(analogInput);

    // console.log(surveillance.value);
    if (surveillance.value == "IP Camera") {
        text.innerHTML = "Quoting IP System";
        disableInput(analogInput);
        enableInput(ipInput);
        nvrConfig = new NvrConfig();
    } else if (surveillance.value == "Analog Camera") {
        text.innerHTML = "Quoting Analog System";
        disableInput(ipInput);
        enableInput(analogInput);
        dvrConfig = new DvrConfig();
    } else {
        disableInput(ipInput);
        disableInput(analogInput);
    }

    calculateRecorder();
}

function calculateRecorder() {
    camQty = parseInt(document.getElementById("camQty").value);
    // console.log("calculateRecorder() called, camera quantity: " + camQty);
    surveillance = document.getElementById("surveillance");
    // console.log(surveillance.value);

    if (surveillance.value == "IP Camera") {
        nvrConfig.calculateIP();
        // calculateIP(camQty);
    } else if (surveillance.value == "Analog Camera") {
        dvrConfig.calculateAnalog();
    }

}

// block inputs of either IP or analog system based on selection
function disableInput(inputGroup) {
    for (var i = 0; i < inputGroup.length; i++) {
        inputGroup[i].value = 0;
        inputGroup[i].disabled = true;
    }
    hd2tb.value = 0;
    hd4tb.value = 0;
    hd8tb.value = 0;
}

// enable inputs of either IP or analog system based on selection
function enableInput(inputGroup) {
    for (var i = 0; i < inputGroup.length; i++) {
        inputGroup[i].value = 0;
        inputGroup[i].disabled = false;
    }
}

//calculate hdd quantity based on recorder quantities
function calculateHdd() {

}

function printTables() {
    surveillance = document.getElementById("surveillance");
    if (surveillance.value == "IP Camera") {
        writeCostTable(document.getElementById("ip input table"));

        // calculateIP(camQty);
    } else {
        writeCostTable(document.getElementById("analog input table"));

    }


}

// get the items names and qty from input tables and print to document
function writeCostTable(table) {
    // console.log(table.getAttribute("id"));
    var costTable = document.createElement("table");
    costTable.setAttribute("id", "costTable");
    costTable.insertRow();
    console.log(table.rows[1].cells[1].firstChild.value);

}

function writeQuote() {

}


