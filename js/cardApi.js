const getCardContainer = async (phoneName, isShowAll) => {
    url = `https://openapi.programming-hero.com/api/phones?search=${phoneName}`
    const res = await fetch(url)
    const data = await res.json()
    const phone = data.data
    displayCard(phone, isShowAll)
}

const displayCard = (phone, isShowAll) => {
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerText = ''

    const showAllBtn = document.getElementById('show-all-btn')

    if (phone.length > 8 && !isShowAll) {
        showAllBtn.classList.remove('hidden')
    } else {
        showAllBtn.classList.add('hidden')
    }


    if (!isShowAll) {
        phone = phone.slice(0, 8)
    }


    phone.forEach(phones => {
        const card = document.createElement("div")
        card.classList.add('myClass', 'card', 'bg-gray-200', 'shadow-2xl');

        card.innerHTML = `
        <figure class ="px-10 pt-10 bg-slate-300">
            <img src = "${phones.image}"
            alt ="Shoes" class ="rounded-xl h-32 -mt-3 mb-6"/>
        </figure>
        <div class = "card-body items-center text-center">
            <h2 class = "card-title" >${phones.phone_name}</h2> 
            <h4 class = "font-bold"> $999 </h4> 
            <div class = "card-actions">
                <button onclick="showDetails('${phones.slug}')" class ="btn btn-primary text-xs ">Show Details </button>
            <div> 
        </div>
        `
        cardContainer.appendChild(card)
    });
    isloading(false)

}

function handelSearch(isShowAll) {
    isloading(true)
    const searchFlied = document.getElementById('search-flied')
    const searchText = searchFlied.value
    getCardContainer(searchText, isShowAll)

}

const isloading = (isloading) => {
    const isloadingspingner = document.getElementById('loading-spingner')
    if (isloading) {
        isloadingspingner.classList.remove('hidden')
    } else {
        isloadingspingner.classList.add('hidden')
    }
}

const showAll = () => {
    handelSearch(true)
}

const showDetails = async (id) => {
    url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    const phoneDetails = data.data
    displayPhoneDetails(phoneDetails)
}

const displayPhoneDetails = (phone) => {
    console.log(phone)
    const phoneDetails = document.getElementById('phone-details')
    phoneDetails.innerHTML = `
            <div class="mx-auto py-5">
                <img class= "w-full rounded-lg" src="${phone.image}" alt ="Shoes"/>
            </div>

            <div class = "card-body">
                <h2 class = "card-title">${phone.name}</h2> 
                <p class = "text-xs text-gray-300"> It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at its layout. </p> 
                <p class = "font-bold"> Starage : <span class = "text-md ml-3 text-gray-400"> ${phone.mainFeatures.storage}</span></p>
                <p class = "font-bold"> Display Size : <span class = "text-md ml-3 text-gray-400"> ${phone.mainFeatures.displaySize}</span></p>
                <p class = "font-bold"> Chipset : <span class = "text-md ml-3 text-gray-400"> ${phone.mainFeatures.chipSet}</span></p>
                <p class = "font-bold"> Memory : <span class = "text-md ml-3 text-gray-400"> ${phone.mainFeatures.memory}</span></p>
                <p class = "font-bold"> Slug : <span class = "text-md ml-3 text-gray-400"> ${phone.slug}</span></p>
                <p class = "font-bold"> Release data: <span class = "text-md ml-3 text-gray-400"> ${phone.releaseDate}</span></p>
                <p class = "font-bold"> Brand : <span class = "text-md ml-3 text-gray-400" > ${phone.brand}</span></p>
                <p class = "font-bold"> GPS : <span class = "text-md ml-3 text-gray-400"> ${phone.others.GPS}</span></p>
            </div>
    `

    my_modal_5.showModal()
}