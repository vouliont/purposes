(function() {
  var addStepBtn = document.querySelector('.add_step');
  var blockSteps = {
    height: 98,
    deltaHeight: 54
  };
  var removingStep = false;

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




  var changeGroupBtn = document.querySelector('.change_group_btn');

  changeGroupBtn.onclick = function() {
    var arrowBtn = this.nextElementSibling;
    var addGroupBtn = arrowBtn.nextElementSibling;

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
    var addGroupBtn = this.nextElementSibling;

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







  function createStep() {
    var step = document.createElement('div');
    step.className = 'step';
    step.innerHTML = '<input type="text" name="step[]" placeholder="enter step"><input type="button" value="-" class="remove_step">';

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
