var deleteA = document.getElementById("deleteClick");
var deleteInput = document.getElementById("searchmethod");
deleteA.onclick = function(){
  deleteInput.name = deleteA.value;
  console.log(deleteInput.name);
}
