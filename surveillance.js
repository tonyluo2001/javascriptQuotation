// class to create item objects, including both recorders (4 properties) and other items (3 properties)
class Item {

    constructor(term, name, qty, detail) {
        this.term = term;
        this.name = name;
        this.qty = qty;
        this.detail = detail;
    }
}


// Create spc Table for item selection
var specTable = document.createElement("table");
specTable.setAttribute("id", "specTable");
specTable.setAttribute("border", "1");
document.getElementById("IP").appendChild(specTable);

// table structure
let newRow = specTable.insertRow();
let termCell = newRow.insertCell(0);
let itemCell = newRow.insertCell(1);
let qtyCell = newRow.insertCell(2);
let detailCell = newRow.insertCell(3);

// first row/head of table
termCell.innerHTML = "Term";
itemCell.innerHTML = "Item";
qtyCell.innerHTML = "Quantity";
detailCell.innerHTML = "Storage/Cable Length";

// default service terms to fill out selects
var serviceTerms = ["Provide: (", "Provide & Wire: (", "Provide, Wire & Instal: (", "Provide & Install: (", "Provide, Install & Configure: ("];

// default items
var iPItems = ["4MP IP Dome", "4MP Elevator Cam", "Camera Cable", "8CH NVR", "16CH NVR", "32CH NVR", "64CH NVR", "16P POE", "24P POE"];
var commonItems = ["22-inch Mon", "40-inch Mon", "HDMI Extender"];
// var hdItems = ["2TB", "4TB", "8TB", "12TB", "16TB", "20TB", "24TB", "28TB", "32TB"];
// var cableLength = [150, 180, 200, 250];


// button function to add one row to spec table
function add() {
    let newRow = specTable.insertRow(-1);

    // create & insert first input cell for term selection
    let termCell = newRow.insertCell(0);
    let termSelect = createSelect("serviceTerms", serviceTerms);
    termCell.appendChild(termSelect);


    let itemCell = newRow.insertCell(1);
    let itemSelect = createSelect("items", iPItems.concat(commonItems));
    itemCell.appendChild(itemSelect);


    let qtyCell = newRow.insertCell(2);
    let qtyInput = document.createElement("input");
    qtyInput.setAttribute("type", "number");
    qtyInput.setAttribute("max", 128);
    qtyInput.setAttribute("min", 1);
    qtyCell.appendChild(qtyInput);


    // last cell shall appear conditionally
    let detailCell = newRow.insertCell(3);
    let detailInput = document.createElement("input");
    detailInput.setAttribute("min", "0");

    itemSelect.addEventListener("change", function () {
        changeExtraCell(itemSelect, detailCell, detailInput);
    });

}

// button function to remove one row from spec table
function remove() {
    if (specTable.rows.length > 1) {
        specTable.deleteRow(-1);
    }
}

// function to create select
function createSelect(selectId, optionArr) {
    var newSelect = document.createElement("select");
    newSelect.setAttribute("className", selectId);
    for (var optionText of optionArr) {
        var option = document.createElement("option");
        option.text = optionText;
        newSelect.add(option);
    }
    return newSelect;
}


//default tab to display
document.getElementById("IPBtn").click();

// switch the input for the 4th cell input method
function changeExtraCell(itemSelect, detailCell, detailInput) {
    // remove all children of current cell
    while (detailCell.children.length > 0) {
        detailCell.removeChild(detailCell.children[0]);
    }

    if (itemSelect.value.includes("Cable")) {
        // console.log("cable selected");

        detailInput.setAttribute("type", "number");
        detailInput.setAttribute("max", "500");

        detailCell.appendChild(detailInput);

        let unit = document.createElement("label");
        unit.innerHTML = "feet";
        detailCell.appendChild(unit);

    } else if (itemSelect.value.includes("VR")) {
        // console.log("recorder selected");

        detailInput.setAttribute("type", "number");
        detailInput.setAttribute("max", "64");

        detailCell.appendChild(detailInput);

        let unit = document.createElement("label");
        unit.innerHTML = "TB HDD";
        detailCell.appendChild(unit);

    }
}

//function to switch between tabs
function selectSystem(tabName) {
    var tabContent = document.getElementsByClassName("tabcontent");

    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    document.getElementById(tabName).style.display = "block";
}


