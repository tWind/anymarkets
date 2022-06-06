"use strict";

// Class definition
var KTAppEcommerceSaveProduct = function () {
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
    // Public methods
    return {
        init: function () {
          handleSubmit();
          handleProductsVariants();
          handleAdditionalFields();
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTAppEcommerceSaveProduct.init();
});
