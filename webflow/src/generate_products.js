import { checkCallLimit, incrementCallCount, setupForm, updateErrorMessage, updateSuccessMessage } from "./utils"

export function render(){
    setupForm('wf-form-Generate-Product-Form',transformFormData,submitFormData,responseHandler);

    document.getElementById('product_shape').value = 'Sneaker';
    document.getElementById('product_sole').value = 'Red';
    document.getElementById('product_material').value = 'Leather';
    document.getElementById('product_pattern').value = 'Snake Skin';
    document.getElementById('product_laces').value = 'Red';
    document.getElementById('product_gender').value = 'Green and Red snake skin sneaker';

}

function transformFormData(formData) {
    
    const transformedData = {
        form: formData.get('product_shape'),
        sole: formData.get('product_sole'),
        bodyMaterial: formData.get('product_material'),
        bodyPattern: formData.get('product_pattern'),
        laces: formData.get('product_laces'),
        generalstyle: formData.get('product_gender')
    }

    return transformedData;
}

async function submitFormData (formData) {
    // Assuming `formData` is your FormData object
    console.log(formData)

    //hide/show starter description and result component
    const starterDescription = document.querySelector('.starter-description');
    const resultsComponent = document.querySelector('.results_components');

    // increment call count for the user
    incrementCallCount();
    
    // check call limit for user
    const remainingCalls = checkCallLimit();

    if (remainingCalls > 0) {

        // Check if the element has a class named 'myClass'
        if (resultsComponent.classList.contains('hide')) {
            starterDescription.classList.add('hide');
            resultsComponent.classList.remove('hide');
        }

        const loaderItems = []
        const resultItems = document.querySelectorAll('.result-item');
        const genAIresult = document.querySelector('.results_generated-image-wrapper');
        resultItems.forEach(item => {
            loaderItems.push(item);
        });
        if (genAIresult) {
            loaderItems.push(genAIresult);
        }
        loaderItems.forEach(item => {
            addLoader(item);
        });

        updateSuccessMessage('.success-message',`Please wait around 30 seconds for your sneaker image to be generated. You have ${remainingCalls} generation attempt(s) left.`)
    } else {
        return {success:false, data:"no remaining calls"}
    }

    // Send the POST request to the server
    const response = await fetch(`https://us-central1-quiet-amp-415709.cloudfunctions.net/genai_for_product_design_1`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json()

    // return {success:true,data: 'test'}

    if (response.ok)
  
        return {success:true, data: data};
    
    else {
        return {success:false, data: null};
    }
}

function responseHandler (response) {

    if (response.success) {

        const response_data = response.data;

        // Update img elements
        response_data.similar_images.forEach((item, index) => {
            const imageElement = document.getElementById(`result-image-${index + 1}`);
            if (imageElement) { // Check if the img element exists
                imageElement.src = item.image_name;
                imageElement.srcset = item.image_name;
            }
        });

        // Handling the special case for 'result-image-genai'
        const result_image_genai = document.getElementById('result-image-genai');
        if (result_image_genai) {
            result_image_genai.src = response_data.dalle_image_url;
            result_image_genai.srcset = response_data.dalle_image_url;
        }

        const imageIds = ['result-image-genai','result-image-1', 'result-image-2', 'result-image-3'];
        // Array to store image URLs

        let lighboxImageSrc = [];
        lighboxImageSrc = imageIds.map(id => {
            const imageElement = document.getElementById(id);
            if (imageElement) {
                return imageElement.src;
            }
        });

        // Select the lightbox container and ensure it's initially hidden
        const lightboxContainer = document.querySelector('.lightbox_modal');

        // Function to show the lightbox
        const showLightbox = () => {
            lightboxContainer.style.display = 'flex';
        };

        // Assuming you have a swiper-wrapper class in your HTML structure
        const swiperWrapper = document.querySelector('.swiper-wrapper');

        while(swiperWrapper.firstChild){
            swiperWrapper.removeChild(swiperWrapper.firstChild);
        }
            
        lighboxImageSrc.forEach((imgSrc) => {
            const slide = document.createElement("div");
            slide.classList.add("swiper-slide");

            const slideImg = document.createElement("img");
            slideImg.setAttribute("src", imgSrc);
            slideImg.setAttribute("width", "auto");
            slideImg.setAttribute("height", "auto");
            slide.classList.add("thumbnail-small");

            slide.appendChild(slideImg);
            swiperWrapper.appendChild(slide);
        });

        const mySwiper = new Swiper('[lightbox="swiper"]', {
            slidesPerView: 1,
            spaceBetween: 30,
            centeredSlides: true,
            navigation: {
                nextEl: `.swiper-button-next`,
                prevEl: `.swiper-button-prev`,
            },
            pagination: {
                el: `.swiper-pagination`,
                type: 'bullets',
                clickable: true,
                renderBullet: function (index, className) {
                    return `<span class="${className}" style="background-image: url('${lighboxImageSrc[index]}'); background-size: cover; background-position: center; width: 3rem; height: 3rem;"></span>`;
                },
            },
        });

        // Add keyboard navigation
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
            mySwiper.slidePrev();
            } else if (event.key === 'ArrowRight') {
            mySwiper.slideNext();
            }
        });
    
        // Select all triggers - assuming the triggers are the images themselves for simplicity
        const lightboxTriggers = imageIds.map(id => {
            const imageElement = document.getElementById(id);
            if (imageElement) {
                return imageElement;
            }
        });
    
        lightboxTriggers.forEach((trigger, index) => {
            if(trigger){
                trigger.addEventListener("click", () => {
                    showLightbox(); // Show the lightbox on any trigger click
                });
            }
        });

        const loaderItems = []
        const resultItems = document.querySelectorAll('.result-item');
        const genAIresult = document.querySelector('.results_generated-image-wrapper');
        resultItems.forEach(item => {
            loaderItems.push(item);
        });
        if (genAIresult){
            loaderItems.push(genAIresult);
        }
        loaderItems.forEach(item => {
            removeLoader(item);
        });

    } else if (!response.success && response.data === "no remaining calls"){
        updateErrorMessage('.error-message','You have reached the maximum number of sneaker image generations allowed (3). Please try again in 12h.')
    }
        else {
        updateErrorMessage('.error-message','Something went wrong.')
    }
}

function addLoader(parentElement) {
    const html = `<div class="skeleton-loader"></div>`
    return parentElement.insertAdjacentHTML("beforeend", html);
}

function removeLoader (parentElement) {

    // Find all children with the 'skeleton-loader' class
    var loaders = parentElement.querySelectorAll('.skeleton-loader');

    // Loop through the NodeList and remove each element
    loaders.forEach(function(loader) {
        loader.parentNode.removeChild(loader);
    });

}