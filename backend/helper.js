function compute_hierarchy(data_arr) {
    let valid_data = [];
    let bad_data = [];
    let duplicate_data = [];
    let already_seen = {};

    for (let i = 0; i < data_arr.length; i++) {
        let val = data_arr[i];
        if (!val) continue;

        let s = val.trim();
        if (!/^[A-Z]->[A-Z]$/.test(s)) {
            bad_data.push(val);
            continue;
        }

        if (already_seen[s]) {
            let found = false;
            for (let j = 0; j < duplicate_data.length; j++) {
                if (duplicate_data[j] === s) {
                    found = true;
                    break;
                }
            }
            if (!found) duplicate_data.push(s);
            continue;
        }

        let parts = s.split("->");
        if (parts[0] === parts[1]) {
            bad_data.push(val);
            continue;
        }

        already_seen[s] = true;
        valid_data.push(s);
    }

    let graph = {};
    let all_children = [];

    for (let i = 0; i < valid_data.length; i++) {
        let edge = valid_data[i];
        let p = edge.split("->")[0];
        let c = edge.split("->")[1];

        if (!graph[p]) {
            graph[p] = [];
        }
        graph[p].push(c);
        
        let child_exists = false;
        for (let j = 0; j < all_children.length; j++) {
            if (all_children[j] === c) {
                child_exists = true;
                break;
            }
        }
        if (!child_exists) all_children.push(c);
    }

    let start_points = [];
    let graph_keys = Object.keys(graph);
    for (let i = 0; i < graph_keys.length; i++) {
        let node = graph_keys[i];
        let is_child = false;
        for (let j = 0; j < all_children.length; j++) {
            if (all_children[j] === node) {
                is_child = true;
                break;
            }
        }
        if (!is_child) {
            start_points.push(node);
        }
    }

    let final_trees = [];
    let trees_found = 0;
    let cycles_found = 0;
    let max_h = -1;
    let max_r = "";

    function find_depth(node, visited_nodes) {
        for (let i = 0; i < visited_nodes.length; i++) {
            if (visited_nodes[i] === node) {
                return { is_bad: true };
            }
        }

        let new_visited = [];
        for (let i = 0; i < visited_nodes.length; i++) {
            new_visited.push(visited_nodes[i]);
        }
        new_visited.push(node);

        let kids_obj = {};
        let height = 1;

        let my_kids = graph[node] || [];
        for (let i = 0; i < my_kids.length; i++) {
            let kid = my_kids[i];
            let res = find_depth(kid, new_visited);

            if (res.is_bad) return { is_bad: true };

            kids_obj[kid] = res.data;
            if (res.h + 1 > height) {
                height = res.h + 1;
            }
        }

        return { data: kids_obj, h: height };
    }

    for (let i = 0; i < start_points.length; i++) {
        let root = start_points[i];
        let info = find_depth(root, []);

        if (info.is_bad) {
            cycles_found++;
            final_trees.push({
                root: root,
                tree: {},
                has_cycle: true
            });
        } else {
            trees_found++;
            if (info.h > max_h) {
                max_h = info.h;
                max_r = root;
            }
            let tree_wrapper = {};
            tree_wrapper[root] = info.data;
            final_trees.push({
                root: root,
                tree: tree_wrapper,
                depth: info.h
            });
        }
    }

    return {
        hierarchies: final_trees,
        invalid_entries: bad_data,
        duplicate_edges: duplicate_data,
        summary: {
            total_trees: trees_found,
            total_cycles: cycles_found,
            largest_tree_root: max_r
        }
    };
}

module.exports = { compute_hierarchy };