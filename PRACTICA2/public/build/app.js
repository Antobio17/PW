"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["app"],{

/***/ "./assets/app.js":
/*!***********************!*\
  !*** ./assets/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.regexp.constructor.js */ "./node_modules/core-js/modules/es.regexp.constructor.js");
/* harmony import */ var core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _styles_app_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styles/app.scss */ "./assets/styles/app.scss");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_7__);







/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
// any CSS you import will output into a single css file (app.scss in this case)

 // start the Stimulus application

__webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");

__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

__webpack_require__(/*! @fortawesome/fontawesome-free/css/all.min.css */ "./node_modules/@fortawesome/fontawesome-free/css/all.min.css");

__webpack_require__(/*! @fortawesome/fontawesome-free/js/all.js */ "./node_modules/@fortawesome/fontawesome-free/js/all.js"); // Evento de Home


jquery__WEBPACK_IMPORTED_MODULE_7___default()('.expo').mouseenter(function (e) {
  var id = jquery__WEBPACK_IMPORTED_MODULE_7___default()(this).find('#expo-id').val(),
      $container,
      $close,
      scrollPosition;
  $container = jquery__WEBPACK_IMPORTED_MODULE_7___default()('.expo-modal-' + id);
  $container.removeClass('d-none');
  setTimeout(function () {
    $container.find('.expo-modal-info').css('transform', 'translateX(0)');
  }, 100);
  $close = jquery__WEBPACK_IMPORTED_MODULE_7___default()('.close-modal-' + id);
  $close.click(function (e) {
    $container.addClass('d-none');
    $container.find('.expo-modal-info').css('transform', 'translateX(-150%)');
  });
  jquery__WEBPACK_IMPORTED_MODULE_7___default()('.expo').mouseleave(function (e) {
    $container.addClass('d-none');
    $container.find('.expo-modal-info').css('transform', 'translateX(-150%)');
  });
}); // Validaciones usuario

var emailError = false,
    nameError = false,
    surnameError = false,
    checkingUserName = false;
jquery__WEBPACK_IMPORTED_MODULE_7___default()('#registration_form_email').keyup(function (e) {
  var $validateEmailUser = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#validate-email-user');
  $validateEmailUser.html('Comprobando...');
  $validateEmailUser.removeClass('color-success');
  $validateEmailUser.removeClass('color-danger');
  checkingUserName = true; // noinspection JSJQueryEfficiency

  if (jquery__WEBPACK_IMPORTED_MODULE_7___default()('#registration_form_email').val().length > 5) {
    if (jquery__WEBPACK_IMPORTED_MODULE_7___default()('#registration_form_email').val()) {
      jquery__WEBPACK_IMPORTED_MODULE_7___default().ajax({
        type: 'GET',
        url: '/check/user',
        data: {
          id: jquery__WEBPACK_IMPORTED_MODULE_7___default()('#user-id').val(),
          email: jquery__WEBPACK_IMPORTED_MODULE_7___default()('#registration_form_email').val()
        }
      }).done(function (result) {
        if (result.data) {
          $validateEmailUser.html('* Email disponible');
          $validateEmailUser.addClass('color-success');
          $validateEmailUser.removeClass('color-danger');
          emailError = false;
          checkingUserName = false;
          jquery__WEBPACK_IMPORTED_MODULE_7___default()('.form-container button').prop('disabled', emailError || nameError || surnameError || checkingUserName);
        } else {
          $validateEmailUser.html('* Email ya registrado');
          $validateEmailUser.removeClass('color-success');
          $validateEmailUser.addClass('color-danger');
          emailError = true;
          checkingUserName = false;
          jquery__WEBPACK_IMPORTED_MODULE_7___default()('.form-container button').prop('disabled', emailError || nameError || surnameError || checkingUserName);
        }
      }).fail(function (jqXHR, textStatus, errorThrown) {
        jquery__WEBPACK_IMPORTED_MODULE_7___default()('#validate-user').html();
      });
    }
  } else {
    $validateEmailUser.html('El usuario debe tener mínimo 6 caracteres.');
    $validateEmailUser.addClass('color-danger');
  }
});
jquery__WEBPACK_IMPORTED_MODULE_7___default()('#registration_form_name').keyup(function (e) {
  var $validationMessage = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#validate-name-user');
  $validationMessage.html('Comprobando...');
  $validationMessage.removeClass('color-success');
  $validationMessage.removeClass('color-danger');

  if (validateTextField(jquery__WEBPACK_IMPORTED_MODULE_7___default()('#registration_form_name').val())) {
    $validationMessage.html('');
    nameError = false;
    jquery__WEBPACK_IMPORTED_MODULE_7___default()('.form-container button').prop('disabled', emailError || nameError || surnameError || checkingUserName);
  } else {
    $validationMessage.html('* Solo se puede introducir texto en este campo');
    $validationMessage.removeClass('color-success');
    $validationMessage.addClass('color-danger');
    nameError = true;
    jquery__WEBPACK_IMPORTED_MODULE_7___default()('.form-container button').prop('disabled', emailError || nameError || surnameError || checkingUserName);
  }
});
jquery__WEBPACK_IMPORTED_MODULE_7___default()('#registration_form_surname').keyup(function (e) {
  var $validationMessage = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#validate-surname-user');
  $validationMessage.html('Comprobando...');
  $validationMessage.removeClass('color-success');
  $validationMessage.removeClass('color-danger');

  if (validateTextField(jquery__WEBPACK_IMPORTED_MODULE_7___default()('#registration_form_surname').val())) {
    $validationMessage.html('');
    surnameError = false;
    jquery__WEBPACK_IMPORTED_MODULE_7___default()('.form-container button').prop('disabled', emailError || nameError || surnameError || checkingUserName);
  } else {
    $validationMessage.html('* Solo se puede introducir texto en este campo');
    $validationMessage.removeClass('color-success');
    $validationMessage.addClass('color-danger');
    surnameError = true;
    jquery__WEBPACK_IMPORTED_MODULE_7___default()('.form-container button').prop('disabled', emailError || nameError || surnameError || checkingUserName);
  }
});

function validateTextField(value) {
  var pattern = new RegExp('^[A-Z]+$', 'i');
  return pattern.test(value) || !value;
} // Validaciones imágenes


