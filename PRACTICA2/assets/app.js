/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.scss in this case)
import './styles/app.scss';
import $ from 'jquery';

// start the Stimulus application
require('bootstrap');
require('jquery');

require('@fortawesome/fontawesome-free/css/all.min.css');
require('@fortawesome/fontawesome-free/js/all.js');

// Evento de Home
$('.expo').mouseenter(function (e) {
    let id = $(this).find('#expo-id').val(), $container, $close, scrollPosition;

    $container = $('.expo-modal-' + id);
    $container.removeClass('d-none');
    setTimeout(function () {
        $container.find('.expo-modal-info').css('transform', 'translateX(0)');
    }, 100);

    $close = $('.close-modal-' + id);
    $close.click(function (e) {
        $container.addClass('d-none');
        $container.find('.expo-modal-info').css('transform', 'translateX(-150%)');
    });

    $('.expo').mouseleave(function (e) {
        $container.addClass('d-none');
        $container.find('.expo-modal-info').css('transform', 'translateX(-150%)');
    });
});

// Validaciones usuario
let emailError = false, nameError = false, surnameError = false, checkingUserName = false;

$('#registration_form_email').keyup(function (e) {
    let $validateEmailUser = $('#validate-email-user');
    $validateEmailUser.html('Comprobando...');
    $validateEmailUser.removeClass('color-success');
    $validateEmailUser.removeClass('color-danger');
    checkingUserName = true;

    // noinspection JSJQueryEfficiency
    if($('#registration_form_email').val().length > 5) {
        if ($('#registration_form_email').val()) {
            $.ajax({
                type: 'GET',
                url: '/check/user',
                data: {
                    id: $('#user-id').val(),
                    email: $('#registration_form_email').val()
                }
            }).done(function (result) {
                if (result.data) {
                    $validateEmailUser.html('* Email disponible');
                    $validateEmailUser.addClass('color-success');
                    $validateEmailUser.removeClass('color-danger');
                    emailError = false;
                    checkingUserName = false;
                    $('.form-container button').prop(
                        'disabled', emailError || nameError || surnameError || checkingUserName
                    );
                } else {
                    $validateEmailUser.html('* Email ya registrado');
                    $validateEmailUser.removeClass('color-success');
                    $validateEmailUser.addClass('color-danger');
                    emailError = true;
                    checkingUserName = false;
                    $('.form-container button').prop(
                        'disabled', emailError || nameError || surnameError || checkingUserName
                    );
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                $('#validate-user').html();
            });
        }
    } else {
        $validateEmailUser.html('El usuario debe tener mínimo 6 caracteres.');
        $validateEmailUser.addClass('color-danger');
    }
});

$('#registration_form_name').keyup(function (e) {
    let $validationMessage = $('#validate-name-user');
    $validationMessage.html('Comprobando...');
    $validationMessage.removeClass('color-success');
    $validationMessage.removeClass('color-danger');

    if (validateTextField($('#registration_form_name').val())) {
        $validationMessage.html('');
        nameError = false;
        $('.form-container button').prop(
            'disabled', emailError || nameError || surnameError || checkingUserName
        );
    } else {
        $validationMessage.html('* Solo se puede introducir texto en este campo');
        $validationMessage.removeClass('color-success');
        $validationMessage.addClass('color-danger');
        nameError = true;
        $('.form-container button').prop(
            'disabled', emailError || nameError || surnameError || checkingUserName
        );
    }
});

$('#registration_form_surname').keyup(function (e) {
    let $validationMessage = $('#validate-surname-user');
    $validationMessage.html('Comprobando...');
    $validationMessage.removeClass('color-success');
    $validationMessage.removeClass('color-danger');

    if (validateTextField($('#registration_form_surname').val())) {
        $validationMessage.html('');
        surnameError = false;
        $('.form-container button').prop(
            'disabled', emailError || nameError || surnameError || checkingUserName
        );
    } else {
        $validationMessage.html('* Solo se puede introducir texto en este campo');
        $validationMessage.removeClass('color-success');
        $validationMessage.addClass('color-danger');
        surnameError = true;
        $('.form-container button').prop(
            'disabled', emailError || nameError || surnameError || checkingUserName
        );
    }
});

function validateTextField(value) {
    const pattern = new RegExp('^[A-Z]+$', 'i');

    return pattern.test(value) || !value;
}

// Validaciones imágenes

$('#exhibition_form_imageSrc').change(function () {
    fileValidation(
        '#exhibition_form_imageSrc',
        '#exhibition_form_submit',
        '#validate-image-file'
    );
});

$('#piece_form_imageSrc').change(function () {
    fileValidation(
        '#piece_form_imageSrc',
        '#piece_form_submit',
        '#validate-image-file'
    );
});

function fileValidation(inputSelector, buttonSelector, messageSelector) {
    let fileInput = $(inputSelector), filePath = fileInput.val(),
        allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    console.log(filePath);
    if (!allowedExtensions.exec(filePath) && filePath) {
        $(messageSelector).html('* Archivo no válido.');
        $(messageSelector).removeClass('color-success');
        $(messageSelector).addClass('color-danger');
        $(buttonSelector).prop('disabled', true);
    } else {
        $(messageSelector).html('');
        $(messageSelector).removeClass('color-success');
        $(messageSelector).removeClass('color-danger');
        $(buttonSelector).prop('disabled', false);
    }
}

// Validación comentario
$('#box-comment').keyup(function (e) {
    let $commentContainer = $('#box-comment'),
        numChars = $commentContainer.val().length,
        maxChars = $('#max_chars').val(),
        $countContainer = $('.comment-characters-count');

    $countContainer.html(maxChars - numChars);
    $commentContainer.val($commentContainer.val().substring(0, maxChars));
});

$('.commentsForm').submit(function (e) {
    if ($('#box-comment').val().length === 0) {
        e.preventDefault();
    }
});

// Validación campos vacíos
$('#update-user-form').submit(function (e) {
    let $inputEmail = $('#registration_form_email'),
        $inputName = $('#registration_form_name'),
        $inputSurname = $('#registration_form_surname'),
        $inputBirthdate = $('#registration_form_birthdate'),
        resultEmail, resultName, resultSurname, resultBirthdate;

    resultEmail = _checkEmptyField($inputEmail);
    resultName = _checkEmptyField($inputName);
    resultSurname = _checkEmptyField($inputSurname);
    resultBirthdate = _checkEmptyField($inputBirthdate);

    if (
        resultEmail
        || resultName
        || resultSurname
        || resultBirthdate
    ) {
        e.preventDefault();
    }
});

$('#register-user-form').submit(function (e){
    let $inputEmail = $('#registration_form_email'),
        $inputPassword = $('#registration_form_plainPassword'),
        $inputName = $('#registration_form_name'),
        $inputSurname = $('#registration_form_surname'),
        $inputBirthdate = $('#registration_form_birthdate'),
        resultEmail, resultPassword, resultName, resultSurname, resultBirthdate;

    resultEmail = _checkEmptyField($inputEmail);
    resultPassword = _checkEmptyField($inputPassword);
    resultName = _checkEmptyField($inputName);
    resultSurname = _checkEmptyField($inputSurname);
    resultBirthdate = _checkEmptyField($inputBirthdate);

    if (
        resultEmail
        || resultPassword
        || resultName
        || resultSurname
        || resultBirthdate
    ) {
        e.preventDefault();
    }
});

$('#exhibition-form').submit(function (e){
    let $inputName = $('#exhibition_form_name'),
        $inputAuthor = $('#exhibition_form_author'),
        $inputDescription = $('#exhibition_form_description'),
        $inputStartAt = $('#exhibition_form_startAt'),
        $inputRoom = $('#exhibition_form_room'),
        $inputImage = $('#exhibition_form_imageSrc'),
        resultName, resultAuthor, resultDescription, resultStartAt, resultRoom, resultImage;

    resultName = _checkEmptyField($inputName);
    resultAuthor = _checkEmptyField($inputAuthor);
    resultDescription = _checkEmptyField($inputDescription);
    resultStartAt = _checkEmptyField($inputStartAt);
    resultRoom = _checkEmptyField($inputRoom);
    resultImage = _checkEmptyField($inputImage);

    if (
        resultName
        || resultAuthor
        || resultDescription
        || resultStartAt
        || resultRoom
        || resultImage
    ) {
        e.preventDefault();
    }
});

$('#exhibition-form-edit').submit(function (e){
    let $inputName = $('#exhibition_form_name'),
        $inputAuthor = $('#exhibition_form_author'),
        $inputDescription = $('#exhibition_form_description'),
        $inputStartAt = $('#exhibition_form_startAt'),
        $inputRoom = $('#exhibition_form_room'),
        resultName, resultAuthor, resultDescription, resultStartAt, resultRoom;

    resultName = _checkEmptyField($inputName);
    resultAuthor = _checkEmptyField($inputAuthor);
    resultDescription = _checkEmptyField($inputDescription);
    resultStartAt = _checkEmptyField($inputStartAt);
    resultRoom = _checkEmptyField($inputRoom);

    if (
        resultName
        || resultAuthor
        || resultDescription
        || resultStartAt
        || resultRoom
    ) {
        e.preventDefault();
    }
});

$('#piece-form').submit(function (e){
    let $inputName = $('#piece_form_name'),
        $inputAuthor = $('#piece_form_author'),
        $inputDescription = $('#piece_form_description'),
        $inputImage = $('#piece_form_imageSrc'),
        resultName, resultAuthor, resultDescription, resultImage;

    resultName = _checkEmptyField($inputName);
    resultAuthor = _checkEmptyField($inputAuthor);
    resultDescription = _checkEmptyField($inputDescription);
    resultImage = _checkEmptyField($inputImage);

    if (
        resultName
        || resultAuthor
        || resultDescription
        || resultImage
    ) {
        e.preventDefault();
    }
});

$('#piece-form-edit').submit(function (e){
    let $inputName = $('#piece_form_name'),
        $inputAuthor = $('#piece_form_author'),
        $inputDescription = $('#piece_form_description'),
        resultName, resultAuthor, resultDescription;

    resultName = _checkEmptyField($inputName);
    resultAuthor = _checkEmptyField($inputAuthor);
    resultDescription = _checkEmptyField($inputDescription);

    if (
        resultName
        || resultAuthor
        || resultDescription
    ) {
        e.preventDefault();
    }
});

function _checkEmptyField($input) {
    let empty;

    if ($input.val().length === 0) {
        $input.css('border', '3px solid #721c24');
        empty = true;
    } else {
        $input.css('border', '1px solid #222222');
        empty = false;
    }

    return empty;
}