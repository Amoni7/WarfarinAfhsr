const translations = {
    en: {
        title: "Warfarin Dose Planner",
        language: "language",
        english: "english",
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        sunday: "Sunday",
        mon: "Monday dose",
        tues: "Tuesday dose",
        wed: "Wednesday dose",
        thurs: "Thursday dose",
        fri: "Friday dose",
        sat: "Saturday dose",
        sun: "Sunday dose",
        day1: "Enter dose for Monday",
        day2: "Enter dose for Tuesday",
        day3: "Enter dose for Wednesday",
        day4: "Enter dose for Thursday",
        day5: "Enter dose for Friday",
        day6: "Enter dose for Saturday",
        day7: "Enter dose for Sunday",
        selectday: "Select Starting Day:",
        generateBtn: "Dosing plan",
        dosingplan: "Dosing Plan",
        resetBtn: "Plan for Another Patient",
        noDose: "No Dose",
        doseMg: "mg",
        combination: "Combination",
        dontTakeMedication: "Don't take the medication this day.",
        exportPdfBtn: "Save result",
    },
    ar: {
        title: "منظم جرعات الوارفارين",
        language: "اللغة",
        english: "الإنجليزية",
        arabic: "العربية",
        monday: "الإثنين",
        tuesday: "الثلاثاء",
        wednesday: "الأربعاء",
        thursday: "الخميس",
        friday: "الجمعة",
        saturday: "السبت",
        sunday: "الأحد",
        mon: "جرعة يوم الإثنين",
        tues: "جرعة يوم الثلاثاء",
        wed: "جرعة يوم الأربعاء",
        thurs: "جرعة يوم الخميس",
        fri: "جرعة يوم الجمعة",
        sat: "جرعة يوم السبت",
        sun: "جرعة يوم الأحد",
        day1: "أدخل جرعة يوم الإثنين",
        day2: "أدخل جرعة يوم الثلاثاء",
        day3: "أدخل جرعة يوم الأربعاء",
        day4: "أدخل جرعة يوم الخميس",
        day5: "أدخل جرعة يوم الجمعة",
        day6: "أدخل جرعة يوم السبت",
        day7: "أدخل جرعة يوم الأحد",
        selectday: "أختر يوم البدء:",
        generateBtn: "نظم",
        dosingplan: "الخطة الأسبوعية",
        resetBtn: "البدء لمراجع آخر",
        noDose: "لا جرعة",
        doseMg: "ملغ",
        combination: "التوليفة",
        dontTakeMedication: "لا تأخذ الدواء هذا اليوم.",
        exportPdfBtn: "احفظ الخطة",
    },
};


let currentLanguage = 'en';

// Function to update translations dynamically
function updateTranslations() {
    for (const key in translations[currentLanguage]) {
        const element = document.getElementById(key);
        if (element) {
            if (element.tagName === 'INPUT') {
                // Update placeholder for input fields
                element.placeholder = translations[currentLanguage][key];
                // Adjust direction for input fields
                element.style.direction = currentLanguage === 'ar' ? 'rtl' : 'ltr';
                element.style.textAlign = currentLanguage === 'ar' ? 'right' : 'left';
            } else if (element.tagName === 'BUTTON') {
                // Update text content for buttons
                element.textContent = translations[currentLanguage][key];
                // Adjust direction for buttons
                element.style.direction = currentLanguage === 'ar' ? 'rtl' : 'ltr';
                element.style.textAlign = currentLanguage === 'ar' ? 'right' : 'left';
            } else if (element.tagName === 'SELECT') {
                // Adjust direction for dropdowns
                element.style.direction = currentLanguage === 'ar' ? 'rtl' : 'ltr';
                element.style.textAlign = currentLanguage === 'ar' ? 'right' : 'left';
            } else {
                // Update text content for other elements
                element.textContent = translations[currentLanguage][key];
                // Adjust direction for general elements
                element.style.direction = currentLanguage === 'ar' ? 'rtl' : 'ltr';
                element.style.textAlign = currentLanguage === 'ar' ? 'right' : 'left';
            }
        }
    }

    // Change text direction globally based on language
    const bodyElement = document.body;
    bodyElement.style.direction = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    bodyElement.style.textAlign = currentLanguage === 'ar' ? 'right' : 'left';
    function centerElement(elementId, direction = 'ltr') {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.textAlign = 'center';
            element.style.direction = direction;
        }
    }
    centerElement('title', 'ltr');
    centerElement('dosingplan', 'ltr');
    
    function centerButton(buttonId) {
        const button = document.getElementById(buttonId);
        if (button) {
            const buttonContainer = button.parentElement;
            if (buttonContainer) {
                buttonContainer.style.display = 'flex';
                buttonContainer.style.justifyContent = 'center';
                buttonContainer.style.alignItems = 'center';
            }
        }
    }
    centerButton('generateBtn');
    centerButton('resetBtn');
    


}

