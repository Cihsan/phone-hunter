
const searchButton = () => {
    const searchBar = document.getElementById('searchBar')
    const searchText = searchBar.value
    searchBar.value = ''

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => allphone(data.data))
}

const allphone = phones => {
    const displayPhone = phones.slice(0, 20)
    const searchResult = document.getElementById('searchResult')
    searchResult.textContent = ''
    const error = document.getElementById('error')
    /* error handle */
    if (!phones || phones === 0 || phones == null || phones === undefined || phones == []) {
        error.style.display = 'block'
        console.log('if')
    }
    else {
        displayPhone.forEach(phone => {
            const div = document.createElement('div')
            div.className = 'card align-items-center p-3'
            div.innerHTML = `
        <div class="text-center">
            <img  src="${phone.image}">
            <h4>${phone.phone_name}</h4>
            <p>${phone.brand}</p>
            <button  class="btn btn-dark" onclick="infoButton('${phone.slug}')">Details</button>
        </div>
        `
            searchResult.appendChild(div)
            error.style.display = 'none'
            //console.log(phone.phone_name)
            console.log('ele')
        });
    }
}

const infoButton = info => {
    const url = `https://openapi.programming-hero.com/api/phone/${info}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayInfo(data.data))
}

const displayInfo = display => {
    const buttonInfo = document.getElementById('buttonInfo')
    buttonInfo.textContent = ''
    console.log(display)
    const div = document.createElement('div')
    div.innerHTML = `
        <div class="d-flex flex-row justify-content-around align-items-center m-3">
        <div class='w-25'>
            <img  src="${display.image}">
            <h4>${display.name}</h4>
            <p >${display.brand}</p>
            <h6>${display.releaseDate ? display.releaseDate : 'Not Found Release Date'}</h6>
        </div>
        <div class='w-25 m-3'>
            <h3>All Features</h3>
            <h6>Storage: ${display.mainFeatures.storage}</h6>
            <h6>Display Size: ${display.mainFeatures.displaySize}</h6>
            <h6>ChipSet: ${display.mainFeatures.chipSet}</h6>
            <h6>Memory: ${display.mainFeatures.memory}</h6>
            <h5>Sensors</h5>
            <h6>${display.mainFeatures.sensors[1] ? display.mainFeatures.sensors[1] : 'Not Given'}</h6>
            <h6>${display.mainFeatures.sensors[2] ? display.mainFeatures.sensors[2] : 'Not Given'}</h6>
            <h6>${display.mainFeatures.sensors[0] ? display.mainFeatures.sensors[0] : 'Not Given'}</h6>
            <h6>${display.mainFeatures.sensors[3] ? display.mainFeatures?.sensors[3] : 'Not Given'}</h6>
            </div>
            <div class='w-25'>
            <h6>${display.mainFeatures.sensors[4] ? display.mainFeatures.sensors[4] : 'Not Given'}</h6>
            <h6>${display.mainFeatures.sensors[5] ? display.mainFeatures.sensors[5] : 'Not Given'}</h6>
            <h5>Others Feature</h5>
            <h6>Bluetooth: ${display.others.Bluetooth ? display.others.Bluetooth : 'Not Given'}<h6> 
            <h6>GPS: ${display.others.GPS ? display.others.GPS : 'Not Given'}<h6>               
            <h6>NFC: ${display.others.NFC ? display.others.NFC : 'Not Given'} <h6>                
            <h6>Radio: ${display.others.Radio ? display.others.Radio : 'Not Given'}<h6>                  
            <h6>USB: ${display.others.USB ? display.others.USB : 'Not Given'} <h6>                
            <h6>WLAN :${display.others.WLAN ? display.others.WLAN : 'Not Given'}<h6>  
        </div> 
    </div>`;
    buttonInfo.appendChild(div)

}

