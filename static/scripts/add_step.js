(function() {
  // ********** STEPS **********
  var addStepBtn = document.querySelector('.add_step');
  var blockSteps = {
    height: 98,
    deltaHeight: 54
  };
  var removingStep = false;

  var creatingNewGroup = false;

  addStepBtn.onclick = function() {
    var step = createStep();
    this.insertAdjacentElement('beforeBegin', step);

    this.parentNode.style.height = (blockSteps.height += blockSteps.deltaHeight) + 'px';
  };

  document.querySelector('.wrap_steps').onclick = function(e) {
    var target = e.target;

    while (target.className != 'remove_step') {
      if (target == this) return;

      target = target.parentNode;
    }

    removeStep(target.parentNode);
  };



  // ********** GROUP **********
  var changeGroupBtn = document.querySelector('.change_group_btn');

  changeGroupBtn.onclick = function() {
    var arrowBtn = this.nextElementSibling;

    this.style.zIndex = '1';
    addGroupBtn.style.zIndex = '2';
    arrowBtn.style.zIndex = '3';

    this.style.opacity = '0';
    addGroupBtn.style.opacity = '1';
    arrowBtn.firstElementChild.firstElementChild.style.opacity = '1';
    arrowBtn.firstElementChild.style.transform = 'rotate(-270deg) translate3d(-4px, 5px, 0)';

    var groupsBlock = this.parentNode;
    var groupsCount = groupsBlock.querySelectorAll('label input[name="group"]').length;
    var groupsBlockHeight = 44;
    groupsBlockHeight += (groupsCount == 0) ? 0 : (groupsCount * 41 - 1);
    groupsBlock.style.height = groupsBlockHeight + 'px';
  };

  var arrowBtn = changeGroupBtn.nextElementSibling;

  arrowBtn.onclick = function() {
    if (creatingNewGroup) {
      var newGroupBlock = document.querySelector('.create_new_group');
      var newGroupName = newGroupBlock.firstElementChild;

      newGroupBlock.style.width = '';
      newGroupBlock.style.borderRight = '';
      newGroupName.style.paddingLeft = '';

      setTimeout(function() {
        newGroupName.value = '';
        creatingNewGroup = false;
      }, 300);

      return;
    }

    setTimeout(function() {
      arrowBtn.style.zIndex = '';
      addGroupBtn.style.zIndex = '';
      changeGroupBtn.style.zIndex = '';
    }, 300);

    changeGroupBtn.style.opacity = '';
    addGroupBtn.style.opacity = '';
    this.firstElementChild.firstElementChild.style.opacity = '';
    this.firstElementChild.style.transform = '';

    var groupsBlock = this.parentNode;
    groupsBlock.style.height = '';
  };

  document.querySelector('.groups').onclick = function(e) {
    var target = e.target;

    while (target.className != 'group') {
      if (target == this) return;

      target = target.parentNode;
    }

    var changeGroup = function() {
      var changeGroupBtn = this.querySelector('.change_group_btn');
      var arrowBtn = changeGroupBtn.nextElementSibling;

      changeGroupBtn.innerHTML = target.textContent;
      changeGroupBtn.style.color = '#fff';

      setTimeout(function() {
        arrowBtn.style.zIndex = '';
        addGroupBtn.style.zIndex = '';
        changeGroupBtn.style.zIndex = '';
      }, 300);

      changeGroupBtn.style.opacity = '';
      addGroupBtn.style.opacity = '';
      arrowBtn.firstElementChild.firstElementChild.style.opacity = '';
      arrowBtn.firstElementChild.style.transform = '';

      this.style.height = '';
    };

    var time = 150;

    if (creatingNewGroup) {
      time += 300;

      var newGroupBlock = document.querySelector('.create_new_group');
      var newGroupName = newGroupBlock.firstElementChild;

      newGroupBlock.style.width = '';
      newGroupBlock.style.borderRight = '';
      newGroupName.style.paddingLeft = '';

      setTimeout(function() {
        newGroupName.value = '';
        creatingNewGroup = false;
      }, time);
    }

    setTimeout(changeGroup.bind(this), time);
  };

  var addGroupBtn = document.querySelector('.add_group');

  addGroupBtn.onclick = function() {
    if (creatingNewGroup) return;
    creatingNewGroup = true;

    var newGroupBlock = document.querySelector('.create_new_group');
    var newGroupName = newGroupBlock.firstElementChild;

    newGroupBlock.style.width = 'calc(100% - 50px)';
    newGroupBlock.style.borderRight = '1px solid rgb(53, 201, 166)';
    newGroupName.style.paddingLeft = '15px';
  };

  var confirmCreateGroupBtn = document.querySelector('.confirm__create_new_group');

  confirmCreateGroupBtn.onclick = function() {
    var nameGroup = this.previousElementSibling.value.trim();

    if (nameGroup === '') return;

    var newGroup = document.createElement('label');
    newGroup.innerHTML = '<input type="radio" name="group" autocomplete="off"><div class="group" style="height: 0">' + nameGroup + '</div>';

    document.querySelector('.groups > label:first-child').insertAdjacentElement('beforeBegin', newGroup);
    setTimeout(function() {
      newGroup.lastElementChild.style.height = '';
    }, 5);

    var groupsBlock = document.querySelector('.groups');

    groupsBlock.style.height = groupsBlock.offsetHeight + 40 + 'px';

    var newGroupBlock = this.parentNode;
    var newGroupName = this.previousElementSibling;

    newGroupBlock.style.width = '';
    newGroupBlock.style.borderRight = '';
    newGroupName.style.paddingLeft = '';

    setTimeout(function() {
      newGroupName.value = '';
      newGroup.firstElementChild.checked = true;
      newGroup.lastElementChild.dispatchEvent(new Event('click', {bubbles: true}));
      creatingNewGroup = false;
    }, 300);
  };





  // ********** FUNCTIONS **********
  function createStep() {
    var step = document.createElement('div');
    step.className = 'step';
    step.innerHTML = '<input type="text" name="step[]" placeholder="enter step" autocomplete="off" tabindex="2"><input type="button" value="-" class="remove_step">';

    return step;
  }

  function removeStep(elem) {
    if (removingStep) return;
    if (document.querySelectorAll('.step').length <= 1) return;

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
})();
