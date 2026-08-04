/*==================================================
  Zee Links AI Photo Studio
  File: preview.js
  Version: v2.0.0
==================================================*/

"use strict";

/*==================================================
PREVIEW MODULE
==================================================*/

const PreviewModule = (() => {

    /*==============================================
    VARIABLES
    ==============================================*/

    let currentImage = null;

    let currentFile = null;

    /*==============================================
    SHOW IMAGE
    ==============================================*/

    function showImage(

        imageData,

        file

    ){

        currentImage = imageData;

        currentFile = file;

        updatePreview(

            imageData

        );

        updateInformation(

            file

        );

        updateSummary();

        enableGenerateButton();

    }

    /*==============================================
    UPDATE PREVIEW
    ==============================================*/

    function updatePreview(

        imageData

    ){

        const previewImage =

            document.getElementById(

                "previewImage"

            );

        if(

            !previewImage

        ){

            return;

        }

        previewImage.src = imageData;

    }

    /*==============================================
    UPDATE INFORMATION
    ==============================================*/

    function updateInformation(

        file

    ){

        const status =

            document.getElementById(

                "photoStatus"

            );

        const fileSize =

            document.getElementById(

                "photoSize"

            );

        const resolution =

            document.getElementById(

                "photoResolution"

            );

        if(status){

            status.textContent =

                "Photo Loaded";

        }

        if(fileSize){

            fileSize.textContent =

                formatFileSize(

                    file.size

                );

        }

        calculateResolution(

            currentImage,

            resolution

        );

    }
    
        /*==============================================
    CALCULATE RESOLUTION
    ==============================================*/

    function calculateResolution(

        imageData,

        resolutionElement

    ){

        const image =

            new Image();

        image.onload =

            function(){

                if(

                    resolutionElement

                ){

                    resolutionElement.textContent =

                        image.width +

                        " × " +

                        image.height +

                        " px";

                }

            };

        image.src = imageData;

    }

    /*==============================================
    FORMAT FILE SIZE
    ==============================================*/

    function formatFileSize(

        bytes

    ){

        if(

            bytes < 1024

        ){

            return bytes + " Bytes";

        }

        if(

            bytes < 1024 * 1024

        ){

            return (

                bytes / 1024

            ).toFixed(

                1

            ) + " KB";

        }

        return (

            bytes /

            (1024 * 1024)

        ).toFixed(

            2

        ) + " MB";

    }

    /*==============================================
    UPDATE SUMMARY
    ==============================================*/

    function updateSummary(){

        const country =

            document.getElementById(

                "summaryCountry"

            );

        const documentType =

            document.getElementById(

                "summaryDocument"

            );

        const photoSize =

            document.getElementById(

                "summarySize"

            );

        const background =

            document.getElementById(

                "summaryBackground"

            );

        const format =

            document.getElementById(

                "summaryFormat"

            );

        if(country){

            country.textContent =

                document.getElementById(

                    "countrySelect"

                ).value ||

                "--";

        }

        if(documentType){

            documentType.textContent =

                document.getElementById(

                    "documentSelect"

                ).value;

        }

        if(photoSize){

            photoSize.textContent =

                document.getElementById(

                    "photoSizeSelect"

                ).value;

        }

        if(background){

            background.textContent =

                document.getElementById(

                    "backgroundSelect"

                ).value;

        }

        if(format){

            format.textContent =

                document.getElementById(

                    "outputFormat"

                ).value;

        }

    }

    /*==============================================
    ENABLE GENERATE BUTTON
    ==============================================*/

    function enableGenerateButton(){

        const button =

            document.getElementById(

                "generateButton"

            );

        if(

            button

        ){

            button.disabled = false;

        }

    }
    
        /*==============================================
    RESET PREVIEW
    ==============================================*/

    function reset(){

        currentImage = null;

        currentFile = null;

        const previewImage =

            document.getElementById(

                "previewImage"

            );

        const status =

            document.getElementById(

                "photoStatus"

            );

        const resolution =

            document.getElementById(

                "photoResolution"

            );

        const fileSize =

            document.getElementById(

                "photoSize"

            );

        const generateButton =

            document.getElementById(

                "generateButton"

            );

        if(previewImage){

            previewImage.src =

                "assets/images/placeholder-photo.svg";

        }

        if(status){

            status.textContent =

                "Waiting for photo";

        }

        if(resolution){

            resolution.textContent =

                "--";

        }

        if(fileSize){

            fileSize.textContent =

                "--";

        }

        if(generateButton){

            generateButton.disabled = true;

        }

    }

    /*==============================================
    GET CURRENT IMAGE
    ==============================================*/

    function getImage(){

        return currentImage;

    }

    /*==============================================
    GET CURRENT FILE
    ==============================================*/

    function getFile(){

        return currentFile;

    }

    /*==============================================
    PUBLIC API
    ==============================================*/

    return{

        showImage,

        reset,

        getImage,

        getFile

    };

})();

/*==================================================
MAKE MODULE GLOBAL
==================================================*/

window.PreviewModule = PreviewModule;

