const unitDefinitions = {
    length: [
        ["millimeter", "Millimeters", 0.001], ["centimeter", "Centimeters", 0.01],
        ["meter", "Meters", 1], ["kilometer", "Kilometers", 1000],
        ["inch", "Inches", 0.0254], ["foot", "Feet", 0.3048], ["mile", "Miles", 1609.344]
    ],
    mass: [
        ["milligram", "Milligrams", 0.000001], ["gram", "Grams", 0.001],
        ["kilogram", "Kilograms", 1], ["ounce", "Ounces", 0.028349523125],
        ["pound", "Pounds", 0.45359237], ["tonne", "Metric tonnes", 1000]
    ],
    temperature: [["celsius", "Celsius"], ["fahrenheit", "Fahrenheit"], ["kelvin", "Kelvin"]],
    area: [
        ["squareMeter", "Square meters", 1], ["squareKilometer", "Square kilometers", 1000000],
        ["squareFoot", "Square feet", 0.09290304], ["squareYard", "Square yards", 0.83612736],
        ["acre", "Acres", 4046.8564224], ["hectare", "Hectares", 10000]
    ],
    volume: [
        ["milliliter", "Milliliters", 0.001], ["liter", "Liters", 1],
        ["cubicMeter", "Cubic meters", 1000], ["usGallon", "US gallons", 3.785411784],
        ["usCup", "US cups", 0.2365882365], ["usFluidOunce", "US fluid ounces", 0.0295735295625]
    ],
    speed: [
        ["metersPerSecond", "Meters per second", 1], ["kilometersPerHour", "Kilometers per hour", 1 / 3.6],
        ["milesPerHour", "Miles per hour", 0.44704], ["feetPerSecond", "Feet per second", 0.3048],
        ["knot", "Knots", 0.514444]
    ],
    time: [
        ["millisecond", "Milliseconds", 0.001], ["second", "Seconds", 1],
        ["minute", "Minutes", 60], ["hour", "Hours", 3600],
        ["day", "Days", 86400], ["week", "Weeks", 604800]
    ]
};

const conversionCategory = document.querySelector("#conversionCategory");
const fromUnit = document.querySelector("#fromUnit");
const toUnit = document.querySelector("#toUnit");
const input = document.querySelector("#input");
const result = document.querySelector("#result");
const currencyAttribution = document.querySelector("#currencyAttribution");
const numberFormatter = new Intl.NumberFormat(undefined, { maximumSignificantDigits: 10 });
const currencyStorageKey = "smartCalc.currencyRates.v1";
let currencyRatesPromise;
let categoryChangeId = 0;

conversionCategory.addEventListener("change", () => {
    const changeId = ++categoryChangeId;
    currencyAttribution.hidden = true;

    if (conversionCategory.value === "currency") {
        fromUnit.disabled = true;
        toUnit.disabled = true;
        result.textContent = "Loading daily exchange rates…";
        getCurrencyRates().then((data) => {
            if (changeId !== categoryChangeId || conversionCategory.value !== "currency") return;
            const displayNames = new Intl.DisplayNames([navigator.language], { type: "currency" });
            const currencies = Object.keys(data.rates).sort();
            [fromUnit, toUnit].forEach((select) => {
                select.replaceChildren();
                currencies.forEach((code) => {
                    const option = document.createElement("option");
                    option.value = code;
                    option.textContent = `${code} - ${displayNames.of(code) || code}`;
                    select.appendChild(option);
                });
                select.disabled = false;
            });
            fromUnit.value = "USD";
            toUnit.value = "RWF";
            const updatedAt = new Date(data.time_last_update_utc);
            currencyAttribution.innerHTML = `Indicative rates, updated ${updatedAt.toLocaleString()}. Rates by <a href="https://www.exchangerate-api.com" target="_blank" rel="noopener noreferrer">ExchangeRate-API</a>.`;
            currencyAttribution.hidden = false;
            updateResult();
        }).catch(() => {
            if (changeId === categoryChangeId) {
                result.textContent = "Exchange rates are unavailable. Check your connection and try again.";
            }
        });
        return;
    }

    const units = unitDefinitions[conversionCategory.value];
    [fromUnit, toUnit].forEach((select) => {
        select.replaceChildren();
        units.forEach(([value, label]) => {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = label;
            select.appendChild(option);
        });
        select.disabled = false;
    });
    updateResult();
});

[fromUnit, toUnit, input].forEach((control) => {
    control.addEventListener("input", updateResult);
    control.addEventListener("change", updateResult);
});

function updateResult() {
    if (!input.value || !conversionCategory.value) {
        result.textContent = "Enter a value to see the conversion.";
        return;
    }

    const amount = Number(input.value);
    if (!Number.isFinite(amount) || (amount < 0 && conversionCategory.value !== "temperature")) {
        result.textContent = "Enter a valid non-negative value.";
        return;
    }

    const category = conversionCategory.value;
    const source = fromUnit.value;
    const destination = toUnit.value;
    let converted;

    if (category === "currency") {
        result.textContent = "Loading daily exchange rates…";
        getCurrencyRates().then((data) => {
            if (conversionCategory.value !== "currency") return;
            const convertedAmount = amount * data.rates[destination] / data.rates[source];
            const formattedAmount = new Intl.NumberFormat(undefined, {
                style: "currency",
                currency: destination,
                maximumSignificantDigits: 10
            }).format(convertedAmount);
            result.textContent = formattedAmount;
        }).catch(() => {
            result.textContent = "Exchange rates are unavailable. Check your connection and try again.";
        });
        return;
    }

    if (category === "temperature") {
        const celsius = source === "fahrenheit" ? (amount - 32) * 5 / 9
            : source === "kelvin" ? amount - 273.15
                : amount;
        if (celsius < -273.15) {
            result.textContent = "Temperature cannot be below absolute zero.";
            return;
        }
        converted = destination === "fahrenheit" ? celsius * 9 / 5 + 32
            : destination === "kelvin" ? celsius + 273.15
                : celsius;
    } else {
        const units = Object.fromEntries(unitDefinitions[category].map(([value, , factor]) => [value, factor]));
        converted = amount * units[source] / units[destination];
    }

    result.textContent = `${numberFormatter.format(converted)} ${toUnit.selectedOptions[0].textContent}`;
}

async function getCurrencyRates() {
    if (currencyRatesPromise) return currencyRatesPromise;

    currencyRatesPromise = (async () => {
        try {
            const cachedData = JSON.parse(sessionStorage.getItem(currencyStorageKey));
            if (cachedData?.result === "success" && Date.now() < cachedData.time_next_update_unix * 1000) {
                return cachedData;
            }
        } catch {}

        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        if (!response.ok) throw new Error("Exchange rate request failed");
        const data = await response.json();
        if (data.result !== "success" || !data.rates?.RWF || !data.rates?.USD) {
            throw new Error("Exchange rate response is invalid");
        }

        try {
            sessionStorage.setItem(currencyStorageKey, JSON.stringify(data));
        } catch {
            // Continue with the live response when browser storage is unavailable.
        }
        return data;
    })();

    try {
        return await currencyRatesPromise;
    } finally {
        currencyRatesPromise = undefined;
    }
}