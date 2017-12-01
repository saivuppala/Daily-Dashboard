var numOfItems = 0;
var numOfBoughts = 0;
var index = 0;
$(document).ready(function() {
  numOfItems = localStorage.getItem('numOfItems');
  numOfBoughts = localStorage.getItem('numOfBoughts');
  index = localStorage.getItem('grocIndex');
  $("#noGroc").show();
  $("#noBought").show();

  if(numOfItems > 0 || numOfBoughts > 0) loadItems();
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

    $("#noBought").hide();
    //var this_id = $(item_id).parent().parent().attr('id');
    var this_id = $("#" + item_id).parent().parent().attr('id');
    console.log(item_id + " : " + this_id)
    var arr = JSON.parse(localStorage.getItem(this_id) );
    console.log(arr);
    var source = $("#future-template").html();
    var template = Handlebars.compile(source);
    var html = template(arr);
    var pList = $("#pList");
    pList.append(html);
    deleteThisItem(this_id);
    localStorage.setItem('bought' + index , JSON.stringify(arr));
    numOfBoughts++;
    localStorage.setItem('numOfItems', numOfItems);
    localStorage.setItem('numOfBoughts', numOfBoughts);
   }
}

function deleteThisItem(item_id){
  //alert("Close clicked on " + item_id);
  //var items_id = $("#" + item_id).parent().attr('id');
  //alert("Close clicked on " + med_id);
  //console.log(item_id)
  $("#" + item_id).parent().parent().remove();

  localStorage.removeItem(item_id);
  numOfItems--;
  if(numOfItems == 0) $("#noGroc").show();
  if(numOfBoughts == 0)  $("#noBought").show();
  //localStorage.setItem('numOfMeds', numOfMeds);
}

function deleteBought(bought_id){
  var items_id = $("#" + bought_id).parent().attr('id');
  //alert("Close clicked on " + med_id);
  console.log(items_id);
  $("#" + items_id).parent().parent().remove();

  localStorage.removeItem(items_id);
  console.log(numOfBoughts);
  numOfBoughts--;
  console.log(numOfBoughts);
  localStorage.setItem('numOfBoughts', numOfBoughts);
  if(numOfItems == 0) $("#noGroc").show();
  if(numOfBoughts == 0)  $("#noBought").show();

}

function addMeds() {
//updating bill count
  numOfItems++;
  index++;
  localStorage.setItem('grocIndex', index);
  localStorage.setItem('numOfItems', numOfItems);
  $("#noGroc").hide();  

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

    $("#item" + numOfItems + "notes").hide();
  closePopup();
  }

function deleteItem(item_id){
  //alert("Close clicked on " + item_id);
  var items_id = $("#" + item_id).parent().attr('id');
  var div_id = $("#" + item_id).parent().parent().parent().attr('id');
  //alert("Close clicked on " + med_id);
  //$("#" + item_id).parent().remove();
  $("#" + div_id).remove();
  //alert("Close clicked on " + med_id);
  console.log(items_id);
  //$("#" + items_id).remove();

  localStorage.removeItem(items_id);
  numOfItems--;
  localStorage.setItem('numOfItems', numOfItems);
  if(numOfItems == 0) $("#noGroc").show();
  if(numOfBoughts == 0)  $("#noBought").show();
}

function editItem(item_id){
  alert("Edit clicked on " + item_id);
  deleteItem(item_id);
  openPopup();
  //NEED TO CHANGE to fill in fields with data
}

function  loadItems() {
  numOfItems = localStorage.getItem('numOfItems');
  if(numOfItems != 0) $("#noGroc").hide();

  for(i=index-numOfItems+1; i<=index; i++){
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
        $("#item" + i + "notes").hide();

  }

  numOfBoughts = localStorage.getItem('numOfBoughts');
  if(numOfBoughts != 0)  $("#noBought").hide();
  for(i=1;  i <=numOfBoughts; i++){
    var itemData = JSON.parse(localStorage.getItem('bought' + i));
    var itemDate = itemData['amount'];
    var itemIndex = itemData['index'];
    //alert("The med num is " + medIndex);
    //TODAY'S MEDICINES
        var source = $("#future-template").html();
        var template = Handlebars.compile(source);
        var html = template(itemData);
        //$("#item1").toggle();
        var todayList = $("#pList");
        todayList.append(html);
  }
}

// function showNotes(div_id){
//   //alert("Bill clicked on " + div_id);
//   $("#" + div_id + "notes").toggle();
// }

function showNotes(btn_id){

  var div_id = $("#" + btn_id).children().attr('id');

  $("#" + div_id + "notes").toggle();
}

function showAllInfo(btn_id){
  var div_id = $("#" + btn_id).children().attr('id');

  $("#" + div_id + "info").toggle();

}
