# coding-quiz
The application will create and time a quiz you put into it. I will also keep a highscore list.

# index.html
The main page in the html, in early iterations of the site it will only keep one quiz on it. Though I hope to add more quizzes in the future before finishing the project. 

The highscores button is in the top left and can be pressed at any time to go to the high score page.

The timer button is in the top right and will display the time remaining in the quiz.

The main section of the page employs a jumbotron, which displays the question on the top, a button group on the left side for the answer choices. (perhaps in the future some pictures on the right), and the feedback box on the lower side to let the user know if they got the correct answer to the question asked.

# style.css
Mostly not too intresting, most of the styling comes from bootstrap.

# questions.js
Contains the questions. The first, and perhaps only, quiz was provided by Inna Widener via slack. It's basically an array of questions stored in objects. I changed the answer string to be the index number of the correct answer in the answer choice array for comparisons to hopefully be easier.

# highscores.html
This page will contain all of the highscores of the differant users, as well as a link back to the index page.