let deckId;
let computerScore = 0
let yourScore = 0
let newDeck = document.getElementById("new-deck")
let drawBtn = document.getElementById("draw");
let cardsImages = document.getElementById("cards-images");
let firstImg = document.getElementById("firstImg");
let secondImg = document.getElementById("secondImg");
let error = document.createElement("p")
let headingWinOrLoseOrTie = document.getElementById("headingforwinorlose")
let remainingCard = document.getElementById("remainingCard")
let computerScoreEl = document.getElementById("computer-score")
let yourScoreEl = document.getElementById("your-score")

let deckFunc = function () {
  fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        remainingCard.innerText = `Remaining Card:  ${data.remaining}`
        deckId = data.deck_id;
        if (data.remaining === 52) {
            drawBtn.disabled = false
            drawBtn.innerText = "Draw"
        } else if (data.remaining === 0) {
            drawBtn.disabled = true
            drawBtn.innerText = "No Remaining Card please click new deck button"
        }
    });
};

newDeck.addEventListener("click", deckFunc);

drawBtn.addEventListener("click", function () {
  if (deckId !== undefined) {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let image1 = document.createElement("img");
          let image2 = document.createElement("img");
          error.innerText = ""
          image1.src = data.cards[0].image
          image2.src = data.cards[1].image
          firstImg.append(image1)
          secondImg.append(image2)
          cardsImages.append(firstImg, secondImg)
          ditermineWinFunc(data.cards[0], data.cards[1])
          remainingCard.innerText = `Remaining Card:  ${data.remaining}`

          if (data.remaining === 0) {
            if (computerScore > yourScore) {
                return headingWinOrLoseOrTie.innerText = "The Computer Won The Game 👩‍💻"
            } else if (computerScore < yourScore) {
                headingWinOrLoseOrTie.innerText = "Congratulations You Won The Game 🎉"
            } else {
                headingWinOrLoseOrTie.innerText = "it's a tie game 🙅"
            }
              drawBtn.disabled = true
              drawBtn.innerText = "No Remaining Card please click new deck button"
          }

          
      });
  }
  firstImg.innerHTML = ""
  secondImg.innerHTML = ""
});


function ditermineWinFunc(card1, card2) {
    let valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)

    if (card1ValueIndex > card2ValueIndex) {
        computerScore++
        computerScoreEl.innerText = `Computer Score: ${computerScore}`
        return  headingWinOrLoseOrTie.innerText = "Computer Wins! 🥳"
    } else if (card1ValueIndex < card2ValueIndex) {
        yourScore++
        yourScoreEl.innerText = `Your Score: ${yourScore}`
        return headingWinOrLoseOrTie.innerText = "You Win! 🎉"
    } else {
        return headingWinOrLoseOrTie.innerText = 'Tie 🙅'
    }

   
}


// ditermineWinFunc(card1Object, card2Object)

// let run = () => {
//     console.log('I Finally ran!');
// }

// setTimeout(run, 2000);

// let people = [
//     {name:"Jack", hasPet: true, age: 12},
//     {name:"Jill", hasPet: false ,age: 18},
//     {name:"Alice", hasPet: true, age: 22},
//     {name:"Bob", hasPet: false, age: 32}
// ]

// let filterFun  = function (index, array) {
//     let resultingArray = [];
//     for (let item of index) {
//         const shuldBeInculded = array(item)
//         if (shuldBeInculded) {
//             resultingArray.push(item)
//         }
//     }
//     return resultingArray
// }

// let pepleWithPets = filterFun(people, function (item) {
//     return item.hasPet
// })
// console.log(pepleWithPets);
