function calculateBMI() {
    var weight = parseFloat(document.getElementById("weight").value);
    var height = parseFloat(document.getElementById("height").value) / 100;
    var bmi = weight / (height * height);
    var result = document.getElementById("result");
    var recommendation = document.getElementById("recommendation");

    if (isNaN(bmi)) {
        result.innerHTML = "เอ๊ะ! กรอกข้อมูลเป็นตัวเลขเท่านั้นนะ !!";
        recommendation.innerHTML = "";
    } else {
        result.innerHTML = "ค่า BMI ของคุณคือ " + bmi.toFixed(2) + " นะ ";

        if (bmi < 18.5) {
            recommendation.innerHTML = "น้ำหนักน้อยไปหน่อยนะ ลองกินเยอะขึ้นอีกนิด หาอะไรอร่อยๆ กินเพิ่มอีก";
        } else if (bmi >= 18.5 && bmi < 25) {
            recommendation.innerHTML = "รักษาสุขภาพดีๆ แบบนี้ต่อไปนะ กินดี ออกกำลังกายสม่ำเสมอ เป็นกำลังใจให้";
        } else if (bmi >= 25 && bmi < 30) {
            recommendation.innerHTML = "น้ำหนักเกินมานิดหน่อย ลองควบคุมอาหาร ออกกำลังกายอีกหน่อย สู้ๆ นะ!";
        } else {
            recommendation.innerHTML = "เราว่าต้องลดน้ำหนักแล้วล่ะ กินดีๆ ออกกำลังกายจริงจังเลยนะ สู้ๆ!";
        }
    }
}


function clearForm() {
    document.getElementById("weight").value = "";
    document.getElementById("height").value = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("recommendation").innerHTML = "";
}