document.getElementById('languageSelect').addEventListener('change', function () {
    currentLanguage = this.value;
    updateTranslations(); // For static content
    regenerateOutputPage(); // Re-generate output content with the new language
});

function regenerateOutputPage() {
    const tabletDiagram = document.getElementById('tabletDiagram');
    tabletDiagram.innerHTML = ''; // Clear existing content
    generateOutputContent(); // Call your function to regenerate the dynamic content
}

updateTranslations();

document.getElementById('generateBtn').addEventListener('click', function () {
    
    const startDay = document.getElementById('startDay').value;

    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const reorderedWeekDays = reorderWeekDays(weekDays, startDay);

    const doses = reorderedWeekDays.reduce((acc, day, index) => {
        const doseValue = document.getElementById(`day${index + 1}`).value;
        acc[day] = doseValue;
        return acc;
    }, {});
    
    const tabletDiagram = document.getElementById('tabletDiagram');
    tabletDiagram.innerHTML = '';

    for (const [day, dose] of Object.entries(doses)) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day-dose');

        const translatedDay = translations[currentLanguage][day.toLowerCase()];

        const dayTitle = document.createElement('h3');
        dayTitle.textContent = `${translatedDay}: ${dose > 0 ? `${dose} ${translations[currentLanguage].doseMg}` : translations[currentLanguage].noDose}`;
        dayDiv.appendChild(dayTitle);

        if (dose > 0) {
            const tabletCombinations = calculateTablets(parseFloat(dose));

        
            const selectDropdown = document.createElement('select');
            selectDropdown.classList.add('tablet-select');
            tabletCombinations.forEach((combination, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = `${translations[currentLanguage].combination} ${index + 1}`;
                selectDropdown.appendChild(option);
            });

            
            selectDropdown.addEventListener('change', function () {
                const selectedCombination = tabletCombinations[selectDropdown.value];
                displayTabletCombination(selectedCombination, dayDiv);
            });

            dayDiv.appendChild(selectDropdown);
            tabletDiagram.appendChild(dayDiv);

            displayTabletCombination(tabletCombinations[0], dayDiv);
        } else {
            const noMedicationMessage = document.createElement('p');
            noMedicationMessage.textContent = translations[currentLanguage].dontTakeMedication;
            noMedicationMessage.style.color = "red";
            dayDiv.appendChild(noMedicationMessage);
            tabletDiagram.appendChild(dayDiv);
        }
    }


    tabletDiagram.style.overflowY = 'auto';
    tabletDiagram.style.maxHeight = '400px';

    document.getElementById('inputInterface').style.display = 'none';
    document.getElementById('outputInterface').style.display = 'block';
});

function reorderWeekDays(weekDays, startDay) {
    const startIndex = weekDays.indexOf(startDay);
    return [...weekDays.slice(startIndex), ...weekDays.slice(0, startIndex)];
}

function calculateTablets(dose) {
    const tablets = [5, 3, 1];
    const results = [];

    function findCombinations(remainingDose, combination, index) {
        if (remainingDose === 0) {
            results.push(combination);
            return;
        }

        for (let i = index; i < tablets.length; i++) {
            const tablet = tablets[i];
            if (remainingDose >= tablet) {
                const count = Math.floor(remainingDose / tablet);
                const newCombination = [...combination, { tablet, count, fraction: false }];
                findCombinations(remainingDose - count * tablet, newCombination, i);
            }
            if (remainingDose === tablet / 2) {
                const newCombination = [...combination, { tablet, count: 1, fraction: true }];
                findCombinations(0, newCombination, i);
            }
        }
    }

    findCombinations(dose, [], 0);

    if (results.length === 0) {
        results.push([{ tablet: 5, count: 1, fraction: true }]);
    }

    return results;
}

