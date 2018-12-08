
// randomNumber() 用于生成随机数
// checkGuess() 用于验证玩家输入的合法答案是否正确

// guesses 保存用户输入历史
// guessCount 保存用户提交的次数
// answer 保存随机数

// newBtn 保存重开游戏按钮

function isDisabled(ele){
	return (status)=>{
		$(ele).attr('disabled',status);
	}
}
var inputDisabled = isDisabled('.input');
var submitDisabled = isDisabled('.submit');


function focus(){
	$('.input').val('').focus();
}

function randomNumber(){
	return Math.floor(Math.random() * 100) + 1;
}



function isWin(res){
	var reClass;
	if(res === true){
		res = '恭喜你, 猜对了';
		reClass = 'lose';
	}else if( res === false){
		res = '!!!GAMEOVER!!!';
		reClass = 'win';
	}

	return (resStyle)=>{
		
		$('.lastResult').html(res).addClass(resStyle).removeClass(reClass);
		$('.tips').html('');
	}
}

var overWin = isWin(true);
var overLose = isWin(false);

function setGameOver(res){

	inputDisabled(true);
	submitDisabled(true);

	newBtn = $('<button>开始新游戏</button>');
	newBtn.click(resetGame(res)).addClass('resBtn');

	$('.result').after(newBtn);
}


function resetGame(resClass){
	return ()=>{

		guessCount = 1;
	
		$('.result').children().html('');
	
		newBtn.remove();
	
		submitDisabled(false);
		inputDisabled(false);
		$('.input').val('').focus();
	
		$('.lastResult').removeClass(resClass)
	
		answer = randomNumber();
	}
}

function checkGuess(){
	var guess = Number($('.input').val());

	if( guess == 0 || guess > 100){
		$('.guesses').html('答案范围在 1 ~ 100 哦!');
		return;
	}
	// console.log(guessCount);
	if( guessCount === 1){
		guesses = '上次猜的数：';
	}

	guesses += guess + ' ';
	$('.guesses').html(guesses);

	if( guess === answer ){

		overWin('win');
		setGameOver('win');

	}else if( guessCount === 10){

		overLose('lose');
		setGameOver('lose');

	}else{

				

		$('.lastResult').html('你猜错了').addClass('lose');

		if( guess < answer){

			$('.tips').html('你猜小了');

		}else if( guess > answer){
			
			$('.tips').html('你猜大了');

		}
	}

	guessCount ++;
	$('.input').val('').focus();

}

var guessCount = 1;
var guesses = '';
var newBtn;
var answer = randomNumber();

$('.input').val('').focus();

$('.submit').click(checkGuess)

$('.label').mouseenter(function(){
	console.log('mouseenter')
	$(this).addClass('show');
})
$('.label').mouseleave(function(){
	$(this).removeClass('show')
})