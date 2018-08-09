$(document).ready(function () {
    $(function ReachSheet() {

        //檢索每次加入文章應更動區索引標籤：>Update

        //onload thing start

        function isMobile() {
            try {
                document.createEvent("TouchEvent");
                return true;
            } catch (e) {
                return false;
            }
        }

        isMobile();//偵測是否為行動裝置

        if (isMobile()) {
            alert("是行動裝置");
            var link = document.createElement("link");
                link.rel = "stylesheet";
                link.type = "text/css";
                link.href = "mobile.css";
        } else {
            alert("是電腦裝置" + screen.width + "*" + screen.height);
            if (screen.width >= 1920) {
                var link = document.createElement("link");
                link.rel = "stylesheet";
                link.type = "text/css";
                link.href = "1920.css";
            } else if (screen.width >= 1600 && screen.width < 1920) {
                var link = document.createElement("link");
                link.rel = "stylesheet";
                link.type = "text/css";
                link.href = "1600x900.css";
                document.getElementsByTagName("head")[0].appendChild(link);
            } else if (screen.width >=1300 && screen.width < 1600) {
                var link = document.createElement("link");
                link.rel = "stylesheet";
                link.type = "text/css";
                link.href = "less1600.css";
                document.getElementsByTagName("head")[0].appendChild(link);
            }

        }

        //onload thing end


        var aLatitude = [];
        var aLongtitude = [];
        var aTitle = [];
        var aIcon = [];
        var aTextdata = [];
        var aType = [];
        var aImg = [];
        var aInfoTitle = [];
        var aInfoContent = [], //每個aInfoContent會儲存每個座標點的每個文章內容
            aInfoContent2 = [], //>Update 新增內文篇數
            aInfoContent3 = [],
            aInfoContent4 = [],
            aInfoContent5 = [],
            aInfoContent6 = [];
        var aContentTitle1 = [], //每個aContentTitle會儲存每個座標點的每個文章標題
            aContentTitle2 = [], //>Update 新增標題篇數
            aContentTitle3 = [],
            aContentTitle4 = [],
            aContentTitle5 = [],
            aContentTitle6 = [];


        var dataAmount = 0;

        //console.log("w");

        //1eUgqe2z8gL1d9GrY2LwpAAxW9Wh2xOKOopqDNcISdpE 學長的試算表
        $.getJSON('https://spreadsheets.google.com/feeds/list/1wNhF8AjCgcqdzftTcBpmtAsfY5HHN6Dw0APrABZqxhA/1/public/values?alt=json', function (dataLog) {
                //console.log("gJson");
                dataAmount = dataLog.feed.entry.length;
                //console.log(dataAmount);
                for (var i = 0; i < dataAmount; i++) {
                    aLatitude[i] = dataLog.feed.entry[i].gsx$lat.$t;
                    aLongtitude[i] = dataLog.feed.entry[i].gsx$long.$t;
                    aTitle[i] = dataLog.feed.entry[i].gsx$tit.$t;
                    aIcon[i] = dataLog.feed.entry[i].gsx$ico.$t;
                    aTextdata[i] = dataLog.feed.entry[i].gsx$textdata.$t;
                    aType[i] = dataLog.feed.entry[i].gsx$type.$t;
                    aImg[i] = dataLog.feed.entry[i].gsx$infoimage.$t;
                    aInfoTitle[i] = dataLog.feed.entry[i].gsx$infotitle.$t;
                    aInfoContent[i] = dataLog.feed.entry[i].gsx$infocontent.$t;
                    aInfoContent2[i] = dataLog.feed.entry[i].gsx$infocontent2.$t;
                    aInfoContent3[i] = dataLog.feed.entry[i].gsx$infocontent3.$t;
                    aInfoContent4[i] = dataLog.feed.entry[i].gsx$infocontent4.$t;
                    aInfoContent5[i] = dataLog.feed.entry[i].gsx$infocontent5.$t;
                    aInfoContent6[i] = dataLog.feed.entry[i].gsx$infocontent6.$t;
                    aContentTitle1[i] = dataLog.feed.entry[i].gsx$contenttitle1.$t;
                    aContentTitle2[i] = dataLog.feed.entry[i].gsx$contenttitle2.$t;
                    aContentTitle3[i] = dataLog.feed.entry[i].gsx$contenttitle3.$t;
                    aContentTitle4[i] = dataLog.feed.entry[i].gsx$contenttitle4.$t;
                    aContentTitle5[i] = dataLog.feed.entry[i].gsx$contenttitle5.$t;
                    aContentTitle6[i] = dataLog.feed.entry[i].gsx$contenttitle6.$t; //>Update 新增抓取功能
                    // 以上依照指定進行抓試算表裡面的資料

                    CsvToArray(parseFloat(aLatitude[i]), parseFloat(aLongtitude[i]), aTitle[i], aIcon[i], aTextdata[i], aType[i], aImg[i], aInfoTitle[i], aInfoContent[i], aInfoContent2[i], aInfoContent3[i], aInfoContent4[i], aInfoContent5[i], aInfoContent6[i], aContentTitle1[i], aContentTitle2[i], aContentTitle3[i], aContentTitle4[i], aContentTitle5[i], aContentTitle6[i], i); // 抓取資料到CsvToArray函數中 //>Update 新增導入涵式內容

                } //end for
                console.log(GeoData);
                GetItemsFromGeoData(); //這裡進行第一次打點
            } //end function data
        ); //end get JSON
    }); //end function

}); //end ready


