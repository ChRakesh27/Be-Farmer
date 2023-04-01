const { v4: uuidv4 } = require("uuid");

const selectAll = `SELECT * FROM user`;

function userRoutes(app, db) {
    app.post("/api/user", async (req, res) => {
        try {
            req.body.id = uuidv4();
            let data = req.body;

            const insRes = `INSERT INTO user SET ?`;
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

    app.put("/api/user", async (req, res) => {
        try {
            data = req.body;
            const updRes = `UPDATE user SET username=?, phone=?, email=?, password=?, profileImg=? WHERE id=?`;
            const sinRes = `select * from user where id='${data.id}'`;
            await db.query(updRes, [
                data.username,
                data.phone,
                data.email,
                data.password,
                data.profileImg,
                data.id,
            ]);
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

    app.get("/api/user/:id/:pas", async (req, res) => {
        try {
            const islog = `select * from user Where email='${req.params.id}' and password = '${req.params.pas}'`;
            const logdel = await db.query(islog);
            res.json({
                msg: "Success",
                data: logdel[0],
            });
        } catch (error) {
            res.json({
                msg: "Failed",
                error: error,
            });
        }
    });
}

module.exports = userRoutes;
