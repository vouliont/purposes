<?php require_once '../modules/dataBase.php'; ?>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

  <link href="https://fonts.googleapis.com/css?family=Kurale" rel="stylesheet">

  <link rel="stylesheet" href="/static/styles/main_style.css">

  <title>Create purpose</title>
</head>

<body>

  <div class="back_img"></div>

  <div class="wrapper">

    <?php
    if (isset($_REQUEST['create_purpose'])) {
      echo '<link rel="stylesheet" href="/static/styles/add_purpose_in_db.css">';

      require_once '../templates/addPurposeInDB.php';
    } else {
      echo '<link rel="stylesheet" href="/static/styles/create_purpose.css"><script defer src="/static/scripts/create_purpose.js"></script>';

      require_once '../templates/createPurpose.php';
    }
    ?>



  </div>

</body>

</html>
