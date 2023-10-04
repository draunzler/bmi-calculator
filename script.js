$(document).ready(function () {
    $("#slider").roundSlider({
        sliderType: "min-range",
        radius: 100,
        width: 14,
        value: 0, // Initial value
        min: 40,
        max: 120,
        handleSize: "+14",
        startAngle: 90,
        endAngle: "+360",
        animation: true,
        showTooltip: true,
        drag: function (e) {
            // Calculate BMI dynamically
            const heightInput = $("#height-input").val();
            if (heightInput && !isNaN(heightInput)) {
                const heightInCM = parseFloat(heightInput);
                const weight = e.value;
                const bmi = calculateBMI(heightInCM, weight);
                $("#bmiValue").text(bmi);
                updateBMICategory(bmi);
                $("#sliderValue").text(weight);
            }
        },
    });

    // Calculate BMI function
    function calculateBMI(heightInCM, weight) {
        // Convert height to meters
        const heightInM = heightInCM / 100;

        // Calculate BMI
        const bmi = weight / (heightInM * heightInM);

        return bmi.toFixed(2); // Limit to 2 decimal places
    }

    // Update BMI category based on value
    function updateBMICategory(bmi) {
        const bmiValue = parseFloat(bmi);
        const bmiElement = $("#bmiValue");
        const bmiCategoryElement = $("#bmiCategory");
        if (bmiValue < 18.5) {
            bmiElement.removeClass().addClass("underweight");
            bmiCategoryElement.removeClass().addClass("underweight");
            bmiCategoryElement.text("Underweight");
        } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
            bmiElement.removeClass().addClass("normal-weight");
            bmiCategoryElement.removeClass().addClass("normal-weight");
            bmiCategoryElement.text("Normal Weight");
        } else if (bmiValue >= 25 && bmiValue < 29.9) {
            bmiElement.removeClass().addClass("overweight");
            bmiCategoryElement.removeClass().addClass("overweight");
            bmiCategoryElement.text("Overweight");
        } else if (bmiValue > 30) {
            bmiElement.removeClass().addClass("obese");
            bmiCategoryElement.removeClass().addClass("obese");
            bmiCategoryElement.text("Obese");
        }
    }

    // Handle input box change
    $("#height-input").on("input", function () {
        const heightInput = $(this).val();
        const weight = $("#slider").roundSlider("option", "value");
        if (heightInput && !isNaN(heightInput) && !isNaN(weight)) {
            const heightInCM = parseFloat(heightInput);
            const bmi = calculateBMI(heightInCM, weight);
            $("#bmiValue").text(bmi);
            updateBMICategory(bmi);
        }
    });
});