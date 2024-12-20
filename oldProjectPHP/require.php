<?php
	require('../connect_db.php');
	if(mysqli_ping($dbc))
	{
		echo 'Сервер MySQL '. mysqli_get_server_info($dbc).' на '. mysqli_get_host_info($dbc);
	}