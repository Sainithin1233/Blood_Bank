//module export
const UpdateStockHandler = (app, db) => {
  app.get("/login/emp/ub", (req, res) => {
    //query
    const sqlSelect = "SELECT * FROM blood_stocks;";

    db.query(sqlSelect, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.put("/login/emp/ub/update", (req, res) => {
    //variables
    const unitUpdate = req.body.unitUpdate;
    const b_id = req.body.b_id;
    //query
    const sqlInsert1 = "SELECT unit FROM blood_stocks WHERE b_id= ?";
    const sqlUpdate = "UPDATE blood_stocks SET unit=? WHERE b_id= ?;";
    //
    db.query(sqlInsert1, b_id, (err, result) => {
      if (err) {
        console.log("ERROR IN FINDING THE STOCK");
      } else {
        var unitup = parseInt(unitUpdate) + parseInt(result[0].unit);
        db.query(sqlUpdate, [unitup, b_id], (err, result1) => {
          // res.send(result1);
          if (err) {
            console.log("**ERROR IN UPDATING UNIT VALUE**" + err);
          }
        });
      }
    })
  });

};

export default UpdateStockHandler;