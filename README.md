# code-quiz
![img](img/capture.PNG)
## Description
This site is a quiz that askes the user to answer multiple choic questions about javascript. The user is given a certain amount of time to ocmpleate all the questions and are docked 10 seconds every time they get a question wrong. The quiz is over when all questions ar compleated or the time runs out. Upon compleation the user is shown their score and is asked to enter their name. Each unique name entered will reate a new item in local storage and be diplayed on the leader board.

# Features
![img](img/capture2.PNG)
## Quiz
The javascript structure that controls the quiz is very flexable. The questions and answes an be modified in one place in the code and the quiz is designed to handel any number of questions and any umber of possable answers for each question. Additionally, the questions are always presented in random order and each question's associated answers are presented in a rando order as well. This makes it harder to emorize the quiz. Because of these features this page could be used for a quiz on any subject and the only code that would need to be changed is the actual tet tht makes up the questions and answers.
## Leaderboard
![img](img/capture3.PNG)
The leaderboard displays all scores for unique names given at the end of the quiz. The leaderboard also sorts the rankings from lowest to highest score. If somone gets a new score and enters a name that already exists on the leaderboard, the score associated with that nae will change and the position will change accordingly. Scores can also be removed from the leaderboard by pressig the delete x next to each entry. The leaderboard is ontrolled by LocalStorage, so it persists between browser sessions.

# Possable Improvments
SOme possible improvments include: indicating to the user wheather or not they got the uestion correct as they answer, additional styling, and allowing for multiple quizes to be chosen from as opposed to just one.