// create the array to store the objects
const contacts = [];
// create the class that creates the objects
class Contact {
  constructor(name, surname, number, address) {
    this._name = name;
    this._surname = surname;
    this._number = number;
    this._address = address;
  }
  get name() {
    return this._name;
  }
  get surname() {
    return this._surname;
  }
  get number() {
    return this._number;
  }
  get address() {
    return this._address;
  }
}
/* the function takes in data from the HTML form, creates the objects and pushes them in the array */
$('#clicker').on('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const number = document.getElementById('number').value;
  const address = document.getElementById('address').value;
  const input = new Contact(name, surname, number, address);
  // check to confirm that the object does not exist in the array already
  const check = contacts.some((elem) => {
    return JSON.stringify(input) === JSON.stringify(elem);
  });
  if (!check) {
    contacts.push(input);
    // display the data
    dataDisplay(contacts);
    // empty the input fields
    $('#name,#surname,#number,#address').val('');
  }
});

// the function searches the array for the requested object and returns the search results
$('#search').on('submit', function(event) {
  event.preventDefault();// prevent the form from reloading
  // get the values that need to be searched
  const name = document.getElementById('sname').value;
  const surname = document.getElementById('ssur').value;
  // iterate through the array to search for a matche
  for (let i = 0; i < contacts.length; i++) {
    // if a matche is found use the object getters to get the values
    if (contacts[i].name === name && contacts[i].surname === surname) {
      const name = contacts[i].name;
      const surname = contacts[i].surname;
      const number = contacts[i].number;
      const address = contacts[i].address;
      // display the results of the values
      $('#search-results').text(name + ' ' + surname + ' Number is: ' + number + ', and his/hers Address is: '+ address + '.');
      // empty the input fields
      $('#sname,#ssur').val('');
      // hide the results after 10 sec
      $('#search-results').show().delay(10000).queue(function(n) {
        $(this).hide(); n();
      });
    }
  }
});

// delete a contact or in this case remove it from the array
$('#delete').on('submit', function(event) {
  event.preventDefault();// prevent the form from reloading
  const name = document.getElementById('dname').value;
  const surname = document.getElementById('dsur').value;
  // iterate through the array to find the object
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].name === name && contacts[i].surname === surname) {
      // get the index of the object
      const index = contacts.indexOf(contacts[i]);
      // remove the object from the string
      contacts.splice(index, 1);
      // renew the display of the array content to not include the item that was removed
      dataDisplay(contacts);
      // display a confirmation message
      $('#delete-results').text('Contact has been deleted.');
      // empty the input fields
      $('#dname,#dsur').val('');
      // hide the message after 3 sec
      $('#delete-results').show().delay(3000).queue(function(n) {
        $(this).hide(); n();
      });
    }
  }
});

// display data on the page
function dataDisplay(ar) {
  let str = '';
  let cnum = 1;
  // iterate throught the array of objects
  for (let i = 0; i < ar.length; i++) {
    // create a string with all the values that exist in the array
    const input = ` * ${cnum}. ${ar[i].name} ${ar[i].surname}, ${ar[i].number}, ${ar[i].address} * `;
    str += input;
    cnum++;
  }
  $('#row').text(str);// pass the string on the selected element
};

/* Building process and ideas.
My idea for the process was to use an array to store
all the data that the users would submit.
I decided to use a class which will create Contacts (object instances)
and then i would push those objects in the array.
I would then manipulate the array to search, display and delete the objects.
 I used getters to get the values of the object keys.*/

