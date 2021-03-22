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



function sendMessage() {

    $('#loader').addClass('show');

    var name = $('#name').val();
    var message = {
        id: name.substring(0, 2) + Math.floor(Math.random() * 10000000 + 1),
        name: $('#name').val(),
        phone: $('#phone').val(),
        email: $('#email').val(),
        message: $('#message').val()
    }

    firebase.database().ref('muchbowEnquiries/' + message.id).set(message);

    console.log(message);

    toastr.success("Your message has successfully been sent. We'll get back to you shortly. Thank you for contacting us.")


    // document.getElementById('myModal').dismiss = true;
    setTimeout(function() {
        $('#loader').removeClass('show');
        $('#name').val("");
        $('#phone').val("");
        $('#email').val("");
        $('#message').val("");

    }, 2000); // Delay 1sec for the file collection to be loaded completely...
}