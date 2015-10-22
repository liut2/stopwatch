if (Meteor.isClient) {
    // set default sessions
    //var interval;
    var input;
    var currentInput;
    var upInterval;
    var downInterval;
    var timeConvert = function(delta){
        var days = Math.floor(delta / 86400);
        delta -= days * 86400;
        
        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        
        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        
        var seconds = delta % 60;
        
        return [days, hours, minutes, seconds];
    };
    var countingDown = function () {
        var time = Session.get("countDown");
        if (time > 0) {
            time--;
            var array = timeConvert(time);
            var days = array[0];
            var hours = array[1];
            var minutes = array[2];
            var seconds = array[3];
            if (days > 1){
                Session.set("daysDownPlural", true);
            }else{
                Session.set("daysDownPlural", false);
            }
            
            if (hours > 1){
                Session.set("hoursDownPlural", true);
            }else{
                Session.set("hoursDownPlural", false);
            }
            
            if (minutes > 1){
                Session.set("minutesDownPlural", true);
            }else{
                Session.set("minutesDownPlural", false);
            }
            
            if (seconds > 1){
                Session.set("secondsDownPlural", true);
            }else{
                Session.set("secondsDownPlural", false);
            }
            //set time in Session
            Session.set("countDown", time);
            Session.set("daysDown", days);
            Session.set("hoursDown", hours);
            Session.set("minutesDown", minutes);
            Session.set("secondsDown", seconds);
            console.log(time);
        } else {
            Session.set("secondsDownPlural", false);
            Session.set("downDisable", true);
            Meteor.clearInterval(countingDown);
        }
    };
    //countingup function
    var countingUp = function () {
        var time = Session.get("countUp");
        if (time < input) {
            time++;
            var array = timeConvert(time);
            var days = array[0];
            var hours = array[1];
            var minutes = array[2];
            var seconds = array[3];
            if (days > 1){
                Session.set("daysUpPlural", true);
            }else{
                Session.set("daysUpPlural", false);
            }
            
            if (hours > 1){
                Session.set("hoursUpPlural", true);
            }else{
                Session.set("hoursUpPlural", false);
            }
            
            if (minutes > 1){
                Session.set("minutesUpPlural", true);
            }else{
                Session.set("minutesUpPlural", false);
            }
            
            if (seconds > 1){
                Session.set("secondsUpPlural", true);
            }else{
                Session.set("secondsUpPlural", false);
            }
            //set time in Session
            Session.set("countUp", time);
            Session.set("daysUp", days);
            Session.set("hoursUp", hours);
            Session.set("minutesUp", minutes);
            Session.set("secondsUp", seconds);
            console.log(time);
        } else {
            var array = timeConvert(time);
            var days = array[0];
            var hours = array[1];
            var minutes = array[2];
            var seconds = array[3];
            if (days > 1){
                Session.set("daysUpPlural", true);
            }else{
                Session.set("daysUpPlural", false);
            }
            
            if (hours > 1){
                Session.set("hoursUpPlural", true);
            }else{
                Session.set("hoursUpPlural", false);
            }
            
            if (minutes > 1){
                Session.set("minutesUpPlural", true);
            }else{
                Session.set("minutesUpPlural", false);
            }
            
            if (seconds > 1){
                Session.set("secondsUpPlural", true);
            }else{
                Session.set("secondsUpPlural", false);
            }
            Session.set("upDisable", true);
            Meteor.clearInterval(countingUp);
        }
    };
    //
    Session.setDefault("upPause",false);
    Session.setDefault("downPause",false);
    //Set default count down
    Session.setDefault("daysDown", 0);
    Session.setDefault("hoursDown", 0);
    Session.setDefault("minutesDown", 0);
    Session.setDefault("secondsDown", 0);
    //count down plurals
    Session.setDefault("daysDownPlural", false);
    Session.setDefault("hoursDownPlural", false);
    Session.setDefault("minutesDownPlural", false);
    Session.setDefault("secondsDownPlural", false);
    //Set Default count up
    Session.setDefault("daysUp", 0);
    Session.setDefault("hoursUp", 0);
    Session.setDefault("minutesUp", 0);
    Session.setDefault("secondsUp", 0);
    //count up plurals
    Session.setDefault("daysUpPlural", false);
    Session.setDefault("hoursUpPlural", false);
    Session.setDefault("minutesUpPlural", false);
    Session.setDefault("secondsUpPlural", false);
    //other variables
    Session.setDefault("enterWrong", false);
    Session.setDefault("countUp", -1);
    Session.setDefault("countDown", 0);
    Session.setDefault("upDisable", false);
    Session.setDefault("downDisable", false);
    // inputField template
    Template.inputField.events({
        "click #go": function (e, t) {
            var countTarget = t.find("#inputField").value.trim();
            var re = /\b[0-9]+\b/;
            if (countTarget.match(re) && countTarget > 0) {
                input = countTarget;
                console.log(countTarget);
                Session.set("enterWrong", false);
                Session.set("countDown", countTarget);
                Session.set("countUp", 0);
                if (currentInput != null && currentInput != input){
                    Meteor.clearInterval(upInterval);
                    Meteor.clearInterval(downInterval);
                }
                downInterval = Meteor.setInterval(countingDown, 1000);
                upInterval = Meteor.setInterval(countingUp, 1000);
                currentInput = input;
                Session.set("upDisable" , false);
                Session.set("downDisable" , false);
            } else {
                Session.set("enterWrong", true);
                console.log("no");
                throw new Meteor.Error(404, 'fail');
            }


        }
    });
    Template.inputField.helpers({
        enterWrong: function () {
            return Session.get("enterWrong");
        }
    });
    Template.displayCountDown.events({
        "click .downStart" : function(e,t){
            Session.set("downPause",!Session.get("downPause"));
            if (Session.get("downPause")){
                Meteor.clearInterval(downInterval);
            }else{
                downInterval = Meteor.setInterval(countingDown, 1000);
            }
        
        },
        "click .downReset" : function(e,t){
            Meteor.clearInterval(downInterval);
            Session.set("countDown", input);
            Session.set("downPause", true);
            var array = timeConvert(input);
            var days = array[0];
            var hours = array[1];
            var minutes = array[2];
            var seconds = array[3];
            Session.set("daysDown", days);
            Session.set("hoursDown", hours);
            Session.set("minutesDown", minutes);
            Session.set("secondsDown", seconds);
            Session.set("downDisable", false);
        }
    });
    Template.displayCountDown.helpers({
        days: function () {
            return Session.get("daysDown");
        },
        daysPlural : function(){
            return Session.get("daysDownPlural");
        },
        hours: function () {
            return Session.get("hoursDown");
        },
        hoursPlural : function(){
            return Session.get("hoursDownPlural");
        },
        minutes: function () {
            return Session.get("minutesDown");
        },
        minutesPlural : function(){
            return Session.get("minutesDownPlural");
        },
        seconds: function () {
            return Session.get("secondsDown");
        },
        secondsPlural : function(){
            return Session.get("secondsDownPlural");
        },
        disable : function(){
            return Session.get("downDisable");
        }
        

    });
    Template.displayCountUp.events({
        "click .upStart" : function(e,t){
            Session.set("upPause",!Session.get("upPause"));
            if (Session.get("upPause")){
                Meteor.clearInterval(upInterval);
            }else{
                upInterval = Meteor.setInterval(countingUp, 1000);
            }
            
            
        },
        "click .upReset" : function(e,t){
            //console.log("here I am");
            Meteor.clearInterval(upInterval);
            Session.set("countUp", 0);
            Session.set("upPause", true);
            Session.set("daysUp", 0);
            Session.set("hoursUp", 0);
            Session.set("minutesUp", 0);
            Session.set("secondsUp", 0);
            Session.set("upDisable", false);
            
        }
    });
    Template.displayCountUp.helpers({
        days: function () {
            return Session.get("daysUp");
        },
        daysPlural : function(){
            return Session.get("daysUpPlural");
        },
        hours: function () {
            return Session.get("hoursUp");
        },
        hoursPlural : function(){
            return Session.get("hoursUpPlural");
        },
        minutes: function () {
            return Session.get("minutesUp");
        },
        minutesPlural : function(){
            return Session.get("minutesUpPlural");
        },
        seconds: function () {
            return Session.get("secondsUp");
        },
        secondsPlural : function(){
            return Session.get("secondsUpPlural");
        },
        disable : function(){
            return Session.get("upDisable");
        }
        
        

    });

}