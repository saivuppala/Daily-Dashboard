var numOfItems = 0;
var index = 1;
$(document).ready(function() {
  numOfItems = localStorage.getItem('numOfItems');
  console.log(numOfItems);
  if(numOfItems > 0) loadItems();
  $("#addBillsButton").click(openPopup);
  $("#cancelAddBill").click(closePopup);
  $("#addNewBill").click(addMeds);
})

var dataIndex = 0;

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
    var this_id = $(item_id).parent().parent().attr('id');
    console.log(item_id + " : " + this_id)
    var arr = JSON.parse(localStorage.getItem(this_id) );
    //var userItemData = {'title': name, 'amount': num, 'index': 1};
    console.log(arr);
    var source = $("#today-template").html();
    var template = Handlebars.compile(source);
    var html = template(arr);
    var pList = $("#pList");
    pList.append(html);

   }
}


function addMeds() {
//updating bill count
  numOfItems++;
  index++;
  localStorage.setItem('numOfItems', numOfItems);

    var source = $("#today-template").html();
    var template = Handlebars.compile(source);

    var name = document.getElementById('name').value;
    var num = document.getElementById('amount').value;
    //var exp = document.getElementById('date').value;
    //var userMedTime = document.getElementById('time').value;
    //var note = document.getElementById('notes').value;
    var userItemData = {'title': name, 'amount': num, 'index': index};
    localStorage.setItem('item' + index , JSON.stringify(userItemData));

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
    var itemDate = itemData['amount'];
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
