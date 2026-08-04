/*==================================================
  Zee Links AI Photo Studio
  File: app.js
  Version: v1.0.0
==================================================*/

"use strict";

/*==================================================
APPLICATION MODULE
==================================================*/

const App = (() => {

    let initialized = false;



    /*==============================================
    INITIALIZE APPLICATION
    ==============================================*/

    function init(){

        if(initialized){

            return;

        }

        initialized = true;

        initializeModules();

        registerEvents();

        Logger.write(

            "Application initialized.",

            "success"

        );

    }



    /*==============================================
    INITIALIZE MODULES
    ==============================================*/

    function initializeModules(){

        if(

            window.Logger &&

            typeof Logger.init === "function"

        ){

            Logger.init();

        }



        if(

            window.UploadModule &&

            typeof UploadModule.init === "function"

        ){

            UploadModule.init();

        }



        Logger.write(

            "Modules loaded successfully.",

            "info"

        );

    }



    /*==============================================
    REGISTER EVENTS
    ==============================================*/

    function registerEvents(){

        const generateButton =

            document.getElementById(

                "generateButton"

            );



        if(generateButton){

            generateButton.addEventListener(

                "click",

                generatePassport

            );

        }



        const newPhotoButton =

            document.getElementById(

                "newPhotoButton"

            );



        if(newPhotoButton){

            newPhotoButton.addEventListener(

                "click",

                resetApplication

            );

        }

    }
    
        /*==============================================
    GENERATE PASSPORT PHOTO
    ==============================================*/

    function generatePassport(){

        if(

            !UploadModule.getImage()

        ){

            Logger.write(

                "Please upload a photo first.",

                "warning"

            );

            alert(

                "Please upload a photo first."

            );

            return;

        }



        Logger.write(

            "Starting passport photo generation...",

            "info"

        );



        const loadingOverlay =

            document.getElementById(

                "loadingOverlay"

            );



        if(loadingOverlay){

            loadingOverlay.classList.add(

                "show"

            );

        }



        setTimeout(

            ()=>{

                completeGeneration();

            },

            2000

        );

    }



    /*==============================================
    COMPLETE GENERATION
    ==============================================*/

    function completeGeneration(){

        const loadingOverlay =

            document.getElementById(

                "loadingOverlay"

            );



        if(loadingOverlay){

            loadingOverlay.classList.remove(

                "show"

            );

        }



        const image =

            UploadModule.getImage();



        document.getElementById(

            "passportPreview"

        ).src = image;



        document.getElementById(

            "passportStatus"

        ).textContent =

            "Completed";



        document.getElementById(

            "sheetStatus"

        ).textContent =

            "Ready";



        document.getElementById(

            "downloadPassport"

        ).disabled = false;



        document.getElementById(

            "downloadSheet"

        ).disabled = false;



        document.getElementById(

            "downloadAllButton"

        ).disabled = false;



        document.getElementById(

            "printButton"

        ).disabled = false;



        Logger.write(

            "Passport photo generated successfully.",

            "success"

        );

    }



    /*==============================================
    RESET APPLICATION
    ==============================================*/

    function resetApplication(){

        UploadModule.reset();



        PreviewModule.reset();



        document.getElementById(

            "passportPreview"

        ).src =

        "assets/images/placeholder-photo.svg";



        document.getElementById(

            "sheetPreview"

        ).src =

        "assets/images/a4-placeholder.svg";



        document.getElementById(

            "passportStatus"

        ).textContent =

        "Waiting";



        document.getElementById(

            "sheetStatus"

        ).textContent =

        "Waiting";



        document.getElementById(

            "downloadPassport"

        ).disabled = true;



        document.getElementById(

            "downloadSheet"

        ).disabled = true;



        document.getElementById(

            "downloadAllButton"

        ).disabled = true;



        document.getElementById(

            "printButton"

        ).disabled = true;



        Logger.write(

            "Application reset successfully.",

            "info"

        );

    }
    
        /*==============================================
    APPLICATION STATUS
    ==============================================*/

    function isInitialized(){

        return initialized;

    }



    /*==============================================
    WRITE LOG
    ==============================================*/

    function log(

        message,

        type = "info"

    ){

        if(

            window.Logger &&

            typeof Logger.write === "function"

        ){

            Logger.write(

                message,

                type

            );

        }

    }



    /*==============================================
    PUBLIC API
    ==============================================*/

    return{

        init,

        log,

        isInitialized,

        resetApplication,

        generatePassport

    };

})();



/*==================================================
START APPLICATION
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        if(

            window.App &&

            typeof App.init === "function"

        ){

            App.init();

        }

    }

);