var GeoJSONText;
var GeoData = new Array();
var items;
var a = -1;

//>Update 將新增的內容導入涵式
function CsvToArray(Lat, Long, Tit, Ico, Tex, Typ, Img, InfoT, InfoC, InfoC2, InfoC3, InfoC4, InfoC5, InfoC6, ConTit1, ConTit2, ConTit3, ConTit4, ConTit5, ConTit6, I) {
    GeoData[I] = new Array();
    GeoData[I][0] = Lat;
    GeoData[I][1] = Long;
    GeoData[I][2] = Tit; //滑鼠移上顯示字樣
    GeoData[I][3] = Ico; //座標Icon
    GeoData[I][4] = Tex; //info內文
    GeoData[I][5] = Typ; //此座標分類
    GeoData[I][6] = Img; //此座標infoimage
    GeoData[I][7] = InfoT; //此座標的Title
    GeoData[I][8] = InfoC; //此座標的InfoContent
    GeoData[I][9] = InfoC2;
    GeoData[I][10] = InfoC3;
    GeoData[I][11] = InfoC4;
    GeoData[I][12] = InfoC5;
    GeoData[I][13] = InfoC6;
    GeoData[I][14] = ConTit1;
    GeoData[I][15] = ConTit2;
    GeoData[I][16] = ConTit3;
    GeoData[I][17] = ConTit4;
    GeoData[I][18] = ConTit5;
    GeoData[I][19] = ConTit6;
    //>Update 新增內容寫入資料陣列中
} //end CsvToArray 將csv資料傳入陣列中

var markerArray = [];
var markerArrayInnerContent = [];
var INum = 0;
var marker;
var InfoBoxContent;


function InfoBoxContentInput() {

    if (items[6] == "") {
        items[6] = "./TestIcon/noneImg.png"; //判斷若沒有圖片來源則放上暫無圖片的示意圖
    }
    items[4] = items[4].replace(/\n|↵/g, "<br>"); //將CSV中的換行符號轉換成<br>讓其在infobox中也換行
    items[4] = items[4].replace(/\s/g, "\xa0"); //將CSV中的空個符號\s換成no-break space \xa0 讓空格也可在infowindow中正常顯示



    InfoBoxContent = "<div id='InfoWindow'>" + "<img id='MapImage' src='" + items[6] + "'>" + "<h1 id='InfoTitle'>" + items[7] + "</h1>" + "<div id='InfoText'>" + items[4] + "</div>" + "</div>";
    //以上可以將想要的資訊依照格式置入後呈現在網頁中的infobox
}


