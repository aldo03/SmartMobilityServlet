var map;
var infowindow;
var currentNodeRect;
const BIN_LAT = 0.00009;      //in radians
const BIN_LNG = 0.00012;      //in radians
var firstNode = false;
var requestedPathsInfo = new Set();
var rectMap = {};
var usersPaths = {};
var currentPaths = {};
var rectCells = new Set();
var currentNodeCell;
var currentNodeNeighbors = {};
var infrastructureMap = {};
var currentPath = new Set();
var previousInPath;
var url;
var firstUserNode;
var secondUserNode;
var userNodesCount = 0;
var userCount = 1;
var userIds = {};
const startLat = 41.902222;
const startLong = 12.471334;
const centerLat = 41.8983265;
const centerLong = 12.4762447;

/* OLD: const startLat = 41.9060459968911;
const startLong = 12.458882331848145;*/


function myMap() {
    var mapProp= {
        center:new google.maps.LatLng(centerLat,centerLong),
        zoom:15
    };
    infowindow = new google.maps.InfoWindow();
    map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

    google.maps.event.addListener(map, 'click', function(event) {
        alert("Cell: "+getCellFromAbsCoordinates(event.latLng.lat(), event.latLng.lng()));
        //alert("Cell: "+event.latLng.lat()+","+event.latLng.lng());
    });
    drawGridOverMap(startLat,startLong, 10, 100, 100);
    start();
}

