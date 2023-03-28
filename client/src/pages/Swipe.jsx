import React, { useEffect, useState } from 'react'
import { Container } from '@chakra-ui/react'

import { ImageSwipe, ImageLike } from '../components'

// randomly pick 1 of the items from all setups
// if user swiped before, skip to next
// if user not swiped before, show it to let user make action: swipe/like or next/dislike
// once swipe/like, update action/stat to db collections `users` to know which setups user rated and which ones liked, and `setups` to know the # of ratings and likes for each setup.
// show next setup, and repeat until all photos shown
// if all photos swiped before, show "no more new photos to show :( try again later"

// TODO:
// 1. check if user has liked/disliked currentSetup, if yes, skip to next setup
// 2. connect with users collection, create liked array in users collection, add the setup id to liked arrayß

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

        // randomly pick 1 setup (removes item from tempArray)
        let randomIndex = Math.floor(Math.random() * parsedData.length);
        let removedItem = tempSetupsArray.splice(randomIndex, 1); // returns array with 1 item

        // store randomly picked item as currentSetup to show on UI
        setCurrentSetup(removedItem[0]);

        // store remainder array (less removedItem) to balanceSetups state
        setBalanceSetups(tempSetupsArray);

        // TODO:
        //  if (user rated this setup before) {
        //   remove the item and repeat to pick next random item;
        // } else {
        //   show this setup to user;
        // }

      },
      (err) => console.log(err)
    );
      
  }, [])
    
  // handle user click like button or swipe right on mobile
  const handleLiked = (bool) => {

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

        console.log(updatedSetup.swipes[updatedSetup.swipes.length-1])

        console.log(`Update Setup id ${updatedSetup._id} (${updatedSetup.title}) | by UserId ${updatedSetup.swipes[updatedSetup.swipes.length-1].userId} (${userEmail}) | LIKED? ${updatedSetup.swipes[updatedSetup.swipes.length-1].liked} | timestamp: ${updatedSetup.swipes[updatedSetup.swipes.length-1].timestamp}`);

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