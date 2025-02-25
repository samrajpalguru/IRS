//var uri = "https://localhost:8035/miscan/"; //Secure
var uri = "http://localhost:8035/miscan/"; //Non-Secure
//var uri = "http://rd.mxface.ai:8035/miscan/";


function GetMIScanInfo() {
    return PostMIScanClient("info", "", 0);
}

function CaptureIris(timeout) {
    var MIScanRequest = {
        "TimeOut": timeout
    };
    var jsondata = JSON.stringify(MIScanRequest);
    return PostMIScanClient("capture", jsondata);
}

function GetImage(imgformat) {
    var MIScanRequest = {
        "ImgFormat": imgformat
    };
    var jsondata = JSON.stringify(MIScanRequest);
    return PostMIScanClient("getimage", jsondata);
}
function MatchIris(timeout, GalleryFMR, imgformat) {
    var MIScanRequest = {
        "TimeOut": timeout,
        "GalleryTemplate": GalleryFMR,
        "ImgFormat": imgformat,
        "BioType": "FMR" // you can paas here BioType as "ANSI" if you are using ANSI Template
    };
    var jsondata = JSON.stringify(MIScanRequest);
    return PostMIScanClient("match", jsondata);
}

function VerifyIris(ProbFMR, GalleryFMR, imgformat) {
    var MIScanRequest = {
        "ProbTemplate": ProbFMR,
        "GalleryTemplate": GalleryFMR,
        "TmpFormat": imgformat,
        "BioType": "FMR" // you can paas here BioType as "ANSI" if you are using ANSI Template
    };
    var jsondata = JSON.stringify(MIScanRequest);
    return PostMIScanClient("verify", jsondata);
}

function UnInit() {
    return PostMIScanClient("uninit", "", 0);
}


function PostMIScanClient(method, jsonData, isBodyAvailable) {
    var res;
    if (isBodyAvailable == 0) {
        $.support.cors = true;
        var httpStaus = false;
        $.ajax({
            type: "POST",
            async: false,
            crossDomain: true,
            url: uri + method,
            contentType: "application/json; charset=utf-8",
            //data: jsonData,
            dataType: "json",
            processData: false,
            success: function (data) {
                httpStaus = true;
                res = { httpStaus: httpStaus, data: data };
            },
            error: function (jqXHR, ajaxOptions, thrownError) {
                res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
            },
        });
    }
    else {
        $.support.cors = true;
        var httpStaus = false;
        $.ajax({
            type: "POST",
            async: false,
            crossDomain: true,
            url: uri + method,
            contentType: "application/json; charset=utf-8",
            data: jsonData,
            dataType: "json",
            processData: false,
            success: function (data) {
                httpStaus = true;
                res = { httpStaus: httpStaus, data: data };
            },
            error: function (jqXHR, ajaxOptions, thrownError) {
                res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
            },
        });
    }
    return res;
}
function GetMIScanClient(method) {
    var res;
    $.support.cors = true;
    var httpStaus = false;
    $.ajax({
        type: "GET",
        async: false,
        crossDomain: true,
        url: uri + method,
        contentType: "application/json; charset=utf-8",
        processData: false,
        success: function (data) {
            httpStaus = true;
            res = { httpStaus: httpStaus, data: data };
        },
        error: function (jqXHR, ajaxOptions, thrownError) {
            res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
        },
    });
    return res;
}
function getHttpError(jqXHR) {
    var err = "Unhandled Exception";
    if (jqXHR.status === 0) {
        err = 'Service Unavailable';
    } else if (jqXHR.status == 404) {
        err = 'Requested page not found';
    } else if (jqXHR.status == 500) {
        err = 'Internal Server Error';
    } else if (thrownError === 'parsererror') {
        err = 'Requested JSON parse failed';
    } else if (thrownError === 'timeout') {
        err = 'Time out error';
    } else if (thrownError === 'abort') {
        err = 'Ajax request aborted';
    } else {
        err = 'Unhandled Error';
    }
    return err;
}


/////////// Classes

function Biometric(BioType, BiometricData, Pos, Nfiq, Na) {
    this.BioType = BioType;
    this.BiometricData = BiometricData;
    this.Pos = Pos;
    this.Nfiq = Nfiq;
    this.Na = Na;
}

function MIScanRequest(BiometricArray) {
    this.Biometrics = BiometricArray;
}