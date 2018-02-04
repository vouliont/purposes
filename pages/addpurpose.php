<?php require_once '../modules/database.php'; ?>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

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
      <input type="text" name="name" placeholder="enter purpose name" autocomplete="off" tabindex="1">

      <p>Steps</p>
      <div class="wrap_steps">
        <div class="step">
          <input type="text" name="step[]" placeholder="enter step" autocomplete="off" tabindex="2">
          <input type="button" value="-" class="remove_step">
        </div>

        <input class="add_step" type="button" name="add_step" value="+">
      </div>

      <p>Group</p>
      <div class="groups">
        <label><input type="radio" name="group" autocomplete="off"><div class="group">Sport</div></label>
        <label><input type="radio" name="group" autocomplete="off"><div class="group">Programming</div></label>
        <label><input type="radio" name="group" autocomplete="off"><div class="group">Sport</div></label>

        <div class="change_group_btn">change group</div>

        <div class="arrow_btn__groups"><div><div></div></div></div>

        <input type="button" name="add_group" value="+" class="add_group">

        <div class="create_new_group">
          <input type="text" class="new_group_name" placeholder="enter new group" autocomplete="off">
          <div class="confirm__create_new_group"></div>
        </div>
      </div>
    </form>

  </div>

</body>

</html>
