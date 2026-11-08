const disclaimer = document.querySelector(".disclaimer");
const bmiDisplay = document.querySelector(".bmiDisplay");
const bmiResults = document.querySelector(".bmiResults");
const bmiForm = document.querySelector(".bmiInput form");
const bmiCategories = [
    [".underweightBmi", 0, 18.5],
    [".normalweightBmi", 18.5, 25],
    [".overweightBmi", 25, 30],
    [".obeseCat1WeightBmi", 30, 35],
    [".obeseCat2WeightBmi", 35, 40],
    [".obeseCat3WeightBmi", 40, Infinity]
].map(([selector, minimum, maximum]) => ({
    element: document.querySelector(selector),
    minimum,
    maximum
}));

document.querySelector("#bmiChecker").addEventListener("click", () => {
    disclaimer.hidden = true;
    bmiDisplay.hidden = false;
    bmiResults.hidden = true;
    bmiCategories.forEach(({ element }) => { element.hidden = true; });
});

bmiForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const height = Number(document.querySelector("#userHeight").value);
    const weight = Number(document.querySelector("#userWeight").value);

    if (!Number.isFinite(height) || !Number.isFinite(weight) || height <= 0 || weight <= 0) {
        bmiResults.textContent = "Enter a valid height and weight to calculate BMI.";
        bmiResults.hidden = false;
        return;
    }

    const bmi = weight / ((height / 100) ** 2);
    const category = bmiCategories.find(({ minimum, maximum }) => bmi >= minimum && bmi < maximum);
    bmiResults.textContent = `Your BMI is ${bmi.toFixed(1)}${category ? "." : ". Please consult a healthcare professional for an assessment."}`;
    bmiResults.hidden = false;
    bmiDisplay.hidden = false;
    bmiCategories.forEach(({ element }) => { element.hidden = true; });

    if (category) {
        category.element.hidden = false;
    }
});

disclaimer.hidden = false;
bmiDisplay.hidden = true;
bmiResults.hidden = true;
bmiCategories.forEach(({ element }) => { element.hidden = true; });