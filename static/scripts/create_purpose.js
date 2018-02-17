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

  var listPeriod = {
    btnNextItem: document.querySelector('.next_item__list_period'),
    btnPrevItem: document.querySelector('.prev_item__list_period'),
    wrapItems: document.querySelector('.wrap_items__list_period'),
    indexCheckedItem: 0,
    countItems: 8,
    items: document.querySelectorAll('.list_period input[type="radio"]')
  };

  listPeriod.btnNextItem.onclick = function() {
    if (listPeriod.indexCheckedItem == listPeriod.countItems - 1) return;

    if (listPeriod.indexCheckedItem == listPeriod.countItems - 2) this.classList.add('not_clickable');

    if (listPeriod.indexCheckedItem == 0) listPeriod.btnPrevItem.classList.remove('not_clickable');

    listPeriod.indexCheckedItem++;
    listPeriod.items[listPeriod.indexCheckedItem].checked = true;

    listPeriod.wrapItems.style.top = (-40 * listPeriod.indexCheckedItem) + 'px';
  };

  listPeriod.btnPrevItem.onclick = function() {
    if (listPeriod.indexCheckedItem == 0) return;

    if (listPeriod.indexCheckedItem == 1) this.classList.add('not_clickable');

    if (listPeriod.indexCheckedItem == listPeriod.countItems - 1) listPeriod.btnNextItem.classList.remove('not_clickable');

    listPeriod.indexCheckedItem--;
    listPeriod.items[listPeriod.indexCheckedItem].checked = true;

    listPeriod.wrapItems.style.top = (-40 * listPeriod.indexCheckedItem) + 'px';
  };



  // ********** GROUP **********

  var listGroups = {
    block: document.querySelector('.list_groups'),
    btnArrow: document.querySelector('.btn_arrow__list_groups'),
    btnCreateGroup: document.querySelector('.btn_create_group'),
    btnChooseGroup: document.querySelector('.btn_choose_group'),
    btnAddGroup: document.querySelector('.btn_confirm__block_create_new_group'),
    blockCreateGroup: document.querySelector('.block_create_new_group'),
    listHeight: 44,
    itemHeight: 41,
    creatingItem: false,
    closingBlock: false
  };

  listGroups.btnChooseGroup.onclick = function() {
    this.classList.remove('btn_choose_group-visible');
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
    listGroups.btnChooseGroup.classList.add('btn_choose_group-visible');

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
      fChooseGroup(target);
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

    var data = 'namegroup=' + nameGroup;

    ajaxRequest('/modules/createGroup.php', 'POST', data, function(data) {
      if (JSON.parse(data)[0] !== true) return;

      // Создание новой группы
      var newGroup = document.createElement('label');
      newGroup.innerHTML = '<input type="radio" name="group" autocomplete="off" value="' + JSON.parse(data)[1] + '"><div class="item__list_groups anim_adding_new_group">' + nameGroup + '</div>';

      listGroups.block.insertAdjacentElement('afterBegin', newGroup);
      listGroups.block.style.height = listGroups.block.offsetHeight + 41 + 'px';

      listGroups.blockCreateGroup.classList.remove('block_create_new_group-visible');

      setTimeout(function() {
        listGroups.blockCreateGroup.querySelector('input').value = '';
        // Выбор новой группы в списке групп
        newGroup.firstElementChild.checked = true;
        newGroup.lastElementChild.dispatchEvent(new Event('click', {bubbles: true}));
      }, 300);
    });

  };



  // ********** FUNCTIONS **********

  function fCreateStep() {
    var newStep = document.createElement('div');
    newStep.className = 'block_step';
    newStep.innerHTML = '<input type="text" name="steps[]" placeholder="enter step" autocomplete="off" tabindex="2"><input type="button" value="-" class="btn_remove_step">';

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

  function fChooseGroup(target) {
    listGroups.btnChooseGroup.innerHTML = target.textContent;
    listGroups.btnChooseGroup.style.color = '#fff';

    listGroups.btnArrow.classList.remove('btn_arrow__list_groups-visible');
    listGroups.btnCreateGroup.classList.remove('btn_create_group-visible');
    listGroups.btnChooseGroup.classList.add('btn_choose_group-visible');

    listGroups.block.style.height = '';
  }

  function ajaxRequest(url, method, data, callback) {
    var func = callback || function(data) {};

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        func(xhr.responseText);
      }
    };

    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(data);
  }
})();
