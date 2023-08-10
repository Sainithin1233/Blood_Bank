//module export
const SearchHandler = (app, db) => {
  app.post("/home/search", (req, res) => {
    //variables
    const blood = req.body.blood;
    const place = req.body.place;
    //query
    //console.log(blood + place);
    const sqlSelect =
      "SELECT * FROM user_details WHERE userBloodGroup = ? AND userPlace = ?";
    const sqlSelect1 =
      "SELECT * FROM user_details WHERE userPlace = ?";
    const sqlSelect2 =
      "SELECT * FROM user_details WHERE userBloodGroup = ?";

    //
    if (!blood && place) {
      db.query(sqlSelect1, [place], (err, result) => {
        // console.log(result);
        if (err) {
          console.log("**   SEARCH ERROR   **" + err);
        }

        if (result.length > 0) {
          res.send(result);
          //console.log("**SEARCH RESULTS FOUND AND SEND TO FRONT END**");
        } else {
          res.send({ message: "NO SEARCH RESULTS FOUND!" });
        }
      });
    } else if (blood && !place) {
      db.query(sqlSelect2, [blood], (err, result) => {
        // console.log(result);
        if (err) {
          console.log("**   SEARCH ERROR   **" + err);
        }

        if (result.length > 0) {
          res.send(result);
          //console.log("**SEARCH RESULTS FOUND AND SEND TO FRONT END**");
        } else {
          res.send({ message: "NO SEARCH RESULTS FOUND!" });
        }
      });
    } else {
      db.query(sqlSelect, [blood, place], (err, result) => {
        // console.log(result);
        if (err) {
          console.log("**   SEARCH ERROR   **" + err);
        }

        if (result.length > 0) {
          res.send(result);
          //console.log("**SEARCH RESULTS FOUND AND SEND TO FRONT END**");
        } else {
          res.send({ message: "NO SEARCH RESULTS FOUND!" });
        }
      });
    }
  });
};

export default SearchHandler;