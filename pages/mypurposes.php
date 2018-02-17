<?php require_once '../modules/dataBase.php' ?>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

  <link href="https://fonts.googleapis.com/css?family=Kurale" rel="stylesheet">

  <link rel="stylesheet" href="/static/styles/main_style.css">
  <link rel="stylesheet" href="/static/styles/my_purposes.css">

  <title>My purposes</title>
</head>

<body>

  <div class="back_img"></div>

  <div class="wrapper">

    <ul class="list_purposes">

      <?php
      $purposes = mysqli_query($db, "SELECT `name`, `id` FROM `purposes`");

      while ($purpose = mysqli_fetch_assoc($purposes)):
      ?>

        <li>
          <span class="name_purpose"><?= $purpose['name'] ?></span>
          <ul class="list_steps">

            <?php
            $steps = mysqli_query($db, "SELECT `name` FROM `steps` WHERE `purpose_id`={$purpose['id']}");

            while ($step = mysqli_fetch_assoc($steps)):
            ?>

              <li><?= $step['name'] ?></li>

            <?php
            endwhile;
            ?>

          </ul>
        </li>

      <?php
      endwhile;
      ?>

    </ul>

  </div>

</body>

</html>