jquery__WEBPACK_IMPORTED_MODULE_7___default()('#exhibition_form_imageSrc').change(function () {
  fileValidation('#exhibition_form_imageSrc', '#exhibition_form_submit', '#validate-image-file');
});
jquery__WEBPACK_IMPORTED_MODULE_7___default()('#piece_form_imageSrc').change(function () {
  fileValidation('#piece_form_imageSrc', '#piece_form_submit', '#validate-image-file');
});

function fileValidation(inputSelector, buttonSelector, messageSelector) {
  var fileInput = jquery__WEBPACK_IMPORTED_MODULE_7___default()(inputSelector),
      filePath = fileInput.val(),
      allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  console.log(filePath);

  if (!allowedExtensions.exec(filePath) && filePath) {
    jquery__WEBPACK_IMPORTED_MODULE_7___default()(messageSelector).html('* Archivo no válido.');
    jquery__WEBPACK_IMPORTED_MODULE_7___default()(messageSelector).removeClass('color-success');
    jquery__WEBPACK_IMPORTED_MODULE_7___default()(messageSelector).addClass('color-danger');
    jquery__WEBPACK_IMPORTED_MODULE_7___default()(buttonSelector).prop('disabled', true);
  } else {
    jquery__WEBPACK_IMPORTED_MODULE_7___default()(messageSelector).html('');
    jquery__WEBPACK_IMPORTED_MODULE_7___default()(messageSelector).removeClass('color-success');
    jquery__WEBPACK_IMPORTED_MODULE_7___default()(messageSelector).removeClass('color-danger');
    jquery__WEBPACK_IMPORTED_MODULE_7___default()(buttonSelector).prop('disabled', false);
  }
} // Validación comentario


jquery__WEBPACK_IMPORTED_MODULE_7___default()('#box-comment').keyup(function (e) {
  var $commentContainer = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#box-comment'),
      numChars = $commentContainer.val().length,
      maxChars = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#max_chars').val(),
      $countContainer = jquery__WEBPACK_IMPORTED_MODULE_7___default()('.comment-characters-count');
  $countContainer.html(maxChars - numChars);
  $commentContainer.val($commentContainer.val().substring(0, maxChars));
});
jquery__WEBPACK_IMPORTED_MODULE_7___default()('.commentsForm').submit(function (e) {
  if (jquery__WEBPACK_IMPORTED_MODULE_7___default()('#box-comment').val().length === 0) {
    e.preventDefault();
  }
}); // Validación campos vacíos

jquery__WEBPACK_IMPORTED_MODULE_7___default()('#update-user-form').submit(function (e) {
  var $inputEmail = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#registration_form_email'),
      $inputName = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#registration_form_name'),
      $inputSurname = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#registration_form_surname'),
      $inputBirthdate = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#registration_form_birthdate'),
      resultEmail,
      resultName,
      resultSurname,
      resultBirthdate;
  resultEmail = _checkEmptyField($inputEmail);
  resultName = _checkEmptyField($inputName);
  resultSurname = _checkEmptyField($inputSurname);
  resultBirthdate = _checkEmptyField($inputBirthdate);

  if (resultEmail || resultName || resultSurname || resultBirthdate) {
    e.preventDefault();
  }
});
jquery__WEBPACK_IMPORTED_MODULE_7___default()('#register-user-form').submit(function (e) {
  var $inputEmail = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#registration_form_email'),
      $inputPassword = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#registration_form_plainPassword'),
      $inputName = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#registration_form_name'),
      $inputSurname = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#registration_form_surname'),
      $inputBirthdate = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#registration_form_birthdate'),
      resultEmail,
      resultPassword,
      resultName,
      resultSurname,
      resultBirthdate;
  resultEmail = _checkEmptyField($inputEmail);
  resultPassword = _checkEmptyField($inputPassword);
  resultName = _checkEmptyField($inputName);
  resultSurname = _checkEmptyField($inputSurname);
  resultBirthdate = _checkEmptyField($inputBirthdate);

  if (resultEmail || resultPassword || resultName || resultSurname || resultBirthdate) {
    e.preventDefault();
  }
});
jquery__WEBPACK_IMPORTED_MODULE_7___default()('#exhibition-form').submit(function (e) {
  var $inputName = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#exhibition_form_name'),
      $inputAuthor = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#exhibition_form_author'),
      $inputDescription = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#exhibition_form_description'),
      $inputStartAt = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#exhibition_form_startAt'),
      $inputRoom = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#exhibition_form_room'),
      $inputImage = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#exhibition_form_imageSrc'),
      resultName,
      resultAuthor,
      resultDescription,
      resultStartAt,
      resultRoom,
      resultImage;
  resultName = _checkEmptyField($inputName);
  resultAuthor = _checkEmptyField($inputAuthor);
  resultDescription = _checkEmptyField($inputDescription);
  resultStartAt = _checkEmptyField($inputStartAt);
  resultRoom = _checkEmptyField($inputRoom);
  resultImage = _checkEmptyField($inputImage);

  if (resultName || resultAuthor || resultDescription || resultStartAt || resultRoom || resultImage) {
    e.preventDefault();
  }
});
jquery__WEBPACK_IMPORTED_MODULE_7___default()('#exhibition-form-edit').submit(function (e) {
  var $inputName = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#exhibition_form_name'),
      $inputAuthor = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#exhibition_form_author'),
      $inputDescription = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#exhibition_form_description'),
      $inputStartAt = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#exhibition_form_startAt'),
      $inputRoom = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#exhibition_form_room'),
      resultName,
      resultAuthor,
      resultDescription,
      resultStartAt,
      resultRoom;
  resultName = _checkEmptyField($inputName);
  resultAuthor = _checkEmptyField($inputAuthor);
  resultDescription = _checkEmptyField($inputDescription);
  resultStartAt = _checkEmptyField($inputStartAt);
  resultRoom = _checkEmptyField($inputRoom);

  if (resultName || resultAuthor || resultDescription || resultStartAt || resultRoom) {
    e.preventDefault();
  }
});
jquery__WEBPACK_IMPORTED_MODULE_7___default()('#piece-form').submit(function (e) {
  var $inputName = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#piece_form_name'),
      $inputAuthor = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#piece_form_author'),
      $inputDescription = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#piece_form_description'),
      $inputImage = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#piece_form_imageSrc'),
      resultName,
      resultAuthor,
      resultDescription,
      resultImage;
  resultName = _checkEmptyField($inputName);
  resultAuthor = _checkEmptyField($inputAuthor);
  resultDescription = _checkEmptyField($inputDescription);
  resultImage = _checkEmptyField($inputImage);

  if (resultName || resultAuthor || resultDescription || resultImage) {
    e.preventDefault();
  }
});
jquery__WEBPACK_IMPORTED_MODULE_7___default()('#piece-form-edit').submit(function (e) {
  var $inputName = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#piece_form_name'),
      $inputAuthor = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#piece_form_author'),
      $inputDescription = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#piece_form_description'),
      resultName,
      resultAuthor,
      resultDescription;
  resultName = _checkEmptyField($inputName);
  resultAuthor = _checkEmptyField($inputAuthor);
  resultDescription = _checkEmptyField($inputDescription);

  if (resultName || resultAuthor || resultDescription) {
    e.preventDefault();
  }
});

