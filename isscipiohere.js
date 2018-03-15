var steem = require('steem');

steem.api.getState('@scipio/comments', function(err, result) {
        var obj=JSON.parse(JSON.stringify(result.content));
        var lastKill=null;
        for(comment in obj)
        {
          if (obj[comment].body.match("cannot be approved")){
          lastKill=obj[comment].created;
          break;
          }
        }
        if(lastKill==null)
        {
          console.log('Looks like he is sick, you are safe!');
        }
        else{
        var timeSinceLastPown = new Date().getTime()-new Date(lastKill).getTime();
        timeSinceLastPown= timeSinceLastPown/3600000 + new Date().getTimezoneOffset()/60;
        if(timeSinceLastPown<1)
          console.log('He is here and he is out for blood! Run!');
        else if(timeSinceLastPown<2)
          console.log('He moderated the shit out your fellows not so long ago, I wouldnt risk it!');
        else if(timeSinceLastPown<5)
          console.log('He is gone but he can come back!');
        else if (timeSinceLastPown<22)
          console.log('It s time for him to come back hunting!')
          }
    });
