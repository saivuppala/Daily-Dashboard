var numOfItems = 0;
$(document).ready(function() {
  if(numOfItems > 0) loadItems();
  $("#addBillsButton").click(openPopup);
  $("#cancelAddBill").click(closePopup);
  $("#addNewBill").click(addMeds);
})
var simpleData = {'title': 'Vallia Ice Cream', 'Amount': '1 Gallon', 'date': 'Nov 15, 2017', 'index': 1};
var dataIndex = 0;

var medData = [
{'title': 'Bananas', 'Amount': '1', 'date': 'N/A', 'index': 1},
{'title': 'eggs', 'Amount': '1 Dozen', 'date': '11/17/17', 'index': 2},
{'title': 'Frozen Dumplings', 'Amount': '1','date': '12/30/17', 'index': 3},
{'title': 'Gyo Don', 'Amount': '1','date': '11/7/17', 'index': 4},
{'title': 'Milk', 'Amount': '2 Gallon', 'date': '12/1/17', 'index': 5},
{'title': 'Pizza', 'Amount': '1','date': '11/9/17', 'index': 6}
]

var userMedData;

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

function toggleCheckbox(element, item_id) {
  if (element.checked) {
    var source = $("#today-template").html();
    var template = Handlebars.compile(source);
    var html = template(userMedData);
    var currList = $("#currList");
    currList.append(html);
    deleteItem(item_id);
   }
}


function addMeds() {
/*
  console.log("Testing");
    if(dataIndex<3){
      //var person = prompt("Bill name:", "Electric bill");
      var source = $("#today-template").html();
      var template = Handlebars.compile(source);

      var name = document.getElementById('name').value;
      var num = document.getElementById('time').value;
      //var exp = document.getElementById('date').value;
      //var userMedTime = document.getElementById('time').value;
      //var note = document.getElementById('notes').value;
      var userMedData = {'title': name, 'time': num, 'index': 1};


      //var html = template(medData[dataIndex]);
      var html = template(userMedData);

      //$("#item1").toggle();
      var todayList = $("#mList");
      todayList.append(html);
    } else{
      var source2 = $("#future-template").html();
      var template = Handlebars.compile(source2);

      var html = template(medData[dataIndex]);
      var currList = $("#currList");
      //var box = $("#item1");
      //list.append(box);
    }
  dataIndex++;
  closePopup();*/
/*
  if(cancelled == true){
      cancelled = false;
    return;
  }*/

//updating bill count
  numOfItems++;
  localStorage.setItem('numOfItems', numOfItems);


    var source = $("#today-template").html();
    var template = Handlebars.compile(source);

    var name = document.getElementById('name').value;
    var num = document.getElementById('time').value;
    //var exp = document.getElementById('date').value;
    //var userMedTime = document.getElementById('time').value;
    //var note = document.getElementById('notes').value;
    var userItemData = {'title': name, 'time': num, 'index': 1};
    localStorage.setItem('item' + numOfItems , JSON.stringify(userItemData));

    var html = template(userItemData);

    //$("#item1").toggle();
    var todayList = $("#iList");
    todayList.append(html);
  closePopup();
  }

function deleteItem(item_id){
  //alert("Close clicked on " + item_id);
  var med_id = $("#" + item_id).parent().attr('id');
  //alert("Close clicked on " + med_id);
  $("#" + item_id).parent().remove();

  localStorage.removeItem(med_id);
  //numOfMeds--;
  //localStorage.setItem('numOfMeds', numOfMeds);
}

function editItem(item_id){
  alert("Edit clicked on " + item_id);
  deleteItem(item_id);
  openPopup();
  //NEED TO CHANGE to fill in fields with data
}

function delBoxes(){
    var boxes = document.getElementsByClassName('checkbox');
    for(var i = 0; i<boxes.length; i++){
        box = boxes[i];
        if(box.checked){
            box.parentNode.removeChild(box);
        }
    }
}

function  loadItems() {
  numOfItems = localStorage.getItem('numOfItems');
  for(i=1;  i <=numOfItems; i++){
    var itemData = JSON.parse(localStorage.getItem('item' + i));
    var itemDate = itemData['time'];
    var itemIndex = itemData['index'];
    //alert("The med num is " + medIndex);
    //TODAY'S MEDICINES
        var source = $("#today-template").html();
        var template = Handlebars.compile(source);
        var html = template(itemData);
        //$("#item1").toggle();
        var todayList = $("#iList");
        todayList.append(html);
  }
}
