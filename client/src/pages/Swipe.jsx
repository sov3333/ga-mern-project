import React, { useEffect, useState } from 'react'
import { Container } from '@chakra-ui/react'

import { ImageSwipe, ImageLike } from '../components'

// BUG / TODO:
// - doesnt show first or last (not sure which) setup to like
// - when loading render the array of items left to show to already filter out the setups that user already swiped
// -

const Swipe = () => {
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const [currentSetup, setCurrentSetup] = useState({});
  const [balanceSetups, setBalanceSetups] = useState([]);

  useEffect(() => {

    // get user data
    fetch(`http://localhost:8080/api/user/id`, {
      method: `GET`,
      credentials: `include`,
    })
      .then((res) => res.json())
      .then((data) => {
        setUserId(data);
        console.log(`userId`, userId);
      })
      .catch((e) => {
        console.error(e);
      });


    fetch(`http://localhost:8080/api/user/${userId}`, {
      method: `GET`,
      credentials: `include`,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`data`, data);
        setUserEmail(data.email);
        // setRole(data.role);
      })
      .catch((e) => {
        console.error(e);
      });


  }, [userId]);

  useEffect(() => {

    // run once on render (mount), to fetch all setups 
    fetch('http://localhost:8080/api/setup')
    .then(
      (data) => data.json(),
      (err) => console.log(err)
    )
    .then(
      (parsedData) => {

        // create temp array to store all setups
        let tempSetupsArray = parsedData;

        console.log(`parsedData1111`, parsedData);

        console.log(`userId`, userId)

        // BUG / TODO:
        // trying to filter away setups that user already swiped.
        // doesn't work on page load. but after loading page, save the Swipe.jsx file in code editor, and should see frontend update with some setups removed from the balanceSetups.

        // TODO:
        //  if (user rated this setup before) {
        //   remove the item and repeat to pick next random item;
        // } else {
        //   show this setup to user;
        // }
      
        // loop through the parsedData (all setups)
        for (let i=0; i<parsedData.length; i++) {
          console.log(`in the loop, ${parsedData[i]}`)
          // for each indiivdual setup, loop through the array for all swipes
          for (let j=0; j<parsedData[i].swipes.length; j++) {
            // check if the currently logged in userId === the userId in one of the swiped items
            if (userId === parsedData[i].swipes[j].userId) {
              console.log(`found that this setup ${parsedData[i].title} is already swiped!`)
              // remove this item from the tempSetupsArray
              console.log(`gonna remove this item`, tempSetupsArray[i].swipes[j]);
              console.log(`gonna remove this setup`, tempSetupsArray[i]);
              // tempSetupsArray[i].swipes.splice(j);
              console.log(`removedSwipe:`, tempSetupsArray.splice(i, 1));

              break;

            }
          }
        }

        console.log(`tempSetupsArray after for loop spaghetti`, tempSetupsArray);

        // randomly pick 1 setup (removes item from tempArray)
        let randomIndex = Math.floor(Math.random() * parsedData.length);
        let removedItem = tempSetupsArray.splice(randomIndex, 1); // returns array with 1 item

        console.log(`parsedData selectedItem`, removedItem);


        console.log(`parsedData selectedItem[0].swipes`, removedItem[0].swipes);


        // store randomly picked item as currentSetup to show on UI
        setCurrentSetup(removedItem[0]);

        // store remainder array (less removedItem) to balanceSetups state
        setBalanceSetups(tempSetupsArray);


      },
      (err) => console.log(err)
    );
      
  }, [])
    
  // handle user click like button or swipe right on mobile
  const handleLiked = (bool) => {

    console.log(`Swiped Setup`, currentSetup);
    
    if (balanceSetups.length > 0) {

      // update setup in db
      fetch(`http://localhost:8080/api/setup/${currentSetup._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // push new swipe object to the swipes array of this setup
          $push: {
            "swipes": {
              "userId": userId,
              "liked": bool,
              $currentDate: { 
                "lastModified": true,
                $type: "timestamp",
              },
            },
          },
        })
      })
      .then((res) => res.json())
      .then((updatedSetup) => {

        console.log(`updatedSetup`, updatedSetup.swipes[updatedSetup.swipes.length-1])

        console.log(`Update Setup id ${updatedSetup._id} (${updatedSetup.title}) | by UserId ${updatedSetup.swipes[updatedSetup.swipes.length-1].userId} (${userEmail}) | LIKED? ${updatedSetup.swipes[updatedSetup.swipes.length-1].liked} | timestamp: ${updatedSetup.swipes[updatedSetup.swipes.length-1].timestamp}`);

        // then also update user in db
        fetch(`http://localhost:8080/api/user/${userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            // push new swipe object to the swipedSetups array of this user
            $push: {
              "swipedSetups": {
                "setupId": updatedSetup._id,
                "liked": bool,
                $currentDate: { 
                  "lastModified": true,
                  $type: "timestamp",
                },
              },
            },
          })
        })
        .then((res) => res.json())
        .then((updatedUser) => {

          console.log(`updatedUser`. updatedUser)
          console.log(`updatedUser swipedSetups`, updatedUser.swipedSetups[updatedUser.swipedSetups.length-1])

          console.log(`Update User id ${updatedUser._id} (${updatedUser.email}) | Swiped ${updatedUser.swipedSetups[updatedUser.swipedSetups.length-1].setupId} | LIKED? ${updatedUser.swipedSetups[updatedUser.swipedSetups.length-1].liked} | timestamp: ${updatedUser.swipedSetups[updatedUser.swipedSetups.length-1].timestamp}`);

        })
        .catch((err) => console.error({ error: err }));

      })
      .catch((err) => console.error({ error: err }));

      // handle updating balanceSetups and currentSetup states after Liking

      // create temp array to store all setups
      let tempBalanceArray = balanceSetups;
      // randomly pick 1 setup (removes item from tempArray)
      let randomIndex = Math.floor(Math.random() * tempBalanceArray.length);
      let removedItem = tempBalanceArray.splice(randomIndex, 1); // returns array with 1 item
      // store randomly picked item as currentSetup to show on UI
      setCurrentSetup(removedItem[0]);
      // store remainder array (less removedItem) to balanceSetups state
      setBalanceSetups(tempBalanceArray);

    } else {
      console.log("no more new photos to show :( try again later");
      setBalanceSetups([]);
    }
    
  };


      
  return (
    <Container p="10px">
      { 
        (balanceSetups.length > 0) ? (
          <>
          Swipe the image (on mobile)!
          <ImageSwipe src={currentSetup.img} handleLiked={handleLiked} />
          Like the image
          <ImageLike src={currentSetup.img} handleLiked={handleLiked} />
          </>
        ) : (
          <p>no more new photos to show :( try again later</p>
        )
      }
        <div>
          <h3>CURRENT SETUP</h3>
          <p>{currentSetup.title}</p>
          <img src={currentSetup.img} />
        </div>
        <div>
          <h3>BALANCE SETUPS</h3>
          {balanceSetups.map(((setup, index) => (
            <img src={setup.img} key={index} />
            )))}
        </div>
    </Container>
  )
}

export default Swipe