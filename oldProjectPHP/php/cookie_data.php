<?php
	if(count($_COOKIE) > 0)
	{
		echo '<dl> ';
		foreach($_COOKIE as $key => $value)
		{
			echo "<dt>����: $key";
			echo "<dd>��������: $value";
		}
		echo '</dl><hr>';
		var_dump($_COOKIE);
	}
	else
	{
		echo '����������, <a href="cookie_form.html">�������������</a>';
	}
	echo '
			<form action="delete_cookie.php" method="post">
				<input type="button" name="my_button" value="������">
			</form>
	';
?>