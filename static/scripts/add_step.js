(function() {
  var addStepBtn = document.querySelector('.add_step');
  var blockSteps = {
    height: 98,
    deltaHeight: 54
  };
  var removingStep = false;

  addStepBtn.onclick = function() {
    var step = createStep(document.querySelectorAll('.step').length + 1);
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

  var groups = document.querySelector('.groups');
  var wrapGroups = groups.querySelector('.wrap__groups');

  groups.onclick = function() {
    wrapGroups.style.top = '0';
    this.style.height = '371px';
  };


  function createStep(num) {
    var step = document.createElement('div');
    step.className = 'step';
    step.innerHTML = '<input type="text" name="step_' + num + '" placeholder="enter step"><input type="button" value="-" class="remove_step">';

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
