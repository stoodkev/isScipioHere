var steem = require('steem');
const express=require('express');
const app = express()

app.get('/', (req, res) => {
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
            res.send('Looks like he is sick, you are safe!');
          }
          else{
          var timeSinceLastPown = new Date().getTime()-new Date(lastKill).getTime();
          timeSinceLastPown= timeSinceLastPown/3600000 + new Date().getTimezoneOffset()/60;
          if(timeSinceLastPown<1)
            res.send('He is here and he is out for blood! Run!');
          else if(timeSinceLastPown<2)
            res.send('He moderated the shit out your fellows not so long ago, I wouldnt risk it!');
          else if(timeSinceLastPown<5)
            res.send('He is gone but he can come back!');
          else if (timeSinceLastPown<22)
            res.send('It s time for him to come back hunting!')
            }
      });

})

app.listen(process.env.PORT||3000, () => console.log('Scipio listening to you on port 3000!'))
