import NavbarNoProfile from '../components/NavbarNoProfile.js';

export default function About() {
    return (
        <>
            <NavbarNoProfile />

            <div className="about-bg"> </div>

            <div className="about-mainContainer">
                <div className="about-aboutContainer">
                    <div className="about-titleContainer">
                        <h1>About RateMyClasses</h1>
                    </div>
                    <div className="about-aboutTextContainer">
                        <p>
                            Hey there! I’m Jake Duffy, a computer science major at Rutgers University, and this website is my first attempt at building a full-stack web app from scratch!

                            <br /> <br />Before this project, I knew absolutely nothing about web development. HTML, CSS, and JavaScript were all foreign to me, and I had zero clue how to use any sort of framework or database. I did have some programming experience, as I had taken a few CS courses at Rutgers (CS111, CS112, and CS205 at the time), but that was about it. Suffice to say, I had much to learn.

                            <br /> <br />In the beginning, I was quite overwhelmed, but I knew I had to start somewhere. I quickly compiled a list of languages and technologies I would need to learn, and set out with the task of learning just enough of each to be able to build something operational. I took notes on everything, but more importantly, I coded very small side-projects along the way for practice. “Learn by doing,” while cliche, is an important mantra to maintain.

                            <br /> <br />After a few weeks of note-taking and mini projects, I was able to jump into designing and coding RateMyClasses from scratch. I worked on the backend first, testing the REST API endpoints with Postman as I went, and eventually moved onto the frontend, refactoring code as necessary. I was still learning a lot as I went, so it took a few weeks, but ultimately, I was able to finish, test, and deploy the website less than 2 months after taking my first notes on HTML.

                            <br /> <br />Now, I know this isn’t the most complex website out there, but I’m quite happy with it overall - especially considering the timeline. If you encounter any issues with the site, or have any criticism, tips, or questions you’d like to share with me, please send me an email using the link at the bottom of the page. Thanks for reading!
                        </p>
                    </div>
                </div>

                <div className="about-techstackContainer">
                    <div className="about-titleContainer">
                        <h1>Tech Stack</h1>
                    </div>
                    <div className="about-techstackTextContainer">
                        <p>
                            To build this website, I used the MERN stack - MongoDB for the database, React for the frontend, and Node.js with Express for the backend. I deployed the app using AWS, and I’m currently using the MongoDB Atlas free tier to store all the reviews and user info (which is why I decided to limit each user to 8 reviews).

                            <br /> <br />Oh, and for anyone curious about learning web development, the 2 most useful resources for me were w3schools (for learning HTML, CSS, JavaScript, and the basics of React), and the YouTube channel called “TheNetNinja” (I found his Node.js crash course, JWT tutorial, and MERN stack video series to be particularly helpful).
                        </p>
                    </div>
                </div>

                <div className="about-privacypolicyContainer">
                    <div className="about-titleContainer">
                        <h1>Privacy Policy</h1>
                    </div>
                    <div className="about-privacypolicyTextContainer">
                        <p>
                            The only user data collected by this website are your email and password when you signup. For security purposes, passwords are 1.) randomly generated by the server (to avoid users inputting sensitive information), and 2.) encrypted before being stored in the database. Users can only sign in to your account if they have access to your personalized, decrypted password (which is sent to you via email when you signup).

                            <br /> <br />The server also parses your browser cookies on most requests (as authentication tokens are used to validate users who are logged in), but none of this data is stored or saved anywhere.
                        </p>
                    </div>
                </div>

                <div className="about-miscContainer">
                    <div className="about-titleContainer">
                        <h1>Personal Links</h1>
                    </div>
                    <div className="about-miscTextContainer">
                        <p>
                            <a
                                href="mailto:ratemyclasses060@gmail.com"
                                className="about-link"
                            >
                                Click here to send me an email!
                            </a>
                            <a 
                                href="https://www.linkedin.com/in/JakeTDuffy"
                                rel="noreferrer"
                                target="_blank"
                                className="about-link"
                            >
                                Click here to find me on LinkedIn!
                            </a>
                        </p>
                    </div>
                </div>
            </div>

        </>
    );
}