function GetItemsFromGeoData() {
    for (INum = 0; INum < GeoData.length; INum++) {

        items = GeoData[INum]; //利用一個變數去取得一個陣列，可以將其二維中拉出一維
        //console.log(items);
        var infoWindow = new google.maps.InfoWindow({}); //end infoWindow 新增InfoWindow 到地圖上

        InfoBoxContentInput(); //將讀取到的資料置入InfoBoxContent中，而後使用

        marker = new google.maps.Marker({
            position: {
                lat: items[0], //items[0] 相當於 GeoData[INum][0]
                lng: items[1]
            },
            map: map,
            title: items[2], //增加鼠標碰觸時候顯示文字
            icon: {
                url: items[3], //icon利用url導入路徑在換圖
                scaledSize: new google.maps.Size(50, 50)
            },
            animation: google.maps.Animation.DROP, // 在此加上載入落下動畫
            data: InfoBoxContent, //將文字加入跳出資訊窗 <img src='TestIcon/icon.jpg'>
        }); // end marker


        var IsMarkerOpen;
        marker.addListener('click', function () {
            if (this.getAnimation() == null) {
                this.setAnimation(google.maps.Animation.BOUNCE);
                infoWindow.setContent(this.data); // 將此marker的data輸入進infoWindow的content中
                infoWindow.open(map, this); //打開這個infoWindow，若點擊其他座標會直接開啟並關閉原本開啟的座標
                IsMarkerOpen = true;
                this.setAnimation(null);

                $('#InfoContent').animate({
                    opacity: "0"
                }, "slow");
                $('#InfoContent').animate({
                    opacity: "1"
                }, "slow");

                console.log("IsMarkerOpen:" + IsMarkerOpen);
            }
        }); //end marker.addListener 點擊事件

        $('#menu').click(function () {
            infoWindow.close();
            IsMarkerOpen = false;
        }); // end Click
        markerArrayInnerContent.push([items[7], items[8], items[9], items[10], items[11], items[12], items[13], items[14], items[15], items[16], items[17], items[18], items[19], items[6]]); // items[7] title ,items[8,9,10,11,12,13] Contenttext ,items[14,15,16,17,18,19] ContentTitle, items[6] img 將此INum的參數暫存至陣列之中 //>Update 新增資料陣列進入詳細內容陣列

        markerArray.push(marker); // 將所有剛產生的座標加入一個陣列之中 再引到markerArray中清除
        markerArrayClickAdd(INum); //將當前是排序的數字INum帶入點擊事件涵式中新增事件
        google.maps.event.addListener(marker, "click", function () {});
        MarkerSelect(marker, GeoData[INum][5]); //讀取GeoData[INum][5] 亦即試算表中的type 進涵式判斷
    } // end for


} // end GetItemsFromGeoData 將資料從陣列拿出後並加上marker


