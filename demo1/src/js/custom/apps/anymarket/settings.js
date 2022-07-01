"use strict";

// Class definition
var AnymarketAppSettings = function () {
  let table;
  
  const maskInputs = () => {
    const phoneInput = document.getElementById('settings_phone'),
          emailInput = document.getElementById('settings_email');

    // Phone
    Inputmask({
      "mask" : "(999) 999-9999"
    }).mask(phoneInput);

    // Email address
    Inputmask({
      mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
      greedy: false,
      onBeforePaste: function (pastedValue, opts) {
          pastedValue = pastedValue.toLowerCase();
          return pastedValue.replace("mailto:", "");
      },
      definitions: {
          "*": {
              validator: '[0-9A-Za-z!#$%&"*+/=?^_`{|}~\-]',
              cardinality: 1,
              casing: "lower"
          }
      }
    }).mask(emailInput);
  }

  // Handle additional fields
  const handleAddMarket = () => {
    const MARKETS = {
      'settings_markets_ozon':'settings_markets_ozon_check',
      'settings_markets_vk':'settings_markets_vk_check',
      'settings_markets_wb':'settings_markets_wb_check',
      'settings_markets_ya':'settings_markets_ya_check',
      'settings_markets_ya_2':'settings_markets_ya_check_2',
    },
    BADGES_TEXT = {
      activated: 'Подключено',
      deactivated: 'Отключено',
      'is-deactivating': (marketName) => {
        return `'Вы убираете ${marketName}. При сохранении настроек он будет отключен',`
      }
    }


    const bindMarketToggle = (element, checkbox) => {
      // show/hide badges
      const badge = checkbox.parentNode.nextElementSibling,
        label = checkbox.nextElementSibling.innerText;
      
      // Show/hide additional variants
      checkbox.addEventListener('change', e => {
        if (e.target.checked) {
            element.classList.remove('d-none');
            badge.innerText = BADGES_TEXT.activated;
        } else {
            element.classList.add('d-none');
            badge.innerText = BADGES_TEXT.deactivated;
        }
      });
    }

    for(const [key, value] of Object.entries(MARKETS)) {
      // Select elements
      const element = document.getElementById(key);
      const checkbox = document.getElementById(value);
      bindMarketToggle(element, checkbox);
    }
  }

  // Delete cateogry
  var handleDeleteRows = () => {
    if (!table) {
      return;
    }
    // Select all delete buttons
    const deleteButtons = table.querySelectorAll('[data-am-settings-table="delete_row"]');

    deleteButtons.forEach(d => {
        // Delete button on click
        d.addEventListener('click', function (e) {
            e.preventDefault();

            // Select parent row
            const parent = e.target.closest('tr');

            // Get category name
            const productName = parent.querySelector('[data-am-settings-table="product_name"]').innerText;

            // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
            Swal.fire({
                text: "Are you sure you want to delete " + productName + "?",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Yes, delete!",
                cancelButtonText: "No, cancel",
                customClass: {
                    confirmButton: "btn fw-bold btn-danger",
                    cancelButton: "btn fw-bold btn-active-light-primary"
                }
            }).then(function (result) {
                if (result.value) {
                    Swal.fire({
                        text: "You have deleted " + productName + "!.",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn fw-bold btn-primary",
                        }
                    }).then(function () {
                        // Remove current row
                        parent.remove();
                    });
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: productName + " was not deleted.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn fw-bold btn-primary",
                        }
                    });
                }
            });
        })
    });
  }

  // Change tariff
  const handleChangeTariff = () => {
    const changeTariffButton = document.getElementById('btn-change-tariff'),
      changeTariffRow = document.getElementById('changeTariffBtnRow'),
      tariffSelect = document.getElementById('tariffSelect'),
      tariffDisplayRow = document.getElementById('tariffDisplayRow'),
      tariffRow = document.getElementById('tariffRow');
    let changeTariffFlag = false;

    changeTariffButton.addEventListener('click', () => {
      changeTariffFlag = !changeTariffFlag;

      if(changeTariffFlag) {
        changeTariffRow.classList.add('d-none');
        tariffSelect.classList.remove('d-none');
        tariffRow.classList.remove('d-none');
        tariffDisplayRow.classList.add('d-none');
      } else {
        changeTariffRow.classList.remove('d-none');
      }
    })
  }

  // Public methods
  return {
    init: function () {
      table = document.querySelector('#am-settings-brands-table');

      maskInputs();
      handleAddMarket();
      handleDeleteRows();
      handleChangeTariff();
    }
};
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    AnymarketAppSettings.init();
});