function drawGridOverMap (startingPointLat, startingPointLong, step, width, height) {
    var NE;
    var SW;
    //var NW=new google.maps.LatLng(startingPointLat,startingPointLong);
    //var NS = google.maps.geometry.spherical.computeOffset(NW,step,90);
   // var SS = google.maps.geometry.spherical.computeOffset(NW,step,180);
    for (var i = 0; i < height; i++) {
        //NE = google.maps.geometry.spherical.computeOffset(NS,i*step,180);
        //SW = google.maps.geometry.spherical.computeOffset(SS,i*step,180);
        for (var a = 0; a < width; a++) {
            NE = new google.maps.LatLng(startingPointLat-i*BIN_LAT, startingPointLong+BIN_LNG+BIN_LNG*a);
            SW = new google.maps.LatLng(startingPointLat-BIN_LAT-i*BIN_LAT, startingPointLong+BIN_LNG*a);
            /*if(i==18 && a==29){
                var info = new google.maps.InfoWindow();
                info.setContent("Supermarket");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==57 && a==76){
                var info = new google.maps.InfoWindow();
                info.setContent("Supermarket");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==29 && a==59){
                var info = new google.maps.InfoWindow();
                info.setContent("School");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==60 && a==13){
                var info = new google.maps.InfoWindow();
                info.setContent("School");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==69 && a==49){
                var info = new google.maps.InfoWindow();
                info.setContent("Activity");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==49 && a==56){
                var info = new google.maps.InfoWindow();
                info.setContent("Activity");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==23 && a==29){
                var info = new google.maps.InfoWindow();
                info.setContent("Activity");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==34 && a==61){
                var info = new google.maps.InfoWindow();
                info.setContent("Activity");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==69 && a==42){
                var info = new google.maps.InfoWindow();
                info.setContent("Hair Dresser");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==18 && a==69){
                var info = new google.maps.InfoWindow();
                info.setContent("Hair Dresser");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==65 && a==74){
                var info = new google.maps.InfoWindow();
                info.setContent("Hair Dresser");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==49 && a==49){
                var info = new google.maps.InfoWindow();
                info.setContent("Beauty Salon");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==4 && a==56){
                var info = new google.maps.InfoWindow();
                info.setContent("Beauty Salon");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==81 && a==43){
                var info = new google.maps.InfoWindow();
                info.setContent("Beauty Salon");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==6 && a==82){
                var info = new google.maps.InfoWindow();
                info.setContent("Outlet");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==88 && a==16){
                var info = new google.maps.InfoWindow();
                info.setContent("Outlet");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==77 && a==84){
                var info = new google.maps.InfoWindow();
                info.setContent("University");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==31 && a==48){
                var info = new google.maps.InfoWindow();
                info.setContent("University");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==56 && a==11){
                var info = new google.maps.InfoWindow();
                info.setContent("Pub");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==65 && a==37){
                var info = new google.maps.InfoWindow();
                info.setContent("Pub");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==87 && a==50){
                var info = new google.maps.InfoWindow();
                info.setContent("Pub");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==60 && a==63){
                var info = new google.maps.InfoWindow();
                info.setContent("Gym");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==35 && a==42){
                var info = new google.maps.InfoWindow();
                info.setContent("Gym");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==33 && a==68){
                var info = new google.maps.InfoWindow();
                info.setContent("Disco");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==98 && a==16){
                var info = new google.maps.InfoWindow();
                info.setContent("Disco");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==12 && a==33){
                var info = new google.maps.InfoWindow();
                info.setContent("Office");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==11 && a==74){
                var info = new google.maps.InfoWindow();
                info.setContent("Office");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==34 && a==16){
                var info = new google.maps.InfoWindow();
                info.setContent("Office");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==34 && a==61){
                var info = new google.maps.InfoWindow();
                info.setContent("Office");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==58 && a==27){
                var info = new google.maps.InfoWindow();
                info.setContent("Office");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==40 && a==93){
                var info = new google.maps.InfoWindow();
                info.setContent("Office");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==35 && a==32){
                var info = new google.maps.InfoWindow();
                info.setContent("Restaurant");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==54 && a==35){
                var info = new google.maps.InfoWindow();
                info.setContent("Restaurant");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==27 && a==61){
                var info = new google.maps.InfoWindow();
                info.setContent("Restaurant");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==7 && a==40){
                var info = new google.maps.InfoWindow();
                info.setContent("Cinema");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==88 && a==72){
                var info = new google.maps.InfoWindow();
                info.setContent("Cinema");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==93 && a==11){
                var info = new google.maps.InfoWindow();
                info.setContent("Football Stadium");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==3 && a==3){
                var info = new google.maps.InfoWindow();
                info.setContent("Church");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==35 && a==49){
                var info = new google.maps.InfoWindow();
                info.setContent("Post Office");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==3 && a==7){
                var info = new google.maps.InfoWindow();
                info.setContent("Park");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==22 && a==93){
                var info = new google.maps.InfoWindow();
                info.setContent("Park");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==70 && a==15){
                var info = new google.maps.InfoWindow();
                info.setContent("Park");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==25 && a==4){
                var info = new google.maps.InfoWindow();
                info.setContent("Doctor");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==38 && a==78){
                var info = new google.maps.InfoWindow();
                info.setContent("Doctor");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==52 && a==94){
                var info = new google.maps.InfoWindow();
                info.setContent("Cafè");
                info.setPosition(NE);
                info.open(map);
            }
            if(i==5 && a==25){
                var info = new google.maps.InfoWindow();
                info.setContent("Cafè");
                info.setPosition(NE);
                info.open(map);
            }*/
            var rectangle = new google.maps.Rectangle();
            var rectOptions = {
                strokeColor: "#000000",
                //strokeOpacity: 0.8,
                strokeWeight: 0.2,
                //fillColor: cols[Math.floor(Math.random()*cols.length)],
                fillOpacity: 0,
                map: map,
                bounds: new google.maps.LatLngBounds(SW,NE)
            };
            rectangle.setOptions(rectOptions);
            rectMap[getCellFromTopLeftCoordinates(rectOptions.bounds.f.b, rectOptions.bounds.b.b)] =  rectangle;
            rectCells.add(getCellFromTopLeftCoordinates(rectOptions.bounds.f.b, rectOptions.bounds.b.b));
            addListenerToRectangle(rectangle);
            //var SW = google.maps.geometry.spherical.computeOffset(SW,step,90);
            //var NE = google.maps.geometry.spherical.computeOffset(NE,step,90);
        }
    }
}

