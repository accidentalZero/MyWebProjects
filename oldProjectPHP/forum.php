<!DOCTYPE HTML>
<html>
	<head>
		<meta charset = "UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Мультимедиа</title>	
		<link href="img/building.ico" rel="shortcut icon" type="image/x-icon">				
		<link href="css/style.css" rel="stylesheet">
		<link href="css/bootstrap.min.css" rel="stylesheet">		
	</head>
	<body class="CommonStyle"> 	
		<nav class="navbar navbar-default" role="navigation">
			<div class="container-fluid">
				
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#Menu">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
				</div>
				
				<div class="navbar-collapse collapse" id="Menu">
					<ul class="nav navbar-nav">
						<li><a href="index.html" >Главная</a></li>
						<li><a href="page2.html">О себе</a></li>
						<li><a href="page3.html">Мультимедиа</a></li>
						<li><a href="js.html">Задания JS</a></li>
						<li class="nav-item Current"><a href="forum.php">Форум</a></li>
					</ul>
				</div>
			</div>
		</nav>
	<script src="js/jquery.js"></script>
	<script src="js/bootstrap.min.js"></script>
	</body>
</html>	

<?php	
	require('..\connect_db.php');
	$sql = 'SELECT * FROM forum';
	$result = mysqli_query($dbc, $sql);
	
	if(mysqli_num_rows($result) > 0)
	{
		echo '<div class="container">><table align="center" cellpadding="10" cellspacing="10" border="5" class="Table"><tr><th>Автор</th><th>Тема</th>
		<th id="msq">Сообщение</th></tr>';
		while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
		{
			echo '<tr><td>'.
			$row['first_name'].' '.
			$row['last_name'].'<br>'.
			$row['post_date'].'</td><td>'.
			$row['subject'].'</td><td>'.
			$row['message'].'</td></tr>';
		}
		echo '</table></div>';		
	}
	else
	{
		echo '<p class="col-xs-8 Heading">В настоящее время сообщений нет.</p>';
	}
	echo '<div class="container"><p class="col-xs-12"><a href="post.php">Написать сообщение</a></p></div>';
	mysqli_close($dbc);	
?>
	