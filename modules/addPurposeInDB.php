<?php
  $name_purpose = htmlspecialchars(trim($_REQUEST['purpose_name']));

  $same_purpose_in_db = mysqli_fetch_assoc(
    mysqli_query(
      $db,
      "SELECT COUNT(`name`) as `count` FROM `purposes` WHERE `name`='{$name_purpose}'"
    )
  );

  if ($same_purpose_in_db['count'] != 0):
    // Такая цель уже есть в базе
?>
    <div class="purpose_not_added">Purpose already exists</div>
<?php
    exit();
  endif;

  $id_group = intval(htmlspecialchars(trim($_REQUEST['group'])));

  mysqli_query($db, "INSERT INTO `purposes` (`name`, `group_id`, `date`) VALUES ('{$name_purpose}', {$id_group}, " . time() . ")");

  $id_purpose = mysqli_insert_id($db);

  $steps = $_REQUEST['steps'];

  foreach ($steps as &$step) {
    $step = htmlspecialchars(trim($step));

    mysqli_query($db, "INSERT INTO `steps` (`name`, `purpose_id`) VALUES ('{$step}', {$id_purpose})");
  }

  mysqli_query($db, "UPDATE `groups` SET `count_purposes` = `count_purposes` + 1 WHERE `id` = {$id_group}");

?>

<div class="purpose_added">Purpose successfully added</div>
