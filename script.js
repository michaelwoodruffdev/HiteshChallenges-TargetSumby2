$('#calculate').click(() => {

    let quitFlag = false;

    // collect input
    let input = $('#array-input').val();
    input = input.replace(/\s/g, '');
    let inputArray = input.split(',');

    // error check
    $('#output').empty();
    let outputString = '<div id="output-label">output</div>';
    inputArray.forEach(element => {
        if (!$.isNumeric(element) || Math.floor(element) != element) {
            outputString += '<p id="error">invalid array input format</p>';
            quitFlag = true;
        }
    });

    // collect target sum integer
    let targetSum = $('#target-sum').val();

    // error check
    if (!$.isNumeric(targetSum) || Math.floor(targetSum) != targetSum) {
        outputString += '<p id="error">invalid target sum input format</p>';
        quitFlag = true;
    }

    // if error exists then early return
    if (quitFlag) {
        $('#output').html(outputString);
        return;
    }

    // create hashmap (javascript object)
    let map = {};
    inputArray.forEach(element => {
        map[element] = element;
    });

    // initialize solution
    let solution = [];

    // algorithm to build solution
    inputArray.forEach(element => {
        if (targetSum - element in map) {
            solution.push([parseInt(element), targetSum - element]);
            delete map[element];
            delete map[targetSum - element];
        }
    });

    // output solution
    outputString += '<p id="set">SOLUTION:</p>'
    solution.forEach(set => {
        outputString += '<p id="set">[' + set.toString() + ']</p>';
    });
    $('#output').html(outputString);
});