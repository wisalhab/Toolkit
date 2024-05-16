const shutter_prices = {
    'Paulownia Wood': 175,
    'Ashwood': 233,
    'Waterproof': 177,
    'Fauxwood Shutters': 222,
};

// Define VAT rates per square meter for each shutter material
const vat_rates = {
    'Paulownia Wood': 46,
    'Ashwood': 57.6,
    'Waterproof': 46.4,
    'Fauxwood Shutters': 55.4,
};

const handwork = 55;

// Function to calculate installation cost
function calculate_installation_cost(height, width, shutter_type, handwork_or_no) {
    if (shutter_type in shutter_prices) {
        const shutter_price = shutter_prices[shutter_type];
        const area_m2 = (height * width) / 10000; 
        let total_cost = area_m2 * shutter_price;

        if (handwork_or_no == 'yes') {  
            total_cost += handwork * area_m2;
        }

        // Calculate VAT amount and add it to the total cost
        if (shutter_type in vat_rates) {
            const vat_rate = vat_rates[shutter_type];
            const vat_amount = (area_m2 * vat_rate);
            total_cost += vat_amount;
        }

        return total_cost;
    } else {
        return null;
    }
}

$w.onReady(function () {
    // Event handler for the calculate button
    $w("#button1").onClick(function () {
        try {
            // Get user input
            const height = parseFloat($w("#inputHeight").value);
            const width = parseFloat($w("#widthInput").value);
            const shutter_type = $w("#dropdown1").value;
            const handwork_or_no = $w("#dropdown2").value.toLowerCase();

            // Calculate the cost
            const installation_cost = calculate_installation_cost(height, width, shutter_type, handwork_or_no);

            if (installation_cost !== null) {
                $w("#resultText").text = `Estimated installation cost for ${height} cm x ${width} cm of ${shutter_type} shutters: from £${installation_cost.toFixed(2)} including VAT`;
            } else {
                $w("#resultText").text = "Invalid shutter type. Please enter a valid shutter type.";
            }
        } catch (error) {
            $w("#resultText").text = "Invalid input. Please enter valid values.";
        }
    });
});
