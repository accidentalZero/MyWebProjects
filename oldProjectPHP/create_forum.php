<?php
	require('..\connect_db.php');
	$sql = 'CREATE TABLE IF NOT EXISTS forum ('.
	'post_id INT UNSIGNED NOT NULL AUTO_INCREMENT,'.
	'first_name VARCHAR(20) NOT NULL,'.
	'last_name VARCHAR(40) NOT NULL,'.
	'subject VARCHAR(60) NOT NULL,'.
	'message TEXT NOT NULL,'.
	'post_date DATETIME NOT NULL,'.
	'PRIMARY KEY(post_id))';
	if(mysqli_query($dbc, $sql) === TRUE)
	{
		echo 'Таблица "forum" успешно создана';
	}
	else
	{
		echo 'Ошибка создания таблицы: '.mysqli_error($dbc);
	}
	mysqli_close($dbc);