function addListenerToRectangle(rectangle){
    google.maps.event.addListener(rectangle, 'click', function(event) {
        var nodeCell = getCellFromTopLeftCoordinates(rectangle.bounds.f.b, rectangle.bounds.b.b);
        /*infowindow.setContent("You clicked on cell "+nodeCell);
        infowindow.setPosition(event.latLng);
        infowindow.open(map);*/
        //console.log(rectangle);
       // console.log("CELL CENTER COORDINATES: " + (rectangle.bounds.f.b - BIN_LAT / 2) + "," + (rectangle.bounds.b.b + BIN_LNG / 2));
        var SW = new google.maps.LatLng(rectangle.bounds.f.f, rectangle.bounds.b.b);
        var NE = new google.maps.LatLng(rectangle.bounds.f.b, rectangle.bounds.b.f);
        if (document.getElementById("setup").checked == true){
            if (!firstNode) {
                drawRect(rectangle, "#FF00FF");
                currentNodeRect = rectangle;
                currentNodeCell = nodeCell;
                firstNode = true;
        } else {
                drawRect(rectangle, "#00FF00");
                currentNodeNeighbors[getCellFromTopLeftCoordinates(rectangle.bounds.f.b, rectangle.bounds.b.b)] = getCoordinatesInBetween(currentNodeRect.bounds.f.b, currentNodeRect.bounds.b.b, rectangle.bounds.f.b, rectangle.bounds.b.b, "#FFF000");
            }
        } else if (document.getElementById("sbf").checked == true) {

            //console.log(currentPath);
            if(currentPath.size>0){
                //console.log("LENGTH");
                getCoordinatesInBetween(previousInPath.bounds.f.b, previousInPath.bounds.b.b, rectangle.bounds.f.b, rectangle.bounds.b.b, "#FF7E10");
            }
            drawRect(rectangle, "#09FFA9");
            previousInPath = rectangle;
            currentPath.add(rectangle);
        } else if (document.getElementById("info").checked == true){
            infowindow.setContent("You clicked on cell "+nodeCell);
            infowindow.setPosition(event.latLng);
            infowindow.open(map);
        } else if (document.getElementById("user").checked == true){
        	if(userNodesCount == 0){
        		firstUserNode = getCellFromTopLeftCoordinates(rectangle.bounds.f.b, rectangle.bounds.b.b);
        		userNodesCount++;
        	} else {
        		secondUserNode = getCellFromTopLeftCoordinates(rectangle.bounds.f.b, rectangle.bounds.b.b);
        		sendUserCreationRequest();
        		userNodesCount = 0;
        	}
        }
    });
}

function sendUserCreationRequest(){
	var user = document.getElementById("userId").value;
	var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:8000";
    xhr.open("POST", url, true);
    //xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () { 
        var str = xhr.responseText;
    };
    var data = JSON.stringify({"msgid": "createuser", "usrid": user, "firstnode": firstUserNode, "secondnode": secondUserNode});
    xhr.send(data);
}

function sendFilter(){
    var s = "";
    var prec;

    var iterator = currentPath.values();
    for (var i = 0; i < currentPath.size; i++) {
        var rect = iterator.next().value;
        if(prec!=undefined) {
            var betCoord = getCoordinatesInBetween(prec.bounds.f.b, prec.bounds.b.b, rect.bounds.f.b, rect.bounds.b.b, "#FF7E10");
            var iterator2 = betCoord.values();
            for (var j = 0; j < betCoord.size; j++) {
                var cell = iterator2.next().value;
                s+=cell;
                if(j+1<betCoord.size){
                    s+=",";
                }
            }
        }
        if(i>0){
            s+="/";
        }
        s+=getCellFromTopLeftCoordinates(rect.bounds.f.b, rect.bounds.b.b);
        if(i+1<currentPath.size){
            s+=",";
        }
        prec = rect;
    }
    console.log(s);
    var user = document.getElementById("rec").value;
    var starttime = document.getElementById("start").value;
    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:8000";
    xhr.open("POST", url, true);
    //xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        var str = xhr.responseText;
    };
    var data = JSON.stringify({"msgid": "sendsbf", "usrid": user, "condensedpath": s, "starttime": starttime});
    xhr.send(data);
    currentPath = new Set();
}

