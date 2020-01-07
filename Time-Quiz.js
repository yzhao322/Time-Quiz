$(document).ready(function () {
    
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
            title: "The undefined and null are equal in value but different in type. The type of null is ____.",
            choices: ["strings", "undefined", "objects"],
            answer: "objects",
        },
        {
            title: "The undefined and null are equal in value but different in type. The type of underfine is ____.",
            choices: ["strings", "undefined", "objects"],
            answer: "undefined",
        },
    ];
      
    var button = $('#Start');
    var h1 = $('h1');
    var highScore = $('.Highscore');
    var h2 = $('.TimeRemaining');
    var h3 = $('h3');
    var h4 = $('h4');
    var h5 = $('h5');
    var count = 0;
    var i;
    var times;
    var score;
    var localSN = 0;

    highScore.append('View Highscores');
    h2.append('Time Remain ' + count);
    $('hr').hide();

    button.click(function () {
        h1.hide();
        i = 0;
        times = 0;
        count = 100;
        score = 0;
        var timer = setInterval(function () {
            h2.empty().append('Time Remain ' + count);
            h2.value = count--;
            if (times === 5) {
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
        quizQuestion();
       
    });

    function quizQuestion() {
        
        if (i < 5) {
            var div = $('<div>');
            div.text(i + 1 + ". " + questions[i].title);
            div.css('padding', '20px');
            div.css('padding-top', '50px');
            h3.empty().append(div);
        
        
            for (var j = 0; j < questions[i].choices.length; j++) {
                var btn = $('<button>');
                btn.attr('id', 'options');
                btn.text(questions[i].choices[j]);
                div.append(btn);
                btn.css('display', 'block');
                btn.css('margin-top', '30px');
                btn.css('width', '160px');
                btn.css('margin-right', 'auto');
                btn.css('margin-left', 'auto');
                
                
            }
            
            div.click(function (event) {
                event.preventDefault();
                
                if (questions[i].answer === $(event.target).text()) {
                    times = times + 1;
                    i++;
                    h4.text('Correct!').show(1).delay(350).hide(1);
                    $('hr').show(1).delay(350).hide(1);
                    quizQuestion();
            
                }
                else {
                    count = count - 15;
                    times = times + 1;
                    i++;
                    h4.text('Wrong!').show(1).delay(350).hide(1);
                    $('hr').show(1).delay(350).hide(1);
                    quizQuestion();
                    
                }
                
            });
        }
        else {
            allDone();
            
        }
    
    }

    function allDone() {
        $('hr').hide();
        h2.hide();
        highScore.hide();
        h4.hide();
        var div = $('div');
        div.text("All Done!");
        var p = $('<p>');
        p.text("Your Final Score is  " + score + ".");
        div.append(p);
        h5.text("Enter Your Initial:  ");
        $('<input>').attr('type', 'text').attr('id', 'name').appendTo(h5);
        $('<input>').attr('type', 'submit').attr('id', 'submitScore').appendTo(h5);
        h5.css('text-align', 'center');
        $('#submitScore').click(function () {
            var name = $('#name').val();
            var nameAndScore = { 'name': name, 'score': score };
            localStorage.setItem('nameAndScore' + localSN, JSON.stringify(nameAndScore));
            highScores();

        });
        if ($(window).width() <= 680) {
            div.css('font-size', '30px');
            $('input').css('font-size', '16px');
        }
        else {
            div.css('font-size', '60px');
            p.css('font-size', '40px');
            $('input').css('font-size', '23px');
        }
    }
    
    function highScores() {
        h3.hide();
        h5.hide();
        var h6 = $('<h6>');
        h6.text("Highscores");
        h6.css('font-size', '50px');
        h6.css('margin', '30px');
        h6.css('font-weight', 'bold');
        h6.css('font-family', 'Times New Roman');
        $('body').append(h6);
        var ol = $('<ol>');
        h6.append(ol);
        var int = localSN;
        for (var i = 100; i >= 0; i--) {
            if (localStorage.getItem("nameAndScore" + i) === null) {
                
            }
            else {
                var nameAndScore = JSON.parse(localStorage.getItem('nameAndScore' + i));
                var li = $('<li>');
                li.attr('class', nameAndScore.score);
                li.text(nameAndScore.name + " - " + nameAndScore.score);
                ol.append(li);
            }
        }
        ol.css('font-size', '20px');
        ol.css('font-weight', '200');
        ol.css('margin', '40px');
        $('li').css('margin-top', '10px');
        $('li').css('background-color', 'grey');
        var items = $('ol > li').get();
        items.sort(function (a, b) {
            var A = $(a);
            var B = $(b);
          
            if (A[0].className < B[0].className) return 1;
            if (A[0].className > B[0].className) return -1;
            return 0;
        });
        
        $.each(items, function (i, li) {
            ol.append(li); /* This removes li from the old spot and moves it */
        });

        var div = $('<div>');
        $('<button>').attr('id', 'goBack').text("Go Back").appendTo(div);
        $('<button>').attr('id', 'clearHighScore').text("Clear Highscores").appendTo(div);
        $('body').append(div);
        $('#goBack').click(function () {
            count = 0;
            h2.empty().text("Time Remain 0").show();
            highScore.show();
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
            for (var i = 100; i >= 0; i--) {
                localStorage.removeItem('nameAndScore' + i);
            }
            ol.remove();
        })
        if ($(window).width() <= 680) {
            h6.css('font-size', '50px');
            ol.css('font-size', '20px');
        }
        else {
            h6.css('font-size', '75px');
            ol.css('font-size', '35px');
        }
 
    }

    highScore.click(function () {
        button.hide();
        h1.hide();
        highScore.hide();
        h2.hide();
        h3.hide();
        h4.hide();
        h5.hide();
        var h7 = $('<h7>');
        $('body').append(h7);
        h7.text("Highscores");
        h7.css('margin', '50px');
        h7.css('font-weight', 'bold');
        h7.css('font-family', 'Times New Roman');
        h7.css('text-align', 'center');
        var ol = $('<ol>');
        h7.append(ol);
        for (var i = 100; i >= 0; i--) {
            if (localStorage.getItem("nameAndScore" + i) === null) {
                
            }
            else {
                var nameAndScore = JSON.parse(localStorage.getItem('nameAndScore' + i));
                var li = $('<li>');
                var newDiv = $('<div>');
                li.attr('class', nameAndScore.score);
                li.text(nameAndScore.name + " - " + nameAndScore.score);
                ol.append(li);
            }
        }
        ol.css('font-weight', '200');
        ol.css('margin', '40px');
        $('li').css('margin-top', '10px');
        $('li').css('background-color', 'grey');
       
        var items = $('ol > li').get();
        items.sort(function (a, b) {
            var A = $(a);
            var B = $(b);
          
            if (A[0].className < B[0].className) return 1;
            if (A[0].className > B[0].className) return -1;
            return 0;
        });
        var div = $('<div>');
        $('<button>').attr('id', 'Back').text("Back").appendTo(div);
        $('body').append(div);
        $('#Back').click(function () {
            button.show();
            h1.show();
            highScore.show();
            h2.show();
            h3.show();
            h4.show();
            h5.show();
            h7.remove();
            div.remove();
            if (count !== 0) {
                h1.hide();
            }

        });
        if ($(window).width() <= 680) {
            h7.css('font-size', '50px');
            ol.css('font-size', '20px');
        }
        else {
            h7.css('font-size', '75px');
            ol.css('font-size', '35px');
        }
    });
      
    
})