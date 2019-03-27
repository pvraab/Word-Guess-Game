 function myFunction() {
     var canvas = document.getElementById("myCanvas");

     //  Get graphics context
     var ctx = canvas.getContext("2d");

     //  Fill a rectangle
     ctx.fillStyle = "#FF0000";
     ctx.fillRect(0, 0, 150, 75);

     //  Draw a line
     ctx.moveTo(0, 0);
     ctx.lineTo(200, 100);
     ctx.stroke();

     // Build a gallows
     ctx.fillStyle = "#000000";
     ctx.fillRect(0, 0, 10, 200);
     ctx.fillRect(0, 0, 50, 10);
     ctx.fillRect(40, 10, 10, 10);

    //  Put a head on it
     ctx.beginPath();
     ctx.arc(45, 25, 10, 0, 2 * Math.PI);
     ctx.stroke();

    //  Put a body on it
    ctx.moveTo(45, 45);
    ctx.lineTo(45, 75);
    ctx.stroke();

    //  Put a left arm on it
    ctx.moveTo(45, 45);
    ctx.lineTo(55, 55);
    ctx.stroke();

    //  Put a right arm on it
    ctx.moveTo(45, 45);
    ctx.lineTo(55, 55);
    ctx.stroke();

 }

 $(document).ready(function () {

     // Notice I didn't set $(".jumbotron") to a var this time?
     // If you only plan to use that selector once it doesn't need to be a var
     $("#draw-button").on("click", function () {
         myFunction();
         console.log("Here 1");
     });

 });