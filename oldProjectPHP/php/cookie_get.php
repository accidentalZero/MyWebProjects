<?php
	if(isset($_COOKIE['user'])){
		$user = $_COOKIE['user'];
		echo "<h1>Добро пожаловать, $user!<h1><hr>";
		echo '<a href="cookie_data.php">Просмотр cookie</a>';
	}
	else{
		echo 'Пожалуйста, <a href="cookie_form.html">авторизуйтесь</a>';
	}
?>