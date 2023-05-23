const SERVICE_ID = 'service_8ha8zsr';
const TEMPLATE_ID = 'template_818rrje';
const PUBLIC_KEY = 'm4ZQWdZFPmmqk9ggA';

const form = document.getElementById('feedback-form');
const submitButton = document.getElementById('submitButton');


form.addEventListener("submit", (e)=>{

    e.preventDefault();
    console.log('Default Prevented....')
    console.log(SERVICE_ID);

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
       alert("Feedback Sent Succesfully!")
    }, function(error) {
       console.log('FAILED...', error);
       alert("Something went wrong!")
    });
    
})
