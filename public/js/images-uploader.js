+ function ($) {
    'use strict';

    // UPLOAD CLASS DEFINITION
    // ======================

    var dropZone = document.getElementById('drop-zone');
    var uploadForm = document.getElementById('js-upload-form');
    var fileInput = $("#js-upload-files");

    var selectedFiles = [];

    var startUpload = function () {
        var formData = new FormData();
        var length = selectedFiles.length;
        for (var i = 0; i < length; i++) {
            formData.append("images", selectedFiles[i]);
        }
        // $.post('images/upload', formData,function(data){
        //         console.log(data);
        //     }
        // );
        $.ajax('/images/upload', {
            method: 'POST',
            contentType: false,
            processData: false,
            data: formData,
            success: function(data,ts){
                window.location.href='/images/'+data.relativePath;
            },
            error: function(xhr,error){
                console.log(xhr.responseText);
            }
        });
    }
    var listSelectedFiles = function () {
        $("#fileList").empty();
        for (var i = 0; i < selectedFiles.length; i++) {
            $("#fileList").append("<li class='list-group-item'>" + selectedFiles[i].name + "</li>");
        }
    }
    fileInput.change(function () {
        selectedFiles = this.files;
        listSelectedFiles();
    });
    uploadForm.addEventListener('submit', function (e) {
        e.preventDefault();
        startUpload();
    });

    dropZone.ondrop = function (e) {
        e.preventDefault();
        this.className = 'upload-drop-zone';
        selectedFiles = e.dataTransfer.files;
        listSelectedFiles();
    }

    dropZone.ondragover = function () {
        this.className = 'upload-drop-zone drop';
        return false;
    }

    dropZone.ondragleave = function () {
        this.className = 'upload-drop-zone';
        return false;
    }

}(jQuery);