Summary
The University Finder Tool is a web application that allows users to search for universities around the world based on their selected country. Users can easily browse and find higher education institutions, making it a helpful resource for prospective students.

Features
Select a country from a dropdown list.
Retrieve and display a list of universities located in the selected country.
Responsive and user-friendly interface.
How to Launch Locally
To run the University Finder Tool on your local machine, follow these steps:

Steps to Run
git clone https://github.com/devToluwa/University-Finder-Tool.git
cd University-Finder-Tool

GitHub Pages Issues
While the University Finder Tool is hosted on GitHub Pages at https://devtoluwa.github.io/University-Finder-Tool/, there are conflicts with API requests due to GitHub Pages enforcing HTTPS.

The application uses an HTTP endpoint to fetch the list of universities, which causes issues when deployed on GitHub Pages. GitHub does not allow mixed content (HTTP and HTTPS) on its platform.