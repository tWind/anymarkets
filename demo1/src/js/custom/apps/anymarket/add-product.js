"use strict";

// Class definition
var AmAppMarketSaveProduct = function () {
  // Handle additional variants
  const handleProductsVariants = () => {
    // Select elements
    const element = document.getElementById('product_var_nav');
    const checkbox = document.getElementById('product_var_checkbox');

    // Show/hide additional variants
    checkbox.addEventListener('change', e => {
        if (e.target.checked) {
            element.classList.remove('d-none');
        } else {
            element.classList.add('d-none');
        }
    });
  }

  // Handle additional fields
  const handleAdditionalFields = () => {
    // Select elements
    const element = document.getElementById('product-additional-field');
    const checkbox = document.getElementById('show_additional_fields');

    // Show/hide additional variants
    checkbox.addEventListener('change', e => {
        if (e.target.checked) {
            element.classList.remove('d-none');
        } else {
            element.classList.add('d-none');
        }
    });
  }

  // Submit form handler
  const handleSubmit = () => {
    // Define variables
    let validator;

    // Get elements
    const form = document.getElementById('kt_ecommerce_add_product_form');
    const submitButton = document.getElementById('kt_ecommerce_add_product_submit');

    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    validator = FormValidation.formValidation(
        form,
        {
            fields: {
              'product_name': {
                  validators: {
                    notEmpty: {
                      message: 'Укажите название',
                    }
                  }
              },
              'brand': {
                validators: {
                  notEmpty: {
                    message: 'Укажите бренд',
                  }
                }
              },
              'vendor_code': {
                validators: {
                  notEmpty: {
                    message: 'Укажите артикул',
                  }
                }
              },
              'production_country': {
                validators: {
                  notEmpty: {
                    message: 'Укажите страну производителя',
                  }
                }
              },
              'vendor_code_add': {
                validators: {
                  notEmpty: {
                    message: 'Укажите артикул',
                  }
                }
              },
              'bar_code_add': {
                validators: {
                  notEmpty: {
                    message: 'Укажите штрих-код',
                  }
                }
              },
              'production_country_1': {
                validators: {
                  notEmpty: {
                    message: 'Укажите описание',
                  }
                }
              },
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap: new FormValidation.plugins.Bootstrap5({
                    rowSelector: '.form-input',
                    eleInvalidClass: 'form-input-error',
                    eleValidClass: 'form-input-valid'
                })
            }
        }
    );

    // Handle submit button
    // submitButton.addEventListener('click', e => {
    //     e.preventDefault();

    //     // Validate form before submit
    //     if (validator) {
    //         validator.validate().then(function (status) {
    //             console.log('validated!');

    //             if (status == 'Valid') {
    //                 submitButton.setAttribute('data-kt-indicator', 'on');

    //                 // Disable submit button whilst loading
    //                 submitButton.disabled = true;

    //                 setTimeout(function () {
    //                     submitButton.removeAttribute('data-kt-indicator');

    //                     Swal.fire({
    //                         text: "Form has been successfully submitted!",
    //                         icon: "success",
    //                         buttonsStyling: false,
    //                         confirmButtonText: "Ok, got it!",
    //                         customClass: {
    //                             confirmButton: "btn btn-primary"
    //                         }
    //                     }).then(function (result) {
    //                         if (result.isConfirmed) {
    //                             // Enable submit button after loading
    //                             submitButton.disabled = false;

    //                             // Redirect to customers list page
    //                             window.location = form.getAttribute("data-kt-redirect");
    //                         }
    //                     });
    //                 }, 2000);
    //             } else {
    //                 Swal.fire({
    //                     html: "Sorry, looks like there are some errors detected, please try again. <br/><br/>Please note that there may be errors in the <strong>General</strong> or <strong>Advanced</strong> tabs",
    //                     icon: "error",
    //                     buttonsStyling: false,
    //                     confirmButtonText: "Ok, got it!",
    //                     customClass: {
    //                         confirmButton: "btn btn-primary"
    //                     }
    //                 });
    //             }
    //         });
    //     }
    // })
  }

  const handleAddCode = () => {
    const checkboxList = document.querySelectorAll('[data-am-checkbox="auto-code"]');

    checkboxList.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        const inputEl = document.getElementById(checkbox.dataset.amCheckboxTarget);
        if(checkbox.checked) {
          inputEl.disabled = true;
        } else {
          inputEl.disabled = false;
        }
      })
    })
  }
  
  const handleAddVariants = () => {
    const modeNavPane = document.getElementById('product_var_nav'),
      modeAddButton = document.getElementById('product_var_add_new'),
      tabsContainer = document.getElementById('variantsTabContent');

    modeAddButton.addEventListener('click', function(e) {
      e.preventDefault();

      const modeNavItems = modeNavPane.querySelectorAll('li');

      modeAddButton.parentNode.insertAdjacentHTML('beforebegin', renderNavTemplate(modeNavItems.length));
      tabsContainer.insertAdjacentHTML('beforeend', renderTabTemplate(modeNavItems.length));

      initProductsSelect();
      handleAddCode();
    });

    function initProductsSelect() {
      const allProductSelects = document.querySelectorAll('[data-am-add-product="select_type"]');
      allProductSelects.forEach(select => {
          if ($(select).hasClass("select2-hidden-accessible")) {
              return;
          } else {
              $(select).select2({
                  minimumResultsForSearch: -1
              });
          }
      });
    }
    
    function renderNavTemplate(num) {
      return  `<li class="nav-item me-0">
          <a class="nav-link" data-bs-toggle="tab" href="#product-var-${num}">Вариация ${num}</a>
        </li>`;
    }

    function renderTabTemplate(num) {
      return `<!--end::Tab pane-->
      <div class="tab-pane fade" id="product-var-${num}" role="tabpanel">
        <!--begin::Input group-->
        <div class="mb-10 fv-row">
          <div class="col-12">
            <!--begin::Label-->
            <label class="form-label required">Фотографии</label>
            <!--end::Label-->
            <div class="product-images pt-10" data-product-image="panel">
              <div class="product-images-container d-flex">
                <!--begin:addField-->
                <div class="product-image-add">
                  <span class="product-image-add-btn text-hover-link-active">
                    <i class="bi bi-plus text"></i>
                  </span>
                </div>
                <!--end:addField-->
              </div>
            </div>
          </div>
        </div>
        <div class="mb-10 fv-row">
          <div class="col-4">
            <!--begin::Select2-->
            <select class="form-select mb-2" name="color" data-control="select2" data-am-add-product="select_type" data-hide-search="true" data-placeholder="Выберите цвет">
              <option></option>
              <option value="0">Красный</option>
              <option value="1">Желтый</option>
              <option value="2">Зеленый</option>
            </select>
            <!--end::Select2-->
          </div>
        </div>
        <!--begin::Input group-->
        <div class="mb-10 row fv-row">
          <div class="col-4">
            <div class="d-flex">
              <!--begin::Label-->
              <label class="required form-label">Артикул</label>
              <!--end::Label-->
              <!--begin:Tooltip-->
              <div class="form-label-tooltip ms-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Всплывающая подсказка">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="15" height="15" rx="7.5" fill="#E8E8F1"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 4.00321C6.67157 4.00321 6 4.67695 6 5.50804V6.51125C6 6.78828 5.77614 7.01286 5.5 7.01286C5.22386 7.01286 5 6.78828 5 6.51125V5.50804C5 4.12289 6.11929 3 7.5 3H7.81007C9.01954 3 10 3.98361 10 5.19697V5.47535C10 6.31395 9.43416 7.0462 8.62462 7.25522C8.25697 7.35014 8 7.68269 8 8.06353V8.54601C8 8.82304 7.77614 9.04762 7.5 9.04762C7.22386 9.04762 7 8.82304 7 8.54601V8.06353C7 7.22493 7.56584 6.49267 8.37538 6.28366C8.74303 6.18874 9 5.85619 9 5.47535V5.19697C9 4.53768 8.46725 4.00321 7.81007 4.00321H7.5ZM7.50867 9.99357C7.78481 9.99357 8.00867 10.2181 8.00867 10.4952V11.4984C8.00867 11.7754 7.78481 12 7.50867 12C7.23252 12 7.00867 11.7754 7.00867 11.4984V10.4952C7.00867 10.2181 7.23252 9.99357 7.50867 9.99357Z" fill="#A4A4BA"/>
                </svg>
              </div>
              <!--end:Tooltip-->
            </div>
            <!--begin::Checkbox-->
            <div class="form-check form-check-custom form-check-solid mb-3">
              <input class="form-check-input" type="checkbox" value="" data-am-checkbox="auto-code" data-am-checkbox-target="vendor_code_add_${num}" id="vendor_code_auto_${num}"/>
              <label class="form-check-label" for="vendor_code_auto_${num}">
                Сформировать автоматически
              </label>
            </div>
            <!--end::Checkbox-->
            <!--begin::Input-->
            <div class="form-input">
              <input type="text" id="vendor_code_add_${num}" name="vendor_code_add_${num}" class="form-control mb-2" value="" />
            </div>
            <!--end::Input-->
          </div>
          <div class="col-4">
            <div class="d-flex">
              <!--begin::Label-->
              <label class="required form-label">Штрихкод</label>
              <!--end::Label-->
              <!--begin:Tooltip-->
              <div class="form-label-tooltip ms-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Всплывающая подсказка">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="15" height="15" rx="7.5" fill="#E8E8F1"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 4.00321C6.67157 4.00321 6 4.67695 6 5.50804V6.51125C6 6.78828 5.77614 7.01286 5.5 7.01286C5.22386 7.01286 5 6.78828 5 6.51125V5.50804C5 4.12289 6.11929 3 7.5 3H7.81007C9.01954 3 10 3.98361 10 5.19697V5.47535C10 6.31395 9.43416 7.0462 8.62462 7.25522C8.25697 7.35014 8 7.68269 8 8.06353V8.54601C8 8.82304 7.77614 9.04762 7.5 9.04762C7.22386 9.04762 7 8.82304 7 8.54601V8.06353C7 7.22493 7.56584 6.49267 8.37538 6.28366C8.74303 6.18874 9 5.85619 9 5.47535V5.19697C9 4.53768 8.46725 4.00321 7.81007 4.00321H7.5ZM7.50867 9.99357C7.78481 9.99357 8.00867 10.2181 8.00867 10.4952V11.4984C8.00867 11.7754 7.78481 12 7.50867 12C7.23252 12 7.00867 11.7754 7.00867 11.4984V10.4952C7.00867 10.2181 7.23252 9.99357 7.50867 9.99357Z" fill="#A4A4BA"/>
                </svg>
              </div>
              <!--end:Tooltip-->
            </div>
            <!--begin::Checkbox-->
            <div class="form-check form-check-custom form-check-solid mb-3">
              <input class="form-check-input" type="checkbox" value="" data-am-checkbox="auto-code" data-am-checkbox-target="bar_code_add_${num}" id="bar_code_auto_${num}"/>
              <label class="form-check-label" for="bar_code_auto_${num}">
                Сформировать автоматически
              </label>
            </div>
            <!--end::Checkbox-->
            <!--begin::Input-->
            <div class="form-input">
              <input type="text" id="bar_code_add_${num}" name="bar_code_add_${num}" class="form-control mb-2" value="" />
            </div>
            <!--end::Input-->
          </div>
        </div>
        <!--end::Input group-->
        <!--begin::Input group-->
        <div class="mb-10 row fv-row">
          <div class="col-3">
            <!--begin::Label-->
            <label class="form-label">Цена</label>
            <!--end::Label-->
            <!--begin::Input-->
            <input type="text" name="product_price" class="form-control mb-2" placeholder="" value="" />
            <!--end::Input-->
          </div>
          <div class="col-3">
            <!--begin::Label-->
            <label class="form-label">Цена со скидкой</label>
            <!--end::Label-->
            <!--begin::Input-->
            <input type="text" name="product_price_discount" class="form-control mb-2" placeholder="" value="" />
            <!--end::Input-->
          </div>
          <div class="col-3">
            <!--begin::Label-->
            <label class="form-label">Цена Ozon Premium</label>
            <!--end::Label-->
            <!--begin::Input-->
            <input type="text" name="product_price_premium" class="form-control mb-2" placeholder="" value="" />
            <!--end::Input-->
          </div>
        </div>
        <!--end::Input group-->
      </div>
      <!--end::Tab pane-->`
    }
  }

  const handleProductImage = () => {
    const imagePane = document.querySelectorAll('[data-product-image="panel"]');

    imagePane.forEach(pane => {
      const mainImage = pane.querySelector('[data-product-image="main"]'),
        mainImageWrapper = mainImage.querySelector('.product-main-image-wrapper'),
        mainImageClearButton = mainImage.querySelector('[data-product-action="remove"'),
        imageAddButton = pane.querySelector('.product-image-add-btn'),
        additionalPane = pane.querySelector('.product-additional-images');
      let additionalImages = pane.querySelectorAll('[data-product-image="additional"]');

      setAdditionalPaneWidth();

      mainImageClearButton.addEventListener('click', function() {
        mainImage.remove();
        additionalPane.remove();
      });

      additionalImages.forEach(image => {
        const removeButton = image.querySelector('[data-product-action="remove"]');

        removeButton.addEventListener('click', function() {
          image.remove();
          additionalImages = pane.querySelectorAll('[data-product-image="additional"]');

          if(additionalImages.length > 3) {
            additionalPane.classList.add('images-small');
            setAdditionalPaneWidth();
          } else {
            additionalPane.classList.remove('images-small');
            additionalPane.style.width = 'auto';
          }

          if(additionalImages.length) {
            additionalImages[additionalImages.length - 1].classList.add('is-active');
          } else {
            mainImage.classList.add('is-active');
          }
        });
      });

      function setAdditionalPaneWidth() {
        if(!additionalPane) return;

        let mod = 1;

        if(additionalImages.length % 2 === 0)
          mod = 0;

        additionalPane.style.width = `${(additionalImages.length + mod) * 54 / 2}px`;
      }
    });
  }

  // Public methods
  return {
      init: function () {
        handleSubmit();
        handleProductsVariants();
        handleAdditionalFields();
        handleAddCode();
        handleAddVariants();
        handleProductImage();
      }
  };
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    AmAppMarketSaveProduct.init();
});
