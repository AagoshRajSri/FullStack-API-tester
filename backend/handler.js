const helper = require("./helper");

const my_handler = function(req, res) {
    try {
        let input = req.body.data;
        if (!input) {
            input = [];
        }

        let result = helper.compute_hierarchy(input);

        let final_res = {
            is_success: true,
            user_id: "your_name_25082002",
            email: "your_id@college.edu",
            roll_number: "ROLL12345",
            hierarchies: result.hierarchies,
            invalid_entries: result.invalid_entries,
            duplicate_edges: result.duplicate_edges,
            summary: result.summary
        };

        res.status(200).json(final_res);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            is_success: false,
            msg: "something went wrong"
        });
    }
};

module.exports = my_handler;