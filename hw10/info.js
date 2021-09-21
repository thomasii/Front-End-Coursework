var URL = "http://ceclnx01.cec.miamioh.edu/~johnsok9/cse383/ajax/index.php";
var errorCounter = 0;
getLoad();
getUsers();
getData();
setDate();
callBackData();



function setDate() {
    $("#time").prepend(new Date());

}

function callBackData(txOld, rxOld, txAvg, rxAvg) {
    a = $.ajax({
        url: URL + '/vi/api/network',
        method: "GET"
    }).done(function(data) {
        var txThen = data.network.txbytes;
        var rxThen = data.network.rxbytes;
        var txDiff = (parseInt(txThen) - parseInt(txOld)) + 1;
        var rxDiff = (parseInt(rxThen) - parseInt(rxOld)) + 1;
        var txNewAvg;
        var rxNewAvg;
        if (txDiff == 0 || rxDiff == 0) {
            txNewAvg = txDiff;
            rxNewAvg = rxDiff;
        } else {
            txNewAvg = parseInt(parseInt(txDiff) + parseInt(txAvg) / 2);
            rxNewAvg = parseInt(parseInt(rxDiff) + parseInt(rxAvg) / 2);

        }
        //clear data
        $("#txavg").html(txNewAvg);
        $("#rxavg").html(rxNewAvg);
        setTimeout(function() {
            callBackData(txThen, rxThen, txNewAvg, rxNewAvg);
        }, 1000);


    }).fail(function(error) {
        errorCounter++;
        $("#logRun").html(errorCounter);
        console.log("error", error.statusText);
        $("#log").prepend("df error " + new Date() + "<br>");
        setTimeout(function() {
            callBackData(txOld, rxOld, txAvg, rxAvg);
        }, 1000);

    });


}


function getData() {


    a = $.ajax({
        url: URL + '/vi/api/network',
        method: "GET"
    }).done(function(data) {
        txNow = data.network.txbytes;
        rxNow = data.network.rxbytes;
        $("#txbytes").append(txNow);
        $("#rxbytes").append(rxNow);
        setTimeout(function() {
            callBackData(parseInt(txNow), parseInt(rxNow), 0, 0);
        }, 1000);


    }).fail(function(error) {
        console.log("error", error.statusText);
    });


}


function getUsers() {
    a = $.ajax({
        url: URL + '/vi/api/who',
        method: "GET"
    }).done(function(data) {
        // clear data
        var whoLength = data.who.length;
        for (i = 0; i < whoLength; i++) {
            $("table").first().append("<tr><th>" + data.who[i].uid + "<\/th><th>" + data.who[i].ip + "<\/th><\/tr>");

        }
    }).fail(function(error) {
        errorCounter++;
        $("#logRun").html(errorCounter);
        console.log("error", error.statusText);
        $("#log").prepend("df error " + new Date() + "<br>");
    });


}

function getLoad() {


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