var $name = $('#Name')
var $category = $('#Category')
var $difficulty = $('#Difficulty')
var $bonus = $('#Bonus')
var $start = $('#start-btn')
var $qList = $('.qList ul')
var $next = $('#next')
var $quit = $('#quit')
var $answerItem = $('.answer-item')
var $counter = $('.counter')
var $remove = $('#remove')
var $pause = $('#pause')
var $askHost = $('#askHost')
var $score = $('.score')


var userInfo = JSON.parse(localStorage.getItem('userInfo')) || {}       //All information of users and games
var currName = ''       //Current username
var currQusetion = 0    //Current question's index

//Countdown Clock
var timer = null
var sec = 31


//Game start
function onStart () {

    //Verify that the username is filled in
    if (!$name.val()) {
        alert('Please enter your name')
        return
    }

    //Data initialization
    currQusetion = 0
    $('.lives').text('3')
    $score.text(0)
    $qList.css('transform', `translateY(0px)`)
    $next.attr('disabled', false)
    $remove.attr('disabled', false)
    $pause.attr('disabled', false)
    $askHost.attr('disabled', false)


    var bonusCate = $bonus.val()
    var category = $category.val()

    //Give different score to different questions
    var difficultyMap = {
        easy: 1,
        medium: 2,
        hard: 3
    }
    //Request parameters for 9 normal questions
    var params = {
        difficulty: $difficulty.val(),
        amount: 9,
        type: 'multiple'
    }
    if (category != '0') {
        params.category = category
    }

    //Ask 9 normal questions
    $.get('https://opentdb.com/api.php', params, function (res) {
        if (res.response_code === 0) {
            var questionList1 = res.results

            //Request parameters for 1 bonus question
            var params2 = {
                difficulty: $difficulty.val(),
                amount: 1,
                type: 'multiple',
                category: bonusCate
            }

            //Ask 1 bonus question
            $.get('https://opentdb.com/api.php', params2, function (res) {
                if (res.response_code === 0) {
                    //Start the game
                    $('.start-wrapper').hide()
                    $('.main-game').show()

                    currName = $name.val()

                    //Mark the bonus question
                    res.results.forEach(v => {
                        v.isbonusquestion = true
                    })

                    //Initial data of the gamer
                    userInfo[currName] = {
						//Combine normal questions and bonus question, out of order
                        list: [...res.results, ...questionList1].sort(function (a, b) { return Math.random() > .5 ? -1 : 1; }),     
                        result: [],
                        score: 0,
                        difficulty: difficultyMap[$difficulty.val()],
                        useRemove: false,
                        usePause: false,
                        useHost: false
                    }

                    //Rendering question list
                    renderQList()

                    //Start counting down the first question
                    sec = 31
                    counter()
                }
            })
        }

    })
}

//Render question lists
function renderQList () {
    var s = ``
    userInfo[currName].list.forEach((v, idx) => {
        var incorrect_answers = v.incorrect_answers.map(v => ({ text: v, type: 'incorrect' }))
        var ansList = [...incorrect_answers, { text: v.correct_answer, type: 'correct' }].sort(function (a, b) { return Math.random() > .5 ? -1 : 1; }); //对答案进行乱序
        var ans = ``
        ansList.forEach(a => {
            ans += `<div class="answer-item" data-correct=${ a.type }>${ a.text }</div>`           //data-correct 是为了标记每个答案是否为正确的 
        })

        //Use'data-isbonusquestion' to mark whether this question is bonus question 
        s += `
            <li data-isbonusquestion=${ v.isbonusquestion ? 'true' : 'false' }>      
                <p><span style="color: red;">${ v.isbonusquestion ? '[bonus!!!]' : '' }</span>${ idx + 1 }.${ v.question }</p>
                <div class="answer-list">
                    ${ans }
                </div>
            </li>
        `
    })
    $qList.html(s)
}