function _checkEmptyField($input) {
  var empty;

  if ($input.val().length === 0) {
    $input.css('border', '3px solid #721c24');
    empty = true;
  } else {
    $input.css('border', '1px solid #222222');
    empty = false;
  }

  return empty;
}

/***/ }),

/***/ "./assets/styles/app.scss":
/*!********************************!*\
  !*** ./assets/styles/app.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_fortawesome_fontawesome-free_js_all_js-node_modules_bootstrap_dist_js_bo-b6590b"], () => (__webpack_exec__("./assets/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aUIsTUFBYixLQUF3QixDQUE1QixFQUErQjtJQUMzQjBELE1BQU0sQ0FBQ3JFLEdBQVAsQ0FBVyxRQUFYLEVBQXFCLG1CQUFyQjtJQUNBc0UsS0FBSyxHQUFHLElBQVI7RUFDSCxDQUhELE1BR087SUFDSEQsTUFBTSxDQUFDckUsR0FBUCxDQUFXLFFBQVgsRUFBcUIsbUJBQXJCO0lBQ0FzRSxLQUFLLEdBQUcsS0FBUjtFQUNIOztFQUVELE9BQU9BLEtBQVA7QUFDSDs7Ozs7Ozs7Ozs7QUM1VkQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zdHlsZXMvYXBwLnNjc3M/OGY1OSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogV2VsY29tZSB0byB5b3VyIGFwcCdzIG1haW4gSmF2YVNjcmlwdCBmaWxlIVxuICpcbiAqIFdlIHJlY29tbWVuZCBpbmNsdWRpbmcgdGhlIGJ1aWx0IHZlcnNpb24gb2YgdGhpcyBKYXZhU2NyaXB0IGZpbGVcbiAqIChhbmQgaXRzIENTUyBmaWxlKSBpbiB5b3VyIGJhc2UgbGF5b3V0IChiYXNlLmh0bWwudHdpZykuXG4gKi9cblxuLy8gYW55IENTUyB5b3UgaW1wb3J0IHdpbGwgb3V0cHV0IGludG8gYSBzaW5nbGUgY3NzIGZpbGUgKGFwcC5zY3NzIGluIHRoaXMgY2FzZSlcbmltcG9ydCAnLi9zdHlsZXMvYXBwLnNjc3MnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuLy8gc3RhcnQgdGhlIFN0aW11bHVzIGFwcGxpY2F0aW9uXG5yZXF1aXJlKCdib290c3RyYXAnKTtcbnJlcXVpcmUoJ2pxdWVyeScpO1xuXG5yZXF1aXJlKCdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvYWxsLm1pbi5jc3MnKTtcbnJlcXVpcmUoJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2pzL2FsbC5qcycpO1xuXG4vLyBFdmVudG8gZGUgSG9tZVxuJCgnLmV4cG8nKS5tb3VzZWVudGVyKGZ1bmN0aW9uIChlKSB7XG4gICAgbGV0IGlkID0gJCh0aGlzKS5maW5kKCcjZXhwby1pZCcpLnZhbCgpLCAkY29udGFpbmVyLCAkY2xvc2UsIHNjcm9sbFBvc2l0aW9uO1xuXG4gICAgJGNvbnRhaW5lciA9ICQoJy5leHBvLW1vZGFsLScgKyBpZCk7XG4gICAgJGNvbnRhaW5lci5yZW1vdmVDbGFzcygnZC1ub25lJyk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICRjb250YWluZXIuZmluZCgnLmV4cG8tbW9kYWwtaW5mbycpLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoMCknKTtcbiAgICB9LCAxMDApO1xuXG4gICAgJGNsb3NlID0gJCgnLmNsb3NlLW1vZGFsLScgKyBpZCk7XG4gICAgJGNsb3NlLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICRjb250YWluZXIuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xuICAgICAgICAkY29udGFpbmVyLmZpbmQoJy5leHBvLW1vZGFsLWluZm8nKS5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVYKC0xNTAlKScpO1xuICAgIH0pO1xuXG4gICAgJCgnLmV4cG8nKS5tb3VzZWxlYXZlKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICRjb250YWluZXIuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xuICAgICAgICAkY29udGFpbmVyLmZpbmQoJy5leHBvLW1vZGFsLWluZm8nKS5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGVYKC0xNTAlKScpO1xuICAgIH0pO1xufSk7XG5cbi8vIFZhbGlkYWNpb25lcyB1c3VhcmlvXG5sZXQgZW1haWxFcnJvciA9IGZhbHNlLCBuYW1lRXJyb3IgPSBmYWxzZSwgc3VybmFtZUVycm9yID0gZmFsc2UsIGNoZWNraW5nVXNlck5hbWUgPSBmYWxzZTtcblxuJCgnI3JlZ2lzdHJhdGlvbl9mb3JtX2VtYWlsJykua2V5dXAoZnVuY3Rpb24gKGUpIHtcbiAgICBsZXQgJHZhbGlkYXRlRW1haWxVc2VyID0gJCgnI3ZhbGlkYXRlLWVtYWlsLXVzZXInKTtcbiAgICAkdmFsaWRhdGVFbWFpbFVzZXIuaHRtbCgnQ29tcHJvYmFuZG8uLi4nKTtcbiAgICAkdmFsaWRhdGVFbWFpbFVzZXIucmVtb3ZlQ2xhc3MoJ2NvbG9yLXN1Y2Nlc3MnKTtcbiAgICAkdmFsaWRhdGVFbWFpbFVzZXIucmVtb3ZlQ2xhc3MoJ2NvbG9yLWRhbmdlcicpO1xuICAgIGNoZWNraW5nVXNlck5hbWUgPSB0cnVlO1xuXG4gICAgLy8gbm9pbnNwZWN0aW9uIEpTSlF1ZXJ5RWZmaWNpZW5jeVxuICAgIGlmKCQoJyNyZWdpc3RyYXRpb25fZm9ybV9lbWFpbCcpLnZhbCgpLmxlbmd0aCA+IDUpIHtcbiAgICAgICAgaWYgKCQoJyNyZWdpc3RyYXRpb25fZm9ybV9lbWFpbCcpLnZhbCgpKSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgICAgICAgIHVybDogJy9jaGVjay91c2VyJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAkKCcjdXNlci1pZCcpLnZhbCgpLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogJCgnI3JlZ2lzdHJhdGlvbl9mb3JtX2VtYWlsJykudmFsKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgJHZhbGlkYXRlRW1haWxVc2VyLmh0bWwoJyogRW1haWwgZGlzcG9uaWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAkdmFsaWRhdGVFbWFpbFVzZXIuYWRkQ2xhc3MoJ2NvbG9yLXN1Y2Nlc3MnKTtcbiAgICAgICAgICAgICAgICAgICAgJHZhbGlkYXRlRW1haWxVc2VyLnJlbW92ZUNsYXNzKCdjb2xvci1kYW5nZXInKTtcbiAgICAgICAgICAgICAgICAgICAgZW1haWxFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBjaGVja2luZ1VzZXJOYW1lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICQoJy5mb3JtLWNvbnRhaW5lciBidXR0b24nKS5wcm9wKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2Rpc2FibGVkJywgZW1haWxFcnJvciB8fCBuYW1lRXJyb3IgfHwgc3VybmFtZUVycm9yIHx8IGNoZWNraW5nVXNlck5hbWVcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkdmFsaWRhdGVFbWFpbFVzZXIuaHRtbCgnKiBFbWFpbCB5YSByZWdpc3RyYWRvJyk7XG4gICAgICAgICAgICAgICAgICAgICR2YWxpZGF0ZUVtYWlsVXNlci5yZW1vdmVDbGFzcygnY29sb3Itc3VjY2VzcycpO1xuICAgICAgICAgICAgICAgICAgICAkdmFsaWRhdGVFbWFpbFVzZXIuYWRkQ2xhc3MoJ2NvbG9yLWRhbmdlcicpO1xuICAgICAgICAgICAgICAgICAgICBlbWFpbEVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tpbmdVc2VyTmFtZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZm9ybS1jb250YWluZXIgYnV0dG9uJykucHJvcChcbiAgICAgICAgICAgICAgICAgICAgICAgICdkaXNhYmxlZCcsIGVtYWlsRXJyb3IgfHwgbmFtZUVycm9yIHx8IHN1cm5hbWVFcnJvciB8fCBjaGVja2luZ1VzZXJOYW1lXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XG4gICAgICAgICAgICAgICAgJCgnI3ZhbGlkYXRlLXVzZXInKS5odG1sKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgICR2YWxpZGF0ZUVtYWlsVXNlci5odG1sKCdFbCB1c3VhcmlvIGRlYmUgdGVuZXIgbcOtbmltbyA2IGNhcmFjdGVyZXMuJyk7XG4gICAgICAgICR2YWxpZGF0ZUVtYWlsVXNlci5hZGRDbGFzcygnY29sb3ItZGFuZ2VyJyk7XG4gICAgfVxufSk7XG5cbiQoJyNyZWdpc3RyYXRpb25fZm9ybV9uYW1lJykua2V5dXAoZnVuY3Rpb24gKGUpIHtcbiAgICBsZXQgJHZhbGlkYXRpb25NZXNzYWdlID0gJCgnI3ZhbGlkYXRlLW5hbWUtdXNlcicpO1xuICAgICR2YWxpZGF0aW9uTWVzc2FnZS5odG1sKCdDb21wcm9iYW5kby4uLicpO1xuICAgICR2YWxpZGF0aW9uTWVzc2FnZS5yZW1vdmVDbGFzcygnY29sb3Itc3VjY2VzcycpO1xuICAgICR2YWxpZGF0aW9uTWVzc2FnZS5yZW1vdmVDbGFzcygnY29sb3ItZGFuZ2VyJyk7XG5cbiAgICBpZiAodmFsaWRhdGVUZXh0RmllbGQoJCgnI3JlZ2lzdHJhdGlvbl9mb3JtX25hbWUnKS52YWwoKSkpIHtcbiAgICAgICAgJHZhbGlkYXRpb25NZXNzYWdlLmh0bWwoJycpO1xuICAgICAgICBuYW1lRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgJCgnLmZvcm0tY29udGFpbmVyIGJ1dHRvbicpLnByb3AoXG4gICAgICAgICAgICAnZGlzYWJsZWQnLCBlbWFpbEVycm9yIHx8IG5hbWVFcnJvciB8fCBzdXJuYW1lRXJyb3IgfHwgY2hlY2tpbmdVc2VyTmFtZVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICR2YWxpZGF0aW9uTWVzc2FnZS5odG1sKCcqIFNvbG8gc2UgcHVlZGUgaW50cm9kdWNpciB0ZXh0byBlbiBlc3RlIGNhbXBvJyk7XG4gICAgICAgICR2YWxpZGF0aW9uTWVzc2FnZS5yZW1vdmVDbGFzcygnY29sb3Itc3VjY2VzcycpO1xuICAgICAgICAkdmFsaWRhdGlvbk1lc3NhZ2UuYWRkQ2xhc3MoJ2NvbG9yLWRhbmdlcicpO1xuICAgICAgICBuYW1lRXJyb3IgPSB0cnVlO1xuICAgICAgICAkKCcuZm9ybS1jb250YWluZXIgYnV0dG9uJykucHJvcChcbiAgICAgICAgICAgICdkaXNhYmxlZCcsIGVtYWlsRXJyb3IgfHwgbmFtZUVycm9yIHx8IHN1cm5hbWVFcnJvciB8fCBjaGVja2luZ1VzZXJOYW1lXG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbiQoJyNyZWdpc3RyYXRpb25fZm9ybV9zdXJuYW1lJykua2V5dXAoZnVuY3Rpb24gKGUpIHtcbiAgICBsZXQgJHZhbGlkYXRpb25NZXNzYWdlID0gJCgnI3ZhbGlkYXRlLXN1cm5hbWUtdXNlcicpO1xuICAgICR2YWxpZGF0aW9uTWVzc2FnZS5odG1sKCdDb21wcm9iYW5kby4uLicpO1xuICAgICR2YWxpZGF0aW9uTWVzc2FnZS5yZW1vdmVDbGFzcygnY29sb3Itc3VjY2VzcycpO1xuICAgICR2YWxpZGF0aW9uTWVzc2FnZS5yZW1vdmVDbGFzcygnY29sb3ItZGFuZ2VyJyk7XG5cbiAgICBpZiAodmFsaWRhdGVUZXh0RmllbGQoJCgnI3JlZ2lzdHJhdGlvbl9mb3JtX3N1cm5hbWUnKS52YWwoKSkpIHtcbiAgICAgICAgJHZhbGlkYXRpb25NZXNzYWdlLmh0bWwoJycpO1xuICAgICAgICBzdXJuYW1lRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgJCgnLmZvcm0tY29udGFpbmVyIGJ1dHRvbicpLnByb3AoXG4gICAgICAgICAgICAnZGlzYWJsZWQnLCBlbWFpbEVycm9yIHx8IG5hbWVFcnJvciB8fCBzdXJuYW1lRXJyb3IgfHwgY2hlY2tpbmdVc2VyTmFtZVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICR2YWxpZGF0aW9uTWVzc2FnZS5odG1sKCcqIFNvbG8gc2UgcHVlZGUgaW50cm9kdWNpciB0ZXh0byBlbiBlc3RlIGNhbXBvJyk7XG4gICAgICAgICR2YWxpZGF0aW9uTWVzc2FnZS5yZW1vdmVDbGFzcygnY29sb3Itc3VjY2VzcycpO1xuICAgICAgICAkdmFsaWRhdGlvbk1lc3NhZ2UuYWRkQ2xhc3MoJ2NvbG9yLWRhbmdlcicpO1xuICAgICAgICBzdXJuYW1lRXJyb3IgPSB0cnVlO1xuICAgICAgICAkKCcuZm9ybS1jb250YWluZXIgYnV0dG9uJykucHJvcChcbiAgICAgICAgICAgICdkaXNhYmxlZCcsIGVtYWlsRXJyb3IgfHwgbmFtZUVycm9yIHx8IHN1cm5hbWVFcnJvciB8fCBjaGVja2luZ1VzZXJOYW1lXG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlVGV4dEZpZWxkKHZhbHVlKSB7XG4gICAgY29uc3QgcGF0dGVybiA9IG5ldyBSZWdFeHAoJ15bQS1aXSskJywgJ2knKTtcblxuICAgIHJldHVybiBwYXR0ZXJuLnRlc3QodmFsdWUpIHx8ICF2YWx1ZTtcbn1cblxuLy8gVmFsaWRhY2lvbmVzIGltw6FnZW5lc1xuXG4kKCcjZXhoaWJpdGlvbl9mb3JtX2ltYWdlU3JjJykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICBmaWxlVmFsaWRhdGlvbihcbiAgICAgICAgJyNleGhpYml0aW9uX2Zvcm1faW1hZ2VTcmMnLFxuICAgICAgICAnI2V4aGliaXRpb25fZm9ybV9zdWJtaXQnLFxuICAgICAgICAnI3ZhbGlkYXRlLWltYWdlLWZpbGUnXG4gICAgKTtcbn0pO1xuXG4kKCcjcGllY2VfZm9ybV9pbWFnZVNyYycpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG4gICAgZmlsZVZhbGlkYXRpb24oXG4gICAgICAgICcjcGllY2VfZm9ybV9pbWFnZVNyYycsXG4gICAgICAgICcjcGllY2VfZm9ybV9zdWJtaXQnLFxuICAgICAgICAnI3ZhbGlkYXRlLWltYWdlLWZpbGUnXG4gICAgKTtcbn0pO1xuXG5mdW5jdGlvbiBmaWxlVmFsaWRhdGlvbihpbnB1dFNlbGVjdG9yLCBidXR0b25TZWxlY3RvciwgbWVzc2FnZVNlbGVjdG9yKSB7XG4gICAgbGV0IGZpbGVJbnB1dCA9ICQoaW5wdXRTZWxlY3RvciksIGZpbGVQYXRoID0gZmlsZUlucHV0LnZhbCgpLFxuICAgICAgICBhbGxvd2VkRXh0ZW5zaW9ucyA9IC8oXFwuanBnfFxcLmpwZWd8XFwucG5nfFxcLmdpZikkL2k7XG4gICAgY29uc29sZS5sb2coZmlsZVBhdGgpO1xuICAgIGlmICghYWxsb3dlZEV4dGVuc2lvbnMuZXhlYyhmaWxlUGF0aCkgJiYgZmlsZVBhdGgpIHtcbiAgICAgICAgJChtZXNzYWdlU2VsZWN0b3IpLmh0bWwoJyogQXJjaGl2byBubyB2w6FsaWRvLicpO1xuICAgICAgICAkKG1lc3NhZ2VTZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2NvbG9yLXN1Y2Nlc3MnKTtcbiAgICAgICAgJChtZXNzYWdlU2VsZWN0b3IpLmFkZENsYXNzKCdjb2xvci1kYW5nZXInKTtcbiAgICAgICAgJChidXR0b25TZWxlY3RvcikucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKG1lc3NhZ2VTZWxlY3RvcikuaHRtbCgnJyk7XG4gICAgICAgICQobWVzc2FnZVNlbGVjdG9yKS5yZW1vdmVDbGFzcygnY29sb3Itc3VjY2VzcycpO1xuICAgICAgICAkKG1lc3NhZ2VTZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2NvbG9yLWRhbmdlcicpO1xuICAgICAgICAkKGJ1dHRvblNlbGVjdG9yKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICB9XG59XG5cbi8vIFZhbGlkYWNpw7NuIGNvbWVudGFyaW9cbiQoJyNib3gtY29tbWVudCcpLmtleXVwKGZ1bmN0aW9uIChlKSB7XG4gICAgbGV0ICRjb21tZW50Q29udGFpbmVyID0gJCgnI2JveC1jb21tZW50JyksXG4gICAgICAgIG51bUNoYXJzID0gJGNvbW1lbnRDb250YWluZXIudmFsKCkubGVuZ3RoLFxuICAgICAgICBtYXhDaGFycyA9ICQoJyNtYXhfY2hhcnMnKS52YWwoKSxcbiAgICAgICAgJGNvdW50Q29udGFpbmVyID0gJCgnLmNvbW1lbnQtY2hhcmFjdGVycy1jb3VudCcpO1xuXG4gICAgJGNvdW50Q29udGFpbmVyLmh0bWwobWF4Q2hhcnMgLSBudW1DaGFycyk7XG4gICAgJGNvbW1lbnRDb250YWluZXIudmFsKCRjb21tZW50Q29udGFpbmVyLnZhbCgpLnN1YnN0cmluZygwLCBtYXhDaGFycykpO1xufSk7XG5cbiQoJy5jb21tZW50c0Zvcm0nKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoJCgnI2JveC1jb21tZW50JykudmFsKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59KTtcblxuLy8gVmFsaWRhY2nDs24gY2FtcG9zIHZhY8Otb3NcbiQoJyN1cGRhdGUtdXNlci1mb3JtJykuc3VibWl0KGZ1bmN0aW9uIChlKSB7XG4gICAgbGV0ICRpbnB1dEVtYWlsID0gJCgnI3JlZ2lzdHJhdGlvbl9mb3JtX2VtYWlsJyksXG4gICAgICAgICRpbnB1dE5hbWUgPSAkKCcjcmVnaXN0cmF0aW9uX2Zvcm1fbmFtZScpLFxuICAgICAgICAkaW5wdXRTdXJuYW1lID0gJCgnI3JlZ2lzdHJhdGlvbl9mb3JtX3N1cm5hbWUnKSxcbiAgICAgICAgJGlucHV0QmlydGhkYXRlID0gJCgnI3JlZ2lzdHJhdGlvbl9mb3JtX2JpcnRoZGF0ZScpLFxuICAgICAgICByZXN1bHRFbWFpbCwgcmVzdWx0TmFtZSwgcmVzdWx0U3VybmFtZSwgcmVzdWx0QmlydGhkYXRlO1xuXG4gICAgcmVzdWx0RW1haWwgPSBfY2hlY2tFbXB0eUZpZWxkKCRpbnB1dEVtYWlsKTtcbiAgICByZXN1bHROYW1lID0gX2NoZWNrRW1wdHlGaWVsZCgkaW5wdXROYW1lKTtcbiAgICByZXN1bHRTdXJuYW1lID0gX2NoZWNrRW1wdHlGaWVsZCgkaW5wdXRTdXJuYW1lKTtcbiAgICByZXN1bHRCaXJ0aGRhdGUgPSBfY2hlY2tFbXB0eUZpZWxkKCRpbnB1dEJpcnRoZGF0ZSk7XG5cbiAgICBpZiAoXG4gICAgICAgIHJlc3VsdEVtYWlsXG4gICAgICAgIHx8IHJlc3VsdE5hbWVcbiAgICAgICAgfHwgcmVzdWx0U3VybmFtZVxuICAgICAgICB8fCByZXN1bHRCaXJ0aGRhdGVcbiAgICApIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn0pO1xuXG4kKCcjcmVnaXN0ZXItdXNlci1mb3JtJykuc3VibWl0KGZ1bmN0aW9uIChlKXtcbiAgICBsZXQgJGlucHV0RW1haWwgPSAkKCcjcmVnaXN0cmF0aW9uX2Zvcm1fZW1haWwnKSxcbiAgICAgICAgJGlucHV0UGFzc3dvcmQgPSAkKCcjcmVnaXN0cmF0aW9uX2Zvcm1fcGxhaW5QYXNzd29yZCcpLFxuICAgICAgICAkaW5wdXROYW1lID0gJCgnI3JlZ2lzdHJhdGlvbl9mb3JtX25hbWUnKSxcbiAgICAgICAgJGlucHV0U3VybmFtZSA9ICQoJyNyZWdpc3RyYXRpb25fZm9ybV9zdXJuYW1lJyksXG4gICAgICAgICRpbnB1dEJpcnRoZGF0ZSA9ICQoJyNyZWdpc3RyYXRpb25fZm9ybV9iaXJ0aGRhdGUnKSxcbiAgICAgICAgcmVzdWx0RW1haWwsIHJlc3VsdFBhc3N3b3JkLCByZXN1bHROYW1lLCByZXN1bHRTdXJuYW1lLCByZXN1bHRCaXJ0aGRhdGU7XG5cbiAgICByZXN1bHRFbWFpbCA9IF9jaGVja0VtcHR5RmllbGQoJGlucHV0RW1haWwpO1xuICAgIHJlc3VsdFBhc3N3b3JkID0gX2NoZWNrRW1wdHlGaWVsZCgkaW5wdXRQYXNzd29yZCk7XG4gICAgcmVzdWx0TmFtZSA9IF9jaGVja0VtcHR5RmllbGQoJGlucHV0TmFtZSk7XG4gICAgcmVzdWx0U3VybmFtZSA9IF9jaGVja0VtcHR5RmllbGQoJGlucHV0U3VybmFtZSk7XG4gICAgcmVzdWx0QmlydGhkYXRlID0gX2NoZWNrRW1wdHlGaWVsZCgkaW5wdXRCaXJ0aGRhdGUpO1xuXG4gICAgaWYgKFxuICAgICAgICByZXN1bHRFbWFpbFxuICAgICAgICB8fCByZXN1bHRQYXNzd29yZFxuICAgICAgICB8fCByZXN1bHROYW1lXG4gICAgICAgIHx8IHJlc3VsdFN1cm5hbWVcbiAgICAgICAgfHwgcmVzdWx0QmlydGhkYXRlXG4gICAgKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59KTtcblxuJCgnI2V4aGliaXRpb24tZm9ybScpLnN1Ym1pdChmdW5jdGlvbiAoZSl7XG4gICAgbGV0ICRpbnB1dE5hbWUgPSAkKCcjZXhoaWJpdGlvbl9mb3JtX25hbWUnKSxcbiAgICAgICAgJGlucHV0QXV0aG9yID0gJCgnI2V4aGliaXRpb25fZm9ybV9hdXRob3InKSxcbiAgICAgICAgJGlucHV0RGVzY3JpcHRpb24gPSAkKCcjZXhoaWJpdGlvbl9mb3JtX2Rlc2NyaXB0aW9uJyksXG4gICAgICAgICRpbnB1dFN0YXJ0QXQgPSAkKCcjZXhoaWJpdGlvbl9mb3JtX3N0YXJ0QXQnKSxcbiAgICAgICAgJGlucHV0Um9vbSA9ICQoJyNleGhpYml0aW9uX2Zvcm1fcm9vbScpLFxuICAgICAgICAkaW5wdXRJbWFnZSA9ICQoJyNleGhpYml0aW9uX2Zvcm1faW1hZ2VTcmMnKSxcbiAgICAgICAgcmVzdWx0TmFtZSwgcmVzdWx0QXV0aG9yLCByZXN1bHREZXNjcmlwdGlvbiwgcmVzdWx0U3RhcnRBdCwgcmVzdWx0Um9vbSwgcmVzdWx0SW1hZ2U7XG5cbiAgICByZXN1bHROYW1lID0gX2NoZWNrRW1wdHlGaWVsZCgkaW5wdXROYW1lKTtcbiAgICByZXN1bHRBdXRob3IgPSBfY2hlY2tFbXB0eUZpZWxkKCRpbnB1dEF1dGhvcik7XG4gICAgcmVzdWx0RGVzY3JpcHRpb24gPSBfY2hlY2tFbXB0eUZpZWxkKCRpbnB1dERlc2NyaXB0aW9uKTtcbiAgICByZXN1bHRTdGFydEF0ID0gX2NoZWNrRW1wdHlGaWVsZCgkaW5wdXRTdGFydEF0KTtcbiAgICByZXN1bHRSb29tID0gX2NoZWNrRW1wdHlGaWVsZCgkaW5wdXRSb29tKTtcbiAgICByZXN1bHRJbWFnZSA9IF9jaGVja0VtcHR5RmllbGQoJGlucHV0SW1hZ2UpO1xuXG4gICAgaWYgKFxuICAgICAgICByZXN1bHROYW1lXG4gICAgICAgIHx8IHJlc3VsdEF1dGhvclxuICAgICAgICB8fCByZXN1bHREZXNjcmlwdGlvblxuICAgICAgICB8fCByZXN1bHRTdGFydEF0XG4gICAgICAgIHx8IHJlc3VsdFJvb21cbiAgICAgICAgfHwgcmVzdWx0SW1hZ2VcbiAgICApIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn0pO1xuXG4kKCcjZXhoaWJpdGlvbi1mb3JtLWVkaXQnKS5zdWJtaXQoZnVuY3Rpb24gKGUpe1xuICAgIGxldCAkaW5wdXROYW1lID0gJCgnI2V4aGliaXRpb25fZm9ybV9uYW1lJyksXG4gICAgICAgICRpbnB1dEF1dGhvciA9ICQoJyNleGhpYml0aW9uX2Zvcm1fYXV0aG9yJyksXG4gICAgICAgICRpbnB1dERlc2NyaXB0aW9uID0gJCgnI2V4aGliaXRpb25fZm9ybV9kZXNjcmlwdGlvbicpLFxuICAgICAgICAkaW5wdXRTdGFydEF0ID0gJCgnI2V4aGliaXRpb25fZm9ybV9zdGFydEF0JyksXG4gICAgICAgICRpbnB1dFJvb20gPSAkKCcjZXhoaWJpdGlvbl9mb3JtX3Jvb20nKSxcbiAgICAgICAgcmVzdWx0TmFtZSwgcmVzdWx0QXV0aG9yLCByZXN1bHREZXNjcmlwdGlvbiwgcmVzdWx0U3RhcnRBdCwgcmVzdWx0Um9vbTtcblxuICAgIHJlc3VsdE5hbWUgPSBfY2hlY2tFbXB0eUZpZWxkKCRpbnB1dE5hbWUpO1xuICAgIHJlc3VsdEF1dGhvciA9IF9jaGVja0VtcHR5RmllbGQoJGlucHV0QXV0aG9yKTtcbiAgICByZXN1bHREZXNjcmlwdGlvbiA9IF9jaGVja0VtcHR5RmllbGQoJGlucHV0RGVzY3JpcHRpb24pO1xuICAgIHJlc3VsdFN0YXJ0QXQgPSBfY2hlY2tFbXB0eUZpZWxkKCRpbnB1dFN0YXJ0QXQpO1xuICAgIHJlc3VsdFJvb20gPSBfY2hlY2tFbXB0eUZpZWxkKCRpbnB1dFJvb20pO1xuXG4gICAgaWYgKFxuICAgICAgICByZXN1bHROYW1lXG4gICAgICAgIHx8IHJlc3VsdEF1dGhvclxuICAgICAgICB8fCByZXN1bHREZXNjcmlwdGlvblxuICAgICAgICB8fCByZXN1bHRTdGFydEF0XG4gICAgICAgIHx8IHJlc3VsdFJvb21cbiAgICApIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn0pO1xuXG4kKCcjcGllY2UtZm9ybScpLnN1Ym1pdChmdW5jdGlvbiAoZSl7XG4gICAgbGV0ICRpbnB1dE5hbWUgPSAkKCcjcGllY2VfZm9ybV9uYW1lJyksXG4gICAgICAgICRpbnB1dEF1dGhvciA9ICQoJyNwaWVjZV9mb3JtX2F1dGhvcicpLFxuICAgICAgICAkaW5wdXREZXNjcmlwdGlvbiA9ICQoJyNwaWVjZV9mb3JtX2Rlc2NyaXB0aW9uJyksXG4gICAgICAgICRpbnB1dEltYWdlID0gJCgnI3BpZWNlX2Zvcm1faW1hZ2VTcmMnKSxcbiAgICAgICAgcmVzdWx0TmFtZSwgcmVzdWx0QXV0aG9yLCByZXN1bHREZXNjcmlwdGlvbiwgcmVzdWx0SW1hZ2U7XG5cbiAgICByZXN1bHROYW1lID0gX2NoZWNrRW1wdHlGaWVsZCgkaW5wdXROYW1lKTtcbiAgICByZXN1bHRBdXRob3IgPSBfY2hlY2tFbXB0eUZpZWxkKCRpbnB1dEF1dGhvcik7XG4gICAgcmVzdWx0RGVzY3JpcHRpb24gPSBfY2hlY2tFbXB0eUZpZWxkKCRpbnB1dERlc2NyaXB0aW9uKTtcbiAgICByZXN1bHRJbWFnZSA9IF9jaGVja0VtcHR5RmllbGQoJGlucHV0SW1hZ2UpO1xuXG4gICAgaWYgKFxuICAgICAgICByZXN1bHROYW1lXG4gICAgICAgIHx8IHJlc3VsdEF1dGhvclxuICAgICAgICB8fCByZXN1bHREZXNjcmlwdGlvblxuICAgICAgICB8fCByZXN1bHRJbWFnZVxuICAgICkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufSk7XG5cbiQoJyNwaWVjZS1mb3JtLWVkaXQnKS5zdWJtaXQoZnVuY3Rpb24gKGUpe1xuICAgIGxldCAkaW5wdXROYW1lID0gJCgnI3BpZWNlX2Zvcm1fbmFtZScpLFxuICAgICAgICAkaW5wdXRBdXRob3IgPSAkKCcjcGllY2VfZm9ybV9hdXRob3InKSxcbiAgICAgICAgJGlucHV0RGVzY3JpcHRpb24gPSAkKCcjcGllY2VfZm9ybV9kZXNjcmlwdGlvbicpLFxuICAgICAgICByZXN1bHROYW1lLCByZXN1bHRBdXRob3IsIHJlc3VsdERlc2NyaXB0aW9uO1xuXG4gICAgcmVzdWx0TmFtZSA9IF9jaGVja0VtcHR5RmllbGQoJGlucHV0TmFtZSk7XG4gICAgcmVzdWx0QXV0aG9yID0gX2NoZWNrRW1wdHlGaWVsZCgkaW5wdXRBdXRob3IpO1xuICAgIHJlc3VsdERlc2NyaXB0aW9uID0gX2NoZWNrRW1wdHlGaWVsZCgkaW5wdXREZXNjcmlwdGlvbik7XG5cbiAgICBpZiAoXG4gICAgICAgIHJlc3VsdE5hbWVcbiAgICAgICAgfHwgcmVzdWx0QXV0aG9yXG4gICAgICAgIHx8IHJlc3VsdERlc2NyaXB0aW9uXG4gICAgKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59KTtcblxuZnVuY3Rpb24gX2NoZWNrRW1wdHlGaWVsZCgkaW5wdXQpIHtcbiAgICBsZXQgZW1wdHk7XG5cbiAgICBpZiAoJGlucHV0LnZhbCgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAkaW5wdXQuY3NzKCdib3JkZXInLCAnM3B4IHNvbGlkICM3MjFjMjQnKTtcbiAgICAgICAgZW1wdHkgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRpbnB1dC5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgIzIyMjIyMicpO1xuICAgICAgICBlbXB0eSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBlbXB0eTtcbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsiJCIsInJlcXVpcmUiLCJtb3VzZWVudGVyIiwiZSIsImlkIiwiZmluZCIsInZhbCIsIiRjb250YWluZXIiLCIkY2xvc2UiLCJzY3JvbGxQb3NpdGlvbiIsInJlbW92ZUNsYXNzIiwic2V0VGltZW91dCIsImNzcyIsImNsaWNrIiwiYWRkQ2xhc3MiLCJtb3VzZWxlYXZlIiwiZW1haWxFcnJvciIsIm5hbWVFcnJvciIsInN1cm5hbWVFcnJvciIsImNoZWNraW5nVXNlck5hbWUiLCJrZXl1cCIsIiR2YWxpZGF0ZUVtYWlsVXNlciIsImh0bWwiLCJsZW5ndGgiLCJhamF4IiwidHlwZSIsInVybCIsImRhdGEiLCJlbWFpbCIsImRvbmUiLCJyZXN1bHQiLCJwcm9wIiwiZmFpbCIsImpxWEhSIiwidGV4dFN0YXR1cyIsImVycm9yVGhyb3duIiwiJHZhbGlkYXRpb25NZXNzYWdlIiwidmFsaWRhdGVUZXh0RmllbGQiLCJ2YWx1ZSIsInBhdHRlcm4iLCJSZWdFeHAiLCJ0ZXN0IiwiY2hhbmdlIiwiZmlsZVZhbGlkYXRpb24iLCJpbnB1dFNlbGVjdG9yIiwiYnV0dG9uU2VsZWN0b3IiLCJtZXNzYWdlU2VsZWN0b3IiLCJmaWxlSW5wdXQiLCJmaWxlUGF0aCIsImFsbG93ZWRFeHRlbnNpb25zIiwiY29uc29sZSIsImxvZyIsImV4ZWMiLCIkY29tbWVudENvbnRhaW5lciIsIm51bUNoYXJzIiwibWF4Q2hhcnMiLCIkY291bnRDb250YWluZXIiLCJzdWJzdHJpbmciLCJzdWJtaXQiLCJwcmV2ZW50RGVmYXVsdCIsIiRpbnB1dEVtYWlsIiwiJGlucHV0TmFtZSIsIiRpbnB1dFN1cm5hbWUiLCIkaW5wdXRCaXJ0aGRhdGUiLCJyZXN1bHRFbWFpbCIsInJlc3VsdE5hbWUiLCJyZXN1bHRTdXJuYW1lIiwicmVzdWx0QmlydGhkYXRlIiwiX2NoZWNrRW1wdHlGaWVsZCIsIiRpbnB1dFBhc3N3b3JkIiwicmVzdWx0UGFzc3dvcmQiLCIkaW5wdXRBdXRob3IiLCIkaW5wdXREZXNjcmlwdGlvbiIsIiRpbnB1dFN0YXJ0QXQiLCIkaW5wdXRSb29tIiwiJGlucHV0SW1hZ2UiLCJyZXN1bHRBdXRob3IiLCJyZXN1bHREZXNjcmlwdGlvbiIsInJlc3VsdFN0YXJ0QXQiLCJyZXN1bHRSb29tIiwicmVzdWx0SW1hZ2UiLCIkaW5wdXQiLCJlbXB0eSJdLCJzb3VyY2VSb290IjoiIn0=