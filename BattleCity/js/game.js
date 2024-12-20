var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var tank = new Image();
tank.src = "img/tankE.png";

var bg = new Image();
bg.src = "img/back_ground.png";

var wall = new Image();
wall.src = "img/brick.png";

var hard_wall = new Image();
hard_wall.src = "img/hard_wall.png";

var water = new Image();
water.src = "img/water.png";

var bullet = new Image();
bullet.src = "img/bullet.png";

var enemy_tank_texture = new Image();
enemy_tank_texture.src = "img/enemyTankE.png";


var shoot_audio = new Audio();
shoot_audio.src = "audio/Shoot.mp3";

var move_audio = new Audio();
move_audio.src = "audio/move.mp3";

var to_hard = new Audio();
to_hard.src = "audio/toHard.mp3";

var to_wall = new Audio();
to_wall.src = "audio/toWall.mp3";

var game_over = new Audio();
game_over.src = "audio/Intro.mp3";

const wall_width = 40;
const tank_width = 31;


const speed = 2;//Скорость движения танка
const to_drop = speed + 1;//Значение на которое танк будет отброшен от стены
var last_motion = 0; // хранит направление последнего движения
// 0 - Восток, 1 - Юг, 2 - Запад, 3 - Север

var thereIsAnObstacle = false;
var shot_allowed = true;

// Обработка события, нажатие кнопки
document.addEventListener("keydown", move);

function popTank(_last_motion){
	//Функция проверяет в каком направлении двгался танк
	//и выталкивает его в нужную сторону при его движении
	switch (_last_motion) {
		case 0:
			//Двигался на Восток
			xPos -= to_drop;
			thereIsAnObstacle = false;
			break;
		case 1:
			//Двигался на Юг
			yPos -= to_drop;
			thereIsAnObstacle = false;
			break;
		case 2:
			//Двигался на Запад
			xPos += to_drop;
			thereIsAnObstacle = false;
			break;
		case 3:
			//Двигался на Север
			yPos += to_drop;
			thereIsAnObstacle = false;
			break;
		default:
	}
}

function popTankEnemy(_tank){
	//Функция проверяет в каком направлении двгался танк
	//и выталкивает его в нужную сторону при его движении
	switch (_tank.direction) {
		case 0:
			//Двигался на Восток
			_tank.x -= to_drop;
			_tank.thereIsAnObstacle = false;
			break;
		case 1:
			//Двигался на Юг
			_tank.y -= to_drop;
			_tank.thereIsAnObstacle = false;
			break;
		case 2:
			//Двигался на Запад
			_tank.x += to_drop;
			_tank.thereIsAnObstacle = false;
			break;
		case 3:
			//Двигался на Север
			_tank.y += to_drop;
			_tank.thereIsAnObstacle = false;
			break;
		default:
	}
}

function move(){
	if (event.code == 'ArrowUp'){
		//Движение вверх
		tank.src = "img/tankN.png";
		if(!thereIsAnObstacle){
			move_audio.play();
			yPos -= speed;
			last_motion = 3;
		}
		else{
			popTank(last_motion);
		}
	}
	if(event.code == 'ArrowRight'){
		//Движение вправо
		tank.src = "img/tankE.png";
		if(!thereIsAnObstacle){
			move_audio.play();
			xPos += speed;
			last_motion = 0;
		}
		else{
			popTank(last_motion);
		}
	}
	if(event.code == 'ArrowLeft'){
		//Движение влево
		tank.src = "img/tankW.png";
		if(!thereIsAnObstacle){
			move_audio.play();
			xPos -= speed;
			last_motion = 2;
		}
		else{
			popTank(last_motion);
		}
	}
	if(event.code == 'ArrowDown'){
		//Движение вниз
		tank.src = "img/tankS.png";
		if(!thereIsAnObstacle){
			move_audio.play();
			yPos += speed;
			last_motion = 1;
		}
		else{
			popTank(last_motion);
		}
	}
	if(event.code == 'Space'){
		//Стрельба
		if(shot_allowed){
			shoot_audio.play();
			let new_bullet;
			if((last_motion == 0) || (last_motion == 2)){
				new_bullet = new Bullet(xPos + 30, yPos + 15, last_motion);
			}
			else {
				new_bullet = new Bullet(xPos + 15, yPos, last_motion);
			}
			bullets.push(new_bullet);
			shot_allowed = false;
		}
	}
}

