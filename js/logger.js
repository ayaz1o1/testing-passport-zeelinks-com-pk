/*==================================================
  Zee Links AI Photo Studio
  File: logger.js
  Version: v1.0.0
==================================================*/

"use strict";

/*==================================================
LOGGER MODULE
==================================================*/

const Logger = (() => {

    const MAX_LOGS = 100;

    let logs = [];



    /*==============================================
    INITIALIZE
    ==============================================*/

    function init(){

        write(

            "Logger initialized successfully.",

            "success"

        );

    }



    /*==============================================
    WRITE LOG
    ==============================================*/

    function write(

        message,

        type = "info"

    ){

        const time =

            getCurrentTime();

        const entry = {

            time,

            message,

            type

        };

        logs.push(

            entry

        );



        if(

            logs.length > MAX_LOGS

        ){

            logs.shift();

        }



        render();

    }
        /*==============================================
    RENDER LOGS
    ==============================================*/

    function render(){

        const container =

            document.getElementById(

                "activityConsole"

            );



        if(!container){

            return;

        }



        container.innerHTML = "";



        logs.forEach(log=>{

            const item =

                document.createElement(

                    "div"

                );



            item.className =

                "log-item " +

                log.type;



            item.innerHTML =

                "<span class='log-time'>[" +

                log.time +

                "]</span> " +

                getIcon(log.type) +

                " " +

                log.message;



            container.appendChild(

                item

            );

        });



        container.scrollTop =

            container.scrollHeight;

    }



    /*==============================================
    CLEAR LOGS
    ==============================================*/

    function clear(){

        logs = [];

        render();

    }



    /*==============================================
    GET ICON
    ==============================================*/

    function getIcon(type){

        switch(type){

            case "success":

                return "✅";

            case "warning":

                return "⚠️";

            case "error":

                return "❌";

            default:

                return "ℹ️";

        }

    }
        /*==============================================
    GET CURRENT TIME
    ==============================================*/

    function getCurrentTime(){

        const now =

            new Date();

        return now.toLocaleTimeString();

    }



    /*==============================================
    GET LOGS
    ==============================================*/

    function getLogs(){

        return logs;

    }



    /*==============================================
    PUBLIC API
    ==============================================*/

    return{

        init,

        write,

        clear,

        getLogs

    };

})();



/*==================================================
INITIALIZE LOGGER
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        Logger.init();



        const clearButton =

            document.getElementById(

                "clearLogs"

            );



        if(clearButton){

            clearButton.addEventListener(

                "click",

                Logger.clear

            );

        }

    }

);

