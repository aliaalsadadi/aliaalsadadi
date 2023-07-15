function dark(){
    document.body.style.background = "#000000";
    document.getElementById("navbr").classList.remove("bg-light");
    document.getElementById("navbr").classList.add("bg-dark");
    const collection = document.getElementsByClassName("nav-link");
    for (let i = 0; i < collection.length; i++) {
        collection[i].style.color = "white";
    }
    const activeElement = document.querySelector('.active');
    activeElement.style.color = "black";
}
function light(){
    document.body.style.background = "#FFFFFF";
    document.getElementById("navbr").classList.remove("bg-dark");
    document.getElementById("navbr").classList.add("bg-light");
    const collection = document.getElementsByClassName("nav-link");
    for (let i = 0; i < collection.length; i++) {
        collection[i].style.color = "black";
    }
    const activeElement = document.querySelector('.active');
    activeElement.style.color = "grey";
}
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}
  
  /* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}