function displayTabletCombination(combination, parentDiv) {
    const existingDiagram = parentDiv.querySelector('.tablet-row');
    if (existingDiagram) {
        existingDiagram.remove();
    }

    const tabletDiv = document.createElement('div');
    tabletDiv.classList.add('tablet-row');

    combination.forEach(item => {
        for (let i = 0; i < item.count; i++) {
            const tabletImg = document.createElement('img');
            tabletImg.src = item.fraction
                ? `tablet-split-${item.tablet}mg.png`
                : `tablet-whole-${item.tablet}mg.png`;
            tabletImg.alt = item.fraction
                ? `Split ${item.tablet} mg Tablet`
                : `Whole ${item.tablet} mg Tablet`;
            tabletImg.style.width = '56.7px';
            tabletImg.style.height = '56.7px';
            tabletDiv.appendChild(tabletImg);
        }
    });

    parentDiv.appendChild(tabletDiv);
}

document.getElementById('resetBtn').addEventListener('click', function () {
    for (let i = 1; i <= 7; i++) {
        document.getElementById(`day${i}`).value = '';
    }

    document.getElementById('startDay').value = 'Monday';

    const tabletDiagram = document.getElementById('tabletDiagram');
    tabletDiagram.innerHTML = '';
    tabletDiagram.style.overflow = 'hidden';

    document.getElementById('outputInterface').style.display = 'none';
    document.getElementById('inputInterface').style.display = 'block';
});

function exportResultsAsPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const headerElement = document.getElementById('dosingplan');
    const tableDiagramElement = document.getElementById('tabletDiagram');

    if (!headerElement || !tableDiagramElement || tableDiagramElement.innerHTML.trim() === '') {
        alert('No results to export!');
        return;
    }

    // Show a loading message
    const loadingMessage = document.createElement('div');
    loadingMessage.innerText = 'Generating PDF, please wait...';
    loadingMessage.style.position = 'fixed';
    loadingMessage.style.top = '50%';
    loadingMessage.style.left = '50%';
    loadingMessage.style.transform = 'translate(-50%, -50%)';
    loadingMessage.style.padding = '20px';
    loadingMessage.style.backgroundColor = 'white';
    loadingMessage.style.border = '1px solid #ccc';
    loadingMessage.style.borderRadius = '5px';
    loadingMessage.style.zIndex = '9999';
    document.body.appendChild(loadingMessage);

    // Create a container for exporting
    const exportContainer = document.createElement('div');
    exportContainer.style.width = '794px'; // A4 width in pixels at 96 DPI
    exportContainer.style.height = '1123px'; // A4 height in pixels at 96 DPI
    exportContainer.style.position = 'absolute';
    exportContainer.style.top = '-9999px'; // Hide from view
    exportContainer.style.backgroundColor = 'white';

    // Clone the elements to the container
    const clonedHeader = headerElement.cloneNode(true);
    clonedHeader.style.textAlign = 'center';
    exportContainer.appendChild(clonedHeader);

    const clonedDiagram = tableDiagramElement.cloneNode(true);
    clonedDiagram.style.overflow = 'visible'; // Ensure no scrolling
    clonedDiagram.style.maxHeight = 'none'; // Remove height limits
    exportContainer.appendChild(clonedDiagram);

    document.body.appendChild(exportContainer);

    // Use html2canvas to capture the content
    html2canvas(exportContainer, {
        scale: 2, // Higher resolution for better clarity
        useCORS: true,
    })
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pageWidth = 210; // A4 page width in mm
            const pageHeight = 297; // A4 page height in mm

            // Calculate scaling to fit content on one page
            const contentWidth = pageWidth - 20; // Leave a margin of 10mm
            const contentHeight = (canvas.height * contentWidth) / canvas.width;

            doc.addImage(imgData, 'PNG', 10, 10, contentWidth, contentHeight);

            // Save the PDF
            doc.save('results.pdf');

            // Clean up
            document.body.removeChild(loadingMessage);
            document.body.removeChild(exportContainer);
        })
        .catch((error) => {
            // Handle errors
            document.body.removeChild(loadingMessage);
            document.body.removeChild(exportContainer);
            alert('An error occurred while generating the PDF: ' + error.message);
        });
}

document.getElementById('exportPdfBtn').addEventListener('click', exportResultsAsPDF);










