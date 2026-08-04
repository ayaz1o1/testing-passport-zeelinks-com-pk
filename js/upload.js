/*==================================================
  Zee Links AI Photo Studio
  File: upload.js
  Version: v1.0.0
==================================================*/

"use strict";

/*==================================================
UPLOAD MODULE
==================================================*/

const UploadModule = (() => {

    let selectedFile = null;

    let selectedImage = null;

    const allowedTypes = [

        "image/jpeg",

        "image/png",

        "image/webp"

    ];

    const maxFileSize = 10 * 1024 * 1024;



    /*==============================================
    INITIALIZE
    ==============================================*/

    function init(){

        const fileInput =

            document.getElementById(
                "photoInput"
            );

        const browseButton =

            document.getElementById(
                "browseButton"
            );

        const heroButton =

            document.getElementById(
                "uploadHeroButton"
            );

        const dropZone =

            document.getElementById(
                "dropZone"
            );



        if(browseButton){

/*            browseButton.addEventListener(

                "click",

                () => fileInput.click()

            );*/
  browseButton.addEventListener(

    "click",

    () => {

        alert("Browse button clicked");

        fileInput.click();

    }

);         

        }



        if(heroButton){

            heroButton.addEventListener(

                "click",

                () => fileInput.click()

            );

        }



        if(fileInput){

            fileInput.addEventListener(

                "change",

                handleFileSelect

            );

        }



        if(dropZone){

            registerDragEvents(

                dropZone

            );

        }

    }



    /*==============================================
    FILE SELECT
    ==============================================*/

    function handleFileSelect(event){

        const file =

            event.target.files[0];

        if(file){

            processFile(file);

        }

    }



    /*==============================================
    PROCESS FILE
    ==============================================*/

    function processFile(file){

        if(

            !validateFile(file)

        ){

            return;

        }

        selectedFile = file;

        readImage(file);

    }
        /*==============================================
    VALIDATE FILE
    ==============================================*/

    function validateFile(file){

        if(

            !allowedTypes.includes(

                file.type

            )

        ){

            alert(

                "Please select a JPG, PNG or WEBP image."

            );

            return false;

        }



        if(

            file.size > maxFileSize

        ){

            alert(

                "Maximum allowed file size is 10 MB."

            );

            return false;

        }



        return true;

    }



    /*==============================================
    REGISTER DRAG EVENTS
    ==============================================*/

    function registerDragEvents(

        dropZone

    ){

        [

            "dragenter",

            "dragover"

        ].forEach(eventName=>{

            dropZone.addEventListener(

                eventName,

                event=>{

                    event.preventDefault();

                    dropZone.classList.add(

                        "drag-active"

                    );

                }

            );

        });



        [

            "dragleave",

            "dragend"

        ].forEach(eventName=>{

            dropZone.addEventListener(

                eventName,

                ()=>{

                    dropZone.classList.remove(

                        "drag-active"

                    );

                }

            );

        });



        dropZone.addEventListener(

            "drop",

            event=>{

                event.preventDefault();

                dropZone.classList.remove(

                    "drag-active"

                );



                const file =

                    event.dataTransfer.files[0];



                if(file){

                    processFile(file);

                }

            }

        );

    }



    /*==============================================
    READ IMAGE
    ==============================================*/

    function readImage(file){

        const reader =

            new FileReader();



        reader.onload =

            function(event){

                selectedImage =

                    event.target.result;



                /*if(

                    window.PreviewModule &&

                    typeof PreviewModule.showImage === "function"

                ){

                    PreviewModule.showImage(

                        selectedImage,

                        file

                    );

                } */
                
                
                
                
               alert("FileReader success");

console.log("PreviewModule =", window.PreviewModule);

if(

    window.PreviewModule &&

    typeof PreviewModule.showImage === "function"

){

    alert("Calling PreviewModule");

    PreviewModule.showImage(

        selectedImage,

        file

    );

}
else{

    alert("PreviewModule NOT FOUND");

}
                
                
                

            };



        reader.onerror =

            function(){

                alert(

                    "Unable to read the selected image."

                );

            };



        reader.readAsDataURL(

            file

        );

    }
    
        /*==============================================
    GET SELECTED IMAGE
    ==============================================*/

    function getImage(){

        return selectedImage;

    }



    /*==============================================
    GET SELECTED FILE
    ==============================================*/

    function getFile(){

        return selectedFile;

    }



    /*==============================================
    RESET
    ==============================================*/

    function reset(){

        selectedFile = null;

        selectedImage = null;

        const fileInput =

            document.getElementById(

                "photoInput"

            );

        if(fileInput){

            fileInput.value = "";

        }

    }



    /*==============================================
    PUBLIC API
    ==============================================*/

    return{

        init,

        reset,

        getImage,

        getFile,

        processFile

    };

})();



/*==================================================
INITIALIZE
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        UploadModule.init();

    }

);

