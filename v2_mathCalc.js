const calcScreen = document.querySelector(".calcScreen");
const mathButtons = document.querySelectorAll(".mathbutton");
const powerButton = document.querySelector("#onOffBtn");
let isCalculatorOn = true;

mathButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button === powerButton) {
            isCalculatorOn = !isCalculatorOn;
            calcScreen.textContent = isCalculatorOn ? "0" : "OFF";
            mathButtons.forEach((item) => {
                if (item !== powerButton) item.disabled = !isCalculatorOn;
            });
            return;
        }

        if (!isCalculatorOn) return;

        if (button.id === "eraseBtn") {
            calcScreen.textContent = calcScreen.textContent.slice(0, -1) || "0";
            return;
        }

        if (button.id === "calcBtn") {
            try {
                const result = evaluateExpression(calcScreen.textContent);
                calcScreen.textContent = Number(result.toPrecision(12)).toString();
            } catch {
                calcScreen.textContent = "Error";
            }
            return;
        }

        const current = calcScreen.textContent === "0" || calcScreen.textContent === "Error"
            ? ""
            : calcScreen.textContent;
        const label = button.textContent.trim();

        if (button.classList.contains("numBtn")) {
            if (label === "·") {
                const currentOperand = current.split(/[+\-*/%()]/).at(-1);
                calcScreen.textContent = currentOperand.includes(".") ? current : `${current || "0"}.`;
            } else {
                calcScreen.textContent = `${current}${label}`;
            }
        } else if (button.id === "bracketsBtn") {
            const opensGroup = !current || /[+−×÷%(-]$/.test(current);
            calcScreen.textContent = `${current}${opensGroup ? "(" : ")"}`;
        } else {
            const operators = { "+": "+", "—": "-", "⨉": "*", "÷": "/", "Mod": "%" };
            const operator = operators[label];
            if (operator) {
                calcScreen.textContent = `${current}${operator}`;
            }
        }
    });
});

function evaluateExpression(expression) {
    const tokens = expression.match(/\d*\.?\d+|[()+\-*/%]/g) || [];
    if (tokens.join("") !== expression.replace(/\s/g, "")) throw new Error("Invalid expression");

    let position = 0;
    const parseExpression = () => {
        let value = parseTerm();
        while (tokens[position] === "+" || tokens[position] === "-") {
            const operator = tokens[position++];
            const next = parseTerm();
            value = operator === "+" ? value + next : value - next;
        }
        return value;
    };
    const parseTerm = () => {
        let value = parseUnary();
        while (["*", "/", "%"].includes(tokens[position])) {
            const operator = tokens[position++];
            const next = parseUnary();
            if ((operator === "/" || operator === "%") && next === 0) throw new Error("Division by zero");
            value = operator === "*" ? value * next : operator === "/" ? value / next : value % next;
        }
        return value;
    };
    const parseUnary = () => {
        if (tokens[position] === "+") {
            position++;
            return parseUnary();
        }
        if (tokens[position] === "-") {
            position++;
            return -parseUnary();
        }
        return parsePostfix();
    };
    const parsePostfix = () => {
        let value = parsePrimary();
        while (tokens[position] === "%") {
            position++;
            value /= 100;
        }
        return value;
    };
    const parsePrimary = () => {
        if (tokens[position] === "(") {
            position++;
            const value = parseExpression();
            if (tokens[position++] !== ")") throw new Error("Unmatched parenthesis");
            return value;
        }
        const token = tokens[position++];
        if (!token || !/^\d*\.?\d+$/.test(token)) throw new Error("Expected a number");
        return Number(token);
    };

    const result = parseExpression();
    if (position !== tokens.length || !Number.isFinite(result)) throw new Error("Invalid expression");
    return result;
}