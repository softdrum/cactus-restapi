module.exports = {
    getSensorValue (req, res) {
        console.log(req.params);
        res.json({
            data: {
                value: Math.random()*55
            }
        })
    }
}