var words = [];
var userInput = document.querySelector('.userInput');
var wordIndex = 0;
var letterIndex = 0;
var currentWordList = [];
var currentWordLength;
var currentWord;
var letterList = [];
var wordString = '';


var incorrectLetters = '';
var correctLetters = '';
var textArea = document.querySelector(".textAreaWrapper");

userInput.addEventListener('input', updateValue);

$(document).ready(function () {

    $.ajax({
        url: "english-words.json",
        async: false,
        success: function (data) {
            words = data;
        }
    });
    initTextArea(100);
    currentWord = currentWordList[wordIndex];
    console.log('current word: ', currentWord);
    currentWordBreakDown(currentWord);
    console.log(letterList);
});

function initTextArea(length) {
    let wordList = '';

    for (let i = 0; i < length; i++) {
        let randomWord = words[Math.floor(Math.random() * words.length)];
        currentWordList.push(randomWord);
        wordList += randomWord;
        wordList += ' ';
    }
    wordString = wordList;
    console.log(wordList);
    textArea.appendChild(createChild('upcoming', '', wordString));
}

function updateResString(wordString) {
    document.querySelector('.upcoming').innerHTML = wordString;
}


function currentWordBreakDown(word) {
    let letterlist = [];
    currentWordLength = word.length;
    for (let i = 0; i < currentWordLength; i++) {
        letterlist.push(word[i]);
    }
    letterList = letterlist;
    console.log("letterList:", letterList);
    return letterlist;
}

function updateValue(e) {
    //this function is to record input letter, and call checkLetter
    var currentLetter = e.target.value;
    e.target.value = '';
    checkLetter(currentLetter);
    if (letterIndex < currentWordLength) {
        letterIndex += 1;
    }
    else if (letterIndex == currentWordLength) {
        if (currentLetter == ' ') {
            console.log('space');
        }
        letterIndex = 0;
        wordIndex += 1;
        currentWord = currentWordList[wordIndex];
        currentWordLength = currentWord.length;
        correctLetters += ' ';
        textArea.insertBefore(createChild('correct', ' ', wordString), document.querySelector('.upcoming'));
        currentWordBreakDown(currentWordList[wordIndex]);

    }

}

function checkLetter(letter) {
    if (letter == letterList[letterIndex]) {
        if (correctLetters.slice(-1) == " ") {
            wordString = wordString.slice(2);
        }
        else {
            wordString = wordString.slice(1);
        }
        correctLetters += letter;
        updateResString(wordString);
        textArea.insertBefore(createChild('correct', letter, wordString), document.querySelector('.upcoming'));
        return true;

    }
    else if (letter != letterList[letterIndex]) {
        if (letterIndex < currentWordLength) {
            incorrectLetters += letter;
            wordString = wordString.slice(1);
            textArea.insertBefore(createChild('incorrect', letter, wordString), document.querySelector('.upcoming'));
            return false;
        }
        else {
            if (letter != ' ') {
                updateResString(wordString);
                textArea.insertBefore(createChild('incorrect', letter, wordString), document.querySelector('.upcoming'));
            }

        }

    }


}




function createChild(status, string, wordStringRes) {
    let stringContent = document.createElement('letter');
    stringContent.className = status;

    if (status == 'correct') {
        //if its the correct letter
        stringContent.textContent = string;
    }
    else if (status == 'incorrect') {
        stringContent.textContent = string;
    }
    else {
        stringContent.textContent = wordStringRes;
    }
    return stringContent;
}