function output() {

    var quoteArea = document.getElementById("quoteArea");
    var quoteTable = document.createElement("table");
    var quoteDescription = [];

    for (var i = 1; i < specTable.rows.length; i++) {
        var row = specTable.rows[i];

        var term = row.cells[0].children[0].value;
        var itemName = row.cells[1].children[0].value;
        var qty = row.cells[2].children[0].value;

        var item = new Item(term, itemName, qty);
        quoteDescription.push(item);
    }

    for (var item of quoteDescription) {
        console.log(item.name + " " + item.qty);
    }

    var recorderSet = document.getElementsByClassName("recorder");
    var itemSet = document.getElementsByClassName("items");

    // process the quote descriptions for recorders (with 3 inputs)
    for (var recorder of recorderSet) {
        var term = recorder.children[0].value;
        var qty = recorder.children[1].value;
        if (qty > 0) {
            var hdqty = recorder.children[2].value;
            var description1 = recorder.innerText.slice(recorder.innerText.indexOf(")"), recorder.innerText.indexOf("with "));
            var description2 = recorder.innerText.slice(recorder.innerText.indexOf("TB"), recorder.innerText.length);
            quoteDescription.push(term.concat(qty, description1, hdqty, description2));
        }
    }


    // process the quote descriptions for all other items (with 2 inputs)
    for (var item of itemSet) {
        var term = item.children[0].value;
        var qty = item.children[1].value;
        if (qty > 0) {
            var description = item.innerText.slice(item.innerText.indexOf(")"), item.innerText.length);
            quoteDescription.push(term.concat(qty, description));
        }
    }

}





// NvrConfig class to process IP recorder calculation
// class NvrConfig {
//     constructor() {
//         this.camQty = document.getElementById("camQty");
//         this.nvr8ch = document.getElementById("nvr8ch");
//         this.nvr16ch = document.getElementById("nvr16ch");
//         this.nvr32ch = document.getElementById("nvr32ch");
//         this.nvr64ch = document.getElementById("nvr64ch");
//         this.poe16ch = document.getElementById("poe16ch");
//         this.poe24ch = document.getElementById("poe24ch");
//         this.initializeIP();
//     }

//     initializeIP() {
//         this.nvr8ch.value = 0;
//         this.nvr16ch.value = 0;
//         this.nvr32ch.value = 0;
//         this.nvr64ch.value = 0;
//         this.poe16ch.value = 0;
//         this.poe24ch.value = 0;

//     }

//     calculateIP() {
//         this.initializeIP();
//         // console.log("IP cameras: " + this.camQty.value);

//         // console.log("IP Camera Quantity: " + this.camQty);
//         if (this.camQty.value <= 8) {
//             this.nvr8ch.value = 1;
//         } else if (this.camQty.value <= 16) {
//             this.nvr16ch.value = 1;
//         } else if (this.camQty.value <= 32) {
//             this.nvr32ch.value = 1;
//             if (this.camQty.value <= 24) {
//                 this.poe24ch.value = 1;
//             } else {
//                 this.poe16ch.value = 2;
//             }
//         } else {
//             this.nvr64ch.value = 1;
//             if (this.camQty.value <= 40) {
//                 this.poe16ch.value = 1;
//                 this.poe24ch.value = 1;
//             } else if (this.camQty.value <= 48) {
//                 this.poe24ch.value = 2;
//             } else {
//                 this.poe16ch.value = 1;
//                 this.poe24ch.value = 2;
//             }
//         }
//         hd4tb.value = parseInt(this.nvr8ch.value);
//         hd8tb.value = parseInt(this.nvr16ch.value) + parseInt(this.nvr32ch.value) * 2 + parseInt(this.nvr64ch.value) * 4;
//     }

// }

// // DvrCifig class to process analog recorder calculation
// class DvrConfig {
//     constructor() {
//         this.camQty = document.getElementById("camQty");
//         this.dvr8ch = document.getElementById("dvr8ch");
//         this.dvr16ch = document.getElementById("dvr16ch");
//         this.dvr32ch = document.getElementById("dvr32ch");
//         this.pb9ch = document.getElementById("pb9ch");
//         this.pb18ch = document.getElementById("pb18ch");
//         this.initializeAnalog();
//     }

