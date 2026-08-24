# 🧮 SmartCalc

**SmartCalc** is a modern, responsive, multi-purpose web calculator built using **HTML5, CSS3, and Vanilla JavaScript**.

Instead of creating a calculator that only performs addition, subtraction, multiplication, and division, this project brings several practical calculators and conversion tools together into one application.

> **One application. Multiple calculations. Real-world problems.**

---

## 📌 Table of Contents

* [About the Project](#about-the-project)
* [Features](#features)
* [Calculators](#calculators)
* [Technologies](#technologies)
* [JavaScript Concepts Practiced](#javascript-concepts-practiced)
* [Project Structure](#project-structure)
* [How to Run](#how-to-run)
* [Learning Objectives](#learning-objectives)
* [Future Improvements](#future-improvements)
* [Author](#author)

---

## 📖 About the Project

The **smartCalculator** project was created to demonstrate how JavaScript can be used to transform mathematical formulas and logical processes into interactive web applications.

The project combines mathematical calculations, unit conversions, user input, DOM manipulation, event handling, validation, and responsive design.

It is designed not only as a calculator but also as a practical learning project for understanding how **HTML + CSS + JavaScript** work together in a real-world application.

---

## 🚀 Features

### 🧮 Mathematical Calculator

A general-purpose calculator capable of performing common mathematical operations such as:

* Addition
* Subtraction
* Multiplication
* Division
* Percentage
* Decimal calculations
* Clear/reset operations

---

### 💰 Loan Calculator

The loan calculator helps users estimate their loan repayment.

Possible inputs include:

* Loan amount
* Interest rate
* Loan duration

Possible outputs include:

* Monthly payment
* Total repayment
* Total interest

---

### ⚖️ BMI Calculator

The BMI calculator calculates a user's Body Mass Index from:

* Weight
* Height

It then provides the corresponding BMI value and category.

> **Note:** BMI is a general screening calculation and is not a medical diagnosis.

---

### 💱 Currency Converter

The currency converter allows users to convert an amount from one currency to another.

Example:

```text
RWF → USD
USD → EUR
EUR → GBP
```

The application can eventually be connected to a live currency-exchange API so that exchange rates can be updated automatically.

---

### 📏 Measurement Converter

The measurement converter provides conversions between different units.

Examples include:

* Kilometers ↔ Miles
* Meters ↔ Feet
* Kilograms ↔ Pounds
* Celsius ↔ Fahrenheit
* Liters ↔ Gallons

Additional units can be added as the project develops.

---

## 🛠️ Technologies

| Technology    | Purpose                                         |
| ------------- | ----------------------------------------------- |
| HTML5         | Application structure                           |
| CSS3          | Styling and responsive layout                   |
| JavaScript    | Logic and interactivity                         |
| DOM API       | Manipulating webpage elements                   |
| Events        | Handling user interactions                      |
| Local Storage | Saving selected data/settings where appropriate |
| APIs          | Obtaining live currency data where applicable   |

---

## 🧠 JavaScript Concepts Practiced

This project provides practical experience with several important JavaScript concepts:

### Variables

```javascript
let amount = 1000;
const interestRate = 10;
```

### Functions

```javascript
function calculateBMI(weight, height) {
    return weight / (height * height);
}
```

### Conditional Statements

```javascript
if (bmi < 18.5) {
    // Underweight
}
```

### Event Listeners

```javascript
button.addEventListener("click", calculate);
```

### DOM Manipulation

```javascript
document.getElementById("result").textContent = result;
```

### Form Input

The application reads values entered by the user and processes them using JavaScript.

### Validation

The application checks whether user inputs are valid before performing calculations.

### Mathematical Operations

JavaScript mathematical operators and built-in mathematical functions are used to implement the required formulas.

### Objects and Arrays

Objects and arrays can be used to organize currencies, units, calculator categories, and other application data.

---

## 📂 Project Structure

A possible project structure is:

```text
smartCalculator/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── main.js
│   ├── mathCalculator.js
│   ├── loanCalculator.js
│   ├── bmiCalculator.js
│   ├── currencyConverter.js
│   └── measurementConverter.js
│
├── assets/
│   ├── images/
│   └── icons/
│
└── README.md
```

As the project grows, the JavaScript can be separated into modules so that each calculator has its own responsibility.

---

## ▶️ How to Run

### Option 1 — Open Locally

1. Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/smartCalculator.git
```

2. Open the project folder.

3. Open `index.html` in your browser.

---

### Option 2 — VS Code

Open the project in **Visual Studio Code** and use a local development server such as **Live Server**.

---

## 🎯 Learning Objectives

The main purpose of this project is to move from learning individual JavaScript concepts to applying those concepts in a complete application.

Through this project, I am practicing how to:

* Convert mathematical formulas into JavaScript algorithms.
* Capture user input from HTML forms.
* Validate user input.
* Respond to user interactions.
* Manipulate the DOM.
* Use event listeners.
* Organize JavaScript code.
* Build reusable functions.
* Create responsive interfaces.
* Work with APIs.
* Debug JavaScript applications.
* Structure a real-world frontend project.

---

## 🔮 Future Improvements

Planned improvements may include:

* [ ] Scientific calculator
* [ ] Age calculator
* [ ] Percentage calculator
* [ ] Discount calculator
* [ ] Tax calculator
* [ ] Investment calculator
* [ ] Savings calculator
* [ ] Date/time calculator
* [ ] Time-zone converter
* [ ] Area and volume converter
* [ ] Data-storage functionality
* [ ] Calculation history
* [ ] Dark/light mode
* [ ] Keyboard support
* [ ] Live currency exchange rates
* [ ] Improved accessibility
* [ ] Progressive Web App (PWA) functionality

---

## 🌍 Real-World Purpose

The project demonstrates an important principle in software development:

> **Programming can transform mathematical ideas into tools that solve practical problems.**

A mathematical formula by itself is useful, but embedding that formula inside an interactive application allows users to apply it without manually performing every calculation.

This project therefore sits at the intersection of:

**Mathematics → Programming → Software → Real-World Problem Solving**

---

## 👨‍💻 Author

**James NDAYISHIMIYE**

Mathematics Educator | Data Analyst | Full-Stack Software Development Student

Interested in the intersection of:

**Mathematics × Coding × Data × Technology × Creativity**

---

## 📄 License

This project is intended primarily for learning, experimentation, and educational purposes.

More licensing information can be added as the project evolves.
