(function() {
  // ********** STEPS **********

  var blockSteps = {
    height: 98,
    deltaHeight: 54
  };
  var removingStep = false;
  var creatingStep = false;

  var btnCreateStep = document.querySelector('.btn_create_step');

  btnCreateStep.onclick = function() {
    if (removingStep || creatingStep) return;

    creatingStep = true;

    var newStep = fCreateStep();
    this.insertAdjacentElement('beforeBegin', newStep);

    this.parentNode.style.height = (blockSteps.height += blockSteps.deltaHeight) + 'px';

    setTimeout(function() { creatingStep = false; }, 300);
  };

  document.querySelector('.block_steps').onclick = function(e) {
    var target = e.target;

    while (target.className != 'btn_remove_step') {
      if (target == this) return;

      target = target.parentNode;
    }

    fRemoveStep(target.parentNode);
  };



  // ********** GROUP **********

  var listGroups = {
    block: document.querySelector('.list_groups'),
    btnArrow: document.querySelector('.btn_arrow__list_groups'),
    btnCreateGroup: document.querySelector('.btn_create_group'),
    btnChangeGroup: document.querySelector('.btn_change_group'),
    btnAddGroup: document.querySelector('.btn_confirm__block_create_new_group'),
    blockCreateGroup: document.querySelector('.block_create_new_group'),
    listHeight: 44,
    itemHeight: 41,
    creatingItem: false,
    closingBlock: false
  };

  listGroups.btnChangeGroup.onclick = function() {
    this.classList.remove('btn_change_group-visible');
    listGroups.btnArrow.classList.add('btn_arrow__list_groups-visible');
    listGroups.btnCreateGroup.classList.add('btn_create_group-visible');

    var countGroups = listGroups.block.querySelectorAll('label input[name="group"]').length;
    var newGroupListHeight = listGroups.listHeight + countGroups * listGroups.itemHeight;

    listGroups.block.style.height = newGroupListHeight + 'px';
  };

  listGroups.btnArrow.onclick = function() {
    if (listGroups.creatingItem) {
      listGroups.creatingItem = false;

      listGroups.blockCreateGroup.classList.remove('block_create_new_group-visible');

      setTimeout(function() {
        listGroups.blockCreateGroup.querySelector('input').value = '';
      }, 300);

      return;
    }

    this.classList.remove('btn_arrow__list_groups-visible');
    listGroups.btnCreateGroup.classList.remove('btn_create_group-visible');
    listGroups.btnChangeGroup.classList.add('btn_change_group-visible');

    listGroups.block.style.height = '';
  };

  listGroups.block.onclick = function(e) {
    var target = e.target;

    while (!target.classList.contains('item__list_groups')) {
      if (target == this) return;

      target = target.parentNode;
    }

    var time = 150;

    if (listGroups.creatingItem) {
      time += 300;

      listGroups.blockCreateGroup.classList.remove('block_create_new_group-visible');

      setTimeout(function() {
        listGroups.blockCreateGroup.querySelector('input').value = '';
        listGroups.creatingItem = false;
      }, time);
    }

    setTimeout(function() {
      fChangeGroup(target);
      listGroups.creatingItem = false;
    }, time, target);
  };

  listGroups.btnCreateGroup.onclick = function() {
    if (listGroups.creatingItem) return;
    listGroups.creatingItem = true;

    listGroups.blockCreateGroup.classList.add('block_create_new_group-visible');
  };



  listGroups.btnAddGroup.onclick = function() {
    var nameGroup = listGroups.blockCreateGroup.querySelector('input').value.trim();

    if (nameGroup === '') return;

    var newGroup = document.createElement('label');
    newGroup.innerHTML = '<input type="radio" name="group" autocomplete="off" value="group_name"><div class="item__list_groups anim_adding_new_group">' + nameGroup + '</div>';

    listGroups.block.querySelector('label:first-child').insertAdjacentElement('beforeBegin', newGroup);
    listGroups.block.style.height = listGroups.block.offsetHeight + 41 + 'px';

    listGroups.blockCreateGroup.classList.remove('block_create_new_group-visible');

    setTimeout(function() {
      listGroups.blockCreateGroup.querySelector('input').value = '';
      newGroup.firstElementChild.checked = true;
      newGroup.lastElementChild.dispatchEvent(new Event('click', {bubbles: true}));
    }, 300);
  };



  // ********** FUNCTIONS **********

  function fCreateStep() {
    var newStep = document.createElement('div');
    newStep.className = 'block_step';
    newStep.innerHTML = '<input type="text" name="step[]" placeholder="enter step" autocomplete="off" tabindex="2"><input type="button" value="-" class="btn_remove_step">';

    return newStep;
  }

  function fRemoveStep(elem) {
    if (document.querySelectorAll('.block_step').length <= 1) return;

    if (creatingStep || removingStep) return;
    removingStep = true;

    elem.style.height = '0';
    elem.style.border = '0';
    elem.style.margin = '0';
    elem.style.opacity = '0';

    elem.parentNode.style.height = (blockSteps.height -= blockSteps.deltaHeight) + 'px';

    setTimeout(function() {
      elem.parentNode.removeChild(elem);
      removingStep = false;
    }, 300);
  }

  function fChangeGroup(target) {
    listGroups.btnChangeGroup.innerHTML = target.textContent;
    listGroups.btnChangeGroup.style.color = '#fff';

    listGroups.btnArrow.classList.remove('btn_arrow__list_groups-visible');
    listGroups.btnCreateGroup.classList.remove('btn_create_group-visible');
    listGroups.btnChangeGroup.classList.add('btn_change_group-visible');

    listGroups.block.style.height = '';
  }
})();
