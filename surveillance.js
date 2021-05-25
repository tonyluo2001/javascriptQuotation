// default service terms to fill out selects
const serviceTerms = ["Provide: ", "Provide & Wire: ", "Provide, Wire & Instal: ", "Provide & Install: ", "Provide, Install & Configure: "];

// default items
const iPItems = ["4MP IP Dome", "4MP Elevator Cam", "CAT6 Cable", "8CH NVR", "16CH NVR", "32CH NVR", "64CH NVR", "16P POE", "24P POE"];
const commonItems = ["22-inch Mon", "40-inch Mon", "HDMI Extender"];
const recorderPadding = "TB storage and HDMI output;";

const descriptMap = new Map(
    [
        ["8CH NVR", " 8-channel network video recorder with "],
        ["16CH NVR", " 16-channel network video recorder with "],
        ["32CH NVR", " 32-channel network video recorder with "],
        ["64CH NVR", " 64-channel network video recorder with "],
        ["16P POE Switch", " 16-channel fast internet POE switch for cameras;"],
        ["24P POE Switch", " 24-channel fast internet POE switch for cameras;"],
        ["8CH DVR", " 8-channel digital video recorder with "],
        ["16CH DVR", " 16-channel digital video recorder with "],
        ["32CH DVR", " 8-channel digital video recorder with "],
        ["9CH Power Box", " 9-channel power supply box for cameras;"],
        ["18CH Power Box", " 18-channel power supply box for cameras;"],
        ["CAT6 Cable", " 4-pr CAT6 cables for cameras;"],
        ["4MP IP Dome", " 4MP fixed wide-angle network dome camera;"],
        ["4MP Elevator Cam", " 4MP fixed wide-angle network elevator camera;"],
        ["22-inch Mon", " 22-inch FHD surveillance monitor;"],
        ["40-inch Mon", " 40-inch 4K surveillance TV;"],
        ["HDMI Extender", " HDMI over CAT6 extender for monitor;"]
    ]

);


// class to create item objects, including both recorders (4 properties) and other items (3 properties)
class Item {

    constructor(term, name, qty, detail) {
        this.term = term;
        this.name = name;
        this.qty = qty;
        this.detail = detail;
    }

    toString() {
        let descript1 = this.term + " (" + this.qty + ")" + descriptMap.get(this.name);

        // if the item is a recorder, the detail property should be a number for HD storage
        if (this.name.includes("VR")) {
            return (descript1 + this.detail + recorderPadding);
        } else {
            return descript1;
        }

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

    //  determine if there's an existing table. if yes, remove it
    let quoteArea = document.getElementById("quoteArea");
    while (quoteArea.hasChildNodes()) {
        quoteArea.removeChild(quoteArea.childNodes[0]);
    }

    // 
    let quoteTable = document.createElement("table");

    let quoteDescription = [];

    for (let i = 1; i < specTable.rows.length; i++) {
        let row = specTable.rows[i];

        let term = row.cells[0].children[0].value;
        let itemName = row.cells[1].children[0].value;
        let qty = row.cells[2].children[0].value;

        let detail = "";

        if (row.cells[3].children[0] != null) {
            detail = row.cells[3].children[0].value;
        }

        let item = new Item(term, itemName, qty, detail);
        quoteDescription.push(item);
    }

    for (let item of quoteDescription) {
        // console.log(item.name + " " + item.qty);
        let newRow = quoteTable.insertRow(-1);
        let newCell = newRow.insertCell(0);
        newCell.innerHTML = item.toString();
    }

    quoteArea.appendChild(quoteTable);

}


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


// enable inputs of either IP or analog system based on selection
// function enableInput(inputGroup) {
//     for (var i = 0; i < inputGroup.length; i++) {
//         inputGroup[i].value = 0;
//         inputGroup[i].disabled = false;
//     }
// }

// //calculate hdd quantity based on recorder quantities
// // function calculateHdd() {

// // }


