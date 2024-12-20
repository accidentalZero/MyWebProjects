<!DOCTYPE HTML>
<html>
	<head>
		<meta charset = "UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Мультимедиа</title>	
		<link href="img/building.ico" rel="shortcut icon" type="image/x-icon">				
		<link href="css/style.css" rel="stylesheet">
		<link href="css/bootstrap.min.css" rel="stylesheet">		
	</head>
	<body class="CommonStyle"> 	
		<nav class="navbar navbar-default" role="navigation">
			<div class="container-fluid">
				
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#Menu">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
				</div>
				
				<div class="navbar-collapse collapse" id="Menu">
					<ul class="nav navbar-nav">
						<li class="nav-item Current"><a href="post.php">Добавить</a></li>						
						<li><a href="forum.php">Форум</a></li>
					</ul>
				</div>
			</div>
		</nav>
	<script src="js/jquery.js"></script>
	<script src="js/bootstrap.min.js"></script>	
	</body>
</html>	
<?php
	
	echo '
		<div class="container">
			<div class="col-xs-12">
				<form action="process.php" method="POST" accrpt-charset="utf-8">
				Имя: <input name="first_name" type="text">
				Фамилия: <input name="last_name" type="text">
					<p>Тема: <br>
					<input name="subject" type="text" size="64"></p>
					<p>Сообщение: <br>
					<textarea name="message" rows="5" cols="50">
					</textarea></p>
					<p><input type="submit" value="Отправить"></p>
				</form>
			</div>
		</div>	
		';
?>