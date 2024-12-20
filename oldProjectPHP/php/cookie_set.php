<?php
	function reject($entry){
		echo "�����������: $entry <br>";
		echo '����������, <a href="../cookie_form.html">�������������</a>';
		exit();
	}
	if(isset($_POST['user'])){
		$user = trim($_POST['user']);
		if(!ctype_alnum($user)){
			reject('��� ������������');
		}
		if(isset($_POST['pass'])){
			$pass = trim($_POST['pass']);
			if(!ctype_alnum($pass)){
				reject('������');
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
							
					// ����� phpmailer
					require 'PHPMailer/PHPMailer.php';
					require 'PHPMailer/SMTP.php';
					require 'PHPMailer/Exception.php';
					// ����������, ������� ���������� ������������
					
					$mail = new PHPMailer\PHPMailer\PHPMailer();
					try {
						$msg = "ok";
						$mail->isSMTP();   
						$mail->CharSet = "UTF-8";                                          
						$mail->SMTPAuth   = true;
						// ��������� ����� �����
						$mail->Host       = 'smtp.gmail.com'; // SMTP ������� GMAIL
						$mail->Username   = ''; // ����� �� �����
						$mail->Password   = ''; // ������ �� �����
						$mail->SMTPSecure = 'ssl';
						$mail->Port       = 465;
						$mail->setFrom('@gmail.com', ''); // ����� ����� ����� � ��� �����������
						// ���������� ������
						$mail->addAddress($email);  
						
						
						// -----------------------
						// ���� ������
						// -----------------------
						$mail->isHTML(true);
											
						$mail->Subject = "Confirm your registration!";
						$mail->Body    = "Hello, $user <br>
						<b>your e-mail address: </b> $email was used to register on the site.<br><br>
						<b>your password: <b> $pass <br>
						<b>USE THIS CODE TO CONFIRM REGISTRATION: <b> $code <br>";
						;
						// ��������� ������������� ���������
						if ($mail->send()) {
							echo "$msg";
						}
						else{
							echo "��������� �� ���� ����������. ������� ������� ��������� ����� �����";
						}
					}
					catch (Exception $e){
						echo "��������� �� ���� ����������. ������� ������: {$mail->ErrorInfo}";
					}			
					setcookie('code', $code, time()+600);//��� �������� �� ��������� ��������, ���� �������� 10 ���
					header('Location: ../confirm_page.html');
				}
			}		
		}
	}
	else{
		header('Location: ../cookie_form.html');
	}
?>