function markerArrayClickAdd(NowNum) {
    var InfoSelectNum;
    var InfoCheck = 0;
    var maxNum = 6; //在此更改文章最大數量 //>Update 修改文章篇數最大值
    //console.log(markerArrayInnerContent);
    markerArray[NowNum].addListener('click', function () {
        setTimeout(function () {
            document.getElementById("ContentTitle").innerText = markerArrayInnerContent[NowNum][0];
            document.getElementById("ContentText").innerHTML = markerArrayInnerContent[NowNum][1];
            document.getElementById("ContentText").innerHTML.search("Img:");
            TextReplace(document.getElementById("ContentText"));
            document.getElementById("ContentImg").src = markerArrayInnerContent[NowNum][13]; //>Update 修改圖源陣列數，此圖元陣列數即是在上上一步驟markerArrayInnerContent.push()時的最大陣列數，做此更改時請參考push的陣列0、1、2、3....
            //將相關參數從暫存的參數陣列裡拿出來使用，更新InfoContent的內容

            for (InfoSelectNum = 1; InfoSelectNum <= maxNum; InfoSelectNum++) {
                document.getElementById("InfoSelect" + InfoSelectNum).innerHTML = markerArrayInnerContent[NowNum][InfoSelectNum + maxNum];
            }
            var ChangingContent = false;
            for (var d = 1; d <= maxNum; d++) {
                document.getElementById("InfoSelect" + d).addEventListener('click', function () {
                    if (!ChangingContent) {
                        ChangingContent = true;
                        InfoCheck = this.id.replace("InfoSelect", ""); //將當前被點擊的物件id的非數字字串移除，取得其id編號
                        setTimeout(function () {
                            document.getElementById("ContentText").innerHTML = markerArrayInnerContent[NowNum][InfoCheck]; //帶入涵式即可修改對應的內文
                            TextReplace(document.getElementById("ContentText")); //最後再用TextReplace整理一次內文
                            ChangingContent = false;
                        }, 650); //end Timeout
                    }
                    console.log(InfoCheck);
                }); //end click
            } // end for

        }, 650); //end markerArray[NowNum] click setTimeout



        //加入點擊詳細內容中的標題可以切換文章的功能

    }); //end markerArray.addListener


} // end markerArrayClickAdd

var ClickValue = 0;
var RedDia;
var YBGR;
var Rest;
var YBulb;
var YGBulb;
var RedBulb;
var YGDia;
var Test;

var TestSpan;
var RedDiaSpan;
var YBGRSpan;
var RestSpan;
var YBulbSpan;
var YGBulbSpan;
var RedBulbSpan;
var YGDiaSpan; //span用來製造自定義的checkbox

