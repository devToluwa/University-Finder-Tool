// Elements
const countrySearchInput = document.getElementById("country-search");
const countryList = document.getElementById("country-list");
const fetchBtn = document.getElementById("fetch-btn");
const numberOfUniversitiesDiv = document.querySelector(
  ".number-of-universities"
);
const universityListDiv = document.getElementById("university-list");

let countries = [];
let selectedCountry = "";

// Fetch all countries from the REST Countries API
function getCountries() {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      // Extract the country names and sort them alphabetically
      countries = data.map((country) => country.name.common).sort();
    })
    .catch((error) => {
      console.error("Error fetching countries:", error);
    });
}
getCountries();

// Display the list of countries filtered by search term
function filterCountries(searchTerm) {
  countryList.innerHTML = "";
  universityListDiv.innerHTML = "";

  // Filter and display countries that match the search term
  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  console.log(filteredCountries);

  displayCountries(filteredCountries);

  // Hide the list if the search term is empty
  if (!searchTerm) {
    countryList.style.display = "none";
  }
}

// display the filtered countries when typing
function displayCountries(filteredCountries) {
  //console.log(filteredCountries);
  // Show countries if they match the search term
  if (filteredCountries.length > 0) {
    filteredCountries.forEach((country) => {
      const li = document.createElement("li");
      li.textContent = country;
      li.addEventListener("click", () => handleCountrySelection(country));
      countryList.appendChild(li);
    });
    countryList.style.display = "block";

  // Clear university list if no country is found
  } else {
    universityListDiv.innerHTML = "";

    // Display "Country not found" message if no match
    const notFoundMessage = document.createElement("div");
    notFoundMessage.textContent = "Country not found or incorrect.";
    notFoundMessage.className = "not-found";
    countryList.appendChild(notFoundMessage);
    countryList.style.display = "block";
  }
}

// Handle country selection from the list
function handleCountrySelection(country) {
  selectedCountry = country;
  countrySearchInput.value = country; // Set the search input to the selected country
  countryList.style.display = "none"; // Hide the list after selection
  universityListDiv.innerHTML = ""; // Clear university list when a country is selected
}

// Get universiteis for selected country
function getUniversities(selectedCountry) {
  if (selectedCountry) {
    const apiUrl = `http://universities.hipolabs.com/search?country=${encodeURIComponent(selectedCountry)}`;


    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          const list = document.createElement("ul");
          data.forEach((university) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<strong>${university.name}</strong> - <a href="${university.web_pages[0]}" target="_blank">Visit website</a>`;
            list.appendChild(listItem);
          });
          universityListDiv.appendChild(list);

          // Update the number of universities in the selected country
          if (data.length === 1) {
            numberOfUniversitiesDiv.innerHTML = `<strong style="color: #ff5722;">1</strong> university in ${selectedCountry}`;
          } else {
            numberOfUniversitiesDiv.innerHTML = `<strong style="color: #ff5722;">${data.length}</strong> universities in ${selectedCountry}`;
          }
        } else {
          universityListDiv.innerHTML =
            "No universities found for this country.";
          numberOfUniversitiesDiv.textContent = `No universities found in ${selectedCountry}`;
        }
      })
      .catch((error) => {
        console.error("Error fetching universities:", error);
        console.error("API URL was:", apiUrl);
        universityListDiv.innerHTML = "An error occurred while fetching data.";
        numberOfUniversitiesDiv.textContent = `An error occurred for ${selectedCountry}`;
      });
  } else {
    alert("Please type in a country.");
  }
}


// Listen to search input changes
countrySearchInput.addEventListener("input", function () {
  //console.log('some');
  const searchTerm = this.value;
  selectedCountry = searchTerm;
  filterCountries(searchTerm);
});

// Listen for the Enter key to fetch universities
countrySearchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    console.log(`the ${selectedCountry}`);
    //fetchBtn.click(); // Simulate a click on the fetch button
    getUniversities(selectedCountry);
  }
});

// Fetch universities when the button is clicked
fetchBtn.addEventListener("click", function () {
  universityListDiv.innerHTML = ""; // Clear previous university list

  getUniversities(selectedCountry);
});
