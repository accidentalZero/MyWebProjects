<?php	
	//№20
	echo "№20<br>";
	$array = array(1,1,1,2,2,2,2,3);
	$already_print = array();
	foreach ($array as $value){
		if(!array_key_exists($value, $already_print)){
			$already_print[$value] = true;
			echo $value.'<br>';			
		}
	}
	echo "<hr>";
	
	//№9
	echo "№9<br>";
	$str = "я купил бронетранспортер вчера";
	$words_begin = array(0);
	$words_end   = array();
	$word_count = 1;
	
	for($i = 0; $i < strlen($str); $i++){
		if($str[$i] == ' '){
			array_push($words_begin, $i + 1);
			array_push($words_end, $i);	
			$word_count++;			
		}
	}
	array_push($words_end, strlen($str));	
	
	$words = array();
	$result = "";
	for($i = 0; $i < $word_count; $i++){
		array_push($words, substr($str, $words_begin[$i], $words_end[$i] - $words_begin[$i]));
		//echo $words[$i]."<br>";
		//echo strlen($words[$i])."<br>";
		if(strlen($words[$i]) > 7){
			$words[$i] = substr($words[$i], 0, 6);
			$words[$i] .= "*"; 
		}
		//echo $words[$i]."<hr>";
		$result .= $words[$i];
		$result .= " ";
	}
	echo $result."<hr>";	

	//№5
	echo "№5<br>";
	$array = array( 
					'a1' => array('id'=>'1', 'age'=>'16', 'gender'=>'m', 'login'=>'Вася'),
					'a2' => array('id'=>'2', 'age'=>'18', 'gender'=>'m', 'login'=>'Петя'),
					'a3' => array('id'=>'3', 'age'=>'20', 'gender'=>'g', 'login'=>'Катя'),
					'a4' => array('id'=>'4', 'age'=>'20', 'gender'=>'m', 'login'=>'Стас'),
					'a5' => array('id'=>'5', 'age'=>'12', 'gender'=>'g', 'login'=>'Маша'),
					'a6' => array('id'=>'6', 'age'=>'44', 'gender'=>'g', 'login'=>'Галя'),
					'a7' => array('id'=>'7', 'age'=>'45', 'gender'=>'m', 'login'=>'Макс'),
					'a8' => array('id'=>'8', 'age'=>'20', 'gender'=>'m', 'login'=>'Илья'),
					'a9' => array('id'=>'9', 'age'=>'20', 'gender'=>'g', 'login'=>'Даша'),
				   );
				   
	function ascending_sort($array, $field){
		for ($i = 1; $i <= count($array) - 1; $i++){
			$min = 'a'.$i; // запоминаем индекс текущего элемента
			// ищем минимальный элемент чтобы поместить на место i-ого
			for ($j = $i + 1; $j <= count($array); $j++){  // для остальных элементов после i-ого
				if ($array['a'.$j][$field] < $array[$min][$field]) // если элемент меньше минимального,
					$min = 'a'.$j;       // запоминаем его индекс в min
			}
			$temp = $array['a'.$i];// меняем местами i-ый и минимальный элементы
			$array['a'.$i] = $array[$min];
			$array[$min] = $temp;
		}
		return $array;
	}
	function decreasing_sort($array, $field){
		for ($i = 1; $i <= count($array) - 1; $i++){
			$max = 'a'.$i; // запоминаем индекс текущего элемента
			// ищем максимальный элемент чтобы поместить на место i-ого
			for ($j = $i + 1; $j <= count($array); $j++){  // для остальных элементов после i-ого
				if ($array['a'.$j][$field] > $array[$max][$field]) // если элемент меньше минимального,
					$max = 'a'.$j;       // запоминаем его индекс в min
			}
			$temp = $array['a'.$i];// меняем местами i-ый и минимальный элементы
			$array['a'.$i] = $array[$max];
			$array[$max] = $temp;
		}
		return $array;
	}	
	
	function my_sort($array, $field, $ascending_order){
		/*#io: $array - двумерный массив, 
			   $field -	поле по которому осуществляется сортировка,
			   $ascending_order - восходящий ли порядок
		*/
		if($ascending_order){
			$array = ascending_sort($array, $field);
		}
		else{
			$array = decreasing_sort($array, $field);
		}
		return $array;
	}
	print_r ($array);
	echo "<hr>";
	
	$array = my_sort($array, 'age', TRUE);
	print_r ($array);
	echo "<hr>";
	
	$array = my_sort($array, 'age', FALSE);
	print_r ($array);
	echo "<hr>";
	
	$array = my_sort($array, 'login', TRUE);
	print_r ($array);
	echo "<hr>";
	
	$array = my_sort($array, 'login', FALSE);
	print_r ($array);	
	echo "<hr>";
	
	//№8
	echo "№8<br>";
	/*
	ЗАДАЧА 8: ДАТА БЛИЖАЙШЕЙ ДОСТАВКИ
	php уровень 1: Необходимо вывести дату ближайшей доставки в формате: "30
	ноября". Алгоритм следующий: если сегодня времени меньше, чем 20-00, то
	доставка завтра, если более 20-00, то послезавтра! Если день доставки попадает
	на праздничный день, то доставка переносится на следующий день после
	праздника. Праздники записываются в массиве в формате: "месяц-день": '01-01' - 1
	января..
	*/
	$holidays = array('01-01', '01-06', '02-23');
	
	date_default_timezone_set('Europe/Moscow');	
	$date = date('Y-m-d H:i:s');
	
	$curr_hour =  date("H", strtotime($date));
	if($curr_hour < 20){
		//Доставка завтра
		$date = date('Y-m-d', strtotime($date. ' + 1 days'));
	}
	else{
		//Послезавтра
		$date = date('Y-m-d', strtotime($date. ' + 2 days'));
	}	
	
	foreach($holidays as $value){
		if(date("m:d", strtotime($date)) == $value){
			$date = date('Y-m-d', strtotime($date. ' + 1 days'));
		}		
	}
	echo "Дата доставки: ".date('d F', strtotime($date)); 
	
	
?>