let $ImgTop = document.querySelector('.imgtop');
let $SearchMenu = document.querySelector('.SearchMenu');

let PhoneMenu = false;
$ImgTop.addEventListener('click', function() {
    if (PhoneMenu == true) {
        $ImgTop.style.backgroundImage = "url('../work/img/Menu.png')";
        $SearchMenu.style.top = "-1500px";
    }
    if (PhoneMenu == false) {
        $ImgTop.style.backgroundImage = "url('../work/img/MenuW.png')";
        $SearchMenu.style.top = "100px";
    }
    PhoneMenu = !PhoneMenu;
});
/*////////////////////////////////////////////////////////// для додавання*/
var $ButtonAdd = document.querySelector('.ButtonAdd');
var $ApplyAddB = document.querySelector('.ApplyAddB');
var $CanselAddB = document.querySelector('.CanselAddB');
let $BuildAddFon = document.querySelector('.BuildAddFon');
/*//////////////////////////////////////////////////////////*/
const $BuildAddAdressInput = document.querySelector('.BuildAddAdressInput');
const $BuildAddTypeList = document.querySelector('.BuildAddTypeList');
const $BInfoInput = document.querySelector('.BInfoInput');
const $OnwInfoInput = document.querySelector('.OnwInfoInput');
const $BDateInput = document.querySelector('.BDateInput');
const $RentEndDataInput = document.querySelector('.RentEndDataInput');
const $RuleInput = document.querySelector('.RuleInput');
const $CoustInput = document.querySelector('.CoustInput');

let $InfoSpace = document.querySelector('.InfoSpace');
/*////////////////////////////////////////////////////////// пароль*/
let $PasswordFon = document.querySelector('.PasswordFon');
const $PassText = document.querySelector('.PassText');
var $PassBIN = document.querySelector('.PassBIN');
var $PassBClose = document.querySelector('.PassBClose');
/*////////////////////////////////////////////////////////// для видалення*/
var $ButtonDel = document.querySelector('.ButtonDel');
var $CanselDelete = document.querySelector('.CanselDelete');
var $DeleteDelete = document.querySelector('.DeleteDelete');
let $DeleteFon = document.querySelector('.DeleteFon');
/*//////////////////////////////////////////////////// Редагування*/

/*//////////////////////////////////////////////////// виведення*/
let builds = null;
/* пошук*/
const $SearchText = document.querySelector('.SearchText');
let ActiveWindow = 'none'

/*//////////////////////////////
///////////////////////////////*/
function qGetInfo() {
    fetch("http://localhost:8080/back?info")
        .then(function(responce) {
            return responce.json();
        })
        .then(function(data) {
            builds = data.list;
            getInfo(builds);
        });
};

function getInfo(list) {
    let temp = '';
    if (list.length) {
        for (let i = 0; i < list.length; i++) {
            temp += '<div class="BDPlate" data-index="' + list[i].bncode + '"><h1 class="BDPinfolineName">Build Adress</h1><div class="BDPinfoline">' + list[i].location + '</div><h1 class="BDPinfolineName">Build type</h1 ><div class = "BDPinfoline">' + list[i].typeB + '</div><h1 class="BDPinfolineName"> Build Information </h1> <div class = "BDPinfoline">' + list[i].infoB + '</div><h1 class = "BDPinfolineName">Owner Information</h1><div class = "BDPinfoline">' + list[i].infoOwn + '</div><h1 class = "BDPinfolineName"> Rent Data </h1><div class = "BDPinfoline">' + list[i].rentDataS + '</div><h1 class = "BDPinfolineName"> Rent End Data </h1><div class = "BDPinfoline">' + list[i].rentDataF + '</div><h1 class = "BDPinfolineName"> Rule </h1><div class="BDPinfoline">' + list[i].rules + '</div><h1 class = "BDPinfolineName"> Coust </h1><div class = "BDPinfoline">' + list[i].money + ' $';
        }
    }
    $InfoSpace.innerHTML = temp;
}
qGetInfo();

/*//////////////////////////////////////////////////// */
let $SCoust = document.querySelector('.SCoust');

function summer() {
    var checkBox = document.getElementById("SummerCHB");
    var text = document.getElementById("SummerText");

    if (checkBox.checked == true) {
        $SCoust.style.opacity = "1";
        $SCoust.style.visibility = "visible";
    } else {
        $SCoust.style.opacity = "0";
        $SCoust.style.visibility = "hidden";
    }
};
/*//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////*/

//пошук за головним словом
$SearchText.addEventListener('input', function() {
    let query = this.value.toString().toLowerCase();
    let filterdB = builds.filter(function(el) {
        return ~el.location.toString().toLowerCase().indexOf(query);
    });
    getInfo(filterdB);
});

/*консоль админ пароля*/

