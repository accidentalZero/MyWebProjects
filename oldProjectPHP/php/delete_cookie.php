<?php
	if(isset($_POST['user']) && isset($_POST['pass'])){
		setcookie('user', $user, time() - 1);
		setcookie('pass', md5($pass), time() - 1);
	}
?>