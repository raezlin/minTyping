var words = [];
var userInput = document.querySelector('.userInput');
var wordIndex = 0;
var letterIndex = 0;
var currentWordList = [];
var currentWordLength;
var currentWord;
var letterList = [];

userInput.addEventListener('input', updateValue);

$(document).ready(function () {

    $.ajax({
        url: "english-words.json",
        async: false,
        success: function (data) {
            words = data;
        }
    });
    changeTextAreaWords(100);
    currentWord = currentWordList[wordIndex];
    console.log('current word: ', currentWord);
    currentWordBreakDown(currentWord);
    console.log(letterList);
});




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

    var currentLetter = e.target.value;

    // letterIndex = e.target.value.length - 1;

    console.log(currentLetter);
    e.target.value = '';
    checkLetter(currentLetter);
    if (letterIndex < currentWordLength) {
        letterIndex += 1;
    }
    else if (letterIndex == currentWordLength) {
        letterIndex = 0;
        wordIndex += 1;
        currentWord = currentWordList[wordIndex];
        currentWordLength = currentWord.length;
        currentWordBreakDown(currentWordList[wordIndex]);
    }
    console.log('letterIndex: ', letterIndex);

}

function checkLetter(letter) {
    if (letter == letterList[letterIndex]) {
        console.log(`letter typed: ${letter}  expected letter: ${letterList[letterIndex]}`);
    }

}


function changeTextAreaWords(length) {
    let wordList = '';

    for (let i = 0; i < length; i++) {
        let randomWord = words[Math.floor(Math.random() * words.length)];
        currentWordList.push(randomWord);
        wordList += randomWord;
        wordList += ' ';
    }
    console.log(wordList);
    $('.textArea').html(wordList);
}



