const { upload, FILES_PATH } = require("../middlewares/multer");
const fs = require('fs')

function landRoutes(app, db) {

    app.post("/api/land",
        upload.single("land-image"),
        async (req, res) => {
            try {

                let data = JSON.parse(req.body.data)
                data.imgPath = req.file.filename

                console.log("---1", data)

                const insRes = `INSERT INTO land SET ?`;
                await db.query(insRes, data);
                const selRes = await db.query(selectAll);
                res.json({
                    msg: "success",
                    data: selRes[0],
                });
            } catch (error) {
                res.json({
                    msg: "failed",
                    error: error,
                });
            }
        });

    app.get("/api/land/:id", async (req, res) => {
        try {
            let sigRes = `select l.*, u.username from land l , user u where l.userId=u.id and (l.userId='${req.params.id}' or l.registered='${req.params.id}')`;
            const selRes = await db.query(sigRes);
            res.json({
                msg: "success",
                data: selRes[0].map((land) => {
                    land.img = fs.readFileSync(FILES_PATH + land.imgPath, "base64")
                    return land;
                }),
            });
        } catch (error) {
            res.json({
                msg: "failed",
                error: error,
            });
        }
    });


    app.put("/api/land", async (req, res) => {
        try {
            data = req.body;
            // const updRes = `UPDATE land SET isavailable=?, registered=? WHERE surveyno =?`;
            const updRes = `UPDATE land SET ? WHERE surveyno ='${data.surveyno}'`;
            let sinRes = `select * from land WHERE surveyno='${data.surveyno}'`;
            await db.query(updRes, [data]);
            const selRes = await db.query(sinRes);
            res.json({
                msg: "success",
                data: selRes[0],
            });
        } catch (error) {
            res.json({
                msg: "failed",
                error: error,
            });
        }
    });

    app.delete("/api/land/:id", async (req, res) => {
        try {
            let sigRes = `DELETE FROM land l WHERE l.surveyno='${req.params.id}'`;
            const selRes = await db.query(sigRes);
            res.json({
                msg: "success",
                data: selRes[0],
            });
        } catch (error) {
            res.json({
                msg: "failed",
                error: error,
            });
        }
    });

    app.get("/api/getUnRegLand/:id", async (req, res) => {
        try {
            let sigRes = `select l.*, u.username from land l , user u where l.userId = u.id and l.isavailable = 1 and l.userId != '${req.params.id}'`;
            const selRes = await db.query(sigRes);
            res.json({
                msg: "success",
                data: selRes[0],
            });
        } catch (error) {
            res.json({
                msg: "failed",
                error: error,
            });
        }
    });


    app.get("/api/getMondal/:id", async (req, res) => {
        try {
            let sigRes = `select mondal from district where district_name='${req.params.id}'`;
            const selRes = await db.query(sigRes);
            res.json({
                msg: "Success",
                data: selRes[0],
            });
        } catch (error) {
            res.json({
                msg: "Failed",
                data: error,
            });
        }
    });
    app.get("/api/getDistrict", async (req, res) => {
        try {
            let sigRes = `select district_id,district_name from district`;
            const selRes = await db.query(sigRes);
            res.json({
                msg: "Success",
                data: selRes[0],
            });
        } catch (error) {
            res.json({
                msg: "Failed",
                data: error,
            });
        }
    });
}


module.exports = landRoutes