function getCellFromTopLeftCoordinates(lat, long) {
    var latBin = -Math.round((lat-startLat) / BIN_LAT);
    var lngBin = Math.round((long-startLong) / BIN_LNG);
    return latBin + "-" + lngBin;
}

function getCellFromAbsCoordinates(lat, long) {
    var latBin = -Math.round((lat+BIN_LAT/2-startLat) / BIN_LAT);
    var lngBin = Math.round((long-BIN_LNG/2-startLong) / BIN_LNG);
    return latBin + "-" + lngBin;
}

function getCoordinatesInBetween(lat1, long1, lat2, long2, color){
    var set = new Set();
    var dist = getDistanceFromLatLonInM(lat1, long1, lat2, long2);
    var numOfCoordinates = Math.round(dist/3);
    var minLong;
    var maxLong;
    var minLat;
    var maxLat;
    var startLat;
    var startLong;
    var revLat = 1;
    var revLong = 1;
    if(long2>long1){
        minLong = long1;
        maxLong = long2;
    }else {
        minLong = long2;
        maxLong = long1;
    }
    if(lat2>lat1){
        minLat = lat1;
        maxLat = lat2;
        if(long2>long1){
            startLat = minLat;
            startLong = minLong;
        } else {
            startLat = minLat;
            startLong = maxLong;
            revLong = -1;
        }
    }else {
        minLat = lat2;
        maxLat = lat1;
        if(long2>long1){
            startLat = maxLat;
            startLong = minLong;
            revLat = -1;
        } else {
            startLat = maxLat;
            startLong = maxLong;
            revLat = -1;
            revLong = -1;
        }
    }
    var stepLat = (maxLat-minLat)/numOfCoordinates*revLat;
    var stepLong = (maxLong-minLong)/numOfCoordinates*revLong;
    for(var i = 1; i < numOfCoordinates; i++){
        var lat = startLat + stepLat*i;
        var long = startLong + stepLong*i;
        var rect = rectMap[getCellFromTopLeftCoordinates(lat, long)];
        if(rect!=undefined&&rect!=currentNodeRect&&rect!=rectMap[getCellFromTopLeftCoordinates(lat2, long2)]&&rect!=rectMap[getCellFromTopLeftCoordinates(lat1, long1)]){
            var SW = new google.maps.LatLng(rect.bounds.f.f, rect.bounds.b.b);
            var NE = new google.maps.LatLng(rect.bounds.f.b, rect.bounds.b.f);
            drawRect(rect, color);
            set.add(getCellFromTopLeftCoordinates(lat, long));
        }
    }
    return set;
}

function toRad(num){
    return num * Math.PI / 180;
}

function getDistanceFromLatLonInM(lat1,lon1,lat2,lon2) {
    var R = 6371000; // Radius of the earth in m
    var dLat = toRad(lat2-lat1);  // deg2rad below
    var dLon = toRad(lon2-lon1);
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in m
    return d;
}


function drawPath(){
    var filter = document.getElementById("filter").value;
    clearGrid();
    drawInfrastructureMap();
    var day = parseInt(document.getElementById("day").value);
    var starthour = parseInt(document.getElementById("starthour").value);
    var endhour = parseInt(document.getElementById("endhour").value);
    //console.log(requestedPathsInfo);
    if(document.getElementById("timefilter").checked){
        if(document.getElementById("category").checked){
            drawRequestedPathForCategoryWithTimeFilter(filter, day,  starthour, endhour);
        }else{
            drawRequestedPathForIdWithTimeFilter(filter, day,  starthour, endhour);
        }
    } else {
        if(document.getElementById("category").checked){
            drawRequestedPathForCategory(filter);
        }else{
            drawRequestedPathForId(filter);
        }
    }
}


function drawChosenPath(path){
    var roads = path.split("/");
    //console.log(roads);
    for(var i = 0; i<roads.length; i++){
        var cells = roads[i].split(",");
        for(var j = 0; j<cells.length; j++){
            //console.log(cells[j]);
            if(j==0){
                drawRect(rectMap[cells[j]], "#8F0000");
            }else{
                drawRect(rectMap[cells[j]], "#000FFF");
            }
        }
    }
}

