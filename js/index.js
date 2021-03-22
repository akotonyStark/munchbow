var orderDataOBJ = {};
var finalBill = 0;
var finalDisplayBill = [];
var initializer = 1;




var finalOrderObj = [];

function calcBill() {
    var order = document.getElementById('order').value;
    document.getElementById('bill').innerHTML = '$' + order;
}

function recalcBill() {
    var order = document.getElementById('order').value;
    var quantity = document.getElementById('quantity').value;
    var amount = (Number(order) * quantity).toFixed(2);
    document.getElementById('bill').innerHTML = '$' + amount;
}

var updateOrderDisplay = function() {
    var addon = " + " + $('#addons').find('option:selected').text();
    var addonNum = $('#addOnQuantity').val();
    var addonItem = addon + '(' + addonNum + ')';

    //updating display
    //$('#orderValue').val() + addonItem;
    $('#orderValue').val($('#orderValue').val() + addonItem)

    //update bill
    var addonItemPrice = $('#addons').find('option:selected').val() * addonNum;
    var currentBill = document.getElementById('bill').innerHTML;
    var bill = (Number(currentBill.substring(1, currentBill.length)) + addonItemPrice)
    document.getElementById('bill').innerHTML = '$' + bill;
    finalDisplayBill.push(bill)

    //console.log(finalDisplayBill[finalDisplayBill.length - 1])

    document.getElementById('bill').innerHTML = '$' + (finalDisplayBill[finalDisplayBill.length - 1]).toFixed(2);

    document.getElementById('addons').disabled = true;
    document.getElementById('addOnQuantity').disabled = true;

}


function checkFields() {
    var name = document.getElementById('customerName').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var food = document.getElementById('order').value;
    var quantity = document.getElementById('quantity').value;
    var pickupDay = $('#pickupDay').find('option:selected').text();
    var pickupTime = $('#pickupTime').find('option:selected').text();

    if (name == "" || phone == "" || email == "" || food == "" || quantity == "" || pickupDay == "" || pickupTime == "") {
        toastr.info("Please make sure all fields have been filled");
        document.getElementById('submitButt').disabled = true;
        setTimeout(function() {

            document.getElementById('submitButt').disabled = false;
        }, 3000); // Delay 1sec for the file collection to be loaded completely.
    } else {
        document.getElementById('submitButt').disabled = false;
    }
}



$('#cancelProcess').click(function() {
    window.location = 'index.html';
})

$('#checkout').click(function() {
    document.getElementById('confirmBill').innerHTML = document.getElementById('finalBill').textContent;
})

$('#addItem').click(function() {

    $('#quantity, #note, #bill').val('');
    $('#bill').text('$0.00');
    $("#order").html(` <option value="" disabled selected>Select your food choice</option>
    <option value="" disabled selected>Select your food choice</option>
    <option value="3.00">Sandwich</option>

    <option value="70.00">Jollof (Family Pack)</option>

    <option value="70.00">Waakye (Family Pack)</option>
    <option value="15.00">Waakye, Gari, spaghetti, Veggies, Egg</option>
    <option value="15.00">Waakye, Gari, spaghetti, Veggies, Egg</option>
    <option value="15.00">Waakye, Gari, spaghetti, Veggies, Egg</option>
    <option value="15.00">Waakye, Gari, spaghetti, Veggies, Egg</option>

    <option value="70.00">Fried Rice (Family Pack)</option>
    <option value="15.00">Fried Rice, Veggies, Eggs, Beef</option>
    <option value="15.00">Fried Rice, Veggies, Eggs, Chicken</option>
    <option value="15.00">Fried Rice, Veggies, Eggs, Goat meat</option>
    <option value="15.00">Fried Rice, Veggies, Eggs, Fried Fish</option>
    
    <option value="55.00">Kenkey (Family Pack)</option>
    <option value="15.00">Kenkey, onions, Tomatoes, Fried fish</option>
    <option value="15.00">Kenkey, onions, Tomatoes, Goat meat</option>
    <option value="15.00">Kenkey, onions, Tomatoes, Beef</option>
    <option value="15.00">Kenkey, onions, Tomatoes, Chicken</option>`);

})

var today = new Date();
var tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
$(".datepicker").flatpickr({
    minDate: tomorrow,
    dateFormat: "m-d-Y"
});


