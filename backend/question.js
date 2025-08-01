function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
 
    this.questionIndex++;
}
 
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
 
 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
 
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
 
 
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
 
 
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
 
function showScores() {
    var gameOverHTML = "<h1 id='res'>Result</h1>";
   
    if (quiz.score > 5) {
        gameOverHTML += "<h2 id='score'> Your score: " + quiz.score + "</h2><br><center><a href='quiz.html'><button id='try' >Try Again</button></a></center>" + "</h2><br><center><a href='getcertificate.html'><button id='try' >Get Certified</button></a></center>";
        var element = document.getElementById("quiz");
        element.innerHTML = gameOverHTML;
    }
    else{
        gameOverHTML += "<h2 id='score'> Your score: " + quiz.score + "</h2><br><center><a href='quiz.html'><button id='try' >Try Again</button></a></center>";
        var element = document.getElementById("quiz");
        element.innerHTML = gameOverHTML;
    }
};
 
// create questions here
var questions = [
    new Question("What is a correct syntax to output *Hello World* in Java?", ["echo(Hello World);", "print (Hello World);","System.out.println(Hello World);", "Console.WriteLine(Hello World);"], "System.out.println(Hello World);"),
    new Question("Java is short for JavaScript.", ["True", "False"], "False"),
    new Question("How do you insert COMMENTS in Java code?", ["#This is a comment", "/*This is a comment","//This is a comment"], "//This is a comment"),
    new Question("Which data type is used to create a variable that should store text?", ["string", "String", "myString", " Txt"], "String"),
    new Question("How do you create a variable with the numeric value 5?", ["x = 5;", "num x = 5", "char x = 5;", "int x = 5;"], "int x = 5;"),
    new Question("How do you create a variable with the floating number 2.8?", ["float x = 2.8f;", "byte x = 2.8f", "x = 2.8f;", "int x = 2.8f;"], "float x = 2.8f;"),
    new Question("Which method can be used to find the length of a string?", ["len()", "getLength()", "length()", "getSize()"], "length()"),
   
    new Question("The value of a string variable can be surrounded by single quotes.", ["True", "False"], "True"),
    new Question("Which method can be used to return a string in upper case letters?", ["toUpperCase()", "upperCase()", "touppercase()","tuc()"], "toUpperCase()"),
    new Question("Which operator can be used to compare two values?", ["<>", "><", "=","=="], "=="),
    new Question("To declare an array in Java, define the variable type with:", ["{}", "()", "[]"], "[]"),
    new Question("Array indexes start with:", ["1", "0"], "0"),
    new Question("How do you create a method in Java?", ["(methodName)", "methodName()", "methodName.", "methodName[]"], "methodName()"),
    new Question("How do you call a method in Java?", ["(methodName);", "methodName();", "  methodName[];","  methodName;"], "methodName();"),
    new Question("Which keyword is used to create a class in Java?", ["className", "class()", "class", "MyClass"], "class"),
    new Question("What is the correct way to create an object called myObj of MyClass?", ["class myObj = new MyClass();", "MyClass myObj = new MyClass();", "new myObj = MyClass();","class MyClass = new myObj();"], "class MyClass = new myObj();"),
    new Question("In Java, it is possible to inherit attributes and methods from one class to another.", ["False", "True"], "True"),
    new Question("Which method can be used to find the highest value of x and y?", ["Math.largest(x,y)", "Math.max(x,y)", "Math.maxNum(x,y)", "Math.maximum(x,y)"], "Math.max(x,y)"),
    new Question("Which operator is used to multiply numbers?", ["%", "*", "x", "#"], "*")
 
    
];
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();