//Click 'next' button
function next () {
    //Determine if the current question is complete
    if (userInfo[currName].result[currQusetion] === undefined) {
        alert('Please answer the current question first!')
        return
    }
	
    //Determine whether it is the last question
    if (currQusetion === 9) {
        $next.attr('disabled', true)
        quit()
        return
    }

    //Activate three help buttons
    $remove.attr('disabled', false)
    $pause.attr('disabled', false)
    $askHost.attr('disabled', false)

    //Update the index of the current question
    currQusetion += 1

    //Show next question, start next round countdown
    $qList.css('transform', `translateY(-${ currQusetion * 300 }px)`)
    sec = 31
    counter()
}

//Click an answer
function pick (e) {
    var el = $(e.target)
    if (el.hasClass('answer-item')) {
        //Determine whether the selection is correct
        var correct = el.attr('data-correct') === 'correct'
        if (correct) {
            el.css('color', '#67C23A')      //Correct answer become green
        } else {
            el.css('color', '#F56C6C')       //Incorrect answer become red
        }

        afterAnswer(correct, el.parent().parent().attr('data-isbonusquestion') === 'true')
    }
}

//After answering the question
function afterAnswer (correct, isBonus) {
    console.log(isBonus)
    //The question cannot be clicked again
    $('.qList ul li').eq(currQusetion).css('pointer-events', 'none')

    //Disable using help button
    $remove.attr('disabled', true)
    $pause.attr('disabled', true)
    $askHost.attr('disabled', true)

    //Stop the countdown clock
    clearInterval(timer)

    //The current score on the webpage
    var score = userInfo[currName].score
    if (correct) {
		//When the answer is correct, get score. If it is bonus, get double score. 
        score += userInfo[currName].difficulty * (isBonus ? 2 : 1)      
    } else {
		//The incorrent answer doesn't get score and the lives minus 1
        $('.lives').text($('.lives').text() - 1)        
    }

    //Update the current user's score in userInfo
    userInfo[currName].score = score
    //Update the score on the webpage
    $score.text(score)

    //Update the current user answer result list in userInfo
    userInfo[currName].result.push(correct)

    localStorage.setItem('userInfo', JSON.stringify(userInfo))

    //When the number of fails reaches 3, the game fails.
    if (userInfo[currName].result.filter(v => !v).length >= 3) {
        fail()
    }
}

//fail
function fail () {
    alert('Unfortunately, you failed. Your score becomes 0.')
    //Update the current user's score in userInfo.
    userInfo[currName].score = 0
    //Update the game score on the webpage
    $score.text(0)
    //Disable 'next' button
    $next.attr('disabled', true)
}

//Timer
function counter (resetWidth = true) {
    if (timer) { clearInterval(timer) }

    //Count down starts, initialize the progress bar
    if (resetWidth) { $counter.width('100%') }
    $counter.css('background', '#67C23A')

    // Change the length of the progress bar every second
    timer = setInterval(() => {
        sec = sec - 1
        $counter.width(((sec / 30) * 100) + '%')
        $('.time-left').text(sec)

        //Only 10 seconds left, the color turns red
        $counter.css('background', sec <= 10 ? '#F56C6C' : '#67C23A')

        //Time is up, failure
        if (sec === 0) {
            clearInterval(timer)
            afterAnswer(false)
            alert('Time is up')
        }
    }, 1000);
}

//Help buttons.First check whether it has been used, if it has not been used and the gamer decides to use it, update data.

function remove () {
    if (userInfo[currName].useRemove) {
        alert('You have used this function!')
    } else {
        var use = confirm('This function can only be used once. Continue using it?')
        if (use) {
            userInfo[currName].useRemove = true
            var removeNum = 0
            //Randomly delete two wrong answers
            $('.qList ul li').eq(currQusetion).find('.answer-item').each((idx, el) => {
                if ($(el).attr('data-correct') === 'incorrect' && removeNum < 2) {
                    $(el).remove()
                    removeNum++
                }
            })
        }
    }
}

