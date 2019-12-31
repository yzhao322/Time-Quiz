$( document ).ready(function() {
    
    var questions = [
        {
            title: "Commonly used data types DO NOT include:",
            choices: ["strings", "booleans", "alerts", "numbers"],
            answer: "alerts",
        },
        {
          title: "The condition in an if / else statement is enclosed within ____.",
          choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
          answer: "parentheses",
        },
        {
            title: "JavaScript is loosely typed Language and have more relaxed syntax and rules.",
            choices: ["True", "False"],
            answer: "True",
        },
        {
            title: "JavaScript is loosely typed Language and have more relaxed syntax and rules.",
            choices: ["True", "False"],
            answer: "True",
        },
        {
            title: "JavaScript is loosely typed Language and have more relaxed syntax and rules.",
            choices: ["True", "False"],
            answer: "True",
        },
      ];
      
    var button = $('button');
    var h1 = $('h1');
    var h2 = $('h2');
    var h3 = $('h3');
    var h4 = $('h4');
    var h5 = $('h5');
    var count;
    var i;
    var times;
    var score;
    var localSN = 0;


        h1.click(function () {
            h1.hide();
            i = 0; 
            times = 0;
            count = 75;
            score = 0;
            var timer = setInterval(function () {
                h2.value = count--;
                h2.empty().append('Time Remain ' + count);
                if (times === 5) {
                    alert("You completed quiz!");
                    score = count;
                    clearInterval(timer);
                    allDone();
                }
                else if (count <= 0) {
                    alert("Time Out!");
                    clearInterval(timer);
                    allDone();
                }
            }, 1000);

            // $.each(questions, function (key, value) {
            //     console.log(key, value);
            //     console.log(questions[5].title);
            //     console.log(questions[5].answer);
            
            // });
       
            quizQuestion();
       
       
        });

    function quizQuestion() {
        if (i < 5) {
            var div = $('<div>');
            div.text(i + 1 + ". " + questions[i].title);
            h3.empty().append(div);
        
            for (var j = 0; j < questions[i].choices.length; j++) {
                var btn = $('<button>');
                btn.text(questions[i].choices[j]);
                div.append(btn);
            }
            
            div.click(function (event) {
                event.preventDefault();
              
                if (questions[i].answer === $(event.target).text()) {
                    times = times + 1;
                    h4.text("Correct");
                    i++;
                    quizQuestion();
            
                }
                else {
                    count = count - 15;
                    times = times + 1;
                    i++;
                    h4.text("Wrong");
                    quizQuestion();
                    
                }
                
            });
        }
        else {
                allDone();
            
        }
    
    }

    function allDone() {
        h2.hide();
        h4.hide();
        var div = $('div');
        div.text("All Done!");
        var p = $('<p>');
        p.text("Your Final Score is  " + score + ".");
        div.append(p);
        h5.text("Enter Your Initial:  ");
        $('<input>').attr('type', 'text').attr('id', 'name').appendTo(h5);
        $('<input>').attr('type', 'submit').attr('id', 'submitScore').appendTo(h5);
        $('#submitScore').click(function () {
            var name = $('#name').val();
            var objNAS = { 'name': name, 'score': score };
            localStorage.setItem("objNAS" + localSN, JSON.stringify(objNAS));
            highScore();

        });
    }
    function highScore() {
        h3.hide();
        h5.hide();
        var h6 = $('<h6>');
        h6.text("Highscores");
        $('body').append(h6);
        var storeNameAndScore = JSON.parse(localStorage.getItem("objNAS"+ localSN));
        var ol = $('<ol>');
        var li = $('<li>');
        h6.append(ol);
        ol.append(li.text(storeNameAndScore.name + " - " + "(" + storeNameAndScore.score + ")"));
        var div = $('<div>');
        $('<button>').attr('id', 'goBack').text("Go Back").appendTo(div);
        $('<button>').attr('id', 'clearHighScore').text("Clear Highscores").appendTo(div);
        $('body').append(div);
        $('#goBack').click(function (event) {
            event.preventDefault();
            h2.empty().show();
            h3.empty().show();
            h4.empty().show();
            h5.empty().show();
            h6.remove();
            div.remove();
            h1.show();
            localSN++;  
        });
        $('#clearHighScore').click(function (event) {
            event.preventDefault();
            $('ol').hide();
        })
        
    }
})