var enemy_tank_speed = 2;

function move_enemy(rand){//Получает на вход случайное направление движения
	if(rand == 0){
		//Движение вправо
		enemy_tank_texture.src = "img/enemyTankE.png";
		if(!enemy_tank.thereIsAnObstacle){
			move_audio.play();
			enemy_tank.x += enemy_tank_speed;
			enemy_tank.direction = 0;
		}
		else{
			popTankEnemy(enemy_tank);
		}
	}
	if(rand == 1){
		//Движение вниз
		enemy_tank_texture.src = "img/enemyTankS.png";
		if(!enemy_tank.thereIsAnObstacle){
			move_audio.play();
			enemy_tank.y += enemy_tank_speed;
			enemy_tank.direction = 1;
		}
		else{
			popTankEnemy(enemy_tank);
		}
	}
	if(rand == 2){
		//Движение влево
		enemy_tank_texture.src = "img/enemyTankW.png";
		if(!enemy_tank.thereIsAnObstacle){
			move_audio.play();
			enemy_tank.x -= enemy_tank_speed;
			enemy_tank.direction = 2;
		}
		else{
			popTankEnemy(enemy_tank);
		}
	}
	if (rand == 3){
		//Движение вверх
		enemy_tank_texture.src = "img/enemyTankN.png";
		if(!enemy_tank.thereIsAnObstacle){
			move_audio.play();
			enemy_tank.y -= enemy_tank_speed;
			enemy_tank.direction = 3;
		}
		else{
			popTankEnemy(enemy_tank);
		}
	}
	if(rand == 4){
		//Стрельба
		if(shot_allowed){
			shoot_audio.play();
			let new_bullet;
			if((enemy_tank.direction == 0) || (enemy_tank.direction == 2)){
				new_bullet = new Bullet(enemy_tank.x + 30, enemy_tank.y + 15, enemy_tank.direction);
			}
			else {
				new_bullet = new Bullet(enemy_tank.x + 15, enemy_tank.y, enemy_tank.direction);
			}
			bullets.push(new_bullet);
			shot_allowed = false;
		}
	}
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


var bullet_speed = 4;

class Bullet{
	//Класс для описания позиции
	constructor(x, y, direction){
		this.x = x;
		this.y = y;
		this.direction = direction;
	}
	move(){
		switch (this.direction) {
			case 0:
				//Двигался на Восток
				this.x += bullet_speed;
				break;
			case 1:
				//Двигался на Юг
				this.y += bullet_speed;
				break;
			case 2:
				//Двигался на Запад
				this.x -= bullet_speed;
				break;
			case 3:
				//Двигался на Север
				this.y -= bullet_speed;
				break;
			default:
		}
	}
}


//Начальная позиция танка
var xPos = 43;
var yPos = 163;
var tankStrengh = 3;

class Block{
	//Класс для описания координаты одного блока
	constructor(x, y, strength){
		this.x = x;
		this.y = y;
		this.strength = strength;
	}
}

class EnemyTank{
	constructor(x, y, strength, cd, direction) {
		this.x = x;
		this.y = y;
		this.strength = strength;
		this.cd = cd;
		this.direction = direction;
		this.thereIsAnObstacle = false;
	}
}


function createHorizontalWall(x_start, y_start, n, step, strength){
	var c_x = x_start;
	var c_y = y_start;
	var arr = [];
	for(var i = 0; i < n; i++){
		arr.push({
				x: c_x,
				y: c_y,
				strength: strength
			});
			c_x += step;
	}
	return arr;
}

function createVerticalWall(x_start, y_start, n, step, strength){
	var c_x = x_start;
	var c_y = y_start;
	var arr = [];
	for(var i = 0; i < n; i++){
		arr.push({
				x: c_x,
				y: c_y,
				strength: strength
			});
			c_y += step;
	}
	return arr;
}

function drawWall(arr){
	//Отрисовка кирпичной стены
	for(var i = 0; i < arr.length; i++){
		ctx.drawImage(wall, arr[i].x, arr[i].y);
	}
}

function drawHardWall(arr){
	//Отрисовка стальной стены
	for(var i = 0; i < arr.length; i++){
		ctx.drawImage(hard_wall, arr[i].x, arr[i].y);
	}
}

function drawWater(arr){
	//Отрисовка водной стены
	for(var i = 0; i < arr.length; i++){
		ctx.drawImage(water, arr[i].x, arr[i].y);
	}
}

function drawBullets(arr){
	//Отрисовка всех снарядов, выпущенных танком
	for(let i = 0; i < arr.length; i++){
		ctx.drawImage(bullet,arr[i].x,arr[i].y);
	}
}

var blocks  = createHorizontalWall(0,0,3,wall_width, 3);
var blocks1 = createVerticalWall(120,0,6,wall_width, 3);
var blocks2 = createHorizontalWall(0,80,3,wall_width, 3);
var blocks3 = createVerticalWall(640,0,12,wall_width,3);
var blocks4 = createVerticalWall(320,0,12,wall_width,3);

var hard_blocks = createVerticalWall(480,0,6,wall_width);
var hard_blocks1 = createHorizontalWall(0,240,4,wall_width);
var hard_blocks2 = createVerticalWall(240,400,2,wall_width);
var hard_blocks3 = createVerticalWall(720,0,8,wall_width);

var waters = createVerticalWall(240,0,8,wall_width);

//создание вражеского танка
var enemy_tank = new EnemyTank(163,203,20,30,2);


var bullets = new Array();
var timer = 0;

var enemy_move_timer = 0;
var curr_dir = 0;

var enemy_alive = true;

//------------------------------------------------------------------------------
function draw() {
	//Основной цикл игры
	timer++;
	if(timer == 60){
		timer = 0;
		shot_allowed = true;
	}

	if(tankStrengh == 0){
		game_over.play();
		alert("Вы проиграли! Танк уничтожен!");
		return;
	}

	if(enemy_alive){
		enemy_move_timer++;
		if(enemy_move_timer == 120){
			enemy_move_timer = 0;
			curr_dir = getRandomInt(4);
		}
		if(enemy_move_timer % 4 == 0){
			move_enemy(curr_dir);
		}
		if(enemy_move_timer % 80 == 0){
			move_enemy(4);
		}
	}


	thereIsAnObstacle = false;
	ctx.drawImage(bg, 0, 0);//Отрисовка фона
	ctx.drawImage(tank, xPos, yPos);//Отрисовка танка

	drawWall(blocks);//Отрисовка стены
	drawWall(blocks1);
	drawWall(blocks2);
	drawWall(blocks3);
	drawWall(blocks4);

	drawHardWall(hard_blocks);
	drawHardWall(hard_blocks1);
	drawHardWall(hard_blocks2);
	drawHardWall(hard_blocks3);

	drawWater(waters);

	if(enemy_tank.strength == 0){
		enemy_alive = false;
	}

	if(!enemy_alive){
		game_over.play();
		alert("Победа!");
		return;
	}

	if(enemy_alive){
		ctx.drawImage(enemy_tank_texture, enemy_tank.x, enemy_tank.y);//Вражеский танк
	}

	//отрисовка снарядов
	drawBullets(bullets);
	for(let i = 0; i < bullets.length; i++){
		bullets[i].move();
	}

	//Проверка границ карты
	if((xPos + tank.width >= 960) || (xPos <= 0) ||
		(yPos + tank.height >= 480) || (yPos <= 0)){
		//Проверка на выход за карту танка
		thereIsAnObstacle = true;
	}
	if(enemy_alive){
		if((enemy_tank.x + tank.width >= 960) || (enemy_tank.x <= 0) ||
			(enemy_tank.y + tank.height >= 480) || (enemy_tank.y <= 0)){
			//Проверка на выход за карту второго танка
			enemy_tank.thereIsAnObstacle = true;
		}
	}

	for(var i = 0; i < bullets.length; i++){
		if((bullets[i].x + 1 >= 960) || (bullets[i].x  <= 0) ||
			(bullets[i].y + 1 >= 480) || (bullets[i].y <= 0)){
			//Проверка на выход за карту снаряда
			bullets.splice(i,1);
		}
	}

	//Попадание в танк игрока
	for(var j = 0; j < bullets.length; j++){
		if((bullets[j].x + 1 >= xPos) && (bullets[j].x <= xPos + tank.width) &&
			 (bullets[j].y + 1 >= yPos) && (bullets[j].y <= yPos + tank.height)){
			 to_wall.play();
			 bullets.splice(j,1);
			 tankStrengh--;
			 if(tankStrengh == 0){
				 tank.src = "img/death.png";
		 		 ctx.drawImage(tank, xPos, yPos);//Отрисовка танка
			 }
		 }
	}

	//Проверка на попадание снаряда в стену
	for(var i = 0; i < blocks.length; i++){
		for(var j = 0; j < bullets.length; j++){
			if((bullets[j].x + 1 >= blocks[i].x) && (bullets[j].x <= blocks[i].x + wall.width) &&
			 	 (bullets[j].y + 1 >= blocks[i].y) && (bullets[j].y <= blocks[i].y + wall.height)){
				 to_wall.play();
				 bullets.splice(j,1);
				 blocks[i].strength--;
			 }
		}
	}

	for(var i = 0; i < blocks1.length; i++){
		for(var j = 0; j < bullets.length; j++){
			 if((bullets[j].x + 1 >= blocks1[i].x) && (bullets[j].x <= blocks1[i].x + wall.width) &&
			 	 (bullets[j].y + 1 >= blocks1[i].y) && (bullets[j].y <= blocks1[i].y + wall.height)){
				 to_wall.play();
				 bullets.splice(j,1);
				 blocks1[i].strength--;
			 }
		}
	}

	for(var i = 0; i < blocks2.length; i++){
		for(var j = 0; j < bullets.length; j++){
			 if((bullets[j].x + 1 >= blocks2[i].x) && (bullets[j].x <= blocks2[i].x + wall.width) &&
			 	 (bullets[j].y + 1 >= blocks2[i].y) && (bullets[j].y <= blocks2[i].y + wall.height)){
				 to_wall.play();
				 bullets.splice(j,1);
				 blocks2[i].strength--;
			 }
		}
	}

	for(var i = 0; i < blocks3.length; i++){
		for(var j = 0; j < bullets.length; j++){
			 if((bullets[j].x + 1 >= blocks3[i].x) && (bullets[j].x <= blocks3[i].x + wall.width) &&
			 	 (bullets[j].y + 1 >= blocks3[i].y) && (bullets[j].y <= blocks3[i].y + wall.height)){
				 to_wall.play();
				 bullets.splice(j,1);
				 blocks3[i].strength--;
			 }
		}
	}

	for(var i = 0; i < blocks4.length; i++){
		for(var j = 0; j < bullets.length; j++){
			 if((bullets[j].x + 1 >= blocks4[i].x) && (bullets[j].x <= blocks4[i].x + wall.width) &&
				 (bullets[j].y + 1 >= blocks4[i].y) && (bullets[j].y <= blocks4[i].y + wall.height)){
				 to_wall.play();
				 bullets.splice(j,1);
				 blocks4[i].strength--;
			 }
		}
	}

	//Стальные стены не ломаются
	for(var i = 0; i < hard_blocks.length; i++){
		for(var j = 0; j < bullets.length; j++){
			 //Проверка на соприкосновения с блоками
			 if((bullets[j].x + 1 >= hard_blocks[i].x) && (bullets[j].x <= hard_blocks[i].x + wall.width) &&
			 	 (bullets[j].y + 1 >= hard_blocks[i].y) && (bullets[j].y <= hard_blocks[i].y + wall.height)){
				 to_hard.play();
				 bullets.splice(j,1);
			 }
		}
	}

	for(var i = 0; i < hard_blocks1.length; i++){
		for(var j = 0; j < bullets.length; j++){
			 //Проверка на соприкосновения с блоками
			 if((bullets[j].x + 1 >= hard_blocks1[i].x) && (bullets[j].x <= hard_blocks1[i].x + wall.width) &&
			 	 (bullets[j].y + 1 >= hard_blocks1[i].y) && (bullets[j].y <= hard_blocks1[i].y + wall.height)){
				 to_hard.play();
				 bullets.splice(j,1);
			 }
		}
	}

	for(var i = 0; i < hard_blocks2.length; i++){
		for(var j = 0; j < bullets.length; j++){
			 //Проверка на соприкосновения с блоками
			 if((bullets[j].x + 1 >= hard_blocks2[i].x) && (bullets[j].x <= hard_blocks2[i].x + wall.width) &&
				 (bullets[j].y + 1 >= hard_blocks2[i].y) && (bullets[j].y <= hard_blocks2[i].y + wall.height)){
				 to_hard.play();
				 bullets.splice(j,1);
			 }
		}
	}

	for(var i = 0; i < hard_blocks3.length; i++){
		for(var j = 0; j < bullets.length; j++){
			 //Проверка на соприкосновения с блоками
			 if((bullets[j].x + 1 >= hard_blocks3[i].x) && (bullets[j].x <= hard_blocks3[i].x + wall.width) &&
				 (bullets[j].y + 1 >= hard_blocks3[i].y) && (bullets[j].y <= hard_blocks3[i].y + wall.height)){
				 to_hard.play();
				 bullets.splice(j,1);
			 }
		}
	}

//-----------------------------------------------------------------------
	//Уборка сломанных блоков
	for(var i = 0; i < blocks.length; i++){
		if(blocks[i].strength == 0){
			blocks.splice(i,1);
		}
	}

	for(var i = 0; i < blocks1.length; i++){
		if(blocks1[i].strength == 0){
			blocks1.splice(i,1);
		}
	}

	for(var i = 0; i < blocks2.length; i++){
		if(blocks2[i].strength == 0){
			blocks2.splice(i,1);
		}
	}

	for(var i = 0; i < blocks3.length; i++){
		if(blocks3[i].strength == 0){
			blocks3.splice(i,1);
		}
	}

	for(var i = 0; i < blocks4.length; i++){
		if(blocks4[i].strength == 0){
			blocks4.splice(i,1);
		}
	}

	//__________________________________________________________
	//Движения танка
	for(var i = 0; i < blocks.length; i++){
	 //Проверка на соприкосновения с блоками
	 if((xPos + tank.width >= blocks[i].x) && (xPos <= blocks[i].x + wall.width) &&
		 (yPos + tank.height >= blocks[i].y) && (yPos <= blocks[i].y + wall.height)){
			thereIsAnObstacle = true;// запрет движения и тригер на выталкивание
	 }
	}

	for(var i = 0; i < blocks1.length; i++){
	 //Проверка на соприкосновения с блоками
	 if((xPos + tank.width >= blocks1[i].x) && (xPos <= blocks1[i].x + wall.width) &&
		 (yPos + tank.height >= blocks1[i].y) && (yPos <= blocks1[i].y + wall.height)){
			thereIsAnObstacle = true;// запрет движения и тригер на выталкивание
	 }
	}

	for(var i = 0; i < blocks2.length; i++){
	 //Проверка на соприкосновения с блоками
	 if((xPos + tank.width >= blocks2[i].x) && (xPos <= blocks2[i].x + wall.width) &&
		 (yPos + tank.height >= blocks2[i].y) && (yPos <= blocks2[i].y + wall.height)){
			thereIsAnObstacle = true;// запрет движения и тригер на выталкивание
	 }
	}

	for(var i = 0; i < blocks3.length; i++){
	 //Проверка на соприкосновения с блоками
	 if((xPos + tank.width >= blocks3[i].x) && (xPos <= blocks3[i].x + wall.width) &&
		 (yPos + tank.height >= blocks3[i].y) && (yPos <= blocks3[i].y + wall.height)){
			thereIsAnObstacle = true;// запрет движения и тригер на выталкивание
	 }
	}

	for(var i = 0; i < blocks4.length; i++){
	 //Проверка на соприкосновения с блоками
	 if((xPos + tank.width >= blocks4[i].x) && (xPos <= blocks4[i].x + wall.width) &&
		 (yPos + tank.height >= blocks4[i].y) && (yPos <= blocks4[i].y + wall.height)){
			thereIsAnObstacle = true;// запрет движения и тригер на выталкивание
	 }
	}

	for(var i = 0; i < hard_blocks.length; i++){
	 //Проверка на соприкосновения с блоками
	 if((xPos + tank.width >= hard_blocks[i].x) && (xPos <= hard_blocks[i].x + wall.width) &&
	 	 (yPos + tank.height >= hard_blocks[i].y) && (yPos <= hard_blocks[i].y + wall.height)){
		 	thereIsAnObstacle = true;
	 }
	}

	for(var i = 0; i < hard_blocks1.length; i++){
	 //Проверка на соприкосновения с блоками
	 if((xPos + tank.width >= hard_blocks1[i].x) && (xPos <= hard_blocks1[i].x + wall.width) &&
	 	 (yPos + tank.height >= hard_blocks1[i].y) && (yPos <= hard_blocks1[i].y + wall.height)){
		 	thereIsAnObstacle = true;
	 }
	}

	for(var i = 0; i < hard_blocks2.length; i++){
	 //Проверка на соприкосновения с блоками
	 if((xPos + tank.width >= hard_blocks2[i].x) && (xPos <= hard_blocks2[i].x + wall.width) &&
	 	 (yPos + tank.height >= hard_blocks2[i].y) && (yPos <= hard_blocks2[i].y + wall.height)){
		 	thereIsAnObstacle = true;
	 }
	}

	for(var i = 0; i < hard_blocks3.length; i++){
	 //Проверка на соприкосновения с блоками
	 if((xPos + tank.width >= hard_blocks3[i].x) && (xPos <= hard_blocks3[i].x + wall.width) &&
	 	 (yPos + tank.height >= hard_blocks3[i].y) && (yPos <= hard_blocks3[i].y + wall.height)){
		 	thereIsAnObstacle = true;
	 }
	}

	for(var i = 0; i < waters.length; i++){
	 //Проверка на соприкосновения с блоками
	 if((xPos + tank.width >= waters[i].x) && (xPos <= waters[i].x + wall.width) &&
	 	 (yPos + tank.height >= waters[i].y) && (yPos <= waters[i].y + wall.height)){
		 	thereIsAnObstacle = true;
	 }
	}
	//-- Движение вражеского танка
	if(enemy_alive){
	//-- Начало условия на наличие второго танка
		for(var i = 0; i < blocks.length; i++){
		 //Проверка на соприкосновения с блоками
		 if((enemy_tank.x + tank.width >= blocks[i].x) && (enemy_tank.x <= blocks[i].x + wall.width) &&
		   (enemy_tank.y + tank.height >= blocks[i].y) && (enemy_tank.y <= blocks[i].y + wall.height)){
		    enemy_tank.thereIsAnObstacle = true;// запрет движения и тригер на выталкивание
		 }
		}

		for(var i = 0; i < blocks1.length; i++){
		 //Проверка на соприкосновения с блоками
		 if((enemy_tank.x + tank.width >= blocks1[i].x) && (enemy_tank.x <= blocks1[i].x + wall.width) &&
		   (enemy_tank.y + tank.height >= blocks1[i].y) && (enemy_tank.y <= blocks1[i].y + wall.height)){
		    enemy_tank.thereIsAnObstacle = true;// запрет движения и тригер на выталкивание
		 }
		}

		for(var i = 0; i < blocks2.length; i++){
		 //Проверка на соприкосновения с блоками
		 if((enemy_tank.x + tank.width >= blocks2[i].x) && (enemy_tank.x <= blocks2[i].x + wall.width) &&
		   (enemy_tank.y + tank.height >= blocks2[i].y) && (enemy_tank.y <= blocks2[i].y + wall.height)){
		    enemy_tank.thereIsAnObstacle = true;// запрет движения и тригер на выталкивание
		 }
		}

		for(var i = 0; i < blocks3.length; i++){
		 //Проверка на соприкосновения с блоками
		 if((enemy_tank.x + tank.width >= blocks3[i].x) && (enemy_tank.x <= blocks3[i].x + wall.width) &&
		   (enemy_tank.y + tank.height >= blocks3[i].y) && (enemy_tank.y <= blocks3[i].y + wall.height)){
		    enemy_tank.thereIsAnObstacle = true;// запрет движения и тригер на выталкивание
		 }
		}

		for(var i = 0; i < blocks4.length; i++){
		 //Проверка на соприкосновения с блоками
		 if((enemy_tank.x + tank.width >= blocks4[i].x) && (enemy_tank.x <= blocks4[i].x + wall.width) &&
		   (enemy_tank.y + tank.height >= blocks4[i].y) && (enemy_tank.y <= blocks4[i].y + wall.height)){
		    enemy_tank.thereIsAnObstacle = true;// запрет движения и тригер на выталкивание
		 }
		}

		for(var i = 0; i < hard_blocks.length; i++){
		 //Проверка на соприкосновения с блоками
		 if((enemy_tank.x + tank.width >= hard_blocks[i].x) && (enemy_tank.x <= hard_blocks[i].x + wall.width) &&
		   (enemy_tank.y + tank.height >= hard_blocks[i].y) && (enemy_tank.y <= hard_blocks[i].y + wall.height)){
		    enemy_tank.thereIsAnObstacle = true;
		 }
		}

		for(var i = 0; i < hard_blocks1.length; i++){
		 //Проверка на соприкосновения с блоками
		 if((enemy_tank.x + tank.width >= hard_blocks1[i].x) && (enemy_tank.x <= hard_blocks1[i].x + wall.width) &&
		   (enemy_tank.y + tank.height >= hard_blocks1[i].y) && (enemy_tank.y <= hard_blocks1[i].y + wall.height)){
		    enemy_tank.thereIsAnObstacle = true;
		 }
		}

		for(var i = 0; i < hard_blocks2.length; i++){
		 //Проверка на соприкосновения с блоками
		 if((enemy_tank.x + tank.width >= hard_blocks2[i].x) && (enemy_tank.x <= hard_blocks2[i].x + wall.width) &&
		   (enemy_tank.y + tank.height >= hard_blocks2[i].y) && (enemy_tank.y <= hard_blocks2[i].y + wall.height)){
		    enemy_tank.thereIsAnObstacle = true;
		 }
		}

		for(var i = 0; i < hard_blocks3.length; i++){
		 //Проверка на соприкосновения с блоками
		 if((enemy_tank.x + tank.width >= hard_blocks3[i].x) && (enemy_tank.x <= hard_blocks3[i].x + wall.width) &&
		   (enemy_tank.y + tank.height >= hard_blocks3[i].y) && (enemy_tank.y <= hard_blocks3[i].y + wall.height)){
		    enemy_tank.thereIsAnObstacle = true;
		 }
		}

		for(var i = 0; i < waters.length; i++){
		 //Проверка на соприкосновения с блоками
		 if((enemy_tank.x + tank.width >= waters[i].x) && (enemy_tank.x <= waters[i].x + wall.width) &&
		   (enemy_tank.y + tank.height >= waters[i].y) && (enemy_tank.y <= waters[i].y + wall.height)){
		    enemy_tank.thereIsAnObstacle = true;
		 }
		}

		//-- Взаимодействия танков
		if((xPos + tank.width >= enemy_tank.x) && (xPos <= enemy_tank.x + tank.width) &&
			 (yPos + tank.height >= enemy_tank.y) && (yPos <= enemy_tank.y + tank.height)){
				thereIsAnObstacle = true;// запрет движения и тригер на выталкивание
				enemy_tank.thereIsAnObstacle = true;
		 }

		 for(var j = 0; j < bullets.length; j++){
				//Снаряды, пущенные во вражеский танк
				if((bullets[j].x + 1 >= enemy_tank.x) && (bullets[j].x <= enemy_tank.x + tank.width) &&
					(bullets[j].y + 1 >= enemy_tank.y) && (bullets[j].y <= enemy_tank.y + tank.height)){
					to_hard.play();
					bullets.splice(j,1);
					enemy_tank.strength--;
				}
		 }
	// -- Конец условия на наличе второго танка
 	}




 requestAnimationFrame(draw);
}

bg.onload = draw;//Вызов функции рисования
