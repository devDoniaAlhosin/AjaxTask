let data = [];
let select = document.getElementById("select");
var defaultOption = document.createElement("option");

function fetchDataAndPopulateSelect() {
  var ajax = new XMLHttpRequest();

  ajax.open("GET", "https://jsonplaceholder.typicode.com/users");
  ajax.send();

  ajax.onreadystatechange = function () {
    if (ajax.readyState === 4) {
      if (ajax.status === 200) {
        data = JSON.parse(ajax.responseText);
        populateSelect(data);
        addSelectChangeEvent(data);
      } else {
        console.log("Error fetching data:", ajax.status);
      }
    }
  };
}

function populateSelect(data) {
  // Create and append the default option
  defaultOption.text = "Select A User";
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  select.appendChild(defaultOption);

  data.forEach(function (user) {
    var option = document.createElement("option");
    option.text = user.name;
    option.value = user.id;
    select.appendChild(option);
  });
}

function addSelectChangeEvent(data) {
  select.addEventListener("change", function () {
    var userId = parseInt(select.value);
    var selectedUser = data.find(function (user) {
      return user.id === userId;
    });

    displayUserData(selectedUser);
  });
}

function displayUserData(user) {
  var userContentDiv = document.querySelector(".user-content");
  userContentDiv.innerHTML = "";

  if (user) {
    var userInfo = `
    <div class="info">
    
      <h2>User Information</h2>
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      <p><strong>Website:</strong> ${user.website}</p>
      <p><strong>Company:</strong> ${user.company.name}</p>
      <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}</p>
    </div>
    
    `;
    userContentDiv.innerHTML = userInfo;
  } else {
    userContentDiv.innerHTML = "<p>No user selected.</p>";
  }
}

//  save user data to cookies
function saveUserDataToCookies(user) {
  if (user) {
    var userData = JSON.stringify(user);
    document.cookie = `userData=${userData}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    console.log("User data saved to cookies.");
  }
}

//  remove user data from cookies
function removeUserDataFromCookies() {
  document.cookie = "userData=; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // setting expiration
  console.log("User data removed from cookies.");
}

// Save button
document
  .querySelector(".container-btn .btn:nth-child(1)")
  .addEventListener("click", function () {
    var userId = parseInt(select.value);
    var selectedUser = data.find(function (user) {
      return user.id === userId;
    });

    saveUserDataToCookies(selectedUser);
  });

// Clear button
document
  .querySelector(".container-btn .btn:nth-child(2)")
  .addEventListener("click", function () {
    defaultOption.text = "Select A User";
    defaultOption.value = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);
    removeUserDataFromCookies();
    displayUserData(null);
  });

// Call the fetchDataAndPopulateSelect function when the script loads
fetchDataAndPopulateSelect();