function ControllerConsole() {
    if (ActiveWindow == 'AddConsole') {
        ClosePassConsole();
        CloseEditConsole();
        CloseDelConsole();
        OpenAddConsole();
    }
    if (ActiveWindow == 'DelConsole') {
        ClosePassConsole();
        CloseAddConsole();
        CloseEditConsole();
        OpenDelConsole();
    }
    if (ActiveWindow == 'EditConsole') {}
};

function OpenPassConsole() {
    $PasswordFon.style.opacity = "1";
    $PasswordFon.style.visibility = "visible";
    console.log("OpenPassConsole");
    console.log(ActiveWindow);
};

function ClosePassConsole() {
    $PasswordFon.style.opacity = "0";
    $PasswordFon.style.visibility = "hidden";
    console.log("ClosePassConsole");
    console.log(ActiveWindow);
};
/*принять пароль*/
$PassBIN.addEventListener("click", function() {
    PassAccept();
    ClosePassConsole();
    $PassText.value = ''
});
/*відмінити пароль*/
$PassBClose.addEventListener("click", function() {
    ActiveWindow = 'none'
    $PassText.value = ''
    ClosePassConsole();
});
/*перевірка пароля*/
function PassAccept() {
    let SPass = $PassText.value;
    fetch("http://localhost:8080/back?security", {
        method: 'POST',
        body: SPass,
    }).then(response =>
        response.json().then(data => ({
            data: data,
            status: response.status
        })).then(res => {
            if (JSON.stringify(res.data) == 'true') {
                alert('Accepted');
                ControllerConsole();
            } else {
                ActiveWindow = 'none'
                alert('Access denied');
            }
        }));
}
/*Відкриття/закриття/підтвердження консолі додавання*/
function OpenAddConsole() {
    $BuildAddFon.style.opacity = "1";
    $BuildAddFon.style.visibility = "visible";
    console.log(ActiveWindow);

};

function CloseAddConsole() {
    $BuildAddFon.style.opacity = "0";
    $BuildAddFon.style.visibility = "hidden";
};
/**/
$ButtonAdd.addEventListener("click", function() {
    ActiveWindow = 'AddConsole'
    OpenPassConsole();
});
$CanselAddB.addEventListener("click", function() {
    ActiveWindow = 'none'
    CloseAddConsole();
});
$ApplyAddB.addEventListener("click", function() {
    ActiveWindow = 'none'
    CloseAddConsole();
    addingControll();
});

function clearadd() {
    $BuildAddAdressInput.value = ''
    $BuildAddTypeList.value = ''
    $BInfoInput.value = ''
    $OnwInfoInput.value = ''
    $BDateInput.value = "2022-02-24"
    $RentEndDataInput.value = "2022-02-24"
    $RuleInput.value = ''
    $CoustInput.value = '';
}
/*Відкриття/закриття/підтвердження консолі видалення*/
function CloseDelConsole() {
    $DeleteFon.style.opacity = "0";
    $DeleteFon.style.visibility = "hidden";
}

function OpenDelConsole() {
    $DeleteFon.style.opacity = "1";
    $DeleteFon.style.visibility = "visible";
    console.log(ActiveWindow);
}
/**/
$ButtonDel.addEventListener("click", function() {
    ActiveWindow = 'DelConsole'
    OpenPassConsole();
});

$CanselDelete.addEventListener("click", function() {
    CloseDelConsole();
});
/*Додавання нового елементу*/
function addingControll() {
    voidLine();
    if (isCorrect) {
        adding();
    } else {
        alert('Error_B');
        clearadd();
    }
}

function adding() {
    NewBuild = {
        location: $BuildAddAdressInput.value,
        typeB: $BuildAddTypeList.value,
        infoB: $BInfoInput.value,
        infoOwn: $OnwInfoInput.value,
        rentDataS: $BDateInput.value,
        rentDataF: $RentEndDataInput.value,
        rules: $RuleInput.value,
        money: $CoustInput.value,
        bncode: builds.length
    }
    fetch("http://localhost:8080/back?AddBuild", {
        method: 'POST',
        body: JSON.stringify(NewBuild),
    }).then(response =>
        response.json().then(data => ({
            data: data,
            status: response.status
        })).then(res => {
            if (JSON.stringify(res.data) == 'added') {
                console.log(JSON.stringify(res.data))
                qGetInfo()
            }
        }));
}


function voidLine() {
    isCorrect = true;
    if (($BuildAddAdressInput.value == ' ')) {
        isCorrect = false;
    }
    if (($BuildAddTypeList.value == ' ')) {
        isCorrect = false;
    }
    if (($BInfoInput.value == ' ')) {
        isCorrect = false;
    }
    if (($OnwInfoInput.value == ' ')) {
        isCorrect = false;
    }
    if (($BDateInput.value == '')) {
        isCorrect = false;
    }
    if (($RentEndDataInput.value == ' ')) {
        isCorrect = false;
    }
    if (($RuleInput.value == ' ')) {
        isCorrect = false;
    }
    if (($CoustInput.value == '')) {
        isCorrect = false;
    }
    return isCorrect;
}
/*видалення елементу за фільтром типу*/

