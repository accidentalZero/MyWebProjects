<?php
	require('../connect_db.php');
	
	//   
	$sql = "SELECT MAX(id) FROM users";
	$result = mysqli_query($dbc, $sql);
		
	$str = $result->fetch_row()[0];
	$curr_id = $str + 1;
		
	$sql = "INSERT INTO users
		   (id, username, password, email)
		   VALUES
		   ('$curr_id', 'sdfsd', '1234', 'snapgney@mail.ru')";
		   
	$result = mysqli_query($dbc, $sql);
	