//     initializeAnalog() {
//         this.dvr8ch.value = 0;
//         this.dvr16ch.value = 0;
//         this.dvr32ch.value = 0;
//         this.pb9ch.value = 0;
//         this.pb18ch.value = 0;
//     }

//     calculateAnalog() {
//         this.initializeAnalog();
//         // console.log("analog cameras: " + this.camQty.value);
//         if (this.camQty.value <= 8) {
//             this.dvr8ch.value = 1;
//             if (this.camQty.value <= 4) {
//                 this.pb9ch.value = 1;
//             } else {
//                 this.pb18ch.value = 1;
//             }
//         } else if (this.camQty.value <= 16) {
//             this.dvr16ch.value = 1;
//             this.pb18ch.value = 1;
//         } else {
//             this.dvr32ch.value = 1;
//             this.pb18ch.value = 2;
//         }

//         hd2tb.value = parseInt(this.dvr8ch.value);
//         hd4tb.value = parseInt(this.dvr16ch.value);
//         hd8tb.value = parseInt(this.dvr32ch.value);
//     }

// }

// var surveillance;
// var text;
// var camQty = 1;
// var ipInput;
// var analogInput;
// var labor;
// var cable;
// var nvrConfig = new NvrConfig();
// var dvrConfig = new DvrConfig();

// var hd2tb = document.getElementById("hd2tb");
// var hd4tb = document.getElementById("hd4tb");
// var hd8tb = document.getElementById("hd8tb");

// var mon22in = document.getElementById("mon22in");
// var mon40in = document.getElementById("mon40in");
// var hdmiExt = document.getElementById("hdmiExt");

// var output = document.getElementById("output");

// var serviceTerms = ["Provide, Wire & Instal: (", "Provide & Install: (", "Provide, Install & Configure: (", " with ", " Storage & HDMI Output;"];

// const descriptMap = new Map(
//     [
//         ["8CH NVR", ") 8-channel network video recorder "],
//         ["16CH NVR", ") 16-channel network video recorder "],
//         ["32CH NVR", ") 32-channel network video recorder "],
//         ["64CH NVR", ") 64-channel network video recorder "],
//         ["16P POE Switch", ") 16-channel fast internet POE switch for cameras;"],
//         ["24P POE Switch", ") 24-channel fast internet POE switch for cameras;"],
//         ["8CH DVR", ") 8-channel digital video recorder "],
//         ["16CH DVR", ") 16-channel digital video recorder "],
//         ["32CH DVR", ") 8-channel digital video recorder "],
//         ["9CH Power Box", ") 9-channel power supply box for cameras;"],
//         ["18CH Power Box", ") 18-channel power supply box for cameras;"],

//     ]


// );



// function selectSurveillance() {
//     surveillance = document.getElementById("surveillance");
//     text = document.getElementById("camSelection");
//     // camQty = parseInt(document.getElementById("camQty").value);
//     // console.log(camQty);
//     ipInput = document.getElementsByClassName("ip");    //a group of input for ip devices
//     // console.log(ipInput);
//     analogInput = document.getElementsByClassName("analog");    //a group of input for analog devices
//     // console.log(analogInput);

//     // console.log(surveillance.value);
//     if (surveillance.value == "IP Camera") {
//         text.innerHTML = "Quoting IP System";
//         disableInput(analogInput);
//         enableInput(ipInput);
//         nvrConfig = new NvrConfig();
//     } else if (surveillance.value == "Analog Camera") {
//         text.innerHTML = "Quoting Analog System";
//         disableInput(ipInput);
//         enableInput(analogInput);
//         dvrConfig = new DvrConfig();
//     } else {
//         disableInput(ipInput);
//         disableInput(analogInput);
//     }

//     calculateRecorder();
// }

// function calculateRecorder() {
//     camQty = parseInt(document.getElementById("camQty").value);
//     // console.log("calculateRecorder() called, camera quantity: " + camQty);
//     surveillance = document.getElementById("surveillance");
//     // console.log(surveillance.value);

//     if (surveillance.value == "IP Camera") {
//         nvrConfig.calculateIP();
//         // calculateIP(camQty);
//     } else if (surveillance.value == "Analog Camera") {
//         dvrConfig.calculateAnalog();
//     }

