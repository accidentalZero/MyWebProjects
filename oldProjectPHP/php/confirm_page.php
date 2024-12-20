<?php
	echo '
		<form name = "entry" method = "POST" action = result_page.php>
		<fieldset>
			<legend>Введите код подтверждения регистрации</legend>		
				Ваш код:<input type = "text" name = "code">		
			<br><br><input type = "submit" value = "Подтвердить" >
		</fieldset>
		</form>';	
?>