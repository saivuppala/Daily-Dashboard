$(document).ready(function() {
  if(localStorage.length > 0) loadBills();
  $("#addBillsButton").click(openPopup);
  $("#cancelAddBill").click(closePopup);
  $("#addNewBill").click(addBills);
})
var simpleData = {'title': 'Rent', 'Amount': '$2000', 'date': 'Nov 15, 2017', 'index': 1};
var numOfBills = 0;
var billsData = [
{'title': 'Rent', 'Amount': '2000', 'date': '11/6/17', 'index': 1},
{'title': 'Car', 'Amount': '2000', 'date': '11/6/17', 'index': 2},
{'title': 'Electric Bill', 'Amount': '100','date': '11/6/17', 'index': 3},
{'title': 'Internet', 'Amount': '100','date': '11/7/17', 'index': 4},
{'title': 'Credit Card', 'Amount': '2000', 'date': '11/8/17', 'index': 5},
{'title': 'Medical Bills', 'Amount': '2000','date': '11/9/17', 'index': 6}
]

function openPopup(){
  // Get the modal
  var modal = document.getElementById('myModal');
  // When the user clicks the button, open the modal
  modal.style.display = "block";

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
}


function closePopup(){
  // Get the modal
  var modal = document.getElementById('myModal');
  modal.style.display = "none";
}

var cancelled = false;
$('#addNewBill').click(function(){
   if($('#name').val() == ''){
     alert('Name cannot be left blank');
      cancelled = true;
   }
   else if($('#date').val() == ''){
      alert('Date cannot be left blank');
      cancelled = true;
   }
   else if($('#amount').val() == ''){
      alert('Amount cannot be left blank');
      cancelled = true;
   }

});

function  loadBills() {
  numOfBills = localStorage.getItem('numOfBills');
  for(i=1; i<=numOfBills; i++){
    var medData = JSON.parse(localStorage.getItem('bill' + i));
    var medDate = medData['date'];
    var billIndex = medData['index'];
    //alert("The med num is " + medIndex);

    //TODAY'S MEDICINES


        var source = $("#today-template").html();
        var template = Handlebars.compile(source);

        var html = template(medData);

        //$("#item1").toggle();
        var todayList = $("#bList");
        todayList.append(html);

      //CURRENTLY TAKING

  }
  //numOfBills = billIndex;
}

function addBills() {
  if(cancelled == true){
      cancelled = false;
    return;
  }
  console.log("Testing");

//updating bill count
  numOfBills++;
  localStorage.setItem('numOfBills', numOfBills);


  //if(numOfBills<3){
    //var person = prompt("Bill name:", "Electric bill");
    var source = $("#today-template").html();
    var template = Handlebars.compile(source);

    var userBillName = document.getElementById('name').value;
    var userBillDate = document.getElementById('date').value;
    var userBillAmount = document.getElementById('amount').value;
    var userBillNotes = document.getElementById('notes').value;
    //var numOfBills = 1;
    var userBillData = {'title': userBillName, 'Amount': userBillAmount, 'date': userBillDate, 'notes': userBillNotes, 'index': numOfBills};

    localStorage.setItem('bill' + numOfBills , JSON.stringify(userBillData));

    var html = template(userBillData);

    //$("#item1").toggle();
    var todayList = $("#bList");
    todayList.append(html);
    $("#bill" + numOfBills + "notes").hide();



  closePopup();
}

function deleteItem(item_id){
  //alert("Close clicked on " + item_id);
  var med_id = $("#" + item_id).parent().attr('id');
  //alert("Close clicked on " + med_id);
  $("#" + item_id).parent().remove();
  localStorage.removeItem(med_id);
  numOfBills--;
  localStorage.setItem('numOfBills', numOfBills);
}

function showNotes(div_id){
  //alert("Bill clicked on " + div_id);
  $("#" + div_id + "notes").toggle();
}
