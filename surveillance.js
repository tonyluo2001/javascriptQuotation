// default service terms to fill out selects
const serviceTerms = ["Provide: ", "Provide & Wire: ", "Provide, Wire & Instal: ", "Provide & Install: ", "Provide, Install & Configure: "];

// default items
const iPItems = ["4MP IP Dome", "4MP Elevator Cam", "CAT6 Cable", "8CH NVR", "16CH NVR", "32CH NVR", "64CH NVR", "16P POE", "24P POE"];
const analogItems = ["TVI-HD Dom", "Siamese Cable", "8CH DVR", "16CH DVR", "32CH DVR", "9CH Power Box", "18CH Power Box"];
const commonItems = ["22-inch Mon", "40-inch Mon", "HDMI Extender"];
const recorderPadding = "TB storage and HDMI output;";

var specTable = document.createElement("table");
var costTable = document.createElement("table");
var quoteTable = document.createElement("table");
var quoteArea = document.getElementById("quoteArea");

var hdMap = new Map(
    [
        ["2TB", 0],
        ["4TB", 0],
        ["8TB", 0]
    ]
);

// variable to keep the selection of analog/ip system
var selectedSystem = "IP";

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
        ["TVI-HD Dom", "TVI-HD Wide-Angle analog dome camera;"],
        ["Siamese Cable", "95% copper Siamese cable for cameras;"],
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

//function to switch between tabs
function selectSystem(tabName) {
    // clear the current tab/view
    var tabContent = document.getElementsByClassName("tabcontent");

    selectedSystem = tabName;

    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    resetView();

    //show the selected tab/view
    document.getElementById(tabName).style.display = "block";

    // Create spcTable for item selection
    specTable.setAttribute("id", "specTable");
    specTable.setAttribute("border", "1");

    document.getElementById(selectedSystem).appendChild(specTable);

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
}

// delete previous contents from specTable, costTable and quoteTable
function resetView() {
    while (specTable.rows.length >= 1) {
        specTable.deleteRow(-1);
    }

    while (costTable.rows.length > 0) {
        costTable.deleteRow(-1);
    }

    while (quoteTable.rows.length > 0) {
        quoteTable.deleteRow(-1);
    }

    // clear contents in quoteArea
    while (quoteArea.children.length > 0) {
        quoteArea.removeChild(quoteArea.childNodes[0]);
    }
}

// button function to add one row to spec table
function add(selectedSystem) {
    let newRow = specTable.insertRow(-1);

    // create & insert first input cell for term selection
    let termCell = newRow.insertCell(0);
    let termSelect = createSelect("serviceTerms", serviceTerms);
    termCell.appendChild(termSelect);

    let itemCell = newRow.insertCell(1);
    let itemSelect = [];
    if (selectedSystem == "Analog") {
        itemSelect = createSelect("items", analogItems.concat(commonItems));
    } else {
        itemSelect = createSelect("items", iPItems.concat(commonItems));
    }
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

// button function to remove one row from specTable
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


function output() {

    //  determine if there's an existing table. if yes, remove it

    while (quoteTable.rows.length > 0) {
        quoteTable.deleteRow(-1);
    }

    while (costTable.rows.length > 0) {
        costTable.deleteRow(-1);
    }


    while (quoteArea.children.length > 0) {
        quoteArea.removeChild(quoteArea.childNodes[0]);
    }

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

    costTable.setAttribute("border", "1");

    for (let item of quoteDescription) {
        let row = costTable.insertRow();
        let name = row.insertCell(0);
        name.innerHTML = item.name;
        let qty = row.insertCell(1);
        if (item.name.includes("Cable")) {
            qty.innerHTML = item.qty * item.detail / 1000; // calculate cable length and put in quantity
        } else {
            qty.innerHTML = item.qty;
        }

    }

    calculateHD(quoteDescription);

    quoteArea.appendChild(costTable);

}

function calculateHD(quoteDescription) {
    // COUNT THE 2TB, 4TB, 8TB FROM THE RECORDER ITEMS
    // USE RECURSIVE FUNCTION, DEDUCE HD STORAGE UNTIL THEY REACH 2,4,8 THRESHOLDS. THEN COUNT

    let hd2tb = 0;
    let hd4tb = 0;
    let hd8tb = 0;

    for (let item of quoteDescription) {
        if (item.name.includes("VR")) {
            let capacity = item.detail;
            while (capacity > 0) {
                if (capacity >= 8) {
                    capacity = capacity - 8;
                    hd8tb += parseInt(item.qty);
                } else if (capacity >= 4) {
                    capacity = capacity - 4;
                    hd4tb += parseInt(item.qty);
                } else {
                    capacity = capacity - 2;
                    hd2tb += parseInt(item.qty);
                }
            }
        }
    }

    hdMap.set("2TB", hd2tb);
    hdMap.set("4TB", hd4tb);
    hdMap.set("8TB", hd8tb);

    for (let [key, value] of hdMap) {
        let row = costTable.insertRow(-1);
        let name = row.insertCell(0);
        name.innerHTML = key;
        let qty = row.insertCell(1);
        qty.innerHTML = value;
    }

}
