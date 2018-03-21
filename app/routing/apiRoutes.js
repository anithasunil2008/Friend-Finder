var friends = require("../data/friends.js");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function(req, res) {
        console.log("Post method resquest body: " + JSON.stringify(req.body));
        var user = req.body;
        var userScores = user.scores;
        var friendDiff = 0;
        var friendIndex = 0;
        var sum = 0;
        var sumArray = [];
        friends.forEach((f, i) => {
            f.scores.forEach((s, j) => {
                var diff = Math.abs(userScores[j] - s);
                // console.log("diff = " + diff);
                sum = sum + diff;
                // console.log("Sum = " + sum);
            });
            console.log("Friend Index: " + i + " Sum: " + sum);
            sumArray.push(sum);
            sum = 0;
        });
        console.log(sumArray);
        friendIndex = indexOfMin(sumArray);
        console.log("Best Match Friend Index: " + friendIndex);

        friends.push(user);
        // console.log(friends[friendIndex]);
        res.json(friends[friendIndex]);
    });

    function indexOfMin(arr) {
        if (arr.length === 0) {
            return -1;
        }

        var min = arr[0];
        var minIndex = 0;

        for (var i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                minIndex = i;
                min = arr[i];
            }
        }
        return minIndex;
    }

}