<?php require_once '../modules/dataBase.php'; ?>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

  <link href="https://fonts.googleapis.com/css?family=Acme" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Alegreya" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Philosopher" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=El+Messiri|Kurale" rel="stylesheet">

  <link rel="stylesheet" href="/static/styles/main_style.css">
  <link rel="stylesheet" href="/static/styles/create_purpose.css">

  <title>Create purpose</title>
</head>

<body>

  <div class="back_img"></div>

  <div class="wrapper">

    <?php
    if (isset($_REQUEST['create_purpose'])) {
      require_once '../modules/addPurposeInDB.php';
    } else {
      require_once '../modules/createPurpose.php';
    ?>
      <script defer src="/static/scripts/create_purpose.js"></script>
    <?php } ?>



  </div>

</body>

</html>
