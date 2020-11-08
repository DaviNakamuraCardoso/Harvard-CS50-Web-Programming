
document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', () => compose_email());
  document.querySelector("form").onsubmit = send_mail;


  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {


  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  let recipient = document.querySelector('#compose-recipients');
  let subject = document.querySelector('#compose-subject');
  let body = document.querySelector('#compose-body');
  // Clear out composition fields
  recipient.value = '';
  subject.value = '';
  body.value = '';
    


}



function load_mailbox(mailbox) {

  // Get the main division 
  const view = document.querySelector("#emails-view");

  // Show the mailbox and hide other views
  view.style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector("#mail-view").style.display = 'none';

  // Show the mailbox name
  view.innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
 




  


  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
    emails.forEach(email => {

      // Create the basic email elements 
      const element = document.createElement(`div.${mailbox}`);
      const title = document.createElement("h3");
      const body = document.createElement("ul");
      const sender = document.createElement("li.sender");
      const recipients = document.createElement("li.recipients");
      const archive = document.createElement("button");
      const read = document.createElement("button");
      const reply = document.createElement("button");
      

      // Insert the texts 
      title.innerHTML = `${email.subject}`;
      sender.innerHTML = `${email.sender} on ${email.timestamp}`;
      recipients.innerHTML = `To: ${email.recipients}`;
      reply.innerHTML = "Reply";



      




      // Adding the smaller elements to the div 
      body.append(sender);
      body.append(recipients);
      element.append(title);
      element.append(body);
      element.append(archive);
      element.append(read);
      element.append(reply);

      if (email.read) {
        element.style.color = 'gray';
      }
      else {
        element.style.color = 'red';
      }

      // Opens the email when clicked  
      title.addEventListener('click', () => {
        get_mail(email.id);
      });
      title.style.cursor = 'pointer';

      // Adds the possibility to archive the emails
      update_archive(email, archive);
      update_reads(email, read);
      
      reply.addEventListener("click", () => {
        reply_email(email);
      });

      view.append(element);
    



      


    });

  });
}
    
function update_archive(email, button) {
  if (!email.archived) {
    button.innerHTML = "Archive";
    button.addEventListener("click", () => {
      fetch(`/emails/${email.id}`, {
        method: 'PUT', 
        body: JSON.stringify({
          archived: true
        })
      })
      .then(() => {
        load_mailbox('inbox');
      });
    });
  }
  else {
    button.innerHTML = "Unarchive";
    button.addEventListener('click', () => {
      fetch(`/emails/${email.id}`, {
        method: 'PUT', 
        body: JSON.stringify({
          archived: false
        })
        
      })
      .then(() => {
        load_mailbox('archive');
      });
    });
  }



}


function update_reads(email, button) {
  if (!email.read) {
    
    button.innerHTML = "Mark Read";
    button.addEventListener('click', () => {
      fetch(`/emails/${email.id}`, {
        method: 'PUT', 
        body: JSON.stringify({
          read: true
        })
      })
      .then(() => {
        load_mailbox('inbox');
      });
    })
  }
  else {

    button.innerHTML = "Unmark Read";
    button.addEventListener('click', () => {
      fetch(`/emails/${email.id}`, {
        method: 'PUT', 
        body: JSON.stringify({
          read: false
        })
      })
      .then(() => {
      load_mailbox('inbox');
      });

    });
        
  }
}

function reply_email(email) {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  let recipient = document.querySelector('#compose-recipients');
  let subject = document.querySelector('#compose-subject');
  let body = document.querySelector('#compose-body');


    
  recipient.value = email.sender;
  subject.value = `Re: ${email.subject}`;
  body.value = `On ${email.timestamp} ${email.sender} wrote: "${email.body}"`;

}

function send_mail() {

  const recipients = document.querySelector("#compose-recipients").value;
  const subject = document.querySelector("#compose-subject").value;
  const body = document.querySelector("#compose-body").value;

  fetch("/emails", {
    method: 'POST', 
    body: JSON.stringify({
      recipients: recipients, 
      subject: subject, 
      body: body
    })
  })
  .then(response => response.json())
  .then(result => {
    document.querySelector("#message").innerHTML = result.message;
    
    
  });

}




function get_mail(id) {
  const inbox = document.querySelector("#emails-view");
  const mail = document.querySelector('#mail-view');

  inbox.style.display = 'none';
  mail.style.display = 'block';

  fetch(`/emails/${id}`)
  .then(response => response.json())
  .then(email => {
    mail.innerHTML = `
    <h2>Subject: ${email.subject}</h2>
    <h3>From: ${email.sender}</h3>
    <h3>To: ${email.recipients}</h3>
    <h6>${email.timestamp}</h6>

    <p>${email.body}</p>
    `;
    
    
  });
  fetch(`/emails/${id}`, {
    method: 'PUT', 
    body: JSON.stringify({
      read: true
    })
  })


}



    
      