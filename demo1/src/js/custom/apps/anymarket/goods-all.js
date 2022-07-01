"use strict";

var AmAppGoods = function () {
  const handleTableCheck = () => {
    
    const checkBoxList = document.querySelectorAll('[data-am-check="true"]'),
      productAction = document.getElementById('product_add_action'),
      tableMainCheckbox = document.getElementById('products_table_head_check');
    let count = 0;

    checkBoxList.forEach(checkbox => {
      if(checkbox !== tableMainCheckbox)
        tableMainCheckbox.dataset.amCheckVal = parseInt(tableMainCheckbox.dataset.amCheckVal) + 1;

      checkbox.addEventListener('change', function(e) {
        count = (checkbox.checked)
            ? count + parseInt(checkbox.dataset.amCheckVal)
            : count - parseInt(checkbox.dataset.amCheckVal);

        if(count > 0) {
          productAction.classList.remove('d-none');
        } else {
          productAction.classList.add('d-none');
          tableMainCheckbox.checked = false;
        }
      });
    });
  }

  return {
    init: function() {
      handleTableCheck();
    },
  }
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
  AmAppGoods.init();
});