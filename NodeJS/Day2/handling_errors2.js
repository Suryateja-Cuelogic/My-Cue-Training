function totalMarks(subject1, subject2, subject3, result) {

    var total = subject1 + subject2 + subject3;

    if (typeof total === "number") {

        return result(null, total / 3);
    } else {
        return result(new Error("Something went wrong in calculation or you entered wrong marks."));
    }

}

totalMarks(35, 46, 78, function(err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log("Total average is: " + result);
    }
});

totalMarks(61, "46", 78, function(err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log("Total average is: " + result);
    }
});

totalMarks(61, -10, 78, function(err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log("Total average is: " + result);
    }
});

totalMarks(61, "Hai", 78, function(err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log("Total average is: " + result);
    }
});
