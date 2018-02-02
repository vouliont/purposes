<?php require_once '../modules/database.php'; ?>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width initial-scale=1.0">

  <link href="https://fonts.googleapis.com/css?family=Acme" rel="stylesheet">

  <link rel="stylesheet" href="/static/styles/main_style.css">
  <link rel="stylesheet" href="/static/styles/add_purpose.css">

  <script defer src="/static/scripts/add_step.js"></script>

  <title>Add purpose</title>
</head>

<body>

  <div class="wrapper">

    <form class="add_purpose_form" action="<?= $_SERVER['SCRIPT_NAME'] ?>" method="POST">
      <p>Purpose name</p>
      <input type="text" name="name" placeholder="enter purpose name">

      <p>Steps</p>
      <div class="wrap_steps">
        <div class="step">
          <input type="text" name="step[]" placeholder="enter step">
          <input type="button" value="-" class="remove_step">
        </div>

        <input class="add_step" type="button" name="add_step" value="+">
      </div>

      <p>Groups</p>
      <div class="groups">

        <span class="placeholder__groups">change group</span>

        <div class="wrap__groups">
          <input type="button" name="add_group" value="+" class="add_group">
          <div class="group">Sport</div>
          <div class="group">Programming</div>
          <div class="group">Sport</div>
          <div class="group">Programming</div>
          <div class="group">Sport</div>
          <div class="group">Programming</div>
          <div class="group">Sport</div>
          <div class="group">Programming</div>
        </div>

      </div>
    </form>

  </div>

</body>

</html>