function deleteChosenPath(path){
	var roads = path.split("/");
    //console.log(roads);
    for(var i = 0; i<roads.length; i++){
        var cells = roads[i].split(",");
        for(var j = 0; j<cells.length; j++){
            //console.log(cells[j]);
            if(j==0){
                drawRect(rectMap[cells[j]], "#3F3F3F");
            }else{
                drawRect(rectMap[cells[j]], "#7D7C82");
            }
        }
    }
}


function undo(){
    if(document.getElementById("setup").checked == true) {
        if (firstNode) {
            removeRect(currentNodeRect);
            for (var neighbor in currentNodeNeighbors) {
                var set = currentNodeNeighbors[neighbor];
                var iterator = set.values();
                for (var i = 0; i < set.size; i++) {
                    var cell = iterator.next().value;
                    removeRect(rectMap[cell]);
                }
                removeRect(rectMap[neighbor]);
            }
            currentNodeNeighbors = {};
            firstNode = false;
            drawInfrastructureMap();
        }
    } else {
        clearGrid();
        currentPath = new Set();
        requestedPathsInfo = new Set();
        drawInfrastructureMap();
    }
}

function clearGrid(){
    var iterator = rectCells.values();
    for (var i = 0; i < rectCells.size; i++) {
        var cell = iterator.next().value;
        removeRect(rectMap[cell]);
    }
}

function removeRect(rectangle){
    var SW = new google.maps.LatLng(rectangle.bounds.f.f, rectangle.bounds.b.b);
    var NE = new google.maps.LatLng(rectangle.bounds.f.b, rectangle.bounds.b.f);
    var rectOptions = {
        strokeColor: "#000000",
        //strokeOpacity: 0.8,
        strokeWeight: 0.2,
        //fillColor: cols[Math.floor(Math.random()*cols.length)],
        fillOpacity: 0,
        map: map,
        bounds: new google.maps.LatLngBounds(SW,NE)
    };
    rectangle.setOptions(rectOptions);
}

function drawRect(rectangle, color){
    var SW = new google.maps.LatLng(rectangle.bounds.f.f, rectangle.bounds.b.b);
    var NE = new google.maps.LatLng(rectangle.bounds.f.b, rectangle.bounds.b.f);
    var rectOptions;
    console.log(rectangle.strokeColor);
    console.log(color);
    console.log("\n");
    if(color=="#00B807"){
        rectOptions = {
                strokeColor: color,
                // strokeOpacity: 0.8,
                strokeWeight: 0.2,
                fillColor: color,
                fillOpacity: 0.9,
                map: map,
                bounds: new google.maps.LatLngBounds(SW, NE)
            };
            rectangle.setOptions(rectOptions);
        }
     else if(rectangle.fillColor=="#EC00FF" && color=="#FF7E10") {
    }else if(rectangle.fillColor=="#B20CFF" && color=="#09FFA9") {
    }
    else{
        rectOptions = {
            strokeColor: color,
            // strokeOpacity: 0.8,
            strokeWeight: 0.5,
            fillColor: color,
            fillOpacity: 0.5,
            map: map,
            bounds: new google.maps.LatLngBounds(SW, NE)
        };
        rectangle.setOptions(rectOptions);
    }
}

function save(){
    firstNode = false;
    infrastructureMap[currentNodeCell] = currentNodeNeighbors;
    drawInfrastructureMap();
    currentNodeNeighbors = {};
}

function printInfrastructureMap(){
    for(var node in infrastructureMap){
        console.log("Node: " + node);
        var neighbors = infrastructureMap[node];
        for(var neighbor in neighbors){
            console.log("Neighbor: " + neighbor);
            var set = neighbors[neighbor];
            var iterator =set.values();
            console.log("Cells in between: ");
            for(var i = 0; i < set.size; i++){
                var cell = iterator.next().value;
                console.log(cell);
            }
        }
    }
}

