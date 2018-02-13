<form class="form_create_purpose" action="<?=$_SERVER['SCRIPT_NAME']?>" method="POST">
  <p>Purpose name</p>
  <input type="text" name="purpose_name" placeholder="enter purpose name" autocomplete="off" tabindex="1">

  <p>Steps</p>
  <div class="block_steps">
    <div class="block_step">
      <input type="text" name="steps[]" placeholder="enter step" autocomplete="off" tabindex="2">
      <input type="button" value="-" class="btn_remove_step">
    </div>

    <input class="btn_create_step" type="button" value="+">
  </div>

  <p>Period</p>
  <div class="list_period">
    
  </div>

  <p>Group</p>
  <div class="list_groups">

    <?php
    $groups = mysqli_query($db, 'SELECT `name`, `id` FROM `groups`');

    while ($group = mysqli_fetch_assoc($groups)): ?>
      <label>
        <input type="radio" name="group" autocomplete="off" value="<?= $group['id'] ?>">
        <div class="item__list_groups"><?= $group['name'] ?></div>
      </label>
    <?php endwhile; ?>

    <div class="btn_choose_group btn_choose_group-visible">choose group</div>

    <div class="btn_arrow__list_groups"><div><div></div></div></div>

    <input type="button" value="+" class="btn_create_group">

    <div class="block_create_new_group">
      <input type="text" class="new_group_name" placeholder="enter new group" autocomplete="off">
      <div class="btn_confirm__block_create_new_group"></div>
    </div>
  </div>

  <input type="submit" name="create_purpose" class="btn_create_purpose" value="Add">
</form>
