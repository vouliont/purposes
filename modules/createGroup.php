<?php
  require_once 'dataBase.php';

  $name_group = htmlspecialchars(trim($_REQUEST['namegroup']));

  $same_group_in_db = mysqli_fetch_assoc(
    mysqli_query(
      $db,
      "SELECT COUNT(`name`) AS `count` FROM `groups` WHERE `name`='{$name_group}'"
    )
  );

  if ($same_group_in_db['count'] != 0) {
    // Такая группа уже есть в базе
    echo json_encode([false]);
    exit();
  }

  mysqli_query($db, "INSERT INTO `groups` (`name`) VALUES ('{$name_group}')");

  $id_group = mysqli_insert_id($db);

  echo json_encode([true, $id_group]);
?>
