var modal = document.getElementById("myModal");
var close = document.getElementsByClassName("close")[0];
var modal1 = document.getElementsByClassName("mm");
var close1 = document.getElementsByClassName("close1");
var editButton = document.getElementsByClassName("editbutton");
let value

function block() {
  modal.style.display = "block";
  close.onclick = function() {
    modal.style.display = "none";
  }
}


function block1(m) {
  for (var j = 0; j < modal1.length; j++) {
    if (editButton[m].name === modal1[j].title) {
      value = j;
      modal1[j].style.display = "block";
    }
  }
}

for (var j = 0; j < modal1.length; j++) {
  close1[j].onclick = function() {
    modal1[value].style.display = "none";
  }
}