function drawInfrastructureMap(){
    for(var node in infrastructureMap){
        var neighbors = infrastructureMap[node];
        for(var neighbor in neighbors){
            drawRect(rectMap[neighbor], "#00FF00");
            var set = neighbors[neighbor];
            var iterator =set.values();
            for(var i = 0; i < set.size; i++){
                var cell = iterator.next().value;
                drawRect(rectMap[cell], "#FFF000");
            }
        }
    }
    for(var node in infrastructureMap) {
        drawRect(rectMap[node], "#FF00FF");
    }
}

function downloadInfrastructureData(){
    var infData = "";
    for(var node in infrastructureMap){
        infData += "I: "+node+"\n";
        var neighbors = infrastructureMap[node];
        for(var neighbor in neighbors){
            infData += "N: "+neighbor+"\n";
            var set = neighbors[neighbor];
            var iterator =set.values();
            for(var i = 0; i < set.size; i++){
                var cell = iterator.next().value;
                infData += "B: "+cell+"\n";
            }
        }
    }
    downloadData("infdata", infData);
}

function downloadSimdata(){
	downloadData("simdata", JSON.stringify([...requestedPathsInfo]));
}

function downloadData(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}


var loadData = function(event) {
    removeAllData();
    currentNodeNeighbors = {};
    currentNodeCell = "";
    infrastructureMap = {};
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
        var text = reader.result;
        var tempNeighbor;
        var betSet = new Set();
        //console.log(text);
        var lines = text.split("\n");
       // console.log(lines);
        for(var i = 0; i < lines.length; i++){
            var line = lines[i];
            var node = line.substring(3, line.length);
            //console.log(node);
            if(line.startsWith("I")) {
                if(i!=0){
                    infrastructureMap[currentNodeCell] = currentNodeNeighbors;
                    currentNodeNeighbors = {};
                }
                currentNodeCell = node;
            }
            else if(line.startsWith("N")) {
                if(betSet.size>0){
                    currentNodeNeighbors[tempNeighbor] = betSet;
                    //console.log(tempNeighbor);
                    //console.log(betSet);
                }
                tempNeighbor = node;
                betSet = new Set();
            }
            else if(line.startsWith("B")) {
                betSet.add(node);
            }
        }
        infrastructureMap[currentNodeCell] = currentNodeNeighbors;
        drawInfrastructureMap();
        //printInfrastructureMap();
    };
    reader.readAsText(input.files[0]);
};

var loadSimData = function(event) {
	clearGrid();
    drawInfrastructureMap();
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
        var text = reader.result;
        //console.log(text);
        requestedPathsInfo = new Set(JSON.parse(text));
        //console.log(requestedPathsInfo);
        drawRequestedPathForCategory("");
    };
    reader.readAsText(input.files[0]);
};

function removeAllData(){
    for(var node in infrastructureMap){
        removeRect(rectMap[node]);
        var neighbors = infrastructureMap[node];
        for(var neighbor in neighbors){
            removeRect(rectMap[neighbor]);
            var set = neighbors[neighbor];
            var iterator =set.values();
            for(var i = 0; i < set.size; i++){
                var cell = iterator.next().value;
                removeRect(rectMap[cell]);
            }
        }
    }
}

function start() {
    var eventSource = new EventSource("http://localhost:8080/BBCASServlet/ASServlet");
    eventSource.onmessage = function (event) {
        var obj = JSON.parse(event.data);
        if(obj.path!=undefined){
        	//console.log(obj.path);
        	if(!checkPreviousPath(obj.usertypology)){
        		document.getElementById('logPanel').innerHTML = "Best Path received for user "+obj.usertypology;
        		userIds[obj.usertypology] = userCount;
        		userCount++;
        	} else {
        		document.getElementById('logPanel').innerHTML = "Positive SBF checks for user "+obj.usertypology+". New best path is shown";
        	}
            drawRequestedPath(obj.path, userIds[obj.usertypology]);
            requestedPathsInfo.add(obj);
            currentPaths[obj.usertypology] = obj.path;
        } else if(obj.msgid=="filtercheck"){
        	drawPositiveChecks(obj.positivechecks);
        } else if(obj.msgid=="cellreached"){
        	if(usersPaths[obj.usrid]!=undefined){
        		drawRect(rectMap[usersPaths[obj.usrid]], "#000A7C");
        	}
        	usersPaths[obj.usrid] = obj.cellid;
        	drawRect(rectMap[obj.cellid], "#FF0000");
        }
    };
}

