$(document).ready(function() {
  console.log("Local storage length is " + localStorage.length);

  if(localStorage.length > 0) loadDashboardData();
})

var d = new Date();
var todaysDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

var numOfBills = 0;
var numOfMeds = 0;
var numOfGrocs = 0;
var billIndex = 0;
var medIndex = 0;
var grocIndex = 0;


function loadDashboardData(){
  //load 3 of each bill/med/groceries

  //Bills
  numOfBills = localStorage.getItem('numOfBills');
  billIndex = localStorage.getItem('billIndex');
  if(numOfBills > 0) {
    $('#noBills').hide();
    for(i=1; i<=numOfBills ; i++){
      var billData = JSON.parse(localStorage.getItem('bill' + i));
      var billDate = billData['date'];
      var billIndex = billData['index'];
      //alert("The med num is " + medIndex);
      console.log("The bill num is " + billIndex);
      //TODAY'S MEDICINES

          //alert("Testing med load");
          var source = $("#bill-template").html();
          var template = Handlebars.compile(source);

          var html = template(billData);

          //$("#item1").toggle();
          var billList = $("#billBox");
          billList.append(html);


    }
  }
  else {
    $('#noBills').show();

  }



  //MEDICINES
  numOfMeds = localStorage.getItem('numOfTodayMeds');
  medIndex = localStorage.getItem('medIndex');

  console.log("Medicine")
  if(numOfMeds > 0){
    $('#noMeds').hide();
    for(i=1; i<=numOfMeds ; i++){
      var medData = JSON.parse(localStorage.getItem('med' + i));
      var medDate = medData['date'];
      var medIndex = medData['index'];
      //alert("The med num is " + medIndex);
      console.log("The med num is " + medIndex);
      //TODAY'S MEDICINES
        if(medDate == todaysDate){
          //alert("Testing med load");
          var source = $("#med-template").html();
          var template = Handlebars.compile(source);

          var html = template(medData);

          //$("#item1").toggle();
          var medicineList = $("#medBox");
          medicineList.append(html);
        }
        //CURRENTLY TAKING
        /*else{
          var source2 = $("#future-template").html();
          var template = Handlebars.compile(source2);

          var html = template(medData);
          var currList = $("#currList");
          //var box = $("#item1");

          currList.append(html);
          //list.append(box);
        }*/
    }
  }
  else {
      $('#noMeds').show();
  }


  //Groceries
  numOfGrocs = localStorage.getItem('numOfItems');
  grocIndex = localStorage.getItem('grocIndex'); 

  console.log('GROCERIES' + numOfGrocs);
  if(numOfGrocs > 0) {

    $('#noGroc').hide();
    for(i=1; i<=numOfGrocs ; i++){
      var grocData = JSON.parse(localStorage.getItem('item' + i));
      //var grocDate = grocData['date'];
      var grocIndex = grocData['index'];
      //alert("The med num is " + medIndex);
      console.log("The groc num is " + grocIndex);
      //TODAY'S MEDICINES

          //alert("Testing med load");
          var source = $("#groc-template").html();
          var template = Handlebars.compile(source);

          var html = template(grocData);

          //$("#item1").toggle();
          var grocList = $("#grocBox");
          grocList.append(html);


    }
  }
  else {
    $('#noGroc').show();

  }

}
