<?php
	if(isset($_COOKIE['user'])){
		$user = $_COOKIE['user'];
		echo "<h1>����� ����������, $user!<h1><hr>";
		echo '<a href="cookie_data.php">�������� cookie</a>';
	}
	else{
		echo '����������, <a href="cookie_form.html">�������������</a>';
	}
?>