const loanForm = document.querySelector(".loanCalc form");
const loanAmount = document.querySelector("#loanAmount");
const loanPeriod = document.querySelector("#period");
const interestRate = document.querySelector("#interestRate");
const loanError = document.querySelector("#loanError");
const monthlyRepayment = document.querySelector("#monthlyRepayment");
const totalInterest = document.querySelector("#totalInterest");
const totalAmount = document.querySelector("#totalAmount");
const currencyFormatter = new Intl.NumberFormat("en-RW", {
    style: "currency",
    currency: "RWF",
    maximumFractionDigits: 2
});

loanForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const principal = Number(loanAmount.value);
    const years = Number(loanPeriod.value);
    const annualRate = Number(interestRate.value);
    const numberOfPayments = years * 12;
    const monthlyRate = annualRate / 1200;

    if (![principal, years, annualRate].every(Number.isFinite) || principal <= 0 || years <= 0 || annualRate < 0) {
        loanError.textContent = "Enter a positive loan amount and term, and a non-negative interest rate.";
        return;
    }

    const payment = monthlyRate === 0
        ? principal / numberOfPayments
        : principal * monthlyRate / (1 - (1 + monthlyRate) ** -numberOfPayments);
    const total = payment * numberOfPayments;

    if (!Number.isFinite(payment) || !Number.isFinite(total)) {
        loanError.textContent = "These values are outside the supported calculation range.";
        return;
    }

    loanError.textContent = "";
    monthlyRepayment.textContent = currencyFormatter.format(payment);
    totalAmount.textContent = currencyFormatter.format(total);
    totalInterest.textContent = currencyFormatter.format(total - principal);
});