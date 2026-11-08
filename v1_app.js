
let navBtns = document.querySelectorAll(".navBtn");
    const calcDisplay = document.querySelector(".calcDisplay");
    const mathBtn = document.querySelector("#mathBtn");
    const loanBtn = document.querySelector("#loanBtn");
    const bmiBtn = document.querySelector("#bmiBtn");
    const xchangeBtn = document.querySelector("#xchangeBtn");

    // 5. CONNECT BUTTONS TO THEIR CALCULATORS
    mathBtn.addEventListener("click",()=>{
        setActiveCalculator(mathBtn);
        loadCalculator("./v2_mathCalc.html","./v2_mathCalc.css","./v2_mathCalc.js");
    });
    loanBtn.addEventListener("click",()=>{
        setActiveCalculator(loanBtn);
        loadCalculator("./v3_loanCalc.html","./v3_loanCalc.css","./v3_loanCalc.js");
    });
    bmiBtn.addEventListener("click",()=>{
        setActiveCalculator(bmiBtn);
        loadCalculator("./v4_bmiCalc.html","./v4_bmiCalc.css","./v4_bmiCalc.js");
    });
    xchangeBtn.addEventListener("click",()=>{
        setActiveCalculator(xchangeBtn);
        loadCalculator("./v5_xchangeCalc.html","./v5_xchangeCalc.css","./v5_xchangeCalc.js");
    });

    function setActiveCalculator(activeButton) {
        navBtns.forEach((button) => {
            const isActive = button === activeButton;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });
    }

    async function loadCalculator(htmlFile,cssFile,jsFile){    // 6. LOAD CALCULATOR HTML  AND ITS JAVASCRIPT
        try{                       // STEP 1: Tell the user that the calculator is loading
            calcDisplay.innerHTML= `    
            <p>Loading Calculator...</p>
            `;

            const response = await fetch(htmlFile, { cache: "no-store" }); // STEP 2: Fetch the calculator HTML file

            if (!response.ok){    // STEP 3: Check whether the HTML file was found
                throw new Error(`Could not load ${htmlFile}`);
            }
            const html = await response.text();// STEP 4: Convert the response into text
            const calculatorDocument = new DOMParser().parseFromString(html, "text/html");
            calcDisplay.innerHTML = calculatorDocument.body.innerHTML;
            loadCalculatorCSS(cssFile);
            await loadCalculatorScript(jsFile);


        } catch (error){
            console.error(error);   // STEP 7: Display an error if something went wrong
            calcDisplay.innerHTML = `
            <p>Unable to load calculator.</p>
            `;
        }
    }


    // 7. LOAD THE CSS FILE FOR THE CURRENT CALCULATOR
    function loadCalculatorCSS(cssFile) {

    // Remove previously loaded calculator CSS
    const oldStyle = document.querySelector("#activeCalculatorCSS");

    if (oldStyle) {
        oldStyle.remove();
    }


    // Create a new <link> element
    const link = document.createElement("link");

    link.rel = "stylesheet";
    link.href = `${cssFile}?v=${Date.now()}`;
    link.id = "activeCalculatorCSS";


    // Add the CSS file to the document
    document.head.appendChild(link);
}


    // 8. LOAD THE JAVASCRIPT FILE FOR THE CURRENT CALCULATOR
    function loadCalculatorScript(jsFile) {
        const oldScript = document.querySelector( "#activeCalculatorScript" );
        if (oldScript) { oldScript.remove();
        }
        
        // Create a new <script> element //
        const script = document.createElement("script");
        script.type = "module";
        script.src = `${jsFile}?v=${Date.now()}`;
        script.id = "activeCalculatorScript";

        return new Promise((resolve, reject) => {
            script.addEventListener("load", resolve, { once: true });
            script.addEventListener("error", () => reject(new Error(`Could not load ${jsFile}`)), { once: true });
            document.body.appendChild(script);
        });
    }