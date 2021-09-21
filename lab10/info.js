var URL = "http://ceclnx01.cec.miamioh.edu/~johnsok9/cse383/ajax/index.php";
var errorCounter = 0;
getLoad();

function getLoad() {
    $("#time").html("");
    $("#time").append(new Date());

    a = $.ajax({
        url: URL + '/vi/api/loadavg',
        method: "GET"
    }).done(function(data) {
        //clear HTML
        $("#onemin").html("");
        $("#fivemin").html("");
        $("#fifteenmin").html("");
        $("#numRunning").html("");
        $("#ttlProc").html("");

        $("#onemin").append(data.loadavg.OneMinAvg);
        $("#fivemin").append(data.loadavg.FiveMinAvg);
        $("#fifteenmin").append(data.loadavg.FifteenMinAvg);
        $("#numRunning").append(data.loadavg.NumRunning);
        $("#ttlProc").append(data.loadavg.TtlProcesses);


    }).fail(function(error) {
        errorCounter++;
        $("#logRun").html(errorCounter);
        console.log("error", error.statusText);
        $("#log").prepend("df error " + new Date() + "<br>");
    });
}