function checkPreviousPath(userid){
	if(currentPaths[userid]!=undefined){
		deleteChosenPath(currentPaths[userid]);
		usersPaths[userid] = undefined;
		return true;
	}
	return false;
}

function drawPositiveChecks(checks){
    var cells = checks.split("/");
    for(var i = 0; i < cells.length; i++){
        drawRect(rectMap[cells[i]], "#00B807");
    }
}

function drawRequestedPath(path, colorGroup){
    var roads = path.split("/");
    var colors = getColorsFromColorGroup(colorGroup);
    var firstColor = colors["first"];
    var secondColor = colors["second"];
    //console.log(roads);
    for(var i = 0; i<roads.length; i++){
        var cells = roads[i].split(",");
        for(var j = 0; j<cells.length; j++){
            //console.log(cells[j]);
            if(j==0){
                drawRect(rectMap[cells[j]], firstColor);
            }else{
                drawRect(rectMap[cells[j]], secondColor);
            }
        }
    }
}

function getColorsFromColorGroup(colorGroup){
	if(colorGroup%3 == 1){
		return {"first":"#8F0000", "second":"#000FFF"};
	}
	if(colorGroup%3 == 2){
		return {"first":"#50400F", "second":"#009200"};
	}
	if(colorGroup%3 == 0){
		return {"first":"#416382", "second":"#7C005B"};
	}
}

function drawRectProg(rectangle, color) {
	if(rectangle!=undefined){
		var SW = new google.maps.LatLng(rectangle.bounds.f.f, rectangle.bounds.b.b);
		var NE = new google.maps.LatLng(rectangle.bounds.f.b, rectangle.bounds.b.f);
		var rectOptions;
		// console.log(rectangle.strokeColor);
		// console.log(color);
		var opacity = rectangle.fillOpacity+0.008;
		rectOptions = {
				strokeColor: color,
				// strokeOpacity: 0.8,
				strokeWeight: 0.5,
				fillColor: color,
				fillOpacity: opacity,
				map: map,
				bounds: new google.maps.LatLngBounds(SW, NE)
		}
		rectangle.setOptions(rectOptions);
	}
}

function drawRequestedPathForCategory(cat){
    //console.log(cat);
    var iterator =requestedPathsInfo.values();
    for(var i = 0; i < requestedPathsInfo.size; i++) {
        var info = iterator.next().value;
        if(info.usertypology.includes(cat)){
            drawRequestedPath(info.path);
        }
    }
}

function drawRequestedPathForId(id){
    //console.log(id);
    var iterator =requestedPathsInfo.values();
    for(var i = 0; i < requestedPathsInfo.size; i++) {
        var info = iterator.next().value;
        if(info.usertypology==id){
            drawRequestedPath(info.path);
        }
    }
}

function drawRequestedPathForCategoryWithTimeFilter(cat, d, sh, eh){
    //console.log(cat);
    var iterator =requestedPathsInfo.values();
    for(var i = 0; i < requestedPathsInfo.size; i++) {
        var info = iterator.next().value;
        if(info.usertypology.includes(cat)){
            var timeday = info.timeday;
            var dh = timeday.split(":");
            var day = dh[0];
            var hour = dh[1];
            if(day==d && hour>=sh && hour<eh){
                drawRequestedPath(info.path);
            }
        }
    }
}

function drawRequestedPathForIdWithTimeFilter(id, d, sh, eh){
    //console.log(id);
    var iterator =requestedPathsInfo.values();
    for(var i = 0; i < requestedPathsInfo.size; i++) {
        var info = iterator.next().value;
        if(info.usertypology == id){
            var timeday = info.timeday;
            var dh = timeday.split(":");
            var day = dh[0];
            var hour = dh[1];
            if(day==d && hour>=sh && hour<eh){
                drawRequestedPath(info.path);
            }
        }
    }
}