function pause () {

    if (userInfo[currName].usePause) {
        alert('You have used this function!')
    } else {
        var use = confirm('This function can only be used once. Continue using it?')
        if (use) {
            userInfo[currName].usePause = true
            clearInterval(timer)

            var initSec = sec
            sec += 60
            timer = setInterval(() => {
                $('.time-left').text(sec)
                sec--
                if (sec === initSec + 1) {
                    clearInterval(timer);
                    return;
                }
            }, 1000)
            //Continue counting after one minute
            setTimeout(() => {
                sec++
                counter(false)
            }, 60000);
        }
    }
}

function askHost () {
    if (userInfo[currName].useHost) {
        alert('You have used this function!')
    } else {
        var use = confirm('This function can only be used once. Continue using it?')
        if (use) {
            userInfo[currName].useHost = true
            var answer = userInfo[currName].list[currQusetion]          //All answers of current question
            var difficulty = userInfo[currName].difficulty      //Current difficulty coefficient
            //Correspondence between difficulty coefficient and probability array
            var weightArr = {
                1: [0, 80, 90, 100],       //Easy. 'Correct'' 0.8, 'incorrect' 0.1, 'don't know' 0.1
                2: [0, 60, 80, 100],       //Medium. 'Correct' 0.6, 'incorrect' 0.2, 'don't know' 0.2
                3: [0, 40, 70, 100]        //Hard. 'Correct' 0.4, 'incorrect' 0.3, 'don't know' 0.3
            }
            var weight = weightArr[difficulty]  
            var r = getRandom(0, 100)       //Get a random number
            var result = ''
            if (r >= weight[0] && r < weight[1]) {          //Correct answer
                result = answer.correct_answer
            } else if (r >= weight[1] && r < weight[2]) {   //Incorrect answer
                result = answer.incorrect_answers[getRandom(0, 2)]
            } else {
                result = 'unknown'      //
            }
            alert(result === 'unknown' ? 'The host cannot understand this question' : `The host thinks ${ result } is correct. `)
        }
    }
}


//Quit
function quit () {
    alert(`Your score is ${ userInfo[currName].score },restart soon`)
    //Show initial interface and hide game interface
    $('.start-wrapper').show()
    $('.main-game').hide()

    //render top10 player
    renderTop10()
}

//render top10
function renderTop10 () {
    //Sorted by the score of each user in userInfo
    var arr = Object.entries(userInfo).sort((b, a) => a[1].score - b[1].score)
    //Get top10
    if (arr.length > 10) {
        arr.length = 10
    }
    var s = ''
    arr.forEach((v, idx) => {
        s += `<tr><td>${ idx + 1 }</td> <td>${ v[0] }</td> <td>${ v[1].score }</td></tr>`
    })
    $('.top10').html(s)
}

//Tool function: get the random numbers in a range
function getRandom (m, n) {
    return Math.floor(Math.random() * (n - m) + m);
}

//Tool function: get random values in the array
function getRandomArrayElements (arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

//Set all the bonus question categories and choose 4 random categories
function setBonusOptions () {
    var categories = [
        { value: "9", label: "General Knowledge" },
        { value: "10", label: "Entertainment: Books" },
        { value: "11", label: "Entertainment: Film" },
        { value: "12", label: "Entertainment: Music" },
        { value: "21", label: "Sports" },
        { value: "22", label: "Geography" },
        { value: "23", label: "History" }
    ]
    var arr = getRandomArrayElements(categories, 4)
    var s = ''
    arr.forEach(v => {
        s += `<option value="${ v.value }">${ v.label }</option>`
    })
    $bonus.html(s)
}


$(() => {
    setBonusOptions()
    renderTop10()

    //All event bindings
    $start.on('click', onStart)
    $next.on('click', next)
    $qList.on('click', pick)
    $remove.on('click', remove)
    $pause.on('click', pause)
    $askHost.on('click', askHost)
    $quit.on('click', quit)
})


