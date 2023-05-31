Skip to content

Search or jump to...
Pull requests
Issues
Codespaces
Marketplace
Explore
 
@Leonard514 
lwu1822
/
SassySwiftiesFrontend
Public
generated from jm1021/leuck_reunion
Fork your own copy of lwu1822/SassySwiftiesFrontend
Code
Issues
5
Pull requests
Actions
Projects
1
Wiki
Security
Insights
BreadcrumbsSassySwiftiesFrontend/game
/
matching.md
in
gh-pages

Edit

Preview
Indent mode

Spaces
Indent size

2
Line wrap mode

Soft wrap
273
          hasFlipped = true;
274
          firstCard = this;
275
          // console.log("first card detected! This card is ");
276
          // console.log(firstCard);
277
      } else {
278
          secondCard = this;
279
          // console.log("second card detected! This card is");
280
          // console.log(secondCard);
281
          checkMatching()
282
      }
283
  }
284
​
285
​
286
async function sendMoney() {
287
    let data = await fetchUsername();
288
​
289
    let username = data["sub"];
290
    console.log(username)
291
    console.log(money)
292
    document.getElementById("username").innerHTML = username;
293
    const url = "https://taylorswifties.duckdns.org/api/users/updateTokens"
294
    const body = {
295
              username: document.getElementById("username").value,
296
              token: money
297
              };
298
    const requestOptions = {
299
            method: 'PUT',
300
            mode: 'cors', // no-cors, *cors, same-origin
301
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
302
            // credentials: 'include', // include, *same-origin, omit
303
            body: JSON.stringify(body),
304
            headers: {
305
                "content-type": "application/json",
306
            },
307
        };
308
     fetch(url, requestOptions)
309
        .then(response => {
310
            // trap error response from Web API
311
            if (response.status !== 200) {
312
                var message = 'Update Token error: ' + response.status + " " + response.statusText;
313
                if (response.status == 400 ) {
314
                  var message = 'HTTP Error 400. We messed up fetch.'
315
                }
316
                console.log(message);
317
                localStorage.removeItem("username");
318
                return;
319
            }
320
  
321
            response.json().then(data => {
322
                var message = "successfully sent the tokens";
323
                console.log(message);
324
            })
325
        })
326
  }
No file chosen
Attach files by dragging & dropping, selecting or pasting them.
Editing SassySwiftiesFrontend/matching.md at gh-pages · lwu1822/SassySwiftiesFrontend · GitHub
