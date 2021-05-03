// Get the modal
var modal = document.getElementById("myModal");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

modalPopup = function() {
  modal.style.display = "block";
}

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

function submitForm(token) {
  var form = document.getElementById("emailForm");
  var recaptchaVerified = document.getElementById("recaptchaVerified").value;

  console.log('emailform', form);
  console.log('recaptcha value', recaptchaVerified);

  var templateParams = {
      from_name: form.elements['nameInput'].value,
      select_service: form.elements['selectService'].value,
      service_description: form.elements['description'].value,
      from_email: form.elements['emailInput'].value,
      from_phone: form.elements['phoneInput'].value,
      reply_to: form.elements['emailInput'].value
  }

  console.log('these are the template params', templateParams);

  var testmode = true;

  if (recaptchaVerified == "true" || testmode) {            
    emailjs.send("service_dwam48l","template_7jotlbd",templateParams).then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      modal.style.display = "none";
      alert('Quote requested!');
      form.reset();
    }, function(error) {
      console.log('FAILED...', error);
    });      
  } else {
    alert('Please verify you are are not a robot');
  }
  return false;
}

// Captcha3.0

function checkRecaptcha() {
  var response = grecaptcha.getResponse();
  if(response.length == 0) {     
    alert("You were reported as a bot!");
    console.log('recaptcha failed');     
  }
  else { 
    document.getElementById("recaptchaVerified").value = "true";
    console.log('recaptcha passed');
  }
}

//emailJs

(function(){
    emailjs.init("user_rDIHcLv0Jp41QFxvCjr4C");
 })();
 

 // Disable Carousel in mobile