// }

// // block inputs of either IP or analog system based on selection
// function disableInput(inputGroup) {
//     for (var i = 0; i < inputGroup.length; i++) {
//         inputGroup[i].value = 0;
//         inputGroup[i].disabled = true;
//     }
//     hd2tb.value = 0;
//     hd4tb.value = 0;
//     hd8tb.value = 0;
// }

// // enable inputs of either IP or analog system based on selection
// function enableInput(inputGroup) {
//     for (var i = 0; i < inputGroup.length; i++) {
//         inputGroup[i].value = 0;
//         inputGroup[i].disabled = false;
//     }
// }

// //calculate hdd quantity based on recorder quantities
// // function calculateHdd() {

// // }

// function printTables() {
//     surveillance = document.getElementById("surveillance");

//     // determine if there's an existing table. if yes, remove it
//     while (output.hasChildNodes()) {
//         output.removeChild(output.childNodes[0]);
//     }
//     if (surveillance.value == "IP Camera") {
//         writeCostTable(document.getElementById("ip input table"));

//         // calculateIP(camQty);
//     } else {
//         writeCostTable(document.getElementById("analog input table"));

//     }

//     writeCostTable(document.getElementById("hd input table"));

//     writeQuote();

// }

// // get the items names and qty from input tables and print to document
// function writeCostTable(table) {

//     // console.log("removed items.");

//     // create a costTable
//     var costTable = document.createElement("table");
//     costTable.setAttribute("id", "costTable");
//     costTable.setAttribute("border", "1");

//     // copy the input table to output table, including adding rows and cells
//     for (var row = 1; row < table.rows.length; row++) {
//         var costRow = costTable.insertRow();
//         var cell1 = costRow.insertCell(0);
//         var cell2 = costRow.insertCell(1);

//         if (table.rows[row].cells[0].innerHTML != "FILLER") {
//             cell1.innerHTML = table.rows[row].cells[0].innerHTML;
//             // console.log(cell1.innerHTML);
//             cell2.innerHTML = table.rows[row].cells[1].children[0].value;
//         } else {
//             costTable.deleteRow(-1);
//         }

//     }

//     // print cable and labor cost only when all other materials have been printed
//     if (cell1.innerHTML == "HDMI Extender") {
//         // insert the cable row
//         costRow = costTable.insertRow();
//         cable = document.getElementById("camQty").value * document.getElementById("cableLength").value / 1000;
//         cell1 = costRow.insertCell(0);
//         cell1.innerHTML = "Cable";
//         cell2 = costRow.insertCell(1);
//         cell2.innerHTML = cable;

//         // insert the labor row
//         costRow = costTable.insertRow();
//         labor = document.getElementById("labor").value;
//         cell1 = costRow.insertCell(0);
//         cell1.innerHTML = "Labor";
//         cell2 = costRow.insertCell(1);
//         cell2.innerHTML = labor;
//     }


//     // print out costTable
//     output.appendChild(costTable);

// }
// // costTable.insertRow();
// // console.log(table.rows[3].cells[1].children[0].value);


// function writeQuote() {
//     var costTable = document.getElementById("costTable");
//     var quoteTable = document.createElement("table");
//     var quoteRow;
//     var quoteCell;
//     var itemQty;
//     quoteTable.setAttribute("id", "quoteTable");
//     quoteTable.setAttribute("border", "1");

//     for (var row = 0; row < costTable.rows.length; row++) {
//         if (costTable.rows[row].cells[1].innerHTML != 0) {
//             quoteRow = quoteTable.insertRow();
//             quoteCell = quoteRow.insertCell(0);
//             itemQty = serviceTerms[2].concat(costTable.rows[row].cells[1].innerHTML);
//             // console.log(descriptMap.get(costTable.rows[row].cells[0].innerHTML));
//             quoteCell.innerHTML = itemQty.concat(descriptMap.get((costTable.rows[row].cells[0].innerHTML)));

//             if (quoteCell.innerHTML.search("recorder") > 0) {
//                 quoteCell.innerHTML = quoteCell.innerHTML.concat(serviceTerms[3], serviceTerms[4]);
//             }
//         }

//     }

//     output.appendChild(quoteTable);

// }


