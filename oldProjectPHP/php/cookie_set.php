<?php
	function reject($entry){
		echo "Недопустимо: $entry <br>";
		echo 'Пожалуйста, <a href="../cookie_form.html">авторизуйтесь</a>';
		exit();
	}
	if(isset($_POST['user'])){
		$user = trim($_POST['user']);
		if(!ctype_alnum($user)){
			reject('Имя пользователя');
		}
		if(isset($_POST['pass'])){
			$pass = trim($_POST['pass']);
			if(!ctype_alnum($pass)){
				reject('Пароль');
			}
			if(isset($_POST['email'])){
				$email = trim($_POST['email']);
				if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
					reject('E-mail');
				}
				else{
					setcookie('user', $user, time()+3600);
					setcookie('pass', md5($pass), time()+3600);
					setcookie('email', $email, time()+3600);
					
					$code = rand(1050, 2080);					
							
					// Файлы phpmailer
					require 'PHPMailer/PHPMailer.php';
					require 'PHPMailer/SMTP.php';
					require 'PHPMailer/Exception.php';
					// Переменные, которые отправляет пользователь
					
					$mail = new PHPMailer\PHPMailer\PHPMailer();
					try {
						$msg = "ok";
						$mail->isSMTP();   
						$mail->CharSet = "UTF-8";                                          
						$mail->SMTPAuth   = true;
						// Настройки вашей почты
						$mail->Host       = 'smtp.gmail.com'; // SMTP сервера GMAIL
						$mail->Username   = ''; // Логин на почте
						$mail->Password   = ''; // Пароль на почте
						$mail->SMTPSecure = 'ssl';
						$mail->Port       = 465;
						$mail->setFrom('@gmail.com', ''); // Адрес самой почты и имя отправителя
						// Получатель письма
						$mail->addAddress($email);  
						
						
						// -----------------------
						// Само письмо
						// -----------------------
						$mail->isHTML(true);
											
						$mail->Subject = "Confirm your registration!";
						$mail->Body    = "Hello, $user <br>
						<b>your e-mail address: </b> $email was used to register on the site.<br><br>
						<b>your password: <b> $pass <br>
						<b>USE THIS CODE TO CONFIRM REGISTRATION: <b> $code <br>";
						;
						// Проверяем отравленность сообщения
						if ($mail->send()) {
							echo "$msg";
						}
						else{
							echo "Сообщение не было отправлено. Неверно указаны настройки вашей почты";
						}
					}
					catch (Exception $e){
						echo "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
					}			
					setcookie('code', $code, time()+600);//Для проверки на следующей странице, срок действия 10 мин
					header('Location: ../confirm_page.html');
				}
			}		
		}
	}
	else{
		header('Location: ../cookie_form.html');
	}
?>