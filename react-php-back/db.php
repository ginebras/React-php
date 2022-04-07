<?php 

$pdo=null;

function Conectar(){
	$GLOBALS['pdo']=new PDO("mysql:host=localhost;dbname=react","root","0451yami");
	$GLOBALS['pdo']->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
}

function Desconectar(){
	$GLOBALS['pdo']=null;
}

function GetAll($query){
	try{
		Conectar();
		$getall=$GLOBALS['pdo']->prepare($query);
		$getall->fetch(PDO::FETCH_ASSOC);
		$getall->execute();
		Desconectar();
		return $getall;
	}catch(Exception $e){
		die("Error".$e);
	}
}

function Post($query){
	try{
		Conectar();
	    $post=$GLOBALS['pdo']->prepare($query);
	    $post->fetch(PDO::FETCH_ASSOC);
	    $post->execute();
	    Desconectar();
	    return $post;	   
	}catch(Exception $e){
		die("Error".$e);
	}
}

function Put($query){
	try{
		Conectar();
		$put=$GLOBALS['pdo']->prepare($query);
		$put->execute();
		Desconectar();
		return $put;
	}catch(Exception $e){
		die("ERROR".$e);
	}
}

function Delete($query){
	try{
		Conectar();
		$delete=$GLOBALS['pdo']->prepare($query);
		$delete->execute();
		Desconectar();
		return $delete;
	}catch(Exception $e){
		die("ERROR".$e);
	}
}

?>