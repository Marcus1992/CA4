/**
 * Created by christoffer on 19-11-2014.
 */

var should = require("should");
var app = require("../../server/app");
var http = require("http");
var testPort = 9999;
var testServer;
var wiki = require("../../server/model/db")
var router = express.Router();
var test = require("public/app/view1/view1")
//var mongoose = require("mongoose");
//var Wiki = mongoose.model("User");

describe('Testing datalayers methods', function () {
    //Start the Server before the TESTS
    before(function (done) {



        testServer = app.listen(testPort, function () {
            console.log("Server is listening on: " + testPort);
            done();
        })
            .on('error', function (err) {
                console.log(err);
            });
    })

    //title: { type: String, index: true},
    //url: { type: String},
    //abstract: { type: String},
    //categories: {type: [{type: String}], index: true},
    //links: {type: [{type: String}], index: true},
    //headings: [{heading: {type: String}, position: {type: Number}}]}

    //beforeEach(function (done) {
    //    wiki.remove({}, function () {
    //        var array = [{
    //            title: "robot and stuff",
    //            url: "roboturl",
    //            abstract: "what does it mean?",
    //            categories: "robot",
    //            links: "robot times",
    //            headings: "robot"
    //        }]
    //        wiki.create(array, function (err) {
    //            done();
    //        });
    //    });
    //})

    after(function () {  //Stop server after the test
        //Uncomment the line below to completely remove the database, leaving the mongoose instance as before the tests
        //mongoose.connection.db.dropDatabase();
        testServer.close();
    })


    it("Should return wiki object with title", function (done) {
        http.get("http://localhost:" + testPort + "/api/title", function (res) {
            res.setEncoding("utf8");//response data is now a string
            res.on("data", function (chunk) {
                var a = JSON.parse(chunk);
                a[0].title.should.equal("robot and stuff");
                done();
            });

        });
    });


    it("Should be undefined", function (done) {
        expect(test.$scope.page).toBeUndefined();
    });



    it("Should return undefined", function (done) { //searches for something completly absurd which does not exist
        http.get("http://localhost:" + testPort + "/api/title", function (res) {
            res.setEncoding("utf8");//response data is now a string
            res.on("data", function (chunk) {
                var a = JSON.parse(chunk);
                a[0].title.should.equal(undefined);
                done();
            });

        });
    });

});