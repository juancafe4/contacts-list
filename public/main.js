// Create an object of contacts


$(() => {
  let contacts = contactsFromStorage()
  let $trs = contacts.map((contact) => {
    return createTr(contact.firstName, contact.lastName, contact.email, contact.phone)
  }); 

  $('.modal-trigger').leanModal();

  $('#contacts').append($trs);
  $('#contactForm').submit(addContact);

  $('#contacts').on('click', '.delete', deleteContact); 
  $('#contacts').on('click', '.edit', editContact); 

  $('#contacts').on('click', 'tr', showOptions)
  $('#editContactButton').click(saveUpdate)
})


//Save and Updates and changes
function saveUpdate(event) {
  event.preventDefault();
  console.log('save')
  let $tr = $('#contacts').children()[$('#contacts').data('index')];
  
  let firstName = $($tr).find('.firstName-table').text()
  let lastName = $($tr).find('.lastName-table').text()
  let email = $($tr).find('.email-table').text()
  let phone = $($tr).find('.phone-table').text()
  
  let index = findFromStorage(firstName, lastName, email, phone);
  let contacts = contactsFromStorage()
  let firstNameEdit = $('#firstNameEdit').val()
  let lastNameEdit = $('#lastNameEdit').val()
  let emailEdit = $('#emailEdit').val()
  let phoneEdit = $('#phoneEdit').val()

  
  contacts[index].firstName = firstNameEdit;
  contacts[index].lastName = lastNameEdit;
  contacts[index].email = emailEdit;
  contacts[index].phone = phoneEdit;
  writeToStorage(contacts)

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
  console.log('delete');

  let $tr = $(this).parent('td').parent('tr')

  let firstName = $tr.find('.firstName-table').text()
  let lastName = $tr.find('.lastName-table').text()
  let email = $tr.find('.email-table').text()
  let phone = $tr.find('.phone-table').text()

  let index = findFromStorage(firstName, lastName, email, phone);
  let contacts = contactsFromStorage()
  contacts.splice(index, 1);
  writeToStorage(contacts)
  $tr.remove();
}

//Find the index that we looking for 
function findFromStorage(firstName, lastName, email, phone) {
  let contacts = contactsFromStorage()

  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i]

    if (contact.firstName === firstName && contact.lastName === lastName
      && contact.email === email && contact.phone === phone) {
      
      return i;
    }
  }

  return - 1;
}

/*Create The contact andattach it*/
function addContact(event) {
  event.preventDefault();

  let firstName = $('#firstName').val();
  $('#firstName').val('');
  let lastName = $('#lastName').val();
  $('#lastName').val('');
  let phone = $('#phone').val();
  $('#phone').val('');
  let email = $('#email').val();
  $('#email').val('');
  
  let $tr = createTr(firstName, lastName, email, phone);
  $("#contacts").append($tr);

  //Create object for contact
  let contact = {firstName: firstName, lastName: lastName,
    email:email, phone:phone}
    addToStorage(contact)
    console.log(contact)
  }

// This function helps to create a tr to attach to the tbody
function createTr(firstName, lastName, email, phone) {
  let $tr = $('#template').clone();

  $tr.removeAttr('id');

  $tr.children('.firstName-table').text(firstName);
  $tr.children('.lastName-table').text(lastName);
  $tr.children('.email-table').text(email);
  $tr.children('.phone-table').text(phone);
  
  return $tr;
}

/*Adding to storage*/
function addToStorage(contact) {
  // 1. Read
  // 2. Parse
  let contacts = contactsFromStorage();

  // 3. Modify
  contacts.push(contact);

  // 4. Stringify
  // 5. Write
  writeToStorage(contacts);
}

/*Write to storage */
function writeToStorage(contacts) {
  localStorage.contacts = JSON.stringify(contacts);
}

function contactsFromStorage() {
  // read 
  let json = localStorage.contacts;
  let contacts;

  // parse
  try {
    contacts = JSON.parse(json);
  } catch(e) {
    contacts = [];
  }

  return contacts;
}