function displayOrder() {
    var mainChoice = $('#order').find('option:selected').text();
    $('#orderValue').val('[' + initializer + '] ' + mainChoice);
}

function displayOrderWithNum() {
    var mainChoice = $('#order').find('option:selected').text() + " " + $('#proteinChoice').find('option:selected').val();
    //var mainChoice = $('#orderValue').val();
    var quantity = document.getElementById('quantity').value;
    var count = (Number(initializer) * quantity);
    $('#orderValue').val('[' + count + '] ' + mainChoice);
}

function listenForFamilyPack() {
    let decider = $('#order').find('option:selected').text();
    if (decider.includes('amily')) {
        $('#family-modal').modal({
            show: true
        });
    }
}

function addFamilyPackProtein() {
    let protein = $('#proteinChoice').find('option:selected').val();
    $('#orderValue').val($('#orderValue').val() + ' ' + protein)
}

var enableOrderQuan = function() {
    document.getElementById('addOnQuantity').disabled = false;
    // document.getElementById('bill').innerHTML = '$' + finalDisplayBill;

    //deselecting options on select
}

function addToCart() {

    var name = document.getElementById('customerName').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var foodPrice = document.getElementById('order').value;
    var food = document.getElementById('order').textContent;
    var quantity = document.getElementById('quantity').value;
    var date = new Date(Date.now());
    var bill = document.getElementById('bill').textContent;

    var addonn = "";
    if ($('#addons').find('option:selected').text() == 'Select your add-ons') {
        addonn = ""
    } else {
        addonn = $('#addons').find('option:selected').text()
    }


    if (name == "" || phone == "" || email == "" || food == "" || quantity == "" || date == "") {
        toastr.info("Please make sure all fields have been filled");
        document.getElementById('submitButt').disabled = true;
    } else {
        document.getElementById('submitButt').disabled = false;

        var orderOBJ = {
            id: name.substring(0, 2) + Math.floor(Math.random() * 10000000 + 1),
            name: name,
            phone: phone,
            email: email,
            //foodName: $('#order').find('option:selected').text(),
            pickupDay: $('#pickupDay').find('option:selected').text(),
            pickupTime: $('#pickupTime').find('option:selected').text(),
            order: $('#orderValue').val(),
            foodPrice: foodPrice,
            quantity: quantity,
            date: (date.toString()).substring(0, 24),
            bill: bill.substring(1, bill.length),
            addons: addonn,
            addonNum: $('#addOnQuantity').val(),
            specifications: $('#note').val()

        }

        //console.table(orderOBJ);
        orderDataOBJ = orderOBJ;
        console.table(orderDataOBJ);

        finalOrderObj.push(orderDataOBJ);
        //console.log(finalOrderObj)

        $("#cartGroup").append(
            `<li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">` +
            orderDataOBJ.order + `<span class="badge badge-primary badge-pill">$` + orderDataOBJ.bill + `</span></li>`);


        finalBill = (finalBill) + Number(orderDataOBJ.bill);
        document.getElementById('finalBill').textContent = '$' + finalBill.toFixed(2);

    }


}




// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDIjey6qSWuZ3bMyJvCbjpGUjwfdjG-ko0",
    authDomain: "dashboard-84a76.firebaseapp.com",
    databaseURL: "https://dashboard-84a76.firebaseio.com",
    projectId: "dashboard-84a76",
    storageBucket: "dashboard-84a76.appspot.com",
    messagingSenderId: "210552530619",
    appId: "1:210552530619:web:3610fa9dd9bfa531a4eb9e",
    measurementId: "G-W8TE09FJQ1"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);



function sendOrder() {

    $('#loader').addClass('show');

    //var ref = firebase.database().ref('munchbowOrders');

    for (var i in finalOrderObj) {
        //ref.push(finalOrderObj[i]);
        //console.log(finalOrderObj[i])

        firebase.database().ref('munchbowOrders/' + finalOrderObj[i].id).set(finalOrderObj[i]);
    }

    toastr.success("You have successfully placed your order. Thank you for shopping with us.")


    // document.getElementById('myModal').dismiss = true;
    setTimeout(function() {

        window.location = 'index.html'
    }, 3000); // Delay 1sec for the file collection to be loaded completely...
}


$(document).ready(function() {

})