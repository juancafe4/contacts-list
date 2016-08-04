// Create an object of contacts


$(() => {

  $.get("/contacts", data => {
    addToTable(data )
    $('.modal-trigger').leanModal();

    $('#contactForm').submit(addContact);
    $('#contacts').on('click', 'tr', showOptions)
    
    $('#contacts').on('click', '.delete', deleteContact); 
    $('#contacts').on('click', '.edit', editContact); 
    $('#editContactButton').click(saveUpdate)
  })


  // let contacts = contactsFromStorage()
  // let $trs = contacts.map((contact) => {
  //   return createTr(contact.firstName, contact.lastName, contact.email, contact.phone)
  // }); 

  // $('.modal-trigger').leanModal();

  // $('#contacts').append($trs);
  

  
})

function addToTable(contacts) {
  let $tr
  contacts.forEach(contact => {
    let $tr = $('#template').clone();

    $tr.removeAttr('id');

    $tr.children('.firstName-table').text(contact.first_name);
    $tr.children('.lastName-table').text(contact.last_name);
    $tr.children('.email-table').text(contact.email);
    $tr.children('.phone-table').text(contact.phone);

    $tr.data('dataId', contact.id)

    $('#contacts').append($tr)
  });
}
//Save and Updates and changes
function saveUpdate(event) {
  console.log('save')
  let $tr = $('#contacts').children()[$('#contacts').data('index')];

  let firstName = $($tr).find('.firstName-table').text()
  let lastName = $($tr).find('.lastName-table').text()
  let email = $($tr).find('.email-table').text()
  let phone = $($tr).find('.phone-table').text()


  let firstNameEdit = $('#firstNameEdit').val()
  let lastNameEdit = $('#lastNameEdit').val()
  let emailEdit = $('#emailEdit').val()
  let phoneEdit = $('#phoneEdit').val()

  //Create and object for contact
  let putContact = {first_name: firstNameEdit, 
    last_name: lastNameEdit, email: emailEdit, phone: phoneEdit}
  $.ajax({
    type : 'PUT',
    url : "/contacts/" + $($tr).data('dataId'),
    data: putContact,
    success : function(data) {
      console.log('Success updating contact!')
    }, 
    error : function(err) {
      console.log("Error updating contact!")
    }
  });
  // contacts[index].firstName = firstNameEdit;
  // contacts[index].lastName = lastNameEdit;
  // contacts[index].email = emailEdit;
  // contacts[index].phone = phoneEdit;
  // writeToStorage(contacts)

  $($tr).find('.firstName-table').text(firstNameEdit)
  $($tr).find('.lastName-table').text(lastNameEdit)
  $($tr).find('.email-table').text(emailEdit)
  $($tr).find('.phone-table').text(phoneEdit)

  $('#contacts').children('.view').removeClass()
  $('.delete').css('display', 'none')
  $('.edit').css('display', 'none')
  $('#contactEditModal').closeModal();
}
//Displays the options delete edit
function showOptions(e) {
  $tr = e.target.parentElement
  $('#contacts').children('.view').removeClass()
  $('.delete').css('display', 'none')
  $('.edit').css('display', 'none')

  if (!$($tr).hasClass('view')) { 

    let $delete = $(this).find('.delete')
    $delete.css('display', 'initial')
    let $edit = $(this).find('.edit')
    $edit.css('display', 'initial')
    $($tr).addClass('view')
  }

  else{
    $($tr).removeClass('view')
  }
}


// edits a contact
function editContact(e) {
  console.log('edit')

  let $tr = $(this).parent('td').parent('tr')

  $('#contacts').data('index', $tr.index());
  $('#contactEditModal').openModal();
  $('#firstNameEdit').val($tr.find('.firstName-table').text())
  $('#lastNameEdit').val($tr.find('.lastName-table').text())
  $('#emailEdit').val($tr.find('.email-table').text())
  $('#phoneEdit').val($tr.find('.phone-table').text())

  $('.delete').css('display', 'none')
  $('.edit').css('display', 'none')
  $('#contacts').children('.view').removeClass()
}
// it deletes a contact
function deleteContact() {

  let $tr = $(this).parent('td').parent('tr')

  $.ajax({
    type : 'DELETE',
    url : "/contacts/" + $tr.data('dataId'),
    success : function(data) {
      console.log('Success deleting contact!')
    }, 
    error : function(err) {
      console.log("Error deleting contact!")
    }
  });
  $tr.remove();
}

// //Find the index that we looking for 
// function findFromStorage(firstName, lastName, email, phone) {
//   let contacts = contactsFromStorage()

//   for (let i = 0; i < contacts.length; i++) {
//     let contact = contacts[i]

//     if (contact.firstName === firstName && contact.lastName === lastName
//       && contact.email === email && contact.phone === phone) {

//       return i;
//     }
//   }

//   return - 1;
// }

// /*Create The contact andattach it*/
function addContact(event) {
  event.preventDefault();

  let first_name = $('#firstName').val();
  $('#firstName').val('');
  let last_name = $('#lastName').val();
  $('#lastName').val('');
  let phone = $('#phone').val();
  $('#phone').val('');
  let email = $('#email').val();
  $('#email').val('');

  let $tr = createTr(first_name, last_name, email, phone);
  

  //Create object for contact
  let contact = {first_name: first_name, last_name: last_name,
    email:email, phone:phone}
    $.post( "/contacts", contact, function(data) {
      console.log(data)
      $tr.data('id', 'dataId');
      $("#contacts").append($tr);
    });

  }

// // This function helps to create a tr to attach to the tbody
function createTr(firstName, lastName, email, phone) {
  let $tr = $('#template').clone();

  $tr.removeAttr('id');

  $tr.children('.firstName-table').text(firstName);
  $tr.children('.lastName-table').text(lastName);
  $tr.children('.email-table').text(email);
  $tr.children('.phone-table').text(phone);

  return $tr;
}

// /*Adding to storage*/
// function addToStorage(contact) {
//   // 1. Read
//   // 2. Parse
//   let contacts = contactsFromStorage();

//   // 3. Modify
//   contacts.push(contact);

//   // 4. Stringify
//   // 5. Write
//   writeToStorage(contacts);
// }

// /*Write to storage */
// function writeToStorage(contacts) {
//   localStorage.contacts = JSON.stringify(contacts);
// }

// function contactsFromStorage() {
//   // read 
//   let json = localStorage.contacts;
//   let contacts;

//   // parse
//   try {
//     contacts = JSON.parse(json);
//   } catch(e) {
//     contacts = [];
//   }

//   return contacts;
// }