let $DeleteTypeList = document.querySelector('.DeleteTypeList')

function deletion() {
    let DeleteByType = $DeleteTypeList.value
    fetch("http://localhost:8080/back?DELBYTYP", {
        method: 'POST',
        body: DeleteByType,
    }).then(response =>
        response.json().then(data => ({
            data: data,
            status: response.status
        })).then(res => {
            if (JSON.stringify(res.data) == 'true') {
                alert('Deleted');
                CloseDelConsole();
                qGetInfo();
            }
        }))
}

$DeleteDelete.addEventListener('click', function() {

    deletion();
})



/*Редагування*/
let $EBuildAdressInput = document.querySelector('.EBuildAdressInput');
let $EBuildTypeList = document.querySelector('.EBuildTypeList');
let $EBInfoInput = document.querySelector('.EBInfoInput');
let $EOnwInfoInput = document.querySelector('.EOnwInfoInput');
let $BEDateInput = document.querySelector('.BEDateInput');
let $ERentEndDataInput = document.querySelector('.ERentEndDataInput');
let $ERuleInput = document.querySelector('.ERuleInput');
let $ECoustInput = document.querySelector('.ECoustInput');

function clearEdit() {
    $EBuildAdressInput.value = ''
    $EBuildTypeList.value = ''
    $EBInfoInput.value = ''
    $EOnwInfoInput.value = ''
    $BEDateInput.value = "2022-02-24"
    $ERentEndDataInput.value = "2022-02-24"
    $ERuleInput.value = ''
    $ECoustInput.value = '';
}
/*///////////////*/

let EditBN;
$InfoSpace.addEventListener('dblclick', function(e) {
    console.log('+');
    OpenEditConsole()
    if (e.target.classList.contains('BDPlate')) {
        EditBN = e.target.getAttribute('data-index');
        $EBuildAdressInput.value = builds[EditBN].location;
        $EBuildTypeList.value = builds[EditBN].typeB;
        $EBInfoInput.value = builds[EditBN].infoB;
        $EOnwInfoInput.value = builds[EditBN].infoOwn;
        $BEDateInput.value = builds[EditBN].rentDataS;
        $ERentEndDataInput.value = builds[EditBN].rentDataF;
        $ERuleInput.value = builds[EditBN].rules;
        $ECoustInput.value = builds[EditBN].money;
    }
});

function voidEditLine() {
    isCorrect = true;
    if (($EBuildAdressInput.value == ' ')) {
        isCorrect = false;
    }
    if (($EBuildTypeList.value == ' ')) {
        isCorrect = false;
    }
    if (($EBInfoInput.value == ' ')) {
        isCorrect = false;
    }
    if (($EOnwInfoInput.value == ' ')) {
        isCorrect = false;
    }
    if (($BEDateInput.value == '')) {
        isCorrect = false;
    }
    if (($ERentEndDataInput.value == ' ')) {
        isCorrect = false;
    }
    if (($ERuleInput.value == ' ')) {
        isCorrect = false;
    }
    if (($ECoustInput.value == '')) {
        isCorrect = false;
    }
    return isCorrect;
}

/*////////////////////////////*/
//Підтвердження редагування
function Editting() {
    if (voidEditLine()) {
        EditBuild = {
            location: $EBuildAdressInput.value,
            typeB: $EBuildTypeList.value,
            infoB: $EBInfoInput.value,
            infoOwn: $EOnwInfoInput.value,
            rentDataS: $BEDateInput.value,
            rentDataF: $ERentEndDataInput.value,
            rules: $ERuleInput.value,
            money: $ECoustInput.value,
            bncode: builds[EditBN].bncode
        }
        fetch("http://localhost:8080/back?EditBuildBack", {
            method: 'POST',
            body: JSON.stringify(EditBuild),
        }).then(response =>
            response.json().then(data => ({
                data: data,
                status: response.status
            })).then(res => {
                if (JSON.stringify(res.data) == 'Edited') {
                    alert("Edited!")
                    qGetInfo()
                } else {
                    alert("Try again")
                }
            }));
        CloseEditConsole();
        alert('Successful!');
    } else {
        alert('Incorrect data!');
    }
    clearEdit();
};
/*////////////////////////////////*/

var $CanselEB = document.querySelector('.CanselEB');
var $ApplyEB = document.querySelector('.ApplyEB');
let $BuildEditFon = document.querySelector('.BuildEditFon');

$CanselEB.addEventListener("click", function() {
    CloseEditConsole();
    clearEdit();
});
$ApplyEB.addEventListener("click", function() {
    Editting();
    CloseEditConsole();
});

function OpenEditConsole() {
    $BuildEditFon.style.opacity = "1";
    $BuildEditFon.style.visibility = "visible";
    ActiveWindow = 'EditConsole'
    console.log(ActiveWindow);
};

function CloseEditConsole() {
    $BuildEditFon.style.opacity = "0";
    $BuildEditFon.style.visibility = "hidden";
};
/**/