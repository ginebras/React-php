<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}


require_once "db.php";

if($_SERVER['REQUEST_METHOD']=="GET"){
	if(isset($_GET['id'])){
		$query="SELECT * FROM frameworks WHERE id=".$_GET['id'];
		$resultado=GetAll($query);
		echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
	}else{
		$query="SELECT * FROM frameworks";
		$resultado=GetAll($query);
		echo json_encode($resultado->fetchAll());
	}
	header("HTTP:1.1 200 OK");
	exit();
}

if($_POST['METHOD']=="POST"){
	unset($_POST['METHOD']);
	$n=$_POST['nombre'];
	$l=$_POST['lanzamiento'];
	$d=$_POST['desarrollador'];

	$query="INSERT INTO frameworks(nombre,lanzamiento,desarrollador) VALUES('$n',$l,'$d')";

	$post=Post($query);

	echo json_encode($post);
	header("HTTP:1.1 200 OK");
	exit();
}

if($_POST['METHOD']=="PUT"){
	unset($_POST['METHOD']);
	$id=$_POST['id'];
	$n=$_POST['nombre'];
	$l=$_POST['lanzamiento'];
	$d=$_POST['desarrollador'];

	$query="UPDATE frameworks SET nombre='$n',lanzamiento=$l,desarrollador='$d' WHERE id=$id";
	$put=Put($query);
	echo json_encode($put);
	header("HTTP:1.1 200 OK");
	exit();
}

if($_POST['METHOD']=="DELETE"){
	unset($_POST['METHOD']);
	$id=$_POST['id'];

	$query="DELETE FROM frameworks WHERE id=$id";
	$delete=Delete($query);
	echo json_encode($delete);
	header("HTTP:1.1 200 OK");
	exit();
}

header("HTTP/1.1 400 Bad Request");

?>