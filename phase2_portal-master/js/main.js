$(".control0").click(function(){
    $("#btn0").fadeOut(1000,function(){

        $("#btn1").fadeIn(1000);
        $("#comp1").fadeIn(1000);
    });

    $("#comp0").fadeOut(1000);
})

$(".control1").click(function(){
    $(".container-contact100").fadeOut(1000,function(){
        $(".portal").fadeIn(1000);
    });
});
//disable buttons when one of them is clicked
$(".tech").click(function() {
    $(".manage").addClass("disabled");
    $(".design").addClass("disabled");
})

$(".manage").click(function() {
    $(".tech").addClass("disabled");
    $(".design").addClass("disabled");
})

$(".design").click(function() {
    $(".manage").addClass("disabled");
    $(".tech").addClass("disabled");
})
