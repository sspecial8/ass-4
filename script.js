document.getElementById("submit").addEventListener("click", () => {
    const calculate = () => {
        let name = document.getElementById("name").value.trim();
        let price = Number(document.getElementById("startingBid").value);

        if (!name || isNaN(price)) {
            alert("Please provide a name and a valid starting bid.");
            return;
        }

        const education = Number(document.getElementById("education").value);
        const netWorth = Number(document.getElementById("networth").value);
        const caste = Number(document.getElementById("caste").value);

        const skills = Array.from(document.querySelectorAll(".skills:checked"))
            .map(skill => Number(skill.value))
            .reduce((total, value) => total + value, 0);

        let age = 1; 
        document.querySelectorAll('input[name="age"]').forEach(input => {
            if (input.checked) age = Number(input.value);
        });

        const reputationValues = Array.from(document.querySelectorAll(".reputation:checked"))
            .map(rep => Number(rep.value));

        let multiplicativeReputation = 1;
        let subtractiveReputation = 0;

        reputationValues.forEach(value => {
            if (value > 0 && value < 1) {
                multiplicativeReputation *= value;
            } else {
                subtractiveReputation += value;
            }
        });

        let totalPrice = price * education * netWorth * age;
        totalPrice += caste + skills;
        totalPrice = totalPrice * multiplicativeReputation + subtractiveReputation;

        const loveLetter = document.getElementById("loveLetter").value;
        let person = {
            bride_name: name,
            bride_price: totalPrice.toFixed(2),
            letter_to_bride: loveLetter
        };

        document.getElementById("result").innerHTML = `Your price for ${person.bride_name} is $${person.bride_price}.<br> Love Letter: ${person.letter_to_bride}`;
    };

    calculate();
});
