var surveillance;
var text;
var camQty = 1;
var ipSection;
var analogSection;

function selectSurveillance(){
    surveillance = document.getElementById("surveillance");
    text = document.getElementById("camSelection");
    ipSection = document.createElement("div1");
    let text2 = document.createElement("p");
    analogSection = document.createElement("div2");
    // analogSection = document.getElementById("Analog Section");
    // console.log(surveillance.value);
    if (surveillance.value == "IP Camera") {
        text.innerHTML = "Quoting IP System";
        calculateIP(camQty);
        // document.getElementById("IP Section").style.visibility = "visible";
        // document.getElementById("Analog Section").style.visibility = "hidden";
        analogSection.remove();
        text2.innerHTML = "ip div";
        ipSection.parentElement(text2);

    } else {
        text.innerHTML = "Quoting Analog System";
        calculateAnalog(camQty);
        // document.getElementById("IP Section").style.visibility = "hidden";
        // document.getElementById("Analog Section").style.visibility = "visible";
        ipSection.remove();
        text2.innerHTML = "analog div";
        analogSection.parentElement(text2);
    }
}

function calculateIP(camQty) {


}

function calculateAnalog(camQty) {

}

