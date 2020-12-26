//step 1: test connection
/************************** Build interactive game board *******************************/
/**
 * gameBoardBlocks object contains of:
    a - blocksUnClicked array => contains of all bolcks id
    b - blocksAlreadyClicked array => contains of clicked blocks id
    c - removeClickable function (block) => function to prevent the player click more than once time on specific block
 */

/*************** Sound Effects ********************/
const clickSoundEffect = new Audio('../sound effects/Explainer video game alert sweep.wav');
const clickPlayAgianSoundEffect = new Audio('../sound effects/Game click.wav');
const winSoundEffect = new Audio('../sound effects/Completion of a level - win.wav');

const gameBoardBlocks = {
    wholeBlocks: ['block1', 'block2', 'block3',
        'block4', 'block5', 'block6',
        'block7', 'block8', 'block9'
    ],
    blocksAlreadyClicked: [],

    gameCounter: 0,

    player1: [],

    player1WinCounter: 0,

    player2: [],

    player2WinCounter: 0,

    gameStatus: 'Game Over', //Game Over, Game Active

    removeClickable: function(block) {
        if (this.gameStatus === 'Game Active') {
            this.blocksAlreadyClicked.push(block);
        }

        $('#' + block).unbind('click');
        $('#' + block).unbind('mouseenter');
        $('#' + block).unbind('mouseleave');

        //next line => becuase when unbind the mouse leave the class hover not removed
        $('#' + block).removeClass('hover');
        $('#' + block).css('cursor', 'not-allowed');

    },

    /*
            1- game status => game active
            2- remove all clicked blocks
            3- allowing the player to add X first
            4- focuse on player paying 
    */

    gameStart: function() {

        $('.blocks').bind();
        $('.popUpMessage').css({ 'visibility': 'hidden' });
        $('.popUpMessage').css({ 'visibility': 'hidden' });
        $('.blocks').on('click', clickingBlock);
        $('.blocks').on('mouseenter', mouseHover);
        $('.blocks').on('mouseleave', mouseout);

        this.gameCounter = 0;
        this.setGameStatus('Game Active');
        this.historyGame();
        this.whichPlayerIsPlaying();

    },
    /*
       1 - when the player start new game check if have history of win 
       2 - if there is no history the message not display
       3- else ask the player to choose if wanna continue last agme or start new game
     */
    setGameStatus: function(status) {

        if (status === 'Game Active') {
            this.gameStatus = 'Game Active';

        } else if (status === 'Game Over') {
            this.gameStatus = 'Game Over';
        }
    },

    //check if the player have a history game
    historyGame: function() {
        if (localStorage.currentPlayers === 'one player') {
            if (localStorage.getItem('cXp_reload') === 'true') {

                if (localStorage.getItem("cXp_player1WinCounter") === null && localStorage.getItem("cXp_player2WinCounter") === null) {
                    localStorage.cXp_reload = 'false';

                } else {

                    if (localStorage.cXp_player1WinCounter === '0' && localStorage.cXp_player2WinCounter === '0') {
                        localStorage.cXp_reload = 'false';

                    } else {
                        $('.questionReloadLastGame').css({ 'visibility': 'visible', 'top': '25%' });
                        $('.newGame').on('click', function() {

                            clickPlayAgianSoundEffect.play();
                            $('.questionReloadLastGame').css({ 'top': '-55%' });
                            localStorage.cXp_player1WinCounter = 0;
                            localStorage.cXp_player2WinCounter = 0;
                            localStorage.cXp_reload = 'false';
                            gameBoardBlocks.playersWinCouter();
                        });

                        $('.continuePlay').on('click', function() {
                            clickPlayAgianSoundEffect.play();
                            $('.questionReloadLastGame').css({ 'top': '-55%' });
                            this.player1WinCounter = localStorage.cXp_player1WinCounter;
                            this.player2WinCounter = localStorage.cXp_player2WinCounter;
                            localStorage.cXp_reload = 'false';
                            gameBoardBlocks.playersWinCouter();
                        });
                    }
                }
            }

        } else if (localStorage.currentPlayers === 'two players') {
            if (localStorage.getItem('pXp_reload') === 'true') {

                if (localStorage.getItem("pXp_player1WinCounter") === null && localStorage.getItem("pXp_player2WinCounter") === null) {
                    localStorage.pXp_reload = 'false';

                } else {

                    if (localStorage.pXp_player1WinCounter === '0' && localStorage.pXp_player2WinCounter === '0') {
                        localStorage.pXp_reload = 'false';

                    } else {
                        $('.questionReloadLastGame').css({ 'visibility': 'visible', 'top': '25%' });
                        $('.newGame').on('click', function() {

                            clickPlayAgianSoundEffect.play();
                            $('.questionReloadLastGame').css({ 'top': '-55%' });
                            localStorage.pXp_player1WinCounter = 0;
                            localStorage.pXp_player2WinCounter = 0;
                            localStorage.pXp_reload = 'false';
                            gameBoardBlocks.playersWinCouter();
                        });

                        $('.continuePlay').on('click', function() {
                            clickPlayAgianSoundEffect.play();
                            $('.questionReloadLastGame').css({ 'top': '-55%' });
                            this.player1WinCounter = localStorage.pXp_player1WinCounter;
                            this.player2WinCounter = localStorage.pXp_player2WinCounter;
                            localStorage.pXp_reload = 'false';
                            gameBoardBlocks.playersWinCouter();
                        });
                    }
                }
            }
        }
    },

    whichPlayerIsPlaying: function() {

        if (this.gameStatus === 'Game Over') {
            $('#player1').removeClass("playing");
            $('#player2').removeClass("playing");

        } else {

            if (this.gameCounter === 0) {
                $('#player1').addClass("playing");
                $('#player2').removeClass("playing");

            } else if (this.gameCounter % 2 === 0) {
                $('#player1').addClass("playing");
                $('#player2').removeClass("playing");

            } else {
                $('#player1').removeClass("playing");
                $('#player2').addClass("playing");
            }
        }
    },

    applyWinnerCondition: function(player, playerBlocks) {
        switch (playerBlocks.length != 0) {

            /******************** twice win ruls************************/

            case playerBlocks.includes('block1') && playerBlocks.includes('block2') && playerBlocks.includes('block3') &&
            playerBlocks.includes('block4') && playerBlocks.includes('block7'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block1', 'block2', 'block3', 'block4', 'block7']);
                break;

            case playerBlocks.includes('block1') && playerBlocks.includes('block2') && playerBlocks.includes('block3') &&
            playerBlocks.includes('block6') && playerBlocks.includes('block9'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block1', 'block2', 'block3', 'block6', 'block9']);
                break;

            case playerBlocks.includes('block1') && playerBlocks.includes('block4') && playerBlocks.includes('block7') &&
            playerBlocks.includes('block8') && playerBlocks.includes('block9'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block1', 'block4', 'block7', 'block8', 'block9']);
                break;

            case playerBlocks.includes('block3') && playerBlocks.includes('block6') && playerBlocks.includes('block9') &&
            playerBlocks.includes('block7') && playerBlocks.includes('block8'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block3', 'block6', 'block7', 'block8', 'block9']);
                break;

            case playerBlocks.includes('block1') && playerBlocks.includes('block2') && playerBlocks.includes('block3') &&
            playerBlocks.includes('block5') && playerBlocks.includes('block9'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block1', 'block2', 'block3', 'block5', 'block9']);
                break;

            case playerBlocks.includes('block1') && playerBlocks.includes('block2') && playerBlocks.includes('block3') &&
            playerBlocks.includes('block5') && playerBlocks.includes('block7'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block1', 'block2', 'block3', 'block5', 'block7']);
                break;

            case playerBlocks.includes('block1') && playerBlocks.includes('block4') && playerBlocks.includes('block7') &&
            playerBlocks.includes('block5') && playerBlocks.includes('block3'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block1', 'block4', 'block7', 'block5', 'block3']);
                break;

            case playerBlocks.includes('block3') && playerBlocks.includes('block5') && playerBlocks.includes('block7') &&
            playerBlocks.includes('block8') && playerBlocks.includes('block9'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block3', 'block5', 'block7', 'block8', 'block9']);
                break;

            case playerBlocks.includes('block2') && playerBlocks.includes('block5') && playerBlocks.includes('block8') &&
            playerBlocks.includes('block7') && playerBlocks.includes('block9'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block2', 'block5', 'block8', 'block7', 'block9']);
                break;

            case playerBlocks.includes('block1') && playerBlocks.includes('block5') && playerBlocks.includes('block9') &&
            playerBlocks.includes('block7') && playerBlocks.includes('block8'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block1', 'block5', 'block9', 'block8', 'block7']);
                break;

            case playerBlocks.includes('block4') && playerBlocks.includes('block5') && playerBlocks.includes('block6') &&
            playerBlocks.includes('block3') && playerBlocks.includes('block9'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block4', 'block5', 'block6', 'block3', 'block9']);
                break;

            case playerBlocks.includes('block1') && playerBlocks.includes('block5') && playerBlocks.includes('block9') &&
            playerBlocks.includes('block3') && playerBlocks.includes('block6'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block1', 'block3', 'block5', 'block6', 'block9']);
                break;

            case playerBlocks.includes('block3') && playerBlocks.includes('block6') && playerBlocks.includes('block9') &&
            playerBlocks.includes('block5') && playerBlocks.includes('block7'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block3', 'block5', 'block9', 'block6', 'block7']);
                break;

            case playerBlocks.includes('block1') && playerBlocks.includes('block4') && playerBlocks.includes('block7') &&
            playerBlocks.includes('block5') && playerBlocks.includes('block6'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block1', 'block4', 'block7', 'block5', 'block6']);
                break;

            case playerBlocks.includes('block2') && playerBlocks.includes('block5') && playerBlocks.includes('block8') &&
            playerBlocks.includes('block7') && playerBlocks.includes('block9'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block2', 'block5', 'block8', 'block7', 'block9']);
                break;

            case playerBlocks.includes('block1') && playerBlocks.includes('block5') && playerBlocks.includes('block9') &&
            playerBlocks.includes('block2') && playerBlocks.includes('block8'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block1', 'block5', 'block9', 'block2', 'block8']);
                break;

            case playerBlocks.includes('block2') && playerBlocks.includes('block5') && playerBlocks.includes('block8') &&
            playerBlocks.includes('block4') && playerBlocks.includes('block6'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block2', 'block5', 'block8', 'block4', 'block6']);
                break;

                /******************** once time win ruls************************/

            case playerBlocks.includes('block1') && playerBlocks.includes('block2') && playerBlocks.includes('block3'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block1', 'block2', 'block3']);
                break;

            case playerBlocks.includes('block4') && playerBlocks.includes('block5') && playerBlocks.includes('block6'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block4', 'block5', 'block6']);
                break;

            case playerBlocks.includes('block7') && playerBlocks.includes('block8') && playerBlocks.includes('block9'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block7', 'block8', 'block9']);
                break;

            case playerBlocks.includes('block1') && playerBlocks.includes('block4') && playerBlocks.includes('block7'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block1', 'block4', 'block7']);
                break;

            case playerBlocks.includes('block2') && playerBlocks.includes('block5') && playerBlocks.includes('block8'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block2', 'block5', 'block8']);
                break;

            case playerBlocks.includes('block3') && playerBlocks.includes('block6') && playerBlocks.includes('block9'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block3', 'block6', 'block9']);
                break;

            case playerBlocks.includes('block1') && playerBlocks.includes('block5') && playerBlocks.includes('block9'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block1', 'block5', 'block9']);
                break;

            case playerBlocks.includes('block3') && playerBlocks.includes('block5') && playerBlocks.includes('block7'):
                this.gameOver('win', player);
                this.coloringTheWinnerPlayerBlocks(['block3', 'block5', 'block7']);
                break;

            case this.blocksAlreadyClicked.length === 9:
                this.gameOver('tie', player);

            default:
                break;
        }
    },

    coloringTheWinnerPlayerBlocks: function(blocksId) {

        for (let block = 0; block < blocksId.length; block++) {
            $('#' + blocksId[block]).css('background-color', '#A16360');
        };
    },

    /*
    if the user have history for last game - we need to conver 
        str to int for allowing us to summation the number of win for each players
    1- increment the number of win for the winner player
    2- retrive the history of win for the winner player
    3- the local storage is string so convert it to integer
    4- summation the number of win
    5- re set the sum to local storage
    */
    gameOver: function(status, player) {

        gameBoardBlocks.whichPlayerIsPlaying();

        if (status === 'win') {
            $('.congratulations').text('CONGRATULATIONS!');
            $('.winnerPlayer').text(player);

            /****************************  PLAYER 1  *********************************/

            if (player === 'player1') {
                if (localStorage.currentPlayers === 'one player') {
                    if (localStorage.getItem("cXp_player1WinCounter") === null) {
                        let sumWinCounter = 0;
                        sumWinCounter += this.player1WinCounter + 1;
                        localStorage.cXp_player1WinCounter = sumWinCounter;
                        this.playersWinCouter();

                    } else {
                        let sumWinCounter = parseInt(localStorage.cXp_player1WinCounter);
                        sumWinCounter += this.player1WinCounter + 1;
                        localStorage.cXp_player1WinCounter = sumWinCounter;
                        this.playersWinCouter();
                    }
                } else if (localStorage.currentPlayers === 'two players') {
                    if (localStorage.getItem("pXp_player1WinCounter") === null) {
                        let sumWinCounter = 0;
                        sumWinCounter += this.player1WinCounter + 1;
                        localStorage.pXp_player1WinCounter = sumWinCounter;
                        this.playersWinCouter();

                    } else {
                        let sumWinCounter = parseInt(localStorage.pXp_player1WinCounter);
                        sumWinCounter += this.player1WinCounter + 1;
                        localStorage.pXp_player1WinCounter = sumWinCounter;
                        this.playersWinCouter();
                    }
                }

                /****************************  PLAYER 2  *********************************/

            } else {

                if (localStorage.currentPlayers === 'one player') {

                    if (localStorage.getItem("cXp_player2WinCounter") === null) {
                        //this.player2WinCounter += 1;
                        let sumWinCounter = 0;
                        sumWinCounter += this.player1WinCounter + 1;
                        localStorage.cXp_player2WinCounter = sumWinCounter;
                        this.playersWinCouter();

                    } else {
                        //this.player2WinCounter += 1;
                        let sumWinCounter = parseInt(localStorage.cXp_player2WinCounter);
                        sumWinCounter += this.player1WinCounter + 1;
                        localStorage.cXp_player2WinCounter = sumWinCounter;
                        this.playersWinCouter();
                    }

                } else if (localStorage.currentPlayers === 'two players') {

                    if (localStorage.getItem("pXp_player2WinCounter") === null) {
                        //this.player2WinCounter += 1;
                        let sumWinCounter = 0;
                        sumWinCounter += this.player1WinCounter + 1;
                        localStorage.pXp_player2WinCounter = sumWinCounter;
                        this.playersWinCouter();

                    } else {
                        //this.player2WinCounter += 1;
                        let sumWinCounter = parseInt(localStorage.pXp_player2WinCounter);
                        sumWinCounter += this.player1WinCounter + 1;
                        localStorage.pXp_player2WinCounter = sumWinCounter;
                        this.playersWinCouter();
                    }
                }
            }

            $('.congratulations').css('display', 'block');
            $('.winnerPlayer').css('display', 'block');
            $('.roundStatus').text('WIN');
            $('.popUpMessage').css({ 'visibility': 'visible', 'top': '25%' });
            winSoundEffect.play();

        } else if (status === 'tie') {
            $('.congratulations').css('display', 'none');
            $('.winnerPlayer').css('display', 'none');
            $('.roundStatus').text('TIE');
            $('.popUpMessage').css({ 'visibility': 'visible', 'top': '25%' });
            winSoundEffect.play();
        }

        $('.leave').on('click', backToLandingPage());
        this.setGameStatus('Game Over');
        $('.blocks').unbind();
        $('.blocks').css('cursor', 'not-allowed');
        this.gameCounter = 0;
    },

    playersWinCouter: function() {
        if (localStorage.currentPlayers === 'one player') {
            $('.player1WinCounter').text(localStorage.cXp_player1WinCounter);
            $('.player2WinCounter').text(localStorage.cXp_player2WinCounter);
        } else if (localStorage.currentPlayers === 'two players') {
            $('.player1WinCounter').text(localStorage.pXp_player1WinCounter);
            $('.player2WinCounter').text(localStorage.pXp_player2WinCounter);
        }
    },

    resetGame: function() {

        $('.blocks').css('cursor', 'normal');
        $('.test').empty();
        $('.test').removeAttr('style');

        gameBoardBlocks.blocksAlreadyClicked = [];
        gameBoardBlocks.player1 = [];
        gameBoardBlocks.player2 = [];

        this.gameStart();

    }
}

//step 2: reach to game boardreach for all blocks 
const gameBoard = $('.blocks');

//step 3-a: reach to specific block in game board and add even to mouse hover
function mouseHover() {

    const currentBlock = event.target;
    $(currentBlock).addClass('hover');
}

//step 3-b: reach to specific block in game board and remove even to mouse hover
function mouseout() {

    const currentBlock = event.target;
    $(currentBlock).removeClass('hover');
}

//step 4 : allowing the player to click on specific block and add X/O
//step 5: allowing the player to click once times on specific block

function clickingBlock() {

    clickSoundEffect.play();

    if (gameBoardBlocks.gameStatus === 'Game Active') {

        if (localStorage.currentPlayers === 'one player') {
            computerXplayer();

        } else if (localStorage.currentPlayers === 'two players') {
            playerXplayer();
        }

    } else {
        gameBoardBlocks.gameOver();
    }
}

function playerXplayer() {

    const currentBlock = event.target;
    if (gameBoardBlocks.gameCounter % 2 === 0) {

        $(currentBlock)
            .add("p")
            .text('X')
            .css('color', '#f1f1f1')
            .addClass('test');

        gameBoardBlocks.removeClickable(currentBlock.id);
        gameBoardBlocks.player1.push(currentBlock.id);
        gameBoardBlocks.applyWinnerCondition('player1', gameBoardBlocks.player1);

    } else {

        $(currentBlock)
            .add("p")
            .text('O')
            .css('color', '#026165')
            .addClass('test');

        gameBoardBlocks.removeClickable(currentBlock.id);
        gameBoardBlocks.player2.push(currentBlock.id);
        gameBoardBlocks.applyWinnerCondition('player2', gameBoardBlocks.player2);
    }

    gameBoardBlocks.gameCounter += 1;
    gameBoardBlocks.whichPlayerIsPlaying();

}

function computerXplayer() {

    const currentBlock = event.target;

    switch (gameBoardBlocks.gameCounter < 10) {

        case gameBoardBlocks.gameCounter % 2 === 0 && gameBoardBlocks.gameStatus === 'Game Active':

            $(currentBlock)
                .add("p")
                .text('X')
                .css('color', '#f1f1f1')
                .addClass('test');

            gameBoardBlocks.removeClickable(currentBlock.id);
            gameBoardBlocks.player1.push(currentBlock.id);
            gameBoardBlocks.applyWinnerCondition('player1', gameBoardBlocks.player1);
            console.log(gameBoardBlocks.gameStatus);
            gameBoardBlocks.gameCounter += 1;
            gameBoardBlocks.whichPlayerIsPlaying();

        case gameBoardBlocks.gameCounter % 2 != 0:

            if (gameBoardBlocks.gameStatus === 'Game Active') {
                randomChoices();
                gameBoardBlocks.gameCounter += 1;
                gameBoardBlocks.whichPlayerIsPlaying()

            } else {
                break;
            }

        case gameBoardBlocks.gameStatus === 'Game Over':
            break;

        default:
            break;
    }
}

function randomChoices() {
    let availableBlocks = gameBoardBlocks.wholeBlocks.filter(x => gameBoardBlocks.blocksAlreadyClicked.indexOf(x) < 0);
    console.log(availableBlocks);

    let random = Math.floor(Math.random() * availableBlocks.length);
    let computerChocies = availableBlocks[random];
    console.log(random, availableBlocks[random]);

    $('#' + computerChocies)
        .add("p")
        .text('O')
        .css('color', '#026165')
        .addClass('test');

    gameBoardBlocks.removeClickable(computerChocies);
    gameBoardBlocks.player2.push(computerChocies);
    gameBoardBlocks.applyWinnerCondition('player2', gameBoardBlocks.player2);
    console.log(gameBoardBlocks.player2);
}

/*
    ******** GAME START ***********
    1 - we have two player : 
         => player 1 and player 2 in same computer (in progress)
            1 - allowing player 1 to add X first then O and so on. >>done<<
            2 - check if the player/computer get 3 sequential blocks >>done<<
            3 - fouce on which player is playing >>almost done<< >> there is a problem when game over<< 
            3 - when the player 1/2 win the game will be over >>done<<
            4 - when the game over shown message if the player win/lose/tie
    
     ********* Winner Conditon ********
     winningConditions: {
        role1: ['block1', 'block2', 'block3'],
        role2: ['block4', 'block5', 'block6'],
        role3: ['block7', 'block8', 'block9'],
        role4: ['block1', 'block4', 'block7'],
        role5: ['block2', 'block5', 'block8'],
        role6: ['block3', 'block6', 'block9'],
        role7: ['block3', 'block5', 'block7'],
        role8: ['block1', 'block5', 'block9'],
    }
     ******** GAME OVER ***********
    => player 1 and player 2 in same computer 
            1 - when the game over shown message if the player 1/2 win/lose/tie
*/

do {
    gameBoardBlocks.gameStart();

} while (this.gameStatus === 'Game Active');

function backToLandingPage() {

    clickSoundEffect.play();
    $('.leave').attr('href', 'LandingPage.html');
}

function backToLGameAgain() {

    clickPlayAgianSoundEffect.play();
    gameBoardBlocks.resetGame();
}

$('.leave').on('click', backToLandingPage());

$('#onePlayer').on('click', function() {
    localStorage.currentPlayers = 'one player';
    console.log('one');
});

$('#twoPlayers').on('click', function() {
    localStorage.currentPlayers = 'two players'
    console.log('two');
});