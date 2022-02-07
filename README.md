<div id="top"></div>



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<h3 align="center">LeetUp</h3>

  <p align="center">
    A Meetup clone for developers to meet with fellow developers.
    <br />
    <a href="https://github.com/lrmaser/leet-up/wiki"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://leetup.herokuapp.com/">View Site</a>
    ·
    <a href="https://github.com/lrmaser/leet-up/issues">Report Bug</a>
    ·
    <a href="https://github.com/lrmaser/leet-up/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

LeetUp, a Meetup clone, is a place for developers (and friends of developers) to find like-minded peers. Users can create and join groups in their areas of interest as well as attend events organized by those groups.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Vanilla JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Express](https://expressjs.com/)
* [Sequelize](https://sequelize.org/master/)
* [PostgreSQL](https://www.postgresql.org/)


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone this repo.
   ```sh
   git clone git@github.com:lrmaser/leet-up.git
   ```
2. Install dependencies from the root directory.
   ```sh
   npm install
   ```
3. Create a .env file in the backend directory based on the .env.example also found within the backend directory.
4. In the .env file enter your desired username, password, database name, a secured combination of characters for your JWT_SECRET, and your desired PORT (preferably 5000).
5. Create a PostgreSQL USER with CREATEDB and PASSWORD using the same information entered into your .env file.
   ```sh
   CREATE USER <name> WITH CREATEDB PASSWORD <'password'>
   ```
6. Create Database, Migrate, and Seed models.
   ```sh
   npm run db:setup
   ```
7. Add the following proxy to your package.json file within your frontend directory, matching the PORT configuration in your .env file.
   ```sh
   "proxy": "http://localhost:5000"
   ```
8. Start the services in the backend directory.
   ```sh
   npm start
   ```
9. Start the services in the frontend directory, which should open the project in your default browser. If not, navigate to http://localhost:3000.
   ```sh
   npm start
   ```
10. You can use a Demo user or create an account to begin using LeetUp.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Events
- [ ] Groups
    - [ ] Calendar
    - [ ] Search by location & group info
- [ ] RSVPs

See the [open issues](https://github.com/lrmaser/leet-up/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Laura Maser - laura.maser3@yahoo.com

Project Link: [https://github.com/lrmaser/leet-up](https://github.com/lrmaser/leet-up)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [README Template](https://github.com/othneildrew/Best-README-Template)
* [Font Awesome](https://fontawesome.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/lrmaser/leet-up.svg?style=for-the-badge
[contributors-url]: https://github.com/lrmaser/leet-up/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/lrmaser/leet-up.svg?style=for-the-badge
[forks-url]: https://github.com/lrmaser/leet-up/network/members
[stars-shield]: https://img.shields.io/github/stars/lrmaser/leet-up.svg?style=for-the-badge
[stars-url]: https://github.com/lrmaser/leet-up/stargazers
[issues-shield]: https://img.shields.io/github/issues/lrmaser/leet-up.svg?style=for-the-badge
[issues-url]: https://github.com/lrmaser/leet-up/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/laura-maser-225196b2/
[product-screenshot]: images/screenshot.png
