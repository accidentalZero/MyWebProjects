<?php
	if(isset($_POST['code'])){
		if(isset($_COOKIE['code'])){		 
			$code = trim($_POST['code']);
			$cookie_code = $_COOKIE['code'];
			if($code == $cookie_code){
				//header('Location: confirm_page.php');
				echo "CONFIRMED!";
				require('../connect_db.php');
	
				//Отправка данных в таблицу
				$sql = "SELECT MAX(id) FROM users";
				$result = mysqli_query($dbc, $sql);
					
				$str = $result->fetch_row()[0];
				$curr_id = $str + 1;
				
				$user_name = trim($_COOKIE['user']);
				$password  = trim($_COOKIE['pass']);
				$email     = trim($_COOKIE['email']);	
					
				$sql = "INSERT INTO users
					   (id, username, password, email)
					   VALUES
					   ('$curr_id', '$user_name', '$password', '$email')";
					   
				$result = mysqli_query($dbc, $sql);
			}
		}
		else{
			echo "€стек срок действия кода!";
		}		
	}
?>