onload = function () {
    var RedDia_img;
    var YellowCir_img;
    var BlueCir_img;
    var GreenCir_img;
    var RedBulb_img;
    var Rest_img;
    var YellowBulb_img;
    var YGBulb_img;
    var YGDia_img;
    var RedBulb_img2;
    var Test_img;

    RedDia_img = document.createElement("img");
    RedDia_img.src = "TestIcon/RedDiamond.png";
    document.getElementById("Red_Diamond").appendChild(RedDia_img);
    RedDia = document.createElement("input"); //動態生成一個input標籤
    RedDia.type = "checkbox"; // 給予生成的input有checkbox屬性 
    RedDia.checked = true; //預設其是被勾選狀態
    RedDia.addEventListener('click', function () {
        ValueCheck(RedDia.checked);
    }); //end RedDia click 給予checkbox 點擊事件，每次有被點擊呼叫ValueCheck()涵式
    document.getElementById("Red_Diamond").appendChild(RedDia); //將動態生成物件加入至指定區域
    RedDiaSpan = document.createElement("span");
    RedDiaSpan.setAttribute("class", "checkmark");
    document.getElementById("Red_Diamond").appendChild(RedDiaSpan);
    document.getElementById("Red_Diamond").append("\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "鍾延豪文學地景")

    YellowCir_img = document.createElement("img");
    YellowCir_img.src = "TestIcon/YellowCircle.png";
    document.getElementById("YBGR_Group").appendChild(YellowCir_img);
    BlueCir_img = document.createElement("img");
    BlueCir_img.src = "TestIcon/BlueCircle.png";
    document.getElementById("YBGR_Group").appendChild(BlueCir_img);
    GreenCir_img = document.createElement("img");
    GreenCir_img.src = "TestIcon/GreenCircle.png";
    document.getElementById("YBGR_Group").appendChild(GreenCir_img);
    RedBulb_img = document.createElement("img");
    RedBulb_img.src = "TestIcon/RedBulb.png";
    document.getElementById("YBGR_Group").appendChild(RedBulb_img);
    YBGR = document.createElement("input");
    YBGR.type = "checkbox";
    YBGR.checked = true;
    YBGR.addEventListener('click', function () {
        ValueCheck(YBGR.checked);
    }); //end YBGR Click
    document.getElementById("YBGR_Group").appendChild(YBGR);
    YBGRSpan = document.createElement("span");
    YBGRSpan.setAttribute("class", "checkmark");
    document.getElementById("YBGR_Group").appendChild(YBGRSpan);
    document.getElementById("YBGR_Group").append('\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + "鍾肇政文學地景");
    // \xa0 NO-BREAK SPACE


    Rest_img = document.createElement("img");
    Rest_img.src = "TestIcon/Restaurant.png";
    document.getElementById("Restaurant").appendChild(Rest_img);
    Rest = document.createElement("input");
    Rest.type = "checkbox";
    Rest.checked = true;
    Rest.addEventListener('click', function () {
        ValueCheck(Rest.checked);
    }); // end Rest Click
    document.getElementById("Restaurant").appendChild(Rest);
    RestSpan = document.createElement("span");
    RestSpan.setAttribute("class", "checkmark");
    document.getElementById("Restaurant").appendChild(RestSpan);
    document.getElementById("Restaurant").append("\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "鍾肇政愛吃的餐館");


    YellowBulb_img = document.createElement("img");
    YellowBulb_img.src = "TestIcon/YellowBulb.png";
    document.getElementById("Yellow_Bulb").appendChild(YellowBulb_img);
    YBulb = document.createElement("input");
    YBulb.type = "checkbox";
    YBulb.checked = true;
    YBulb.addEventListener('click', function () {
        ValueCheck(YBulb.checked);
    }); // end Rest Click
    document.getElementById("Yellow_Bulb").appendChild(YBulb);
    YBulbSpan = document.createElement("span");
    YBulbSpan.setAttribute("class", "checkmark");
    document.getElementById("Yellow_Bulb").appendChild(YBulbSpan);
    document.getElementById("Yellow_Bulb").append("\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "鍾肇政居住地");



    YGBulb_img = document.createElement("img");
    YGBulb_img.src = "TestIcon/YellowGreenBulb.png";
    document.getElementById("YG_Buld").appendChild(YGBulb_img);
    YGBulb = document.createElement("input");
    YGBulb.type = "checkbox";
    YGBulb.checked = true;
    YGBulb.addEventListener('click', function () {
        ValueCheck(YGBulb.checked);
    }); //end YGBlub Click
    document.getElementById("YG_Buld").appendChild(YGBulb);
    YGBulbSpan = document.createElement("span");
    YGBulbSpan.setAttribute("class", "checkmark");
    document.getElementById("YG_Buld").appendChild(YGBulbSpan);
    document.getElementById("YG_Buld").append("\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "文學館舍及藝文空間");

    RedBulb_img2 = document.createElement("img");
    RedBulb_img2.src = "TestIcon/RedBulb.png";
    document.getElementById("Red_Buld").appendChild(RedBulb_img2);
    RedBulb = document.createElement("input");
    RedBulb.type = "checkbox";
    RedBulb.checked = true;
    RedBulb.addEventListener('click', function () {
        ValueCheck(RedBulb.checked);
    }); //end RedBulb click
    document.getElementById("Red_Buld").appendChild(RedBulb);
    RedBulbSpan = document.createElement("span");
    RedBulbSpan.setAttribute("class", "checkmark");
    document.getElementById("Red_Buld").appendChild(RedBulbSpan);
    document.getElementById("Red_Buld").append("\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "全臺文學館舍");

    YGDia_img = document.createElement("img");
    YGDia_img.src = "TestIcon/YellowGreenDiamond.png";
    document.getElementById("YG_Diamond").appendChild(YGDia_img);
    YGDia = document.createElement("input");
    YGDia.type = "checkbox";
    YGDia.checked = true;
    YGDia.addEventListener('click', function () {
        ValueCheck(YGDia.checked);
    }); //end YGDia Click
    document.getElementById("YG_Diamond").appendChild(YGDia);
    YGDiaSpan = document.createElement("span");
    YGDiaSpan.setAttribute("class", "checkmark");
    document.getElementById("YG_Diamond").appendChild(YGDiaSpan);
    document.getElementById("YG_Diamond").append("\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "馮輝岳及向鴻全文學地景");


} //end onload 動態分類區塊生成用 

function ValueCheck(RedDiaValue) {
    MarkerReset();
    GetItemsFromGeoData();
}



function MarkerSelect(TheMarker, TypeName) {
    /*
        1 鍾延豪文學地景
        2345 鍾肇政文學地景
        6 鍾肇政愛吃的餐館
        7 鍾肇政居住地
        8 文學館舍及藝文空間
        5 全臺文學館舍
        9 馮輝岳及向鴻全文學地景
        
    */
    if (TypeName == "1" && RedDia.checked) {
        TheMarker.setVisible(true);
    } else if (TypeName == "6" && Rest.checked) {
        TheMarker.setVisible(true);
    } else if (TypeName == "2" && YBGR.checked || TypeName == "3" && YBGR.checked || TypeName == "4" && YBGR.checked || TypeName == "5" && YBGR.checked) {
        TheMarker.setVisible(true);
    } else if (TypeName == "7" && YBulb.checked) {
        TheMarker.setVisible(true);
    } else if (TypeName == "8" && YGBulb.checked) {
        TheMarker.setVisible(true);
    } else if (TypeName == "5" && RedBulb.checked) {
        TheMarker.setVisible(true);
    } else if (TypeName == "9" && YGDia.checked) {
        TheMarker.setVisible(true);
    } else {
        TheMarker.setVisible(false);
    } //利用多一欄的編號資料來判斷此座標分類


} // end MarkerSelect 用來判斷甚麼座標分類該顯示

function TextReplace(Content) {
    var start = -1,
        end = -1; // indexOf 出現-1時表示它未找到相關字串

    var reg = new RegExp("ImgStart:", "g"); // 利用RegExp設定讀取"ImgStart:"為目標
    var result = Content.innerHTML.match(reg); //將字串導入去.match(reg)
    var count = (result) ? result.length : 0; //將讀取到的次數存取

    console.log("Count:" + count);



    Content.innerHTML = Content.innerHTML.replace(/\n|↵/g, "<br>");
    Content.innerHTML = Content.innerHTML.replace(/\s/g, "\xa0"); //先將特殊字元取代

    for (var ImgNum = 0; ImgNum < count; ImgNum++) {
        console.log(Content.innerHTML.indexOf("ImgStart:"));
        start = Content.innerHTML.indexOf("ImgStart:") + 9;
        console.log(Content.innerHTML.indexOf(":ImgEnd"));
        end = Content.innerHTML.indexOf(":ImgEnd"); //再抓取語法的字元位置

        if (start != -1 && end != -1) {
            var MyImgSrc = Content.innerHTML.substring(start, end); //利用substring來存取所需字串
            console.log(MyImgSrc);

            var MyImgAllPart = Content.innerHTML.substring(start - 9, end + 7); //再次利用substring加上微調去抓取整個語法加圖片來源的字串
            console.log(MyImgAllPart);

            var MyImg = "<img src='" + MyImgSrc + "'>"; //將圖片來源放入格式中存取
            console.log(MyImg);

            Content.innerHTML = Content.innerHTML.replace(MyImgAllPart, MyImg); //將剛剛所存的完整語法加圖片來源的字串取代成固定格式的字串
        }
    } // end for 依照"ImgStart:"被讀取的數量 來執行等次數的圖片置換動作



    return Content;
} // end TextReplace 整理字串用

function MarkerReset() {

    for (var MRC = 0; MRC < markerArray.length; MRC++) {
        markerArray[MRC].setMap(null);
    }
    markerArray.length = 0;

} // end MarkerReset 將marker存入